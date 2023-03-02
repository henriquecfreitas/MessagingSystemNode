export type PublishParams = {
  senderId: string | number,
  senderAddress?: string,
  content: any,
}

abstract class Producer {
  public abstract publish(params: PublishParams): void
  public abstract publishHttp(params: PublishParams): void
  public abstract publishHttps(params: PublishParams): void
}

export default Producer
