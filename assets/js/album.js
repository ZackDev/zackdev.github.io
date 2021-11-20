export { Album }

class Album {
    constructor(attachTo) {
        this.selectedImageIndex = undefined;
        this.images = [];
        if (attachTo !== undefined) {
            // append to the div identified by "attachTo"
            this.root = document.getElementById(attachTo);
        } else {
            // append "album-container" div to document.body
            let albumContainer = document.createElement("div");
            albumContainer.id = "album-container";
            this.root = albumContainer;
            document.body.append(this.root);
        }
        // create HTML-Elements:
        // the container for the selected image
        let mainImageContainer = document.createElement("div");
        mainImageContainer.id = "album-main-image-container";

        // the selected image
        let mainImage = document.createElement("img");
        mainImage.id = "album-main-image";
        mainImage.addEventListener("load", () => {
            // set height style of it's container to trigger transformation
            let height = this.mainImage.height;
            this.mainImageContainer.style.height = `${height}px`;
        });
        // the preview container, holding smaller preview versions of the images in the album
        let imagesPreviewContainer = document.createElement("div");
        imagesPreviewContainer.id = "album-preview-container";
        mainImageContainer.append(mainImage);

        // add them to the DOM
        this.root.append(mainImageContainer);
        this.root.append(imagesPreviewContainer);

        // set references
        this.mainImageContainer = mainImageContainer;
        this.mainImage = mainImage;
        this.imagesPreviewContainer = imagesPreviewContainer;

        this.mainImageContainer.addEventListener("transitionend", (event) => {
            if (event.propertyName === "opacity") {
                let opacity = Number(this.mainImageContainer.style.opacity);
                if (opacity === 0) {
                    this.mainImageContainer.style.opacity = "1";
                }
            }
        });
    }

    addImage(url) {
        // add the image url to the album
        let index = this.images.push(url) -1;
        
        // create a preview element for it
        let previewImage = document.createElement("img");
        previewImage.classList.add("album-preview-image");
        previewImage.id = `album-preview-image-${index}`;
        previewImage.src = url;
        previewImage.addEventListener("click", () => {
            this.changeSelectedImageByIndex(index);
        });
        this.imagesPreviewContainer.append(previewImage);
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

        // change the main image
        this.mainImageContainer.style.opacity = "0";
        this.mainImage.src = this.images[i];
        this.selectedImageIndex = i;
    }
}