import {MessageSender} from "./messageSender";

const express = require("express");
const amqplib = require('amqplib');
const dotenv = require('dotenv');
const cors = require("cors");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.options("*", cors());
const port = Number(process.env.PORT || 3331);
const messageSender = new MessageSender();
const amqp_url = process.env.CLOUDAMQP_URL;

async function do_consume() {
	console.log('consuming');
	var conn = await amqplib.connect(amqp_url);
	var ch = await conn.createChannel()
	const queue = process.env.RABBITMQ_QUEUE;
	await conn.createChannel();
	await ch.assertQueue(queue, {durable: true});
	await ch.consume(queue, function (message: any) {
		messageSender.send(JSON.parse(message.content.toString()));
		console.log();
		ch.ack(message);
	});
}
do_consume();
app.listen(port, () => {
	console.log(`🚀 Trans Sender running on port ${port}!`)
});

module.exports = app;

