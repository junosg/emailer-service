import express from "express";
import EmailerController from "../controllers/emailer.controller";

export const emailerRoutes = express.Router();
const emailerController = new EmailerController;

emailerRoutes.post('/delayedEmail/', async function(req, res, next) {
    emailerController.SendDelayedEmail(req.body);

    res.json({message: "Abandon event started."})
});

emailerRoutes.post('/stopDelayedEmail/', async function(req, res, next) {
    emailerController.StopDelayedEmail(req.body);

    res.json({message: "Abandon event stopped."})
});
