import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import vueInit from "../src/core/vue.js";
import { loadCommands, loadEvents } from "../src/core/loader.js";
import { useAppStore } from "./store/app.js";

vueInit();
dotenv.config();
loadCommands();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const appStore = useAppStore();
appStore.client = client;

loadEvents();

client.login(process.env.TOKEN);
