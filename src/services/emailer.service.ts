import { BaseEmail } from "../models/email.model";
import Emailer from "../abstractions/emailer.abstract";
import SendGridEmailer from "./emailers/sendGrid.emailer";
import NodeMailerEmailer from "./emailers/nodeMailer.emailer";

export default class EmailerService {
    emailers: Record<string, Emailer> = {
        sendGrid: new SendGridEmailer,
        nodeMailer: new NodeMailerEmailer
    };
    defaultEmailer!: Emailer;

    constructor (){
        this.defaultEmailer = this.emailers.sendGrid;
    }

    SendEmail(email: BaseEmail) {
        var activeEmailer = this.defaultEmailer;

        this.Handler(activeEmailer, email);
    }

    Handler(activeEmailer: Emailer, email: BaseEmail, maxTries: number = 3, tryCount: number = 0) {
        var maxTries = maxTries;
        var tryCount = tryCount;

        activeEmailer.email = email;

        activeEmailer.SendEmail(this.OnSuccess, this.OnFail)
        .then((response: Record<string, any>) => {
            console.log(response); //server logs
        })
        .catch((error: Record<string, any>) => {
            console.error(error); //server logs
            tryCount++;

            if (tryCount < maxTries) {
                var newEmailerName = Object.keys(this.emailers).filter((key) => key != activeEmailer.name)[0];
                activeEmailer = this.emailers[newEmailerName];
    
                this.Handler(activeEmailer, email, maxTries, tryCount);
            }
        });
    }

    OnSuccess(response: any): Record<string, any> {
        const message = {message: `Email Sent Successfully at ${new Date().toUTCString()}.`, code: 202, response: response};

        return message;
    }

    OnFail(error: any): Record<string, any> {
        const message = {message: `Email Sending Failed at ${new Date().toUTCString()}.`, code: error.code??400, error: error, email: error.email};

        return message;
    }
}