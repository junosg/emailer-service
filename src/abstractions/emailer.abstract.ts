import { BaseEmail } from "../models/email.model";

export abstract class Emailer {
    email: BaseEmail

    constructor(parameter: BaseEmail) {
        this.email = parameter;
    }

    abstract SendEmail(): void;
}