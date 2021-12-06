import { ViewBundle } from './modules/viewbundle.js';
import { DiceController } from './modules/dicecontroller.js';

let dc = new DiceController();
let v = new ViewBundle(dc);
