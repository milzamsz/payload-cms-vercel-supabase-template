import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { generateImportMap } from '../node_modules/payload/dist/bin/generateImportMap/index.js'
import { generateTypes } from '../node_modules/payload/dist/bin/generateTypes.js'
import payloadConfig from '../src/payload.config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

async function main() {
  process.chdir(path.resolve(dirname, '..'))

  const config = await payloadConfig
  const flags = new Set(process.argv.slice(2))
  const generateAll = flags.size === 0
  const shouldGenerateTypes = generateAll || flags.has('--types')
  const shouldGenerateImportMap = generateAll || flags.has('--importmap')

  if (!shouldGenerateTypes && !shouldGenerateImportMap) {
    throw new Error('Pass --types, --importmap, or no flags to generate both artifacts.')
  }

  if (shouldGenerateTypes) {
    await generateTypes(config)
  }

  if (shouldGenerateImportMap) {
    await generateImportMap(config)
  }
}

main().catch((error) => {
  console.error('[generate-payload-artifacts] Failed:', error)
  process.exit(1)
})
