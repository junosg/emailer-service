export interface BaseEmail {
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string
}

export interface Email extends BaseEmail {
    id: number|string
}

export const defaultEmail: BaseEmail = {
    from: 'testfrom@mailinator.com', 
    to: 'testto@mailinator.com',
    subject: 'Testing',
    text: 'Hello, this is for testing only.',
    html: '<strong>Bye</strong>'
}