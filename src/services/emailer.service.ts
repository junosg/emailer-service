import { BaseEmail } from "../models/email.model";
import { Emailer } from "../abstractions/emailer.abstract";
import SendGridEmailer from "./emailers/sendGrid.emailer";
import MailgunEmailer from "./emailers/mailGun.emailer";
import NodeMailerEmailer from "./emailers/nodeMailer.emailer";

export default class EmailerService {
    activeEmailer!: Emailer;
    emailers: object = {
        SG: new SendGridEmailer,
        MG: new MailgunEmailer,
        NM: new NodeMailerEmailer
    }

    constructor (){
        this.activeEmailer = new NodeMailerEmailer;
    }

    SetEmailer(emailerCode: string): object {
        if (this.emailers.hasOwnProperty(emailerCode)) {
            this.activeEmailer = this.emailers[emailerCode as (keyof typeof this.emailers)];

            return {message: "Emailer changed successfully.", emailer: this.activeEmailer.name};
        } else {
            return {message: "Emailer change unsuccessful. No emailer with that corresponding code.", emailer: this.activeEmailer.name};
        }
    }

    SendEmail(email: BaseEmail) {
        this.activeEmailer.email = email;
        this.activeEmailer.SendEmail();
    }
}