import { Message } from "Types"

abstract class Processor {
  public abstract process(message: Message): void
}

export default Processor
