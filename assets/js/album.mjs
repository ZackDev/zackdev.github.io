import { ViewPort } from '/assets/js/viewport.mjs';

export { Album };

class Album {
    constructor(attachTo) {
        this.root = new ViewPort(attachTo);
        // array holding the album's images' urls
        this.images = [];
        this.imagesLoaded = 0;
        // for storing the index of the selected image
        this.selectedImageIndex = undefined;

        // create HTML-Elements:
        // - the container holding the album's stats
        let albumStatsContainer = document.createElement("div");
        albumStatsContainer.id = "album-stats-container";
        albumStatsContainer.classList.add("flex-row");
        albumStatsContainer.style.justifyContent = "space-around";

        let albumStats = document.createElement("div");
        albumStats.id = "album-stats";

        albumStatsContainer.append(albumStats);

        // - the container for the selected image
        let mainImageContainer = document.createElement("div");
        mainImageContainer.id = "album-main-image-container";
        
        // triggers the 'fade-in' animation of the main image
        mainImageContainer.addEventListener("transitionend", (event) => {
            if (event.propertyName === "opacity") {
                let opacity = Number(this.mainImageContainer.style.opacity);
                if (opacity === 0) {
                    this.mainImageContainer.style.opacity = "1";
                }
            }
        });

        // - the selected image
        let mainImage = document.createElement("img");
        mainImage.id = "album-main-image";
        mainImage.addEventListener("load", () => {
            // set height style of it's container to trigger transformation
            let height = this.mainImage.height;
            this.mainImageContainer.style.height = `${height}px`;
        });
        mainImageContainer.append(mainImage);

        // - the preview container, holding smaller preview versions of the images in the album
        let imagesPreviewContainer = document.createElement("div");
        imagesPreviewContainer.id = "album-preview-container";

        // add them to the DOM
        this.root.append(albumStatsContainer);
        this.root.append(mainImageContainer);
        this.root.append(imagesPreviewContainer);

        // set references
        this.albumStatsContainer = albumStatsContainer;
        this.albumStats = albumStats;
        this.mainImageContainer = mainImageContainer;
        this.mainImage = mainImage;
        this.imagesPreviewContainer = imagesPreviewContainer;


    }

    addImage(url) {
        // add the image url to the images array
        const index = this.images.push(url) -1;
        this.updateAlbumStats();
        
        // create a preview element
        const previewImage = document.createElement("img");
        previewImage.classList.add("album-preview-image");
        previewImage.id = `album-preview-image-${index}`;
        previewImage.src = url;
        previewImage.decode()
            .then(() => {
                this.imagesLoaded += 1;
                this.updateAlbumStats();
                previewImage.style.opacity = "0";
                this.imagesPreviewContainer.append(previewImage);
                // triggers the 'fade-in' animation for the preview image
                previewImage.style.opacity = "1";
                previewImage.addEventListener("click", () => {
                    this.changeSelectedImageByIndex(index);
                });
            });
    }

    changeSelectedImageByIndex(i) {
        // de-highlight the previously selected preview image
        if (this.selectedImageIndex !== undefined) {
            let pI = document.getElementById(`album-preview-image-${this.selectedImageIndex}`);
            if (pI !== null) {
                pI.classList.add("album-preview-image");
                pI.classList.remove("album-preview-selected-image");
            }
        }

        // highlight the selected preview image
        let s = document.getElementById(`album-preview-image-${i}`);
        if (s !== null) {
            s.classList.add("album-preview-selected-image");
            s.classList.remove("album-preview-image");
        }

        // changes the main-image src property between the opacity transition:
        // 0 -> 1 (change src) -> 0
        // the old image fades out, the new fades in
        this.mainImageContainer.addEventListener("transitionend", (event) => {
            if (event.propertyName === "opacity" && event.target.id === "album-main-image-container") {
                let opacity = this.mainImageContainer.style.opacity;
                if (opacity === "1") {
                    this.mainImage.src = this.images[i];
                }
            }
        });

        // - trigger 'fade-out' animation
        // - update the selected image index
        this.mainImageContainer.style.opacity = "0";
        this.selectedImageIndex = i;
    }

    updateAlbumStats() {
        this.albumStats.innerText = `${this.imagesLoaded} images out of ${this.images.length} loaded.`;
    }
}
