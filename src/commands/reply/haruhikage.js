import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("春日影")
  .setDescription("why");

export const action = async (ctx) => {
  await ctx.reply("為甚麼要演奏春日影！");
};
