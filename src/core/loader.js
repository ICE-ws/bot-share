import { REST, Routes, Collection, Client } from "discord.js";
import fg from "fast-glob";
import { useAppStore } from "../store/app.js";
import { client } from "../main.js";

const updateSlashCommand = async (commands) => {
  const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);
  const result = await rest.put(
    Routes.applicationCommands(process.env.APPLICATION_ID),
    {
      body: commands,
    }
  );
  console.log(result);
};

export const loadCommands = async () => {
  const appStore = useAppStore();
  const commands = [];
  const actions = new Collection();
  const files = await fg("./src/commands/**/*.js");
  console.log(files);
  for (const file of files) {
    const cmd = await import(file);
    commands.push(cmd.command);
    actions.set(cmd.command.name, cmd.action);
  }
  await updateSlashCommand(commands);
  appStore.commandsActionMap = actions;
  console.log(appStore.commandsActionMap);
};

export const loadEvents = async () => {
  const appStore = useAppStore();
  const client = appStore.client;
  const files = await fg("./src/events/**/*.js");
  for (const file of files) {
    const evt = await import(file);
    if (evt.event.once) {
      client.once(evt.event.name, evt.action);
    } else {
      client.on(evt.event.name, evt.action);
    }
  }
};
