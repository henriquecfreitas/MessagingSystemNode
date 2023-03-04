import { nanoid } from 'nanoid'

import { Message, TransferProtocol } from "Types"
import Producer, { PublishParams } from "../producer"

class InMemoProducer implements Producer {
  constructor(private messages: Message[]) {}

  public publish({
    processor,
    senderId,
    content
  }: PublishParams) {
    this.messages.push({
      id: nanoid(13),
      processor,
      origin: {
        senderId,
        transferProtocol: TransferProtocol.Application,
      },
      content,
    })
  }

  public publishHttp(
    {
      processor,
      senderId,
      senderAddress,
      content
    }: PublishParams,
    transferProtocol: TransferProtocol
  ) {
    this.messages.push({
      id: nanoid(13),
      processor,
      origin: {
        senderId,
        senderAddress,
        transferProtocol,
      },
      content,
    })
  }
}

export default InMemoProducer
