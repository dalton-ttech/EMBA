import * as migration_20260511_084426_init from './20260511_084426_init';

export const migrations = [
  {
    up: migration_20260511_084426_init.up,
    down: migration_20260511_084426_init.down,
    name: '20260511_084426_init'
  },
];
