import { BaseEmail } from "../../models/email.model";
import Emailer from "../../abstractions/emailer.abstract";

import nodeMailer from "nodemailer";

export default class NodeMailerEmailer implements Emailer {
    name: string = "nodeMailer";
    email!: BaseEmail;

    async SendEmail(OnSuccess: Function, OnFail: Function): Promise<Record<string, any>> {
        const mailConfig = {
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            requireTLS: true,
            logger: true,
            debug: true,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        };

        const transporter = nodeMailer.createTransport(mailConfig);

        try {
            const response = await transporter.sendMail(this.email);

            return OnSuccess(response);
        } catch (error) {
            error.email = this.email;

            throw OnFail(error, this.email);
        } 
    }
}