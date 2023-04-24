import { BaseEmail } from "../../models/email.model";
import { Emailer } from "../../abstractions/emailer.abstract";

import SendGridMail from '@sendgrid/mail';

export default class SendGridEmailer implements Emailer {
    name:string = "SendGrid";
    email!: BaseEmail;

    async SendEmail(): Promise<object> {
        SendGridMail.setApiKey(process.env.SENDGRID_API_KEY as string)

        try {
            const response = await SendGridMail.send(this.email);

            const message = {message: `Email Sent Successfully at ${new Date().toUTCString()}.`, code: 202, response: response};
            
            console.log(message); //server logs
            return message;
        } catch (error) {
            const message = {message: `Email Sending Failed at ${new Date().toUTCString()}.`, code: 400, error: error};

            console.log(message); //server logs
            return message;
        }
    }
}