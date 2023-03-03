import Message from "./message"

type RejectedMessage = Message & {
  error: unknown,
}

export default RejectedMessage
