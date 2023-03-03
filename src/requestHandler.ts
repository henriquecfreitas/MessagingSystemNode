import { IncomingMessage } from "http"

import { Manager } from "Manager"

export class InvalidParamsError extends Error {}

const isObject = (dataString: any) =>
  typeof dataString === 'object' &&
  !Array.isArray(dataString) &&
  dataString !== null

const promisifyRequestOnEnd = (request: IncomingMessage) =>
  new Promise<void>(resolve => request.on("end", resolve))

export async function handleRequest(request: IncomingMessage) {
  if (request.method == 'POST') {
    const chunks: any[] = []
    request.on('data', data =>{
      console.log('onData', data)
      chunks.push(data)
    })

    await promisifyRequestOnEnd(request)
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

      Manager.sharedInstance.producer.publishHttps({
        processor: dataObj["processor"],
        senderId: dataObj["senderId"],
        senderAddress: "",
        content: dataObj["content"],
      })
    }
  }
}
