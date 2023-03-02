import { Message } from "Types"
import { BaseConsumer } from "../consumer"

class MongoConsumer extends BaseConsumer {
  public retireveNextMessage() : undefined {
    throw new Error('Method not implemented.')
  }

  public archiveMessage (_: Message) {
    throw new Error('Method not implemented.')
  }

  public rejectMessage (_: Message) {
    throw new Error('Method not implemented.')
  }
}

export default MongoConsumer
