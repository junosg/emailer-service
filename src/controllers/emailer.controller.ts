import express from "express";
import EmailerService from "../services/emailer.service";
import { BaseEmail } from "../models/email.model";
import EmailerEvent from "../bases/emailerEvent.base";
const emailValidator = require('deep-email-validator');

const emailerService = new EmailerService;
const emailerEvent = new EmailerEvent;

interface SendDelayedEmailRequest {
    to: string,
    subject: string,
    text: string,
    html: string,
    delay: number
}

interface StopDelayedEmailRequest {
    email: string
}

export default class EmailerController {
    SendDelayedEmail(request: SendDelayedEmailRequest) {
        const defaultDelay = 600000;
        const email: BaseEmail = {
            from: process.env.SENDER_EMAIL as string,
            to: request.to,
            subject: request.subject,
            text: request.text,
            html: request.html
        };

        emailerEvent.eventName = `Abandon(${request.to})`;
        emailerEvent.Handle(async () => {
            // const response = await emailValidator.validate(email.to);
            // response.received = email.to;
            // console.log(response);

            // if (response.valid) {
            // emailerService.SendEmail(email);
            // }

            emailerService.SendEmail(email);
        }, request.delay||defaultDelay);
    
        emailerEvent.Start();

        return
    }

    StopDelayedEmail(request: StopDelayedEmailRequest) {
        emailerEvent.eventName = `Abandon(${request.email})`;
        emailerEvent.Suspend(() => { console.log(`${emailerEvent.eventName} Stopped.`) });   
    }
}