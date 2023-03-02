import { Message } from "Types"
import { BaseConsumer } from "../consumer"

class InMemoConsumer extends BaseConsumer {
  constructor(
    private messages: Message[],
    private archive: Message[],
    private deadLetter: Message[],
  ) {
    super()
  }

  public retireveNextMessage () {
    return this.messages.pop()
  }

  public archiveMessage (message: Message) {
    this.archive.push(message)
  }

  public rejectMessage (message: Message) {
    this.deadLetter.push(message)
  }
}

export default InMemoConsumer
