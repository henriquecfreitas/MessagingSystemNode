import { request, RequestOptions } from "http"

import { Message, ProcessResponse } from "Types"
import promisifyReadableOnEnd from "promisifyReadableOnEnd"

import Processor from "../processor"

class RestProcessorError extends Error {}

const sendRequest = (
  url: URL,
  options: RequestOptions,
) => new Promise<ProcessResponse>((resolve, reject) => {
  request(url, options, async response => {
    response.setEncoding('utf8')

    response.on('error', reject)

    const chunks: any[] = []
    let strResponse = ""
    response.on('data', data => {
      if (typeof data === "string") {
        strResponse += data
      } else {
        chunks.push(data)
      }
    })

    const requestTimeout = setTimeout(() => {
      reject("Request timeout")
    }, Number(process.env.REST_REQUEST_TIMEOUT))
    
    await promisifyReadableOnEnd(response)

    clearTimeout(requestTimeout)

    strResponse += Buffer.concat(chunks).toString()
    resolve(strResponse)
  }).end()
})

class RestProcessor implements Processor {
  public async process(message: Message) {
    console.log("REST | processing =>", message)
    const { content } = message

    if (!content["url"]) throw new RestProcessorError("Missing URL on message content")
    if (!content["method"])
      throw new RestProcessorError("Missing REST method on message content")
    
    const url = new URL(content["url"])
    const options = {
      method: content["method"],
      headers: content["headers"],
      body: content["body"],
    }

    return await sendRequest(url, options)
  }
}

export default RestProcessor
