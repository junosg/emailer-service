import express from "express";
import EmailerService from "../services/emailer.service";
import { BaseEmail } from "../models/email.model";
import EmailerEvent from "../bases/emailerEvent.base";

const emailerService = new EmailerService;
const emailerEvent = new EmailerEvent;

export default class EmailerController {
    SendDelayedEmail(request: Record<string, any>) {
        const defaultDelay = 600000;
        const email: BaseEmail = request as BaseEmail;
        email.from = process.env.SENDER_EMAIL as string;
    
        emailerEvent.eventName = `Abandon(${request.to})`;
        emailerEvent.Handle(() => {
            emailerService.SendEmail(email);
        }, request.delay||defaultDelay);
    
        emailerEvent.Start();
    }

    StopDelayedEmail(request: Record<string, any>) {
        emailerEvent.eventName = `Abandon(${request.email})`;
        emailerEvent.Suspend(() => { console.log(`${emailerEvent.eventName} Stopped.`) });   
    }
}