import { Readable } from "stream"

export default (stream: Readable) =>
  new Promise<void>(resolve => stream.on("end", resolve))
