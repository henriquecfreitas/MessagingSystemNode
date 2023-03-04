import { Message, ProcessedMessage, RejectedMessage } from "Types"

import { Consumer, InMemoConsumerStrategy } from "Consumer"
import { InMemoProducerStrategy, Producer } from "Producer"

import Manager from "../manager"

class InMemoManager implements Manager {
  public readonly producer: Producer
  public readonly consumers: Consumer[]

  constructor(
    private messages: Message[] = [],
    private archive: ProcessedMessage[] = [],
    private deadLetter: RejectedMessage[] = [],
  ) {
    this.producer = new InMemoProducerStrategy(messages)
    this.consumers = [new InMemoConsumerStrategy(messages, archive, deadLetter)]
  }

  public clear() {
    throw new Error('Method not implemented.')
  }

  public print() {
    console.log("Current stack =>", this.messages)
  }

  public printArchive() {
    console.log("Current archive =>", this.archive)
  }

  public printDeadLetter() {
    console.log("Current deadLetter =>", this.deadLetter)
  }

  public printConfig() {
    throw new Error('Method not implemented.')
  }
}

export default InMemoManager
