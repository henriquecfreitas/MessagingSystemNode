import { IncomingMessage } from "http"

import { TransferProtocol } from "Types"
import { Manager } from "Manager"

import promisifyReadableOnEnd from "promisifyReadableOnEnd"

export class InvalidParamsError extends Error {}

const isObject = (dataString: any) =>
  typeof dataString === 'object' &&
  !Array.isArray(dataString) &&
  dataString !== null

export const handleHttpsRequest =
  (request: IncomingMessage) => handleRequest(request, TransferProtocol.HTTPS)

export async function handleRequest(
  request: IncomingMessage,
  transferProtocol:
  TransferProtocol.HTTP | TransferProtocol.HTTPS
    = TransferProtocol.HTTP
) {
  if (request.method == 'POST') {
    const chunks: any[] = []
    request.on('data', data =>{
      chunks.push(data)
    })

    await promisifyReadableOnEnd(request)
    if (!chunks.length) throw new InvalidParamsError("Empty request body")
    const dataString = Buffer.concat(chunks).toString()

    const data = (() => {
      try {
        return JSON.parse(dataString)
      } catch (e) {
        throw new InvalidParamsError("Bad JSON request body")
      }
    })()

    if (isObject(data)) {
      const dataObj = data as Object

      if (!dataObj["processor"]) throw new InvalidParamsError("Missing 'processor' key on request body")
      if (!dataObj["senderId"]) throw new InvalidParamsError("Missing 'senderId' key on request body")
      if (!dataObj["content"]) throw new InvalidParamsError("Missing 'content' key on request body")

      Manager.sharedInstance.producer.publishHttp({
        processor: dataObj["processor"],
        senderId: dataObj["senderId"],
        senderAddress: "",
        content: dataObj["content"],
      }, transferProtocol)
    }
  }
}
