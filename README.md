# emailer-service
A service for sending an email after a set amount of time.

# API Routes
Name | Route | Description
| :---: | :---: | :---:
SendDelayedEmail | /emailer/delayedEmail | Request that starts an event that sends an email after a delay.
StopDelayedEmail  | /emailer/stopDelayedEmail | Request that stops an event that sends an email after a delay.
