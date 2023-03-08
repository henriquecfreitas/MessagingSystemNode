import { nanoid } from "nanoid"

import { ProcessorKind, TransferProtocol } from "Types"

export type PublishParams = {
  processor: ProcessorKind,
  senderId: string | number,
  senderAddress?: string,
  content: Object,
}

abstract class Producer {
  public abstract publish(params: PublishParams): void
  public abstract publishHttp(
    params: PublishParams,
    transferProtocol: TransferProtocol.HTTP | TransferProtocol.HTTPS
  ): void

  protected id() {
    return nanoid(13)
  }
}

export default Producer
