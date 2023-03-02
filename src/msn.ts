import { config as dotEnvConfig } from 'dotenv'

import { createServer } from 'node:http'
import { createServer as createHttpsServer } from 'node:https'

import {
  Manager,
  InMemoManagerStrategy,
  MongoManagerStrategy,
} from 'Manager'

dotEnvConfig()

switch (process.env.STORAGE_STRATEGY) {
  case "IN_MEMO":
    Manager.sharedInstance = new InMemoManagerStrategy()
    break
  case "MONGO":
    Manager.sharedInstance = new MongoManagerStrategy()
    break
}

export const { publish } = Manager.sharedInstance.producer

process.env.SERVE_HTTP === "TRUE" &&
  createServer((req, res) => {
    Manager.sharedInstance.producer.publishHttp({
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
    Manager.sharedInstance.producer.publishHttps({
      senderId: 'test-https',
      content: "https message"
    })
    Manager.sharedInstance.print()
  })
  .listen(Number(process.env.HTTPS_PORT))
  .on("listening", () => {
    console.log(`Https server running at http://127.0.0.1:${process.env.HTTPS_PORT}/`)
  })
