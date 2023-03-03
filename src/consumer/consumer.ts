import { Message } from "Types"
import { BaseProcessor } from "Processor"
import { Manager } from "Manager"

abstract class Consumer {
  public abstract retireveNextMessage(): Message | undefined
  public abstract archiveMessage(message: Message): void
  public abstract rejectMessage (message: Message): void
  public abstract destroy(): void
}

export abstract class BaseConsumer implements Consumer {
  public abstract retireveNextMessage(): Message | undefined
  public abstract archiveMessage(message: Message): void
  public abstract rejectMessage (message: Message): void

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

  private consumeMessage() {
    const message = this.retireveNextMessage()
    if (message) {
      console.log("consuming =>", message)

      try {
        BaseProcessor.sharedInstance.process(message)
        this.archiveMessage(message)
      } catch (_) {
        this.rejectMessage(message)
      }
    }

    Manager.sharedInstance.print()
    Manager.sharedInstance.printArchive()
    Manager.sharedInstance.printDeadLetter()
  }
}

export default Consumer
