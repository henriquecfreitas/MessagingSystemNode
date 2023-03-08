import { Message } from "Types"
import { sendRequest } from "Utils"

import Processor from "../processor"

class RestProcessorError extends Error {}

class RestProcessor implements Processor {
  public async process(message: Message) {
    console.log("REST | processing =>", message)
    const { content } = message

    if (!content["url"])
      throw new RestProcessorError("Missing URL on message content")
    if (!content["method"])
      throw new RestProcessorError("Missing REST method on message content")
    
    const url = new URL(content["url"])
    const options = {
      method: content["method"],
      headers: content["headers"],
    }

    return await sendRequest(
      url,
      options,
      content["body"] ? JSON.stringify(content["body"]) : undefined,
    )
  }
}

export default RestProcessor
