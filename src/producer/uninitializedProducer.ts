import Producer, { PublishParams } from "./producer"

class UninitializedProducer extends Producer {
  public publish(_: PublishParams): void {
    throw new Error("Producer not initialized yet.")
  }
  public publishHttp(_: PublishParams, transferProtocol: any): void {
    throw new Error("Producer not initialized yet.")
  }
}

export default UninitializedProducer
