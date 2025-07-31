import inquirer from "inquirer";
import chalk from "chalk";
import { apiGet, apiPost, apiPut, apiDelete } from "../api.js";
import { promptFields, promptField, CANCEL } from "../prompt.js";

export const handleUserGroup = async () => {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Action:",
    choices: [
      `${chalk.green('GET')} all`,
      `${chalk.green('GET')} by UserName`,
      chalk.keyword('orange')('POST'),
      chalk.yellow('PUT'),
      chalk.red('DELETE')
    ],
  });

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
