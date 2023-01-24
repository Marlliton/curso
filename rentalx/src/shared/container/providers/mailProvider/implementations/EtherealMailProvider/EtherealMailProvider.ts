import { IMailProvider } from "../../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        this.client = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
      })
      .catch(err => console.error(err));
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    try {
      const message = await this.client?.sendMail({
        to,
        from: "Rentx <noreplay@rentx.com.br>",
        subject,
        text: body,
      });

      console.log("Message sent: %s", message.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    } catch (error) {
      console.log(error);
    }
  }
}
