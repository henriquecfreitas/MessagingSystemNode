import { Manager } from "Manager"
import { Message } from "Types"

export abstract class ConsumerProcessor {
  abstract retireveNextMessage: () => Message | undefined
}

class Consumer {
  private processTickInterval: NodeJS.Timeout

  constructor(processor: ConsumerProcessor) {
    this.processTickInterval = setInterval(() => {
      const message = processor.retireveNextMessage()
      if (message) {
        console.log("consumed =>", message)
      }
      Manager.sharedInstance.print()
    }, Number(process.env.CONSUMER_PROCESS_TICK))
  }

  public destroy() {
    clearInterval(this.processTickInterval)
  }
}

export default Consumer
