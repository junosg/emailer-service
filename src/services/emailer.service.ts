import { BaseEmail } from "../models/email.model";
import { Emailer } from "../abstractions/emailer.abstract";
import SendGridEmailer from "./emailers/sendGrid.emailer";
import NodeMailerEmailer from "./emailers/nodeMailer.emailer";
import { response } from "express";

export default class EmailerService {
    activeEmailer!: Emailer;
    emailers: Record<string, Emailer> = {
        sendGrid: new SendGridEmailer,
        nodeMailer: new NodeMailerEmailer
    };
    failCount: number;
    maxFailCount: number;

    constructor (){
        this.activeEmailer = this.emailers.sendGrid as Emailer;
        this.failCount = 0;
        this.maxFailCount = 3;
    }

    OnSuccess(response: any): object {
        const message = {message: `Email Sent Successfully at ${new Date().toUTCString()}.`, code: 202, response: response};

        console.log(message); //server logs
        return message;
    }

    OnFail(error: any, email: BaseEmail): object {
        const message = {message: `Email Sending Failed at ${new Date().toUTCString()}.`, code: error.code??400, error: error, email: email};

        console.error(message); //server logs
        return message;
    }

    SendEmail(email: BaseEmail) {
        this.activeEmailer.email = email;
        this.activeEmailer.SendEmail(this.OnSuccess, this.OnFail).then((response: Record<string, any>) => {
            if (response.code == 401 && this.failCount <= this.maxFailCount) {
                this.failCount++;
                this.activeEmailer = this.emailers.nodeMailer; //Switch to NodeMailer on fail
                this.SendEmail(response.email);
            } else {
                this.failCount = 0;
            }
        });
    }
}