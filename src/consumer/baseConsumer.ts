import { Message, ProcessResponse } from "Types"
import { BaseProcessor } from "Processor"
import { Manager } from "Manager"

import Consumer from "./consumer"

abstract class BaseConsumer implements Consumer {
  public abstract retireveNextMessage(): Message | undefined
  public abstract archiveMessage(message: Message, response: ProcessResponse): void
  public abstract rejectMessage(message: Message, error: unknown): void

  private consumeTickInterval: NodeJS.Timeout
  constructor() {
    this.consumeTickInterval = setInterval(
      this.consumeMessage.bind(this),
      Number(process.env.CONSUMER_PROCESS_TICK),
    )
  }

  public destroy() {
    clearInterval(this.consumeTickInterval)
  }

  private async consumeMessage() {
    const message = this.retireveNextMessage()
    if (message) {
      console.log("consuming =>", message)

      try {
        const response = await BaseProcessor.sharedInstance.process(message)
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
