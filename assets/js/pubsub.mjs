const dispatcher = {
    connector: new Map(),
    deregister(subscriber, id) {
        console.log();
        if (dispatcher.connector.has(id)) {
            let subscribers = dispatcher.connector.get(id);
            if (subscribers.includes(subscriber)) {
                let i = subscribers.indexOf(subscriber);
                subscribers.splice(i, 1);
            }
        }
    },
    register(subscriber, id) {
        if (dispatcher.connector.has(id)) {
            let subscribers = dispatcher.connector.get(id);
            subscribers.push(subscriber);
        }
        else {
            dispatcher.connector.set(id, [subscriber]);
        }
    },
    dispatch: (id, data) => {
        if (dispatcher.connector.has(id)) {
            let subscribers = dispatcher.connector.get(id);
            for (let sub of subscribers) {
                sub.notify(id, data);
            }
        }
    },
}

class Publisher {
    publish(id, data) {
        dispatcher.dispatch(id, data);
    }
}

class Subscriber {
    constructor() {
        this.idToHook = new Map();
    }
    subscribe(id, hook) {
        this.idToHook.set(id, hook);
        dispatcher.register(this, id);
    }
    unsubscribe(id) {
        this.idToHook.del(id);
        dispatcher.deregister(this, id);
    }
    notify(id, data) {
        let hook = this.idToHook.get(id);
        hook(data);
    }
}

export const pubsub = {
    Subscriber,
    Publisher,
}
