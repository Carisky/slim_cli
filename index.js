#!/usr/bin/env node

import inquirer from 'inquirer';
import { handleGroupModuleLimit } from './actions/groupModuleLimit.js';
import { handleUserGroup } from './actions/userGroup.js';
import { handleLimits } from './actions/limit.js';
import { handleSchedule } from './actions/schedule.js';
import { handleExceptionUser } from './actions/exceptionUser.js';
import { configure } from './config.js';

const resources = [
  { name: 'Group Module Limit', value: 'group-module-limit' },
  { name: 'User Group', value: 'user-group' },
  { name: 'Limits', value: 'limits' },
  { name: 'Schedule', value: 'schedule' },
  { name: 'Exception User', value: 'exception-user' },
  { name: 'Configure', value: 'configure' },
  new inquirer.Separator(),
  { name: 'Exit', value: 'exit' }
];

const handlers = {
  'group-module-limit': handleGroupModuleLimit,
  'user-group': handleUserGroup,
  'limits': handleLimits,
  'schedule': handleSchedule,
  'exception-user': handleExceptionUser,
  'configure': configure
};

const main = async () => {
  if (process.argv[2] === 'config') {
    await configure();
    return;
  }
  while (true) {
    const { resource } = await inquirer.prompt({
      type: 'list',
      name: 'resource',
      message: 'Select resource:',
      choices: resources,
      pageSize: resources.length
    });

    if (resource === 'exit') {
      console.log('Completed.');
      process.exit(0);
    }

    await handlers[resource]();
  }
};

main();
