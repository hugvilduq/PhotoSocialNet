"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { photoRenderer } from "/js/renderers/photos.js";


const galleryRenderer = {
    asCardGallery: function(photos){
        let html = `<div class="row"></div>`;
        let gallery = parseHTML(html);

        for(let photo of photos){
            let card = photoRenderer.asCard(photo);
            gallery.appendChild(card);
        }

        return gallery;
    }

};

export { galleryRenderer }