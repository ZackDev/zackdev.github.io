import { BucketView } from './views/bucketview.js';
import { DiceTypeSetView} from './views/dicetypesetview.js';
import { DiceTypesView } from './views/dicetypesview.js';
import { NewDiceTypeView } from './views/newdicetypeview.js';
import { TableView } from './views/tableview.js';

class ViewBundle {
    constructor(controller) {
        try {
            new DiceTypeSetView(controller);
            new DiceTypesView(controller);
            new BucketView(controller);
            new TableView(controller);
            new NewDiceTypeView(controller);
            controller.onViewInit();
        }
        catch (exception) {
            controller.onViewError(exception);
        }
    }
}

export { ViewBundle };