/**
 * @copyright   2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import camelCase from 'lodash/camelCase';
import fs from 'fs';
import glob from 'glob';
import isPlainObject from 'lodash/isPlainObject';
import merge from 'lodash/merge';
import path from 'path';
import JSON5 from 'json5';

import type { Config, GlobalConfig } from './types';

export default class ConfigLoader {
  config: Config = {};
  name: string;
  package: $PropertyType<GlobalConfig, 'package'> = {};

  constructor(name: string) {
    this.name = name;
    this.loadPackageJSON();
    this.loadConfig();
    this.extendPresets();
    this.validateConfig();
  }

  /**
   * If an `extends` option exists, merge the current configuration
   * with the preset configurations defined within `extends`.
   */
  extendPresets() {
    let { config: { extends: extendPaths } } = this;

    // Nothing to extend
    if (!extendPaths) {
      return;
    }

    extendPaths = Array.isArray(extendPaths) ? extendPaths : [extendPaths];

    // Determine file paths to preset configs
    extendPaths = extendPaths.map((extendPath) => {
      if (typeof extendPath !== 'string') {
        throw new Error(
          'Invalid `extends` configuration value. ' +
          'Must be a string or an array of strings.',
        );
      }

      // Absolute path, use it directly
      if (path.isAbsolute(extendPath)) {
        return path.normalize(extendPath);

      // Relative path, resolve with cwd
      } else if (extendPath[0] === '.') {
        return path.resolve(extendPath);
      }

      // Node module, generate a path
      return path.resolve(
        'node_modules/',
        extendPath,
        `config/${this.name}.preset.js`,
      );
    });

    // Recursively merge preset configurations
    const nextConfig = {};

    extendPaths.forEach((filePath) => {
      if (!fs.existsSync(filePath)) {
        throw new Error(`Preset configuration ${filePath} does not exist.`);

      } else if (!fs.statSync(filePath).isFile()) {
        throw new Error(`Preset configuration ${filePath} must be a valid file.`);
      }

      merge(nextConfig, this.parseFile(filePath));
    });

    // Apply local configuration last
    this.config = merge(nextConfig, this.config);
  }

  /**
   * Load a local configuration file relative to the current working directory,
   * or from within a package.json property of the same name.
   *
   * Support both JSON and JS file formats by globbing the config directory.
   */
  loadConfig() {
    const { name } = this;
    const camelName = camelCase(name);

    // Config has been defined in package.json
    if (this.package[camelName]) {
      this.config = { ...this.package[camelName] };

      return;
    }

    // Locate files within a local config folder
    const filePaths = glob.sync(
      path.join(process.cwd(), `config/${name}.{json,json5,js}`),
      { absolute: true },
    );

    if (filePaths.length === 0) {
      throw new Error(
        'Local configuration file could not be found. ' +
        `One of "${name}.json" or "${name}.js" must exist ` +
        'in a "config" folder relative to the project root.',
      );
    } else if (filePaths.length !== 1) {
      throw new Error(
        `Multiple "${name}" configuration files found. Only 1 may exist.`,
      );
    }

    // Parse and extract the located file
    this.config = this.parseFile(filePaths[0]);

    if (!isPlainObject(this.config)) {
      throw new Error('Invalid configuration. Must be a plain object.');
    }
  }

  /**
   * Load the "package.json" from the current working directory,
   * as we require the build tool to be ran from the project root.
   */
  loadPackageJSON() {
    if (!fs.existsSync('package.json')) {
      throw new Error(
        'Local "package.json" could not be found. ' +
        'Please run this command in your project\'s root.',
      );
    }

    this.package = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  }

  /**
   * Parse a configuration file at the defined file system path.
   * If the file ends in "json" or "json5", parse it with JSON5.
   * If the file ends in "js", import the file and use the default object.
   * Otherwise throw an error.
   */
  parseFile(filePath: string): Config {
    const ext = path.extname(filePath);

    switch (ext) {
      case '.json':
      case '.json5':
        return JSON5.parse(fs.readFileSync(filePath, 'utf8'));

      case '.js':
        // eslint-disable-next-line
        return require(filePath);

      default:
        throw new Error(`Unsupported configuration format ${this.name}${ext}.`);
    }
  }

  validateConfig() {
    Object.keys(this.config).forEach((key) => {
      const value = this.config[key];

      if (key === 'debug' || key === 'dry') {
        if (typeof value !== 'boolean') {
          throw new Error(`Configuration option "${key}" must be a boolean.`);
        }

      } else if (key === 'extends') {
        // We validated above

      } else if (key === 'plugins') {
        // TODO

      } else if (true) {
        // TODO - validate the config in a routine of the same name

      } else {
        throw new Error(`Unknown configuration option "${key}".`);
      }
    });
  }
}
