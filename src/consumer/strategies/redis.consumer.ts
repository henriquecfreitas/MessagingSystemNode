import { RedisClientType } from "redis"

import { Message, ProcessResponse } from "Types"

import BaseConsumer from "../baseConsumer"

class RedisConsumer extends BaseConsumer {
  constructor(private client: RedisClientType) {
    super()
  }

  public async retireveNextMessage () {
    const message = await this.client.rPop("messages")
    return message ? JSON.parse(message) : undefined
  }

  public async archiveMessage(message: Message, response: ProcessResponse) {
    await this.client.rPush("archive", JSON.stringify({
      response,
      ...message
    })
  )}

  public async rejectMessage(message: Message, error: unknown) {
    await this.client.rPush("deadLetter", JSON.stringify({
      error,
      ...message,
    })
  )}
}

export default RedisConsumer
