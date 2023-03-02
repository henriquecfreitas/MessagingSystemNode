import { nanoid } from 'nanoid'

import { Message, TransferProtocol } from "Types"
import Producer, { PublishParams } from "../producer"

class InMemoProducer implements Producer {
  constructor(private messages: Message[]) {}

  public publish({
    senderId,
    content
  }: PublishParams) {
    const contentLenght = 1

    this.messages.push({
      id: nanoid(13),
      origin: {
        senderId,
        transferProtocol: TransferProtocol.Application,
      },
      content,
      contentLenght,
    })
  }

  public publishHttp({
    senderId,
    senderAddress,
    content
  }: PublishParams) {
    const contentLenght = 1

    this.messages.push({
      id: nanoid(13),
      origin: {
        senderId,
        senderAddress,
        transferProtocol: TransferProtocol.HTTP
      },
      content,
      contentLenght,
    })
  }

  public publishHttps({
    senderId,
    senderAddress,
    content
  }: PublishParams) {
    const contentLenght = 1

    this.messages.push({
      id: nanoid(13),
      origin: {
        senderId,
        senderAddress,
        transferProtocol: TransferProtocol.HTTPS
      },
      content,
      contentLenght,
    })
  }
}

export default InMemoProducer
