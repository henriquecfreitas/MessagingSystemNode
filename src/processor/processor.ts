import { Message, ProcessResponse } from "Types"

abstract class Processor {
  public abstract process(message: Message): Promise<ProcessResponse> | ProcessResponse
}

export default Processor
