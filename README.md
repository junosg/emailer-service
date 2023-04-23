# emailer-service
A service for sending an email after a set amount of time.

# API Routes
Name | Route | Description | Payload
| :---: | :---: | :---: | :---:
SendDelayedEmail | /emailer/delayedEmail | Request that starts an event that sends an email after a delay. | 
`{
  to: string (email), 
  subject: string, 
  text: string,
  html:string,
  delay: number
 }`
StopDelayedEmail  | /emailer/stopDelayedEmail | Request that stops an event that sends an email after a delay. | 
`{
  to: string (email)
 }`
