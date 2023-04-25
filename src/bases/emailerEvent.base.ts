import EventEmitter from "events";
const eventEmitter = new EventEmitter;

export default class EmailerEvent {
    eventName!: string;

    Handle(handleCallback: Function, delay: number = 0) {
        eventEmitter.on(this.eventName, async () => {

            await new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, delay);
            });

            if (eventEmitter.listenerCount(this.eventName) > 0) {
                handleCallback();
            } else {
                console.log("Event Propagation suspended.")
            }
        });
    };

    Start(startCallback: Function|null = null) {
        eventEmitter.emit(this.eventName);
        if (startCallback) startCallback();
    }

    Suspend(suspendCallback: Function|null = null) {
        eventEmitter.removeAllListeners(this.eventName);
        if (suspendCallback) suspendCallback();
    }
}