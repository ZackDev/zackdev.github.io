import { BucketView } from './views/bucketview.js';
import { DiceTypeSetView} from './views/dicetypesetview.js';
import { DiceTypesView } from './views/dicetypesview.js';
import { NewDiceTypeView } from './views/newdicetypeview.js';
import { TableView } from './views/tableview.js';

class ViewBundle {
    constructor(controller, attachTo) {
        try {
            new DiceTypeSetView(controller, attachTo);
            new DiceTypesView(controller, attachTo);
            new BucketView(controller, attachTo);
            new TableView(controller, attachTo);
            new NewDiceTypeView(controller, attachTo);
            controller.onViewInit();
        }
        catch (exception) {
            controller.onViewError(exception);
        }
    }
}

export { ViewBundle };