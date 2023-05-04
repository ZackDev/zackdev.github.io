import { Album } from '/assets/js/album.mjs';
import { Init } from '/assets/js/main.mjs';

const initBug = () => {
    let imgUrls = ['/assets/img/bug-01.jpg', '/assets/img/bug-02.jpg'];
    new Album('album-container', imgUrls);
}

new Init(initBug);