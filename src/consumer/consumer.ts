import { Message } from "Types"

abstract class Consumer {
  public abstract retireveNextMessage(): Message | undefined
  public abstract archiveMessage(message: Message): void
  public abstract rejectMessage(message: Message, error: unknown): void
  public abstract destroy(): void
}

export default Consumer
