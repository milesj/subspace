import { OptionConfig, OptionConfigMap } from '@boost/args';
import { Blueprint, optimal } from '@boost/common';
import msg from '../translate';
import {
  flagBlueprint,
  numberOptionBlueprint,
  numbersOptionBlueprint,
  stringOptionBlueprint,
  stringsOptionBlueprint,
} from './blueprints';

export default function validateOptions(options: OptionConfigMap) {
  Object.entries(options).forEach(([name, config]) => {
    let blueprint: Blueprint<object>;

    if (config.type === 'boolean') {
      blueprint = flagBlueprint;
    } else if (config.type === 'number') {
      blueprint = config.multiple ? numbersOptionBlueprint : numberOptionBlueprint;
    } else {
      blueprint = config.multiple ? stringsOptionBlueprint : stringOptionBlueprint;
    }

    optimal(config, blueprint as Blueprint<OptionConfig>, {
      name: msg('cli:labelOption', { name }),
      unknown: false,
    });
  });
}
