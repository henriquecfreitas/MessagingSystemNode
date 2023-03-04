import { Message, ProcessResponse } from "Types"

abstract class Consumer {
  public abstract retireveNextMessage(): Message | undefined
  public abstract archiveMessage(message: Message, response: ProcessResponse): void
  public abstract rejectMessage(message: Message, error: unknown): void
  public abstract destroy(): void
}

export default Consumer
