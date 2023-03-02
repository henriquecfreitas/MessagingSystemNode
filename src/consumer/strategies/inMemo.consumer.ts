import { Message } from "Types"
import { ConsumerProcessor } from "../consumer"

class InMemoConsumer implements ConsumerProcessor {
  constructor(private messages: Message[]) {}

  public retireveNextMessage () {
    return this.messages.pop()
  }
}

export default InMemoConsumer
