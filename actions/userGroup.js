import inquirer from "inquirer";
import chalk from "chalk";
import { apiGet, apiPost, apiPut, apiDelete } from "../api.js";
import { promptFields, promptField, CANCEL } from "../prompt.js";

export const handleUserGroup = async () => {
  const choices = [
    { name: `${chalk.green('GET')} all`, value: "GET all" },
    { name: `${chalk.green('GET')} by UserName`, value: "GET by UserName" },
    { name: chalk.hex("#ff8800ff")('POST'), value: "POST" },
    { name: chalk.yellow('PUT'), value: "PUT" },
    { name: chalk.red('DELETE'), value: "DELETE" },
    new inquirer.Separator(),
    { name: 'Back', value: 'back' }
  ];
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Action:",
    choices,
    pageSize: choices.length,
  });

  if (action === 'back') {
    return;
  }

  if (action === "GET all") {
    console.table(await apiGet("/api/user-groups"));
  }

  if (action === "GET by UserName") {
    const userName = await promptField({ name: "userName", message: "UserName:" });
    if (userName === CANCEL) {
      console.log("Canceled.");
      return;
    }
    console.log(await apiGet(`/api/user-groups/${userName}`));
  }

  if (action === "POST") {
    const fields = await promptFields([
      { name: "UserName", message: "UserName:" },
      { name: "Group", message: "Group:" },
      { name: "WindowsUser", message: "WindowsUser:" },
    ]);
    if (fields === CANCEL) {
      console.log("Canceled.");
      return;
    }
    console.log(await apiPost("/api/user-groups", fields));
  }

  if (action === "PUT") {
    const userName = await promptField({ name: "userName", message: "UserName to update:" });
    if (userName === CANCEL) {
      console.log("Canceled.");
      return;
    }
    const fields = await promptFields([
      { name: "Group", message: "Group:" },
      { name: "WindowsUser", message: "WindowsUser:" },
    ]);
    if (fields === CANCEL) {
      console.log("Canceled.");
      return;
    }
    console.log(await apiPut(`/api/user-groups/${userName}`, fields));
  }

  if (action === "DELETE") {
    const userName = await promptField({ name: "userName", message: "UserName to delete:" });
    if (userName === CANCEL) {
      console.log("Canceled.");
      return;
    }
    await apiDelete(`/api/user-groups/${userName}`);
    console.log("Deleted");
  }
};
