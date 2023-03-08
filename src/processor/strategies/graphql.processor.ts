import { Message } from "Types"
import { sendRequest } from "Utils"

import Processor from "../processor"

class GraphQLProcessorError extends Error {}

class GraphQLProcessor implements Processor {
  public async process(message: Message) {
    console.log("GQL | processing =>", message)
    const { content } = message

    if (!content["url"])
      throw new GraphQLProcessorError("Missing GraphQL server's URL on message content")
    if (!content["query"])
      throw new GraphQLProcessorError("Missing GraphQL query on message content")

    const url = new URL(content["url"])
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }

    const data = JSON.stringify({
      query: content["query"],
    })

    return await sendRequest(url, options, data)
  }
}

export default GraphQLProcessor
