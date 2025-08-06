import inquirer from "inquirer";
import chalk from "chalk";
import { apiGet, apiPost, apiPut, apiDelete } from "../api.js";
import { promptFields, promptField, CANCEL } from "../prompt.js";

export const handleExceptionUser = async () => {
  const choices = [
    { name: `${chalk.green("GET")} all`, value: "GET all" },
    { name: `${chalk.green("GET")} by id`, value: "GET by id" },
    { name: chalk.hex("#ff8800ff")("POST"), value: "POST" },
    { name: chalk.yellow("PUT"), value: "PUT" },
    { name: chalk.red("DELETE"), value: "DELETE" },
    new inquirer.Separator(),
    { name: "Back", value: "back" }
  ];
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Action:",
    choices,
    pageSize: choices.length,
  });

  if (action === "back") {
    return;
  }

  if (action === "GET all") {
    console.table(await apiGet("/api/exception-users"));
  }

  if (action === "GET by id") {
    const id = await promptField({ name: "id", message: "ID:" });
    if (id === CANCEL) {
      console.log("Canceled.");
      return;
    }
    console.log(await apiGet(`/api/exception-users/${id}`));
  }

  if (action === "POST") {
    const fields = await promptFields([
      {
        name: "UserName",
        message: "UserName:",
        validate: (v) => v.trim() !== "" || "Required field"
      }
    ]);
    if (fields === CANCEL) {
      console.log("Canceled.");
      return;
    }
    console.log(await apiPost("/api/exception-users", fields));
  }

  if (action === "PUT") {
    const id = await promptField({ name: "id", message: "ID:" });
    if (id === CANCEL) {
      console.log("Canceled.");
      return;
    }
    const fields = await promptFields([
      { name: "UserName", message: "UserName:" }
    ]);
    if (fields === CANCEL) {
      console.log("Canceled.");
      return;
    }
    console.log(await apiPut(`/api/exception-users/${id}`, fields));
  }

  if (action === "DELETE") {
    const id = await promptField({ name: "id", message: "ID:" });
    if (id === CANCEL) {
      console.log("Canceled.");
      return;
    }
    await apiDelete(`/api/exception-users/${id}`);
    console.log("Deleted");
  }
};
