import { Message, ProcessResponse } from "Types"

import Processor from "../processor"

class GraphQLProcessor implements Processor {
  public process(message: Message): ProcessResponse {
    console.log("GQL | processing =>", message)
    if (Math.random() >= 0.5) {
      console.error("Error processing message")
      throw new Error("Message rejected") 
    }
    return "not implemented"
  }
}

export default GraphQLProcessor
