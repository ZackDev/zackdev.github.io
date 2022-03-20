import { BucketView } from './views/bucketview.js';
import { DiceTypeSetView} from './views/dicetypesetview.js';
import { DiceTypesView } from './views/dicetypesview.js';
import { NewDiceTypeView } from './views/newdicetypeview.js';
import { TableView } from './views/tableview.js';

class ViewBundle {
    constructor(controller) {
        new DiceTypeSetView(controller);
        new DiceTypesView(controller);
        new BucketView(controller);
        controller.tableView = new TableView(controller);
        controller.newDiceTypeView = new NewDiceTypeView(controller);
        controller.onViewInit();
    }
}

export { ViewBundle };