import { BucketView } from './views/bucketview.js';
import { DiceTypeSetView} from './views/dicetypesetview.js';
import { DiceTypesView } from './views/dicetypesview.js';
import { NewDiceTypeView } from './views/newdicetypeview.js';
import { TableView } from './views/tableview.js';

class ViewBundle {
    /**
     * 
     * @param {DiceController} controller 
     * @param {String} attachToID the ID of the HTMLElement to attach to
     */
    constructor(controller, attachToID) {
        try {
            new DiceTypeSetView(controller, attachToID);
            new DiceTypesView(controller, attachToID);
            new BucketView(controller, attachToID);
            new TableView(controller, attachToID);
            new NewDiceTypeView(controller, attachToID);
            controller.onViewInitSuccess();
        }
        catch (exception) {
            controller.onViewInitError(exception);
        }
    }
}

export { ViewBundle };