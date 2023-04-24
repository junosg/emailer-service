import { BaseEmail } from "../models/email.model";
import { Emailer } from "../abstractions/emailer.abstract";
import SendGridEmailer from "./emailers/sendGrid.emailer";
import NodeMailerEmailer from "./emailers/nodeMailer.emailer";
import { response } from "express";
import { error } from "console";

export default class EmailerService {
    emailers: Record<string, Emailer> = {
        sendGrid: new SendGridEmailer,
        nodeMailer: new NodeMailerEmailer
    };
    activeEmailer!: Emailer;
    failCount: number;
    maxFailCount: number;

    constructor (){
        this.activeEmailer = this.emailers.sendGrid as Emailer;
        this.failCount = 0;
        this.maxFailCount = 3;
    }

    OnSuccess(response: any): Record<string, any> {
        const message = {message: `Email Sent Successfully at ${new Date().toUTCString()}.`, code: 202, response: response};

        console.log(message); //server logs
        return message;
    }

    OnFail(error: any, email: BaseEmail): Record<string, any> {
        const message = {message: `Email Sending Failed at ${new Date().toUTCString()}.`, code: error.code??400, error: error, email: email};

        console.error(message); //server logs
        return message;
    }

    SendEmail(email: BaseEmail) {
        this.activeEmailer.email = email;

        this.activeEmailer.SendEmail(this.OnSuccess, this.OnFail)
        .then((response: Record<string, any>) => {
            this.failCount = 0;
        })
        .catch((error: Record<string, any>) => {
            if (this.failCount <= this.maxFailCount) {
                this.failCount++;
                this.activeEmailer = this.emailers.nodeMailer; //Switch to NodeMailer on fail
                this.SendEmail(error.email);
            }
        });
    }
}