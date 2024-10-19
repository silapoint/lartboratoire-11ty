const path = require('node:path');
const fs = require('fs')

const Image = require("@11ty/eleventy-img");

const canvas = {
    base64Pixels: 5, 
    blurRatio: 6,
}
canvas['width'] = canvas.base64Pixels * canvas.blurRatio


function getCanvasHeight(width, height) {
    let canvasHeight = 0 
    if(width > height) {
    // note: the round function is needed as using floating number for
    // height or width attributes on canvas is not W3C compliant
        canvasHeight = Math.round(canvas.width * height / width);
    } else {
        canvasHeight = Math.round(canvas.width * width / height);
    }
    
    return canvasHeight
}


class CstImage {
    constructor({
        page,
        src,
        alt,
        customClass = undefined,
        widths = [5, 400, 800, 1280],
        formats = ['webp'],
        sizes = '100vw',
        withAbsolutePath = false,
        debug = ""
    } = {}) {
        this.src = src 
        this.alt = alt 
        this.page = page
        this.customClass = customClass ? customClass : ""
        this.widths = widths
        this.formats = formats
        this.sizes = sizes
        
        this.fileType = "webp"
        this.isGif = this.src.includes(".gif")
        /* Sometimes, we want images to be addressed relatively to the current URL 
        e.g.: in a post/page, images are saved along the post itself
        On the contrary, we may want to link images absoletly 
        e.g.: on taxonomies pages, images are saved in /assets/img/taxonomies/, 
        and if we try to link them normally, it would result in 
        /tag/my-tag/assets/img/ which would not work.
        Hence, this does NOT influence where the images are saved, but rather 
        if there is a starting slash in url/srcset strings
        */
        this.withAbsolutePath = withAbsolutePath
        this.debug = debug 
    }

    async transformImage() {
        /*
            Takes the URL src of an image and transform it into various required widths / formats 
    
            Sets/updates: metadata (including srcset)
        */ 
        // Prepend the image src with the full directory `inputPath`:
        let imageSrc = `${path.dirname(this.page.inputPath)}/${this.src}` 

        let cstSharpOptions = {}
        if(this.isGif) {
            cstSharpOptions = {
                animated: true,
            }
        }

        this.metadata = await Image(imageSrc, {
            widths: [...this.widths, null],
            formats: [...this.formats, null],
            sharpOptions: cstSharpOptions, 
            // Prepend the correct path to the image `src` value
            urlPath: this.page.url,
            // Write processed images to the correct `outputPath`
            outputDir: path.dirname(this.page.outputPath),
            filenameFormat: function (hash, imageSrc, width, format, options) {
                const { name } = path.parse(imageSrc);
                return `${name}-${width}.${format}`;
            },
        })
        
        this.metadata.smallImage = this.metadata[this.fileType][1]
        // selecting the biggest image possible
        this.metadata.mainImage = this.metadata[this.fileType][this.metadata[this.fileType].length - 1]
        if(this.withAbsolutePath) {
            // note the starting slash
            this.metadata.srcset = this.metadata[this.fileType].map(entry => `/${entry.url} ${entry.width}w`).join(", ");
        } else {
            this.metadata.srcset = this.metadata[this.fileType].map(entry => `${entry.url} ${entry.width}w`).join(", ");
        }
        
        // selecting the first/smallest image in the list (should be 5x5 pixels max)
       
        if(this.page.url.includes("author")) {
            // console.log(this.metadata)
        }
        let placeholderBuffer = fs.readFileSync(this.metadata[this.fileType][0].outputPath);
        this.base64Placeholder = `data:image/jpg;base64,${placeholderBuffer.toString("base64")}`;
        
    }


    async getLazyImageHTML() {
        /*
            Must be called after this.transformImage()
        */
        let paddingPerc = this.metadata.mainImage.height / this.metadata.mainImage.width * 100;
        let dataSizes = '';
        let defaultSizes = '';
        if(this.sizes) {
            defaultSizes = `sizes="${ this.sizes }"`;
            dataSizes = `data-sizes="${ this.sizes }"`;
        } else {
            defaultSizes = 'sizes="100vw"';
            dataSizes = 'data-sizes="100vw"';
        }
        
        // do NOT use a random line return at the start of this string
        // when using the shortcode in markdown, random <p> tags are added to new lines 
        // and the HTML markup crumbles..
        let res = `<div class="lazy lazy-img ${ this.customClass }" style="padding-top: ${ paddingPerc }%;">
            <img
            class="lazy-base64"
            src="${ this.base64Placeholder }"
            alt="Placeholder pour ${ this.alt }"
            aria-hidden="true"
            >
            <canvas
            class="lazy-placeholder"
            width="${ canvas.width }"
            height="${ getCanvasHeight(this.metadata.mainImage.width, this.metadata.mainImage.height) }"
            aria-hidden="true">
            </canvas>
            <img
            class="lazy-final"
            src="data:,"
            data-src="${ this.metadata.mainImage.url }"
            data-srcset="${ this.metadata.srcset }"
            data-sizes="${ this.sizes }"
            alt="${ this.alt }"
            loading="lazy"
            >
            <noscript>
            <img
                src="${ this.metadata.mainImage.url }"
                srcset="${ this.metadata.srcset }"
                sizes="${ this.sizes }"
                alt="${ this.alt }"
            >
            </noscript>
        </div>`
       
        return res 
    }

    async getThumbnailBg() {
        /*
            Must be called after this.transformImage()
        */
        return `<div class="lazy lazy-div item-post-img" aria-hidden="true">
                <img
                    class="lazy-base64"
                    src="${ this.base64Placeholder }"
                    alt="Placeholder pour ${ this.alt }"
                >
                <canvas
                class="attachment-post-thumbnail"
                width="${ canvas.width }"
                height="${ getCanvasHeight(this.metadata.mainImage.width, this.metadata.mainImage.height) }">
                </canvas>
                <div
                    class="attachment-post-thumbnail lazy-final"
                    data-src="${ this.metadata.smallImage.url }"
                ></div>
            </div>`
    }
}


async function relativeImage(
    page,
    src,
    alt,
    sizes
) {
    let img = new CstImage({
        page: page,
        src: src,
        alt: alt,
        sizes: sizes,
    })

    await img.transformImage()
    let res = await img.getLazyImageHTML()

    return res
} 


async function relativeThumbnailBgShortcode (
    page,
    src,
    alt,
  ) {
    // we *need* to use the solo_post.page because it wouldn't work in other pages (such as home, category, etc.)
    let img = new CstImage({
        page: page,
        src: src,
        alt: alt
    })
    
    await img.transformImage()
    return await img.getThumbnailBg()
} 



async function thumbnailShortcode (
    src,
    alt,
    sizes = '(max-width: 800px) 70vw, 58rem'
  ) {
    let img = new CstImage({
        page: this.page,
        src: src,
        alt: alt
    })
    await img.transformImage()

    return `<img width="${ img.metadata.mainImage.width }" height="${ img.metadata.mainImage.height }" src="${ img.metadata.mainImage.url }" class="attachment-medium_large size-medium_large wp-post-image" alt="${ alt }" sizes="${ sizes }" decoding="async" fetchpriority="high" srcset="${ img.metadata.srcset }">
        </img>`
}


async function figureShortcode (
    src,
    alt,
    caption = "", 
    fullScreen = false,
    customClass = "",
  ) {

    let img = new CstImage({
        page: this.page,
        src: src,
        alt: alt,
        customClass: customClass,
    })
    await img.transformImage()
    let imgHTML = await img.getLazyImageHTML()

    let res
    let captionStr = ""
    if(fullScreen) {
        // closing the content's div and opening it again after the full screen image :)
        if(caption != "") {
            captionStr = `<figcaption class="full-screen-figcaption image-caption">${ caption }</figcaption>`
        }
        res = `</div>
            <figure class="content-figure full-screen">
                ${ imgHTML }
                ${captionStr}
            </figure>
            <div class="content">`    
    } else {
        if(caption != "") {
            captionStr = `<figcaption class="image-caption">${ caption }</figcaption>`
        }

        res = `<figure class="content-figure" style="max-width: ${img.metadata.mainImage.width}px">
                ${ imgHTML }
                ${captionStr}
            </figure>`    
    }
    return res 
}


async function getImageTransformed(
    src,
    isAssetImg = false,
    withAbsolutePath = false,
    widths = undefined,
) {
    /* 
        How to use: 
        {% set imageData = home_image | transformImage(true) %}
    */

    // We  clone the this.page objectbecause we later update img.page.X to use the correct paths
    // and if we don't clone, it messes up with the rest of the generation pipeline!!
    let img = new CstImage({
        page: {...this.page}, 
        src: src,
        withAbsolutePath: withAbsolutePath,
        widths: widths ? widths : [5, 400, 800, 1280],
        debug: "getImageTransformed"
    })

    if(isAssetImg) {
        img.page.inputPath = "./src/assets/img/"
        img.page.outputPath = `docs/assets/${path.dirname(src)}/.` // final point is required, else it goes into public/assets
        img.page.url = `assets/${path.dirname(src)}/`
    }
    await img.transformImage()

    return img 
}

module.exports = function(eleventyConfig) {
    eleventyConfig.addAsyncFilter("transformImage", getImageTransformed)
    
    eleventyConfig.addShortcode("Figure", figureShortcode)
    eleventyConfig.addShortcode("Thumbnail", thumbnailShortcode)
    eleventyConfig.addShortcode("RelThumbnailBg", relativeThumbnailBgShortcode)
    eleventyConfig.addShortcode("RelImage", relativeImage)

};
