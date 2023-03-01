import { nanoid } from 'nanoid'

import { Message, TransferProtocol } from "Types"
import Producer, { PublishParams } from "../producer"

class InMemoProducer implements Producer {
  private messages: Message[]
  constructor(messages: Message[]) {
    this.messages = messages
  }

  public publish({
    senderId,
    content
  }: PublishParams): void {
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
  }: PublishParams): void {
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
  }: PublishParams): void {
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
