import { Message } from "Types"

import Processor from "../processor"

class RestProcessor implements Processor {
  public process(message: Message) {
    console.log("REST | processing =>", message)
    if (Math.random() >= 0.5) {
      console.error("Error processing message")
      throw new Error("Message rejected") 
    }
  }
}

export default RestProcessor
