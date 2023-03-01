import TransferProtocol from "./transferProtocol"

type Message = {
  id: string,
  origin: {
    senderId: string | number,
    senderAddress?: string,
    transferProtocol: TransferProtocol,
  },
  content: any,
  contentLenght: number,
}

export default Message
