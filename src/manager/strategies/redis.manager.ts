import { createClient, RedisClientType } from "redis"

import { Consumer, RedisConsumerStrategy } from "Consumer"
import {
  RedisProducerStrategy,
  UninitializedProducer,
  Producer
} from "Producer"

import Manager from "../manager"

class InMemoManager implements Manager {
  public readonly producer: Producer = new UninitializedProducer()
  public readonly consumers: Consumer[] = []
  
  private client: RedisClientType
  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL
    })

    this.client.connect().then(() => {
      console.log("Redis client connected...")

      const _producer = new RedisProducerStrategy(this.client)
      this.producer.publish = _producer.publish.bind(_producer)
      this.producer.publishHttp = _producer.publishHttp.bind(_producer)

      this.consumers.push(new RedisConsumerStrategy(this.client))
    }, console.error)
  }

  public clear() {
    this.client.flushAll()
  }

  public async print() {
    console.log("Current stack =>", await this.client.lRange("messages", 0, -1))
  }

  public async printArchive() {
    console.log("Current archive =>", await this.client.lRange("archive", 0, -1))
  }

  public async printDeadLetter() {
    console.log("Current deadLetter =>", await this.client.lRange("deadLetter", 0, -1))
  }

  public printConfig() {
    throw new Error('Method not implemented.')
  }
}

export default InMemoManager
