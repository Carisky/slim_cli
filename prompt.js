import inquirer from 'inquirer';

export const CANCEL = Symbol('cancel');

export async function promptField({ name, message, validate }) {
  const answer = await inquirer.prompt({
    name,
    message: `${message} (type "cancel" to abort)`,
    validate: (v) => {
      if (typeof v === 'string' && v.trim().toLowerCase() === 'cancel') {
        return true;
      }
      return validate ? validate(v) : true;
    }
  });
  const value = answer[name];
  if (typeof value === 'string' && value.trim().toLowerCase() === 'cancel') {
    return CANCEL;
  }
  return value;
}

export async function promptFields(fields) {
  const result = {};
  for (const field of fields) {
    const value = await promptField(field);
    if (value === CANCEL) {
      return CANCEL;
    }
    result[field.name] = value;
  }
  return result;
}
