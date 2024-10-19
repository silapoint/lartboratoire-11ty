export function start() {
  /*
    Images (<img> and <div> with background images)
  */
  // querySelectorAll is necessary because of the forEach
  let base64 = [].slice.call(document.querySelectorAll('.lazy-base64'))

  // observing the canvases
  let canvas = [].slice.call(document.querySelectorAll('.lazy canvas'))
  lazyLoad(base64, canvas)

  /*
    Embedded content (<video> and <iframe>)
  */
  let embedIcon = [].slice.call(document.querySelectorAll('.lazy-embed .video-icon'))
  observePlaceholders(embedIcon)
}

/* Function enabling lazy load on <img> tags
 * params: an array of DOM objects (the base64 img tags),
 *         an array of DOM Objects (the canvas placeholders)
*/
export function lazyLoad(lazyBase64, lazyPlaceholders) {
  displayBase64(lazyBase64)
  observePlaceholders(lazyPlaceholders)
}

/* Function adding every base64 image to the following canvas element
 * params : an array of DOM elements
*/
function displayBase64(lazyBase64) {
  // can't change this one to for...of somehow?
  lazyBase64.forEach(function(base64) {
    var ctxDOM = base64.nextElementSibling
    var ctx = ctxDOM.getContext('2d')
    var bg = new Image()
    bg.src = base64.src

    bg.onload = function() {
      ctx.drawImage(bg, 0, 0, ctxDOM.width, ctxDOM.height)
    }
  })
}

/* Function setting the intersection observer on the placeholders
 * params: an array of DOM elements
*/
function observePlaceholders(placeholders) {
  // at this point, the intersection_observer_polyfill.js file has already stroke in
  let lazyPlaceholderObserver = new IntersectionObserver(function(entries, observer) {
    for(let entry of entries) {
      if (entry.isIntersecting) {
        let placeholder = entry.target
        loadLazyObj(placeholder)
        lazyPlaceholderObserver.unobserve(placeholder)
      }
    }
  }, {
    // starting the lazy load when 20% of the image is visible
    threshold: 0.2,
  })

  for(let placeholder of placeholders) {
    lazyPlaceholderObserver.observe(placeholder)
  }
}

/* Function helper calling the correct subfunction based on the current context
 * params: a DOM element
*/
function loadLazyObj(placeholder) {
  /* checking what the current lazy loaded content corresponds to
    - <img>
    - <div> with bg
    - <video>
    - <iframe>
  */
  let plHldParentClassList = placeholder.parentElement.classList

  if(plHldParentClassList.contains("lazy-img")) {
    loadImage(placeholder)
  } else if(plHldParentClassList.contains("lazy-div")) {
    loadBackgroundImage(placeholder)
  } else if(plHldParentClassList.contains("lazy-video")) {
    loadVideo(placeholder)
  } else if(plHldParentClassList.contains("lazy-iframe")){
    loadIframe(placeholder)
  }
}

/* Function loading an <img> based on a placeholder
*/
function loadImage(placeholder) {
  let lazyFinal = placeholder.nextElementSibling
  // positionning an event listener on the to be loaded image
  // in the img's case, the placeholder is the lazyObj
  lazyFinal.addEventListener('load', displayLoadedLazyObj(lazyFinal))

  // updating the sizes with the data attribute
  lazyFinal.sizes = lazyFinal.dataset.sizes ? lazyFinal.dataset.sizes : ''

  // adding the source (aka starting the HTTP request)
  // by default, using the srcset so the browser choses the right img
  // if the srcset is empty, going for the data-src fallback
  // this is the case when displaying .gif as they have only one size available
  // in which case, no srcset is set (heh)
  lazyFinal.srcset = lazyFinal.dataset.srcset ? lazyFinal.dataset.srcset : lazyFinal.dataset.src
}

/* Function loading an image as a background based on a placeholder
*/
function loadBackgroundImage(placeholder) {
  let lazyFinal = placeholder.nextElementSibling

  // creating a new Image instance to work with the backgroundImage
  // as there's no native javascript event to detect its loading
  var bg = new Image()
  bg.onload = function(){
    // here we only use the cached image that was just loaded
    lazyFinal.style.backgroundImage = "url("+ lazyFinal.dataset.src +")"
    displayLoadedLazyObj(lazyFinal)

    // forcing garbage collector to look this way
    // so we avoid some theoritical memory leaks
    bg = undefined
  }
  // adding the source (aka starting the HTTP request)
  bg.src = lazyFinal.dataset.src
}

/* Function loading a <video> based on a placeholder
*/
function loadVideo(placeholder) {
  let video = placeholder.nextElementSibling
  let videoSource = video.firstElementChild
  videoSource.src = videoSource.dataset.src
  video.load()
  displayLoadedLazyObj(video)
}

function loadIframe(placeholder) {
  // because there's a random <br> tag between the svg and iframe:
  let iframe = placeholder.nextElementSibling
  iframe.src = iframe.dataset.src
  displayLoadedLazyObj(iframe)
}

/* Anime function called when the image is loaded to handle the animation process
 * params: the placholder (DOM element) = the image or div
*/
function displayLoadedLazyObj(loaded) {
  // this timeout is needed as Chrome somehow screws up the opacity transition
  // (the image immediately pops up w/out the sweet animation)
  window.setTimeout(function() {
    loaded.classList.add("fadein")
  },100)
}
