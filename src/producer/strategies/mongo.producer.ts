import Producer from "../producer";

class MongoProducer implements Producer {
  public publish() {
    throw new Error("Method not implemented.")
  }

  public publishHttp() {
    throw new Error("Method not implemented.")
  }
}

export default MongoProducer
