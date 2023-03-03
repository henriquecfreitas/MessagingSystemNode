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
  static sharedInstance = new BaseProcessor()

  private emailProcessor = new EmailProcessor()
  private fsProcessor = new FileSystemProcessor()
  private gqlProcessor = new GraphQLProcessor()
  private pushNtfProcessor = new PushNotificationProcessor()
  private restProcessor = new RestProcessor()

  public process(message: Message) {
    switch (message.processor) {
      case ProcessorKind.Email:
        this.emailProcessor.process(message)
        break
      case ProcessorKind.FileSystem:
        this.fsProcessor.process(message)
        break
      case ProcessorKind.GraphQL:
        this.gqlProcessor.process(message)
        break
      case ProcessorKind.PushNotification:
        this.pushNtfProcessor.process(message)
        break
      case ProcessorKind.Rest:
        this.restProcessor.process(message)
        break
      default:
        throw new Error("Invalid processor")
    }
  }
}

export default BaseProcessor
