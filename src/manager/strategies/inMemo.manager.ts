import { Message } from "Types"

import { InMemoProducerStrategy, Producer } from "Producer"
import { Consumer, InMemoConsumerProcessorStrategy } from "Consumer"

import Manager from "../manager"

class InMemoManager implements Manager {
  public readonly producer: Producer
  public readonly consumers: Consumer[]

  constructor(private messages: Message[] = []) {
    this.producer = new InMemoProducerStrategy(messages)
    const consumerProcessor = new InMemoConsumerProcessorStrategy(messages)
    this.consumers = [new Consumer(consumerProcessor)]
  }

  public clear() {
    throw new Error('Method not implemented.')
  }

  public print() {
    console.log("Current stack =>", this.messages)
  }

  public printConfig() {
    throw new Error('Method not implemented.')
  }
}

export default InMemoManager
