export { Album }

class Album {
    constructor(attachTo) {
        if (attachTo !== undefined) {
            // append to the div identified by "attachTo"
            this.root = document.getElementById(attachTo);
            if (this.root === null) {
                console.log(`HTMLElement: "${attachTo}" not found.`);
            }
        } else {
            // create and append "album-container" div to document.body
            let albumContainer = document.createElement("div");
            albumContainer.id = "album-container";
            this.root = albumContainer;
            document.body.append(this.root);
        }

        // array holding the album's images' urls
        this.images = [];

        // for storing the index of the selected image
        this.selectedImageIndex = undefined;

        // create HTML-Elements:
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
        this.root.append(mainImageContainer);
        this.root.append(imagesPreviewContainer);

        // set references
        this.mainImageContainer = mainImageContainer;
        this.mainImage = mainImage;
        this.imagesPreviewContainer = imagesPreviewContainer;


    }

    addImage(url) {
        // add the image url to the images array
        let index = this.images.push(url) -1;
        
        // create a preview element
        let previewImage = document.createElement("img");
        previewImage.classList.add("album-preview-image");
        previewImage.id = `album-preview-image-${index}`;
        previewImage.src = url;
        previewImage.style.opacity = "0";
        previewImage.addEventListener("click", () => {
            this.changeSelectedImageByIndex(index);
        });
        previewImage.addEventListener("load", () => {
            // triggers the 'fade-in' animation for the preview image
            previewImage.style.opacity = "1";
        });

        // add it to the preview container
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
}