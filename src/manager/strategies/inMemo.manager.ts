import { Message } from "Types"

import Manager from "../manager"

class InMemoManager implements Manager {
  private messages: Message[]
  constructor(messages: Message[]) {
    this.messages = messages
  }

  public clear(): void {
    throw new Error('Method not implemented.')
  }
  public print(): void {
    console.log(this.messages)
  }
  public printConfig(): void {
    throw new Error('Method not implemented.')
  }
}

export default InMemoManager
