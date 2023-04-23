import { BaseEmail } from "../../models/email.model";
import { Emailer } from "../../abstractions/emailer.abstract";

const SendGridMail = require('@sendgrid/mail');

export default class SendGridEmailer implements Emailer {
    email!: BaseEmail;

    async SendEmail(): Promise<object> {
        SendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

        try {
            await SendGridMail.send(this.email)
            .then((response: any) => {
                console.log({message: "Email Sent Successfully.", code: 202, response: response});
            });

            return {message: "Email Sent Successfully.", code: 202};
        } catch (error) {
            console.log({error: error});
            return {message: "Email Sending Failed.", code: 400};
        }
    }
}