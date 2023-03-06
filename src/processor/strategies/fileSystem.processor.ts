import { accessSync, mkdirSync } from "fs"
import { writeFile } from "fs/promises"

import { Message } from "Types"

import Processor from "../processor"

class FSProcessorError extends Error {}


class FileSystemProcessor implements Processor {
  private filesPath: string
  constructor() {
    this.filesPath = process.env.FILES_PATH || "./files"
    try {
      accessSync(this.filesPath)
    } catch (_) {
      mkdirSync(this.filesPath)
    }
  }

  public async process(message: Message) {
    console.log("FS | processing =>", message)
    const { content } = message

    if (!content["fileName"])
      throw new FSProcessorError("Missing fileName on message content")
    if (!content["fileContent"])
      throw new FSProcessorError("Missing fileContent on message content")

    const fileName = "./files/" + content["fileName"]
      + (content["uniqueFileName"] ? `.${message.id}` : "")
      + (content["fileExtension"] ? `.${content["fileExtension"]}` : "")

    const flag = (() => {
      switch (true) {
        case content["appendFile"]: return "a"
        case content["replaceFile"]: return "w"
        default: return "wx"
    }})()
    
    await writeFile(fileName, content["fileContent"], { flag })
    
    return fileName
  }
}

export default FileSystemProcessor
