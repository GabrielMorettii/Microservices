import {Kafka} from 'kafkajs'

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

await producer.connect();
await producer.send({
  topic: "notifications.send-notification",
  messages: [
    {
      value: JSON.stringify({
        content: "Node Micro",
        category: "social",
        recipientId: "example-recipient-id",
      }),
    },
  ],
});

await producer.disconnect();
