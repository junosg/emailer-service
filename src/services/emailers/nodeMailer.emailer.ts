import { BaseEmail } from "../../models/email.model";
import { Emailer } from "../../abstractions/emailer.abstract";

import nodeMailer from "nodemailer";

export default class NodeMailerEmailer implements Emailer {
    name: string = "NodeMailer";
    email!: BaseEmail;

    async SendEmail(): Promise<object> {
        const mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_EMAIL,
                pass: process.env.ETHEREAL_PASS
            }
        };

        const transporter = nodeMailer.createTransport(mailConfig);

        try {
            const response = await transporter.sendMail(this.email);

            const message = {message: `Email Sent Successfully at ${new Date().toUTCString()}.`, code: 202, response: response};
            
            console.log(message);
            return message;
        } catch (error) {
            const message = {message: `Email Sending Failed at ${new Date().toUTCString()}.`, code: 400, error: error};

            console.log(message);
            return message;
        } 
    }
}