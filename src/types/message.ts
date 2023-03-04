import ProcessorKind from "./processorKind"
import TransferProtocol from "./transferProtocol"

type Message = {
  id: string,
  processor: ProcessorKind,
  origin: {
    senderId: string | number,
    senderAddress?: string,
    transferProtocol: TransferProtocol,
  },
  content: Object,
}

export default Message
