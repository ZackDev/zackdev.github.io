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
        // create HTML-Elements containing:
        // - container for the selected image
        // - the selected image
        // - preview container, holding smaller preview versions of the images in the album
        let mainImageContainer = document.createElement("div");
        mainImageContainer.id = "album-main-image-container";
        let mainImage = document.createElement("img");
        mainImage.id = "album-main-image";
        mainImage.addEventListener("load", () => {
            // set height style to trigger transformation
            let height = this.mainImage.height;
            this.mainImageContainer.style.height = `${height}px`;
        });
        mainImageContainer.append(mainImage);
        let imagesPreviewContainer = document.createElement("div");
        imagesPreviewContainer.id = "album-preview-container";
        this.root.append(mainImageContainer);
        this.root.append(imagesPreviewContainer);
        this.mainImageContainer = mainImageContainer;
        this.mainImage = mainImage;
        this.imagesPreviewContainer = imagesPreviewContainer;
    }

    addImage(url) {
        // add the image url to the album and create a preview element for it
        // preselects the first image added to the album
        let index = this.images.push(url) -1;
        let previewImage = document.createElement("img");
        previewImage.classList.add("album-preview-image");
        previewImage.id = `album-preview-image-${index}`;
        previewImage.src = url;
        previewImage.addEventListener("click", () => {
            this.changeSelectedImageByIndex(index);
        });
        this.imagesPreviewContainer.append(previewImage);
        if (this.images.length === 1) {
            this.changeSelectedImageByIndex(0);
        }
    }

    changeSelectedImageByIndex(i) {
        // - highlights the selected preview image
        // - de-highlights the previously preview image
        // - changes the src attribute of the fully displayed image
        if (this.selectedImageIndex !== undefined) {
            // removed "selected" image class from previoulsy selected image
            let pI = document.getElementById(`album-preview-image-${this.selectedImageIndex}`);
            pI.classList.add("album-preview-image");
            pI.classList.remove("album-preview-selected-image");
        }
        this.selectedImageIndex = i;
        let s = document.getElementById(`album-preview-image-${i}`);
        s.classList.add("album-preview-selected-image");
        s.classList.remove("album-preview-image");
        s.removeEventListener("click", this.changeSelectedImageByIndex);

        this.mainImage.src = this.images[this.selectedImageIndex];
    }
}