import { IMailProvider } from "../../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import { readFileSync } from "fs";
import handlebars from "handlebars";

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

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    const templateFile = readFileSync(path).toString("utf-8");
    const templateParser = handlebars.compile(templateFile);
    const templateStringHtml = templateParser(variables);

    try {
      const message = await this.client?.sendMail({
        to,
        from: "Rentx <noreplay@rentx.com.br>",
        subject,
        text: templateStringHtml,
      });

      console.log("Message sent: %s", message.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    } catch (error) {
      console.log(error);
    }
  }
}
