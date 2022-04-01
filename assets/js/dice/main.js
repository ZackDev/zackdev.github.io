import { ViewBundle } from './modules/viewbundle.js';
import { DiceController } from './modules/dicecontroller.js';


try {
    let dc = new DiceController();
    let appendTo = document.getElementById("main-content") || document.body;
    let vb = new ViewBundle(dc, appendTo);
}
catch(e) {
    console.log(e);
}
