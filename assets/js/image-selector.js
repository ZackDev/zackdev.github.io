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
        // - the selected image
        // - preview container, holding smaller preview versions of the images in the album
        let mainImage = document.createElement("img");
        let imagesPreviewContainer = document.createElement("div");
        imagesPreviewContainer.id = "album-preview-container";
        this.root.append(mainImage);
        this.root.append(imagesPreviewContainer);
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