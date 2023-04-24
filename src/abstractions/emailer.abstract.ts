import { BaseEmail } from "../models/email.model";

export abstract class Emailer {
    name: string;
    email: BaseEmail

    constructor(parameter: BaseEmail) {
        this.email = parameter;
    }

    abstract SendEmail(OnSuccess: Function, OnFail: Function): Promise<Record<string, any>>;
}