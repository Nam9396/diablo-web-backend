import client from "../config/client.js";

const sendMessage = async(req, res, next) => { 
  const { message } = req.body;
  const guildId = process.env.SERVER_ID; 
  const channelId = process.env.CHANNEL_ID;

  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    return res.status(404).json('Guild not found.');
  }
  const channel = guild.channels.cache.get(channelId);
  if (!channel) {
    return res.status(404).json('Channel not found.');
  }

  try { 
    await channel.send(message);
    res.status(201).json('message sent')
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
}

export { 
  sendMessage,
}