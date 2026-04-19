import * as migration_20260326_192435 from './20260326_192435';
import * as migration_20260328_221628_email_settings from './20260328_221628_email_settings';
import * as migration_20260329_054714 from './20260329_054714';
import * as migration_20260329_121912 from './20260329_121912';
import * as migration_20260417_224500_add_portfolio_category_area from './20260417_224500_add_portfolio_category_area';
import * as migration_20260418_024030 from './20260418_024030';
import * as migration_20260419_170500_purge_orphaned_portfolio_versions from './20260419_170500_purge_orphaned_portfolio_versions';

export const migrations = [
  {
    up: migration_20260326_192435.up,
    down: migration_20260326_192435.down,
    name: '20260326_192435',
  },
  {
    up: migration_20260328_221628_email_settings.up,
    down: migration_20260328_221628_email_settings.down,
    name: '20260328_221628_email_settings',
  },
  {
    up: migration_20260329_054714.up,
    down: migration_20260329_054714.down,
    name: '20260329_054714',
  },
  {
    up: migration_20260329_121912.up,
    down: migration_20260329_121912.down,
    name: '20260329_121912',
  },
  {
    up: migration_20260417_224500_add_portfolio_category_area.up,
    down: migration_20260417_224500_add_portfolio_category_area.down,
    name: '20260417_224500_add_portfolio_category_area',
  },
  {
    up: migration_20260418_024030.up,
    down: migration_20260418_024030.down,
    name: '20260418_024030'
  },
  {
    up: migration_20260419_170500_purge_orphaned_portfolio_versions.up,
    down: migration_20260419_170500_purge_orphaned_portfolio_versions.down,
    name: '20260419_170500_purge_orphaned_portfolio_versions',
  },
];
