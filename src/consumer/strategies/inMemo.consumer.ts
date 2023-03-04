import { Message, ProcessResponse, ProcessedMessage, RejectedMessage } from "Types"

import BaseConsumer from "../baseConsumer"

class InMemoConsumer extends BaseConsumer {
  constructor(
    private messages: Message[],
    private archive: ProcessedMessage[],
    private deadLetter: RejectedMessage[],
  ) {
    super()
  }

  public retireveNextMessage () {
    return this.messages.pop()
  }

  public archiveMessage(message: Message, response: ProcessResponse) {
    this.archive.push({
      response,
      ...message
    })
  }

  public rejectMessage(message: Message, error: unknown) {
    this.deadLetter.push({
      error,
      ...message,
    })
  }
}

export default InMemoConsumer
