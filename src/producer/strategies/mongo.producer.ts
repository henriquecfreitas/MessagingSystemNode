import Producer from "../producer";

class MongoProducer implements Producer {
  public publish(): void {
    throw new Error("Method not implemented.")
  }

  public publishHttp(): void {
    throw new Error("Method not implemented.")
  }

  public publishHttps(): void {
    throw new Error("Method not implemented.")
  }
}

export default MongoProducer
