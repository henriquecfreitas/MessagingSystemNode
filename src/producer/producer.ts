import { ProcessorKind } from "Types"

export type PublishParams = {
  processor: ProcessorKind,
  senderId: string | number,
  senderAddress?: string,
  content: Object,
}

abstract class Producer {
  public abstract publish(params: PublishParams): void
  public abstract publishHttp(params: PublishParams): void
  public abstract publishHttps(params: PublishParams): void
}

export default Producer
