import { config as dotEnvConfig } from 'dotenv'

import { createServer } from 'node:http'
import { createServer as createHttpsServer } from 'node:https'

import {
  Manager,
  InMemoManagerStrategy,
  MongoManagerStrategy,
} from 'Manager'

import {
  Producer,
  InMemoProducerStrategy,
  MongoProducerStrategy,
} from 'Producer'

dotEnvConfig()

switch (process.env.STORAGE_STRATEGY) {
  case "IN_MEMO":
    const messages = []
    Manager.sharedInstance = new InMemoManagerStrategy(messages)
    Producer.sharedInstance = new InMemoProducerStrategy(messages)
    break
  case "MONGO":
    Manager.sharedInstance = new MongoManagerStrategy()
    Producer.sharedInstance = new MongoProducerStrategy()
    break
}

export const publish = Producer.sharedInstance.publish

process.env.SERVE_HTTP === "TRUE" &&
  createServer((req, res) => {
    Producer.sharedInstance.publishHttp({
      senderId: 'test',
      content: "http message - teste"
    })
    Manager.sharedInstance.print()
  })
  .listen(Number(process.env.HTTP_PORT))
  .on("listening", () => {
    console.log(`Http server running at http://127.0.0.1:${process.env.HTTP_PORT}/`)
  })

process.env.SERVE_HTTPS === "TRUE" &&
  createHttpsServer((req, res) => {
    Producer.sharedInstance.publishHttps({
      senderId: 'test-https',
      content: "https message"
    })
    Manager.sharedInstance.print()
  })
  .listen(Number(process.env.HTTPS_PORT))
  .on("listening", () => {
    console.log(`Https server running at http://127.0.0.1:${process.env.HTTPS_PORT}/`)
  })
