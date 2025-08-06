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

const helpText = `Usage: slim-cli [options]

Commands:
  slim-cli config             Configure BASE_URL and X_API_KEY

Routes:
  group-module-limit    /api/group-module-limits
  user-group            /api/user-groups
  limits                /api/limits
  schedule              /api/schedule/{userName}
  exception-user        /api/exception-users

Run without options to start interactive mode.`;

const main = async () => {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(helpText);
    return;
  }

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
