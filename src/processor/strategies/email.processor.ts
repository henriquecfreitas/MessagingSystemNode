import { Transporter, createTransport } from "nodemailer"

import { Message } from "Types"

import Processor from "../processor"

class EmailProcessorError extends Error {}

class EmailProcessor implements Processor {
  private transporter: Transporter
  constructor() {
    this.transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  }

  public async process(message: Message) {
    console.log("EMAIL | processing =>", message)
    const { content } = message    

    if (!content["recipient"])
      throw new EmailProcessorError("Missing recipient on message content")
    if (!content["sender"])
      throw new EmailProcessorError("Missing sender on message content")
    if (!content["mailContent"])
      throw new EmailProcessorError("Missing mailContent on message content")

    const mailOptions = {
      to: content["recipient"],
      from: content["sender"],
      subject: content["subject"],
      text: content["mailContent"],
    }

    return await this.transporter.sendMail(mailOptions)
  }
}

export default EmailProcessor
