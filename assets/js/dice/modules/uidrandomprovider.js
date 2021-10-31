export { UIDRandomProvider };

/**
 * creates random UIDs
 */
 const UIDRandomProvider = {
    // stores generated UIDs
    used: [],
    /**
     * 
     * @returns a random Integer
     */
    getUID() {
        // - creates a random Integer by multiplying Date.now() with Math.random()
        // and rounding the result
        let uid = Math.round(Date.now() * Math.random());
        // - adds the result to the UIDs already taken and returns it
        if (this.used.indexOf(uid) < 0) {
            
            this.used.push(uid);
            return uid;
        }
        // - calls itself again if the result is already in the array of used UIDs
        else {
            return this.getUID();
        }
    }
}