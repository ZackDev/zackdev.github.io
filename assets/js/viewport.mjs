export { ViewPort };

/**
 * class for objects providing the HTML-Element *viewPort*
 */
class ViewPort extends HTMLElement {
    /**
     * check's the DOM readyState and sets *this.viewPort* to either the HTML-Element with the id attribute or document.body.
     * @param {String} id the ID of the designated HTML-Element 
     */
    constructor(id) {
        super();
        if (document.readyState === 'complete') {
            this.HTMLElement = document.getElementById(id) || document.body;
        }
        else {
            let errorStr = `ViewPort: unexpected ready state: ${document.readyState}`;
            throw Error(errorStr);
        }
    }

    append(e) {
        this.HTMLElement.append(e);
    }
    
    requestFullscreen() {
        this.requestFullscreen();
    }

    exitFullscreen() {
        document.exitFullscreen();
    }
}
