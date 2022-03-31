import { ViewBundle } from './modules/viewbundle.js';
import { DiceController } from './modules/dicecontroller.js';


try {
    let dc = new DiceController();
    let vb = new ViewBundle(dc);
}
catch(e) {
    console.log(e);
}
