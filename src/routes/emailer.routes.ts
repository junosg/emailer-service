import express from "express";
import EmailerService from "../services/emailer.service";
import { BaseEmail, defaultEmail } from "../models/email.model";
import EventEmitter from "events";
import EmailerEvent from "../bases/emailerEvent.base";

export const emailerRoutes = express.Router();
const emailerService = new EmailerService;
const emailerEvent = new EmailerEvent;

emailerRoutes.post('/delayedEmail/', async function(req, res, next) {
    emailerEvent.eventName = `Abandon(${req.body.email.to})`;
    const email: BaseEmail = req.body.email;
    email.from = process.env.SENDER_EMAIL as string;

    emailerEvent.handle(() => {
        emailerService.activeEmailer.email = email;
        emailerService.activeEmailer.SendEmail();
    }, req.body.delay);

    emailerEvent.start();
});

emailerRoutes.post('/stopDelayedEmail/', async function(req, res, next) {
    emailerEvent.eventName = `Abandon(${req.body.email})`;
    emailerEvent.suspend(() => { console.log(`${emailerEvent.eventName} Stopped.`) });
    res.json({message: "Abandon event stopped."})
});