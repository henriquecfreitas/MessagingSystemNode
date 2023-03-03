import { Message } from "Types"

import Processor from "../processor"

class FileSystemProcessor implements Processor {
  public process(message: Message) {
    console.log("FS | processing =>", message)
    if (Math.random() >= 0.5) {
      console.error("Error processing message")
      throw new Error("Message rejected") 
    }
  }
}

export default FileSystemProcessor
