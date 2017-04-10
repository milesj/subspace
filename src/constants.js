/**
 * @copyright   2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import type { Status, GlobalConfig } from './types';

export const PENDING: Status = 'pending';
export const RUNNING: Status = 'running';
export const SKIPPED: Status = 'skipped';
export const PASSED: Status = 'passed';
export const FAILED: Status = 'failed';

export const DEFAULT_GLOBALS: GlobalConfig = {
  command: {
    args: [],
    name: '',
  },
  config: {
    debug: false,
  },
  package: {
    name: '',
    version: '',
  },
};
