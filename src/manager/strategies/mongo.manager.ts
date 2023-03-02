import { MongoProducerStrategy, Producer } from "Producer"
import Manager from "../manager"
import { Consumer, MongoConsumerProcessorStrategy } from "Consumer"

class MongoManager implements Manager {
  public producer: Producer
  public consumers: Consumer[]

  constructor() {
    this.producer = new MongoProducerStrategy()
    const consumerProcessor = new MongoConsumerProcessorStrategy()
    this.consumers = [new Consumer(consumerProcessor)]
  }

  public clear() {
    throw new Error('Method not implemented.')
  }
  public print() {
    throw new Error('Method not implemented.')
  }
  public printConfig() {
    throw new Error('Method not implemented.')
  }
}

export default MongoManager
