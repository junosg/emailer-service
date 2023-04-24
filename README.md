# emailer-service
A service for sending an email after a set amount of time (in milliseconds). This service currently uses **SendGrid API** to send emails as its default but switches to **Nodemailer API** once the max number of request per day is reach. The free **SendGrid API** has a max request of 100 per day while the free **Nodemailer API** has 500. The email used to send emails is **dummytesteruser3@gmail.com**. Another working implementation that uses the **SendGrid API** is on standby.

# Dependencies
* Express (https://expressjs.com/)
* Nodejs (https://nodejs.org/en)
* Typescript (https://www.typescriptlang.org/)
* SendGrid (https://sendgrid.com/)
* Libraries: dotenv, cors, helmet, nodemailer

# API Routes
Name | Route | Description | Payload
| :---: | :---: | :---: | :---:
SendDelayedEmail | /emailer/delayedEmail | Request that starts an event that sends an email after a delay. | `{ to: string (email), subject: string, text: string, html: string, delay: number }`
StopDelayedEmail  | /emailer/stopDelayedEmail | Request that stops an event that sends an email after a delay. | `{ to: string (email) }`

# Project Setup
1. Install the dependencies.
```
npm install
```
2. Create a **SendGrid Account** and get an API key.
3. Set **SENDGRID_API_KEY** environment variable value to received **SendGrid API** key.
4. Set a sender email on your **SendGrid Account**.
5. Set **SENDER_EMAIL** environment variable value to the set sender email on your **SendGrid Account**.
6. Login to Sender **Gmail** account, and get an app specific pass for **Nodemailer**.
7. Set **NODEMAILER_PASS** environment variable value to the previously gotten app specific pass.

### Compiles and hot-reloads for development
```
npm run dev
```
