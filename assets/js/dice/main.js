import { DiceController } from './modules/dicecontroller.js';
import { Init } from '/assets/js/main.js';
import { ViewBundle } from './modules/viewbundle.js';


new Init(
    () => {
        try {
            let dc = new DiceController();
            let appendToID = "main-content";
            let vb = new ViewBundle(dc, appendToID);
        }
        catch(e) {
            console.log(e);
        }
    }
);

