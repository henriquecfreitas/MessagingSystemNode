import { Message, ProcessResponse } from "Types"
import { BaseProcessor, Processor } from "Processor"
import { Manager } from "Manager"

import Consumer, { NextMessage } from "./consumer"

abstract class BaseConsumer implements Consumer {
  public abstract retireveNextMessage(): NextMessage
  public abstract archiveMessage(message: Message, response: ProcessResponse): void
  public abstract rejectMessage(message: Message, error: unknown): void

  private processor: Processor
  private consumeTickInterval: NodeJS.Timeout
  constructor() {
    this.processor = new BaseProcessor()
    this.consumeTickInterval = setInterval(
      this.consumeMessage.bind(this),
      Number(process.env.CONSUMER_PROCESS_TICK),
    )
  }

  public destroy() {
    clearInterval(this.consumeTickInterval)
  }

  private async consumeMessage() {
    const message = await this.retireveNextMessage()
    if (message) {
      console.log("consuming =>", message)

      try {
        const response = await this.processor.process(message)
        this.archiveMessage(message, response)
      } catch (error) {
        this.rejectMessage(message, error)
      }
    }

    Manager.sharedInstance.print()
    Manager.sharedInstance.printArchive()
    Manager.sharedInstance.printDeadLetter()
  }
}

export default BaseConsumer
