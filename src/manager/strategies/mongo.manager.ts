import { MongoProducerStrategy, Producer } from "Producer"
import { MongoConsumerStrategy, Consumer } from "Consumer"

import Manager from "../manager"

class MongoManager implements Manager {
  public producer: Producer
  public consumers: Consumer[]

  constructor() {
    this.producer = new MongoProducerStrategy()
    this.consumers = [new MongoConsumerStrategy()]
  }

  public clear() {
    throw new Error('Method not implemented.')
  }
  public print() {
    throw new Error('Method not implemented.')
  }
  public printArchive() {
    throw new Error('Method not implemented.')
  }
  public printDeadLetter() {
    throw new Error('Method not implemented.')
  }
  public printConfig() {
    throw new Error('Method not implemented.')
  }
}

export default MongoManager
