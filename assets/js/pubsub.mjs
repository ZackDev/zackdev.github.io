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
                sub.notify(data);
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
    subscribe(id) {
        dispatcher.register(this, id);
    }
    unsubscribe(id) {
        dispatcher.deregister(this, id);
    }
    notify(data) {
        console.log(data);
    }
}

export const pubsub = {
    Subscriber,
    Publisher,
}
