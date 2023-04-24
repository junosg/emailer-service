import { BaseEmail } from "../../models/email.model";
import { Emailer } from "../../abstractions/emailer.abstract";

import SendGridMail from '@sendgrid/mail';

export default class SendGridEmailer implements Emailer {
    name:string = "SendGrid";
    email!: BaseEmail;

    async SendEmail(OnSuccess: Function, OnFail: Function): Promise<object> {
        SendGridMail.setApiKey(process.env.SENDGRID_API_KEY as string)

        try {
            const response = await SendGridMail.send(this.email);

            return OnSuccess(response);
        } catch (error) {
            return OnFail(error, this.email);
        }
    }
}