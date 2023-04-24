import { BaseEmail } from "../../models/email.model";
import { Emailer } from "../../abstractions/emailer.abstract";

import Mailgun from "mailgun.js";
import FormData from "form-data";
import { response } from "express";

const mailgun = new Mailgun(FormData);

// Not usable for testing since free tier of Mailgun only allows one receiver email
export default class MailgunEmailer implements Emailer {
    name: string = "Mailgun";
    email!: BaseEmail;

    async SendEmail(): Promise<object> {
        try {
            const mailgunClient = mailgun.client({username: "api", key: process.env.MAILGUN_API_KEY as string});

            const response = await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN as string, this.email);

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