import inquirer from "inquirer";
import chalk from "chalk";
import { apiGet, apiPost } from "../api.js";
import { promptField, CANCEL } from "../prompt.js";

export const handleLimits = async () => {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Action:",
    choices: [
      { name: `${chalk.green('GET')} check/{pc}`, value: "GET check/{pc}" },
      { name: `${chalk.green('GET')} users`, value: "GET users" },
      { name: chalk.hex("#ff8800ff")('POST stop session'), value: "POST stop session" }
    ],
  });

  if (action === "GET check/{pc}") {
    const pc = await promptField({ name: "pc", message: "PC:" });
    if (pc === CANCEL) {
      console.log("Canceled.");
      return;
    }
    const result = await apiGet(`/api/limits/check/${pc}`);
    console.log("Code:", result);
  }

  if (action === "GET users") {
    console.table(await apiGet("/api/limits/users"));
  }

  if (action === "POST stop session") {
    const user = await promptField({ name: "user", message: "User login:" });
    if (user === CANCEL) {
      console.log("Canceled.");
      return;
    }
    const result = await apiPost(`/api/limits/users/session/stop/${user}`, {});
    console.log(result);
  }
};
