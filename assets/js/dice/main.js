import { ViewBundle } from './modules/viewbundle.js';
import { DiceController } from './modules/dicecontroller.js';


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

