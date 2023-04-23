import { BaseEmail } from "../models/email.model";
import { Emailer } from "../abstractions/emailer.abstract";
import { SendGridEmailer } from "./emailers/sendGrid.emailer";

export default class EmailerService {
    activeEmailer!: Emailer;
    emailers: object = {
        SG: new SendGridEmailer
    }

    constructor (){
        this.activeEmailer = new SendGridEmailer;
    }

    SetEmailer(emailerCode: string): object {
        console.log(emailerCode);

        if (this.emailers.hasOwnProperty(emailerCode)) {
            this.activeEmailer = this.emailers[emailerCode as (keyof typeof this.emailers)];
            console.log(this.activeEmailer);
            return {message: "Emailer changed successfully."};
        } else {
            return {message: "Emailer change unsuccessful. No emailer with that corresponding code."};
        }
    }

    SendEmail(email: BaseEmail ) {
        this.activeEmailer.email = email;
        this.activeEmailer.SendEmail();
    }
}