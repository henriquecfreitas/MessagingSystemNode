import { RequestOptions, request } from "http"

import { ProcessResponse } from "Types"

import promisifyReadableOnEnd from "./promisifyReadableOnEnd"

const sendRequest = (
  url: URL,
  options: RequestOptions,
  reqData?: string,
) => new Promise<ProcessResponse>((resolve, reject) => {
  const req = request(url, options, async response => {
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

    const { statusCode } = response
    const cbMethod =
      (() => statusCode && statusCode > 299 ? reject : resolve)()

    cbMethod(`status: ${statusCode}; response: ${strResponse}`)
  })

  if (reqData) {
    req.write(reqData)
  }

  req.end()
})

export default sendRequest
