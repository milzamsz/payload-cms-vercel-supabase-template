import { Client } from 'pg'

function createDatabaseClient(): Client {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is required for portfolio version cleanup.')
  }

  return new Client({ connectionString })
}

async function deletePortfolioVersionIDs(
  client: Client,
  versionIDs: number[],
): Promise<number> {
  if (versionIDs.length === 0) {
    return 0
  }

  await client.query(
    'DELETE FROM "_portfolios_v_version_gallery" WHERE "_parent_id" = ANY($1::int[])',
    [versionIDs],
  )

  await client.query(
    'DELETE FROM "_portfolios_v_rels" WHERE "parent_id" = ANY($1::int[])',
    [versionIDs],
  )

  const deleteResult = await client.query(
    'DELETE FROM "_portfolios_v" WHERE "id" = ANY($1::int[])',
    [versionIDs],
  )

  return deleteResult.rowCount ?? versionIDs.length
}

export async function purgeOrphanedPortfolioVersions(): Promise<number> {
  const client = createDatabaseClient()
  await client.connect()

  try {
    await client.query('BEGIN')

    const orphanedVersions = await client.query<{ id: number }>(
      'SELECT id FROM "_portfolios_v" WHERE "parent_id" IS NULL',
    )

    const removed = await deletePortfolioVersionIDs(
      client,
      orphanedVersions.rows.map(({ id }) => id),
    )

    await client.query('COMMIT')

    return removed
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined)
    throw error
  } finally {
    await client.end()
  }
}
