import { ConsumerProcessor } from "../consumer"

class MongoConsumer implements ConsumerProcessor {
  public retireveNextMessage(): undefined {
    throw new Error('Method not implemented.')
  }
}

export default MongoConsumer
