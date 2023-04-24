import { BaseEmail } from "../../models/email.model";
import { Emailer } from "../../abstractions/emailer.abstract";

import nodeMailer from "nodemailer";

export default class NodeMailerEmailer implements Emailer {
    name: string = "NodeMailer";
    email!: BaseEmail;

    async SendEmail(OnSuccess: Function, OnFail: Function): Promise<object> {
        const mailConfig = {
            service: "Gmail", 
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
            return OnFail(error, this.email);
        } 
    }
}