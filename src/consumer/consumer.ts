import { Message, ProcessResponse } from "Types"

export type NextMessage = Promise<Message|undefined> | Message|undefined

abstract class Consumer {
  public abstract retireveNextMessage(): NextMessage
  public abstract archiveMessage(message: Message, response: ProcessResponse): void
  public abstract rejectMessage(message: Message, error: unknown): void
  public abstract destroy(): void
}

export default Consumer
