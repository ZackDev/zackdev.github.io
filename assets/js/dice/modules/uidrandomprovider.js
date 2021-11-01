export { UIDRandomProvider };

/**
 * creates random UIDs
 */
 const UIDRandomProvider = {
    // stores generated UIDs
    used: [],
    
    /**
     * 
     * @returns a pseudo-random Integer
     */
    getUID() {
        let uid = Math.round(Date.now() * Math.random());
        if (this.used.indexOf(uid) < 0) {
            // - adds the result to the UIDs already taken and returns it
            this.used.push(uid);
            return uid;
        }
        else {
            // - calls itself again if the result is already in the array of used UIDs
            // NOTE: might run endlessly
            return this.getUID();
        }
    }
}