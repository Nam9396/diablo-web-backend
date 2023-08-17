import express from 'express'
import { sendMessage } from '../controller/discordController.js';

const discordRoute = express.Router();

discordRoute.route('/').post(sendMessage);

export default discordRoute;