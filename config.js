import Conf from 'conf';
import inquirer from 'inquirer';

const store = new Conf({projectName: 'slim-cli'});

export const getConfig = () => ({
  BASE_URL: store.get('BASE_URL'),
  X_API_KEY: store.get('X_API_KEY')
});

export const configure = async () => {
  const answers = await inquirer.prompt([
    {name: 'BASE_URL', message: 'BASE_URL:', default: store.get('BASE_URL') || ''},
    {name: 'X_API_KEY', message: 'X_API_KEY:', default: store.get('X_API_KEY') || ''}
  ]);
  store.set(answers);
  console.log('Configuration saved at', store.path);
};
