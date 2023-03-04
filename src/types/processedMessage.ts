import Message from "./message"

export type ProcessResponse = undefined | string

type ProcessedMessage = Message & {
  response: ProcessResponse,
}

export default ProcessedMessage
