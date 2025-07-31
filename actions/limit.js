import inquirer from "inquirer";
import { apiGet, apiPost } from "../api.js";

export const handleLimits = async () => {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Действие:",
    choices: ["GET check/{pc}", "GET users", "POST stop session"],
  });

  if (action === "GET check/{pc}") {
    const { pc } = await inquirer.prompt({ name: "pc", message: "PC:" });
    const result = await apiGet(`/api/limits/check/${pc}`);
    console.log("Code:", result);
  }

  if (action === "GET users") {
    console.table(await apiGet("/api/limits/users"));
  }

  if (action === "POST stop session") {
    const { user } = await inquirer.prompt({
      name: "user",
      message: "User login:",
    });
    const result = await apiPost(`/api/limits/users/session/stop/${user}`, {});
    console.log(result);
  }
};
