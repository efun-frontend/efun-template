import {
    gameCode
} from './efun.js';
import '../less/index.less';
const textFun = (...arg) => {
    let P = document.createElement("p");
    P.innerHTML = arg.join(" ");
    // P.classList = "module-test";
    document.getElementById('root').appendChild(P);
}
textFun(gameCode);