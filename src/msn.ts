import { IncomingMessage, ServerResponse, createServer } from 'node:http'
import { createServer as createHttpsServer } from 'node:https'
import { config as dotEnvConfig } from 'dotenv'

import {
  Manager,
  InMemoManagerStrategy,
  MongoManagerStrategy,
} from 'Manager'

import {
  InvalidParamsError,
  handleRequest,
  handleHttpsRequest,
} from 'requestHandler'
import { TransferProtocol } from 'Types'

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

async function serve(
  request: IncomingMessage,
  response: ServerResponse,
  protocol:
    TransferProtocol.HTTP | TransferProtocol.HTTPS
    = TransferProtocol.HTTP
) {
  try {
    const _handleRequest =
      protocol === TransferProtocol.HTTP ? handleRequest : handleHttpsRequest
    await _handleRequest(request)

    Manager.sharedInstance.print()
    response.statusCode = 201
    response.end()
  } catch (error) {
    if (error instanceof InvalidParamsError) {
      response.statusCode = 422
      response.end(error.message)
      return
    }
    response.statusCode = 500
    response.end()
  }
}

process.env.SERVE_HTTP === "TRUE" &&
  createServer(serve)
  .listen(Number(process.env.HTTP_PORT))
  .on("listening", () => {
    console.log(`Http server running at http://127.0.0.1:${process.env.HTTP_PORT}/`)
  })

process.env.SERVE_HTTPS === "TRUE" &&
  createHttpsServer(async (req, res) => serve(req, res, TransferProtocol.HTTPS))
  .listen(Number(process.env.HTTPS_PORT))
  .on("listening", () => {
    console.log(`Https server running at http://127.0.0.1:${process.env.HTTPS_PORT}/`)
  })
