#!/usr/bin/env node

import inquirer from 'inquirer';
import { handleGroupModuleLimit } from './actions/groupModuleLimit.js';
import { handleUserGroup } from './actions/userGroup.js';
import { handleLimits } from './actions/limit.js';

const resources = [
  { name: 'Group Module Limit', value: 'group-module-limit' },
  { name: 'User Group', value: 'user-group' },
  { name: 'Limits', value: 'limits' },
  new inquirer.Separator(),
  { name: 'Exit', value: 'exit' }
];

const handlers = {
  'group-module-limit': handleGroupModuleLimit,
  'user-group': handleUserGroup,
  'limits': handleLimits
};

const main = async () => {
  while (true) {
    const { resource } = await inquirer.prompt({
      type: 'list',
      name: 'resource',
      message: 'Select resource:',
      choices: resources
    });

    if (resource === 'exit') {
      console.log('Completed.');
      process.exit(0);
    }

    await handlers[resource]();
  }
};

main();
