import inquirer from "inquirer";
import { apiGet, apiPost, apiPut, apiDelete } from "../api.js";

export const handleUserGroup = async () => {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Действие:",
    choices: ["GET all", "GET by UserName", "POST", "PUT", "DELETE"],
  });

  if (action === "GET all") {
    console.table(await apiGet("/api/user-groups"));
  }

  if (action === "GET by UserName") {
    const { userName } = await inquirer.prompt({ name: "userName", message: "UserName:" });
    console.log(await apiGet(`/api/user-groups/${userName}`));
  }

  if (action === "POST") {
    const fields = await inquirer.prompt([
      { name: "UserName", message: "Введите UserName:" },
      { name: "Group", message: "Введите Group:" },
      { name: "WindowsUser", message: "Введите WindowsUser:" },
    ]);
    console.log(await apiPost("/api/user-groups", fields));
  }

  if (action === "PUT") {
    const { userName } = await inquirer.prompt({ name: "userName", message: "UserName для обновления:" });
    const fields = await inquirer.prompt([
      { name: "Group", message: "Введите Group:" },
      { name: "WindowsUser", message: "Введите WindowsUser:" },
    ]);
    console.log(await apiPut(`/api/user-groups/${userName}`, fields));
  }

  if (action === "DELETE") {
    const { userName } = await inquirer.prompt({ name: "userName", message: "UserName для удаления:" });
    await apiDelete(`/api/user-groups/${userName}`);
    console.log("Удалено");
  }
};
