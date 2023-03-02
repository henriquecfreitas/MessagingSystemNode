import { Message } from "Types"

class Processor {
  static sharedInstance = new Processor()

  public process(message: Message) {
    console.log("processing =>", message)
    if (Math.random() >= 0.5) {
      console.error("Error processing message")
      throw new Error("Message rejected") 
    }
  }
}

export default Processor
