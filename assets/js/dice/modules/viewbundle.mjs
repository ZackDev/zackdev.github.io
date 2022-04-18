import { BucketView } from './views/bucketview.mjs';
import { DiceTypeSetView } from './views/dicetypesetview.mjs';
import { DiceTypesView } from './views/dicetypesview.mjs';
import { SettingsView } from './views/settingsview.mjs';
import { TableView } from './views/tableview.mjs';
import { NewDiceTypeView } from './views/newdicetypeview.mjs';

export { ViewBundle };

class ViewBundle {
    /**
     * 
     * @param {DiceController} controller 
     * @param {String} attachToID the ID of the HTMLElement to attach to
     */
    constructor(controller, attachToID) {
        try {
            new SettingsView(controller, attachToID);
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