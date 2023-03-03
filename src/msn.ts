import { createServer } from 'node:http'
import { createServer as createHttpsServer } from 'node:https'
import { config as dotEnvConfig } from 'dotenv'

import {
  Manager,
  InMemoManagerStrategy,
  MongoManagerStrategy,
} from 'Manager'
import { InvalidParamsError, handleRequest } from 'requestHandler'

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
  createServer(async (req, res) => {
    try {
      await handleRequest(req)
      Manager.sharedInstance.print()
      res.statusCode = 201
      res.end()
    } catch (error) {
      if (error instanceof InvalidParamsError) {
        res.statusCode = 422
        res.end(error.message)
        return
      }
      res.statusCode = 500
      res.end()
    }
  })
  .listen(Number(process.env.HTTP_PORT))
  .on("listening", () => {
    console.log(`Http server running at http://127.0.0.1:${process.env.HTTP_PORT}/`)
  })

process.env.SERVE_HTTPS === "TRUE" &&
  createServer(async (req, res) => {
    try {
      await handleRequest(req)
      Manager.sharedInstance.print()
      res.statusCode = 201
      res.end()
    } catch (error) {
      if (error instanceof InvalidParamsError) {
        res.statusCode = 422
        res.end(error.message)
        return
      }
      res.statusCode = 500
      res.end()
    }
  })
  .listen(Number(process.env.HTTPS_PORT))
  .on("listening", () => {
    console.log(`Https server running at http://127.0.0.1:${process.env.HTTPS_PORT}/`)
  })
