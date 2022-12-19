import { DiceController } from './modules/dicecontroller.mjs';
import { Init } from '/assets/js/main.mjs';
import { ViewBundle } from './modules/viewbundle.mjs';

new Init(
    () => {
        try {
            let dc = new DiceController();
            let appendToID = "dice-ui-wrap";
            let vb = new ViewBundle(dc, appendToID);
        }
        catch (e) {
            console.log(e);
        }
    }
);
