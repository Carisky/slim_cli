import inquirer from "inquirer";
import chalk from "chalk";
import { apiGet, apiPost, apiPut, apiDelete } from "../api.js";
import { promptFields, promptField, CANCEL } from "../prompt.js";

export const handleGroupModuleLimit = async () => {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Action:",
    choices: [
      { name: `${chalk.green("GET")} all`, value: "GET all" },
      { name: `${chalk.green("GET")} by id`, value: "GET by id" },
      { name: chalk.hex("#ff8800ff")("POST"), value: "POST" },
      { name: chalk.yellow("PUT"), value: "PUT" },
      { name: chalk.red("DELETE"), value: "DELETE" },
      new inquirer.Separator(),
      { name: "Back", value: "back" },
    ],
  });

  if (action === "back") {
    return;
  }

  if (action === "GET all") {
    console.table(await apiGet("/api/group-module-limits"));
  }

  if (action === "GET by id") {
    const id = await promptField({ name: "id", message: "ID:" });
    if (id === CANCEL) {
      console.log("Canceled.");
      return;
    }
    console.log(await apiGet(`/api/group-module-limits/${id}`));
  }

  if (action === "POST") {
    const fields = await promptFields([
      {
        name: "GroupCode",
        message: "GroupCode:",
        validate: (v) => v.trim() !== "" || "Required field",
      },
      {
        name: "Module",
        message: "Module:",
        validate: (v) => v.trim() !== "" || "Required field",
      },
      {
        name: "Hour",
        message: "Hour:",
        validate: (v) => !isNaN(v) || "Enter a number",
      },
      {
        name: "MaxLicenses",
        message: "MaxLicenses:",
        validate: (v) => !isNaN(v) || "Enter a number",
      },
    ]);
    if (fields === CANCEL) {
      console.log("Canceled.");
      return;
    }
    console.log(await apiPost("/api/group-module-limits", fields));
  }

  if (action === "PUT") {
    const id = await promptField({ name: "id", message: "ID:" });
    if (id === CANCEL) {
      console.log("Canceled.");
      return;
    }
    const fields = await promptFields([
      { name: "GroupCode", message: "GroupCode:" },
      { name: "Module", message: "Module:" },
      {
        name: "Hour",
        message: "Hour:",
        validate: (v) => !isNaN(v) || "Enter a number",
      },
      {
        name: "MaxLicenses",
        message: "MaxLicenses:",
        validate: (v) => !isNaN(v) || "Enter a number",
      },
    ]);
    if (fields === CANCEL) {
      console.log("Canceled.");
      return;
    }
    console.log(await apiPut(`/api/group-module-limits/${id}`, fields));
  }

  if (action === "DELETE") {
    const id = await promptField({ name: "id", message: "ID:" });
    if (id === CANCEL) {
      console.log("Canceled.");
      return;
    }
    await apiDelete(`/api/group-module-limits/${id}`);
    console.log("Deleted");
  }
};
