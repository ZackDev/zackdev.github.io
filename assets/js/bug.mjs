import { Album } from '/assets/js/album.mjs';
import { checkHTTPResponse, Init } from '/assets/js/main.mjs';

const initBug = () => {
    let imgUrls = ['/assets/img/bug-01.jpg', '/assets/img/bug-02.jpg'];
    let a = new Album('album-container');
    imgUrls.forEach(i => a.addImage(i));
}

new Init(initBug);