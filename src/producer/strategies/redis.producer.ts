import { RedisClientType } from "redis"

import { Message, TransferProtocol } from "Types"

import Producer, { PublishParams } from "../producer"

class RedisProducer extends Producer {
  constructor(private client: RedisClientType) {
    super()
  }

  private async pushMessage(message: Message) {
    await this.client.rPush("messages", JSON.stringify(message))
  }

  public publish({
    processor,
    senderId,
    content
  }: PublishParams) {
    this.pushMessage({
      id: this.id(),
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
    this.pushMessage({
      id: this.id(),
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

export default RedisProducer
