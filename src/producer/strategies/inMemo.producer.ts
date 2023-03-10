import { Message, TransferProtocol } from "Types"

import Producer, { PublishParams } from "../producer"

class InMemoProducer extends Producer {
  constructor(private messages: Message[]) {
    super()
  }

  public publish({
    processor,
    senderId,
    content
  }: PublishParams) {
    this.messages.push({
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
    this.messages.push({
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

export default InMemoProducer
