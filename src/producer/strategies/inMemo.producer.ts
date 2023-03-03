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
    const contentLenght = 1

    this.messages.push({
      id: nanoid(13),
      processor,
      origin: {
        senderId,
        transferProtocol: TransferProtocol.Application,
      },
      content,
      contentLenght,
    })
  }

  public publishHttp({
    processor,
    senderId,
    senderAddress,
    content
  }: PublishParams) {
    const contentLenght = 1

    this.messages.push({
      id: nanoid(13),
      processor,
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
    processor,
    senderId,
    senderAddress,
    content
  }: PublishParams) {
    const contentLenght = 1

    this.messages.push({
      id: nanoid(13),
      processor,
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
