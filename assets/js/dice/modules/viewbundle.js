import { BucketView } from './views/bucketview.js';
import { DiceTypeSetView} from './views/dicetypesetview.js';
import { DiceTypesView } from './views/dicetypesview.js';
import { NewDiceTypeView } from './views/newdicetypeview.js';
import { TableView } from './views/tableview.js';

class ViewBundle {
    constructor(controller) {
        controller.diceTypeSetView = new DiceTypeSetView(controller);
        controller.diceTypesView = new DiceTypesView(controller);
        controller.bucketView = new BucketView(controller);
        controller.tableView = new TableView(controller);
        controller.newDiceTypeView = new NewDiceTypeView(controller);
        controller.onViewInit();
    }
}

export { ViewBundle };