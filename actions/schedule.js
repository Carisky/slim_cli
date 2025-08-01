import inquirer from "inquirer";
import chalk from "chalk";
import { apiGet } from "../api.js";
import { promptField, CANCEL } from "../prompt.js";

export const handleSchedule = async () => {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Action:",
    choices: [
      { name: `${chalk.green("GET")}` + " by user", value: "GET by user" },
      new inquirer.Separator(),
      { name: "Back", value: "back" },
    ],
  });

  if (action === "back") {
    return;
  }

  if (action === "GET by user") {
    const userName = await promptField({ name: "userName", message: "UserName:" });
    if (userName === CANCEL) {
      console.log("Canceled.");
      return;
    }
    console.log(await apiGet(`/api/schedule/${userName}`));
  }
};
