# emailer-service
A service for sending an email after a set amount of time (in milliseconds). This service currently uses **SendGrid API** to send emails but developed with switching or multiple email sender APIs in mind. The email used to send emails is **dummytest3@gmail.com**. To replace this, we have to set or add a new sender email on **SendGrid Dashboard** and update the environment variable **SENDER_EMAIL**.

# Dependencies
* Express (https://expressjs.com/)
* Nodejs (https://nodejs.org/en)
* Typescript (https://www.typescriptlang.org/)
* SendGrid (https://sendgrid.com/)
* Libraries: dotenv, cors, helmet

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

### Compiles and hot-reloads for development
```
npm run dev
```
