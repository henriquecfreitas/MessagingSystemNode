import { Message, ProcessorKind } from "Types"

import Processor from "./processor"

import {
  EmailProcessor,
  FileSystemProcessor,
  GraphQLProcessor,
  PushNotificationProcessor,
  RestProcessor,
} from "./strategies"

class BaseProcessor implements Processor {
  private emailProcessor = new EmailProcessor()
  private fsProcessor = new FileSystemProcessor()
  private gqlProcessor = new GraphQLProcessor()
  private pushNtfProcessor = new PushNotificationProcessor()
  private restProcessor = new RestProcessor()

  public async process(message: Message) {
    switch (message.processor) {
      case ProcessorKind.Email:
        return this.emailProcessor.process(message)
      case ProcessorKind.FileSystem:
        return this.fsProcessor.process(message)
      case ProcessorKind.GraphQL:
        return this.gqlProcessor.process(message)
      case ProcessorKind.PushNotification:
        return this.pushNtfProcessor.process(message)
      case ProcessorKind.Rest:
        return this.restProcessor.process(message)
      default:
        throw new Error("Invalid processor")
    }
  }
}

export default BaseProcessor
