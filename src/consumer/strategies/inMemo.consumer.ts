import { Message, RejectedMessage } from "Types"

import BaseConsumer from "../baseConsumer"

class InMemoConsumer extends BaseConsumer {
  constructor(
    private messages: Message[],
    private archive: Message[],
    private deadLetter: RejectedMessage[],
  ) {
    super()
  }

  public retireveNextMessage () {
    return this.messages.pop()
  }

  public archiveMessage(message: Message) {
    this.archive.push(message)
  }

  public rejectMessage(message: Message, error: unknown) {
    this.deadLetter.push({
      error,
      ...message,
    })
  }
}

export default InMemoConsumer
