const path = require('path')

const ffmpeg = require('fluent-ffmpeg')

const utils = require('./utils')


async function iframeShortcode(
    src,
    height
) {
    let res = `<div class="lazy lazy-embed lazy-iframe embed-wrapper">
        ${ utils.getSvgString("video") }
        <iframe class="embed embed-iframe lazy-final" style="height: ${height}px" data-src="${ src }" allow="fullscreen" allowfullscreen="allowfullscreen"></iframe>
    </div>
    <noscript><iframe class="embed" style="border:0;" src="${ src }" allow="fullscreen"></iframe></noscript>`
    return res 
}


async function videoShortcode(
    src,
    description,
) {
    let videoSrc = `${path.dirname(this.page.inputPath)}/${src}` 

    let filename = `/files/${path.basename(src)}`

    const getVideoMetadata = (videoSrc) => {
        return new Promise((resolve, reject) => {
          ffmpeg.ffprobe(videoSrc, (err, metadata) => {
            if (err) reject(err)
            else resolve(metadata)
          })
        })
      }
  
    const metadata = await getVideoMetadata(videoSrc)
    const { width, height } = metadata.streams[0]
    let paddingPerc =  width / height * 100
    let ext = path.extname(src).replace(".", "")
    let type = `video/${ext}`

    // Side note: the noscript tag needs to wrap the whole <video>
    let res = `<div 
        class="lazy lazy-embed lazy-video embed-wrapper"
        style="padding-top: ${ paddingPerc }%;" >
        ${ utils.getSvgString("video") }
        <video class="lazy-final embed"
            preload="metadata"
            controls="controls"
            style="max-width: ${ width }px"
        >
        <source class="video-source"
            type="${ type }"
            data-src="${ filename }">
        <a href="${ filename }">Accéder directement à la vidéo.</a>
        </video>
        <noscript>
        <video class="embed"
            preload="metadata"
            controls="controls"
            style="max-width: ${ width }px"
        >
            <source class="video-source"
                type="${ type }"
                src="${ filename }">
            <a href="${ filename }">Accéder directement à la vidéo.</a>
        </video>
        </noscript>
    </div>`

    return res 
}

module.exports = function(eleventyConfig) {
    eleventyConfig.addShortcode("Iframe", iframeShortcode)
    eleventyConfig.addShortcode("Video", videoShortcode)
};
