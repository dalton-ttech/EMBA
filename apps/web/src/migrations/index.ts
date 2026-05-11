import * as migration_20260511_084426_init from './20260511_084426_init';
import * as migration_20260511_130917_organize_media_library from './20260511_130917_organize_media_library';
import * as migration_20260511_131817_make_media_alt_optional from './20260511_131817_make_media_alt_optional';
import * as migration_20260511_134752_align_activity_types from './20260511_134752_align_activity_types';

export const migrations = [
  {
    up: migration_20260511_084426_init.up,
    down: migration_20260511_084426_init.down,
    name: '20260511_084426_init',
  },
  {
    up: migration_20260511_130917_organize_media_library.up,
    down: migration_20260511_130917_organize_media_library.down,
    name: '20260511_130917_organize_media_library',
  },
  {
    up: migration_20260511_131817_make_media_alt_optional.up,
    down: migration_20260511_131817_make_media_alt_optional.down,
    name: '20260511_131817_make_media_alt_optional',
  },
  {
    up: migration_20260511_134752_align_activity_types.up,
    down: migration_20260511_134752_align_activity_types.down,
    name: '20260511_134752_align_activity_types'
  },
];
