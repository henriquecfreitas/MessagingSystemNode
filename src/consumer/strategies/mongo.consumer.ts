import { Message, ProcessResponse } from "Types"

import BaseConsumer from "../baseConsumer"

class MongoConsumer extends BaseConsumer {
  public retireveNextMessage() : undefined {
    throw new Error('Method not implemented.')
  }

  public archiveMessage(_: Message, __: ProcessResponse) {
    throw new Error('Method not implemented.')
  }

  public rejectMessage(_: Message, __: unknown) {
    throw new Error('Method not implemented.')
  }
}

export default MongoConsumer
