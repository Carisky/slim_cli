import inquirer from "inquirer";
import { apiGet, apiPost, apiPut, apiDelete } from "../api.js";

export const handleGroupModuleLimit = async () => {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Действие:",
    choices: ["GET all", "GET by id", "POST", "PUT", "DELETE"],
  });

  if (action === "GET all") {
    console.table(await apiGet("/api/group-module-limits"));
  }

  if (action === "GET by id") {
    const { id } = await inquirer.prompt({ name: "id", message: "ID:" });
    console.log(await apiGet(`/api/group-module-limits/${id}`));
  }

  if (action === "POST") {
    const fields = await inquirer.prompt([
      {
        name: "GroupCode",
        message: "GroupCode:",
        validate: (v) => v.trim() !== "" || "Обязательное поле",
      },
      {
        name: "Module",
        message: "Module:",
        validate: (v) => v.trim() !== "" || "Обязательное поле",
      },
      {
        name: "Hour",
        message: "Hour:",
        validate: (v) => !isNaN(v) || "Введите число",
      },
      {
        name: "MaxLicenses",
        message: "MaxLicenses:",
        validate: (v) => !isNaN(v) || "Введите число",
      },
    ]);
    console.log("Отправляем данные:", fields);
    console.log(await apiPost("/api/group-module-limits", fields));
  }

  if (action === "PUT") {
    const { id } = await inquirer.prompt({ name: "id", message: "ID:" });
    const fields = await inquirer.prompt([
      { name: "GroupCode", message: "GroupCode:" },
      { name: "Module", message: "Module:" },
      { name: "Hour", message: "Hour:", validate: (v) => !isNaN(v) },
      {
        name: "MaxLicenses",
        message: "MaxLicenses:",
        validate: (v) => !isNaN(v),
      },
    ]);
    console.log(await apiPut(`/api/group-module-limits/${id}`, fields));
  }

  if (action === "DELETE") {
    const { id } = await inquirer.prompt({ name: "id", message: "ID:" });
    await apiDelete(`/api/group-module-limits/${id}`);
    console.log("Удалено");
  }
};
