/*
  Helper function refreshing the configuration's values
  Called during resize operations
*/
export function refreshConfig() {
  let config = {}

  config.width = document.body.clientWidth || document.documentElement.offsetWidth || window.innerWidth
  config.windowHeight = window.innerHeight || document.body.clientHeight || document.documentElement.offsetHeight
  // keeping it there, but not used for now.
  //config.height = config.windowHeight - convertRemToPixels(3)
  config.scrollHeight = document.body.scrollHeight
  config.isMobile = (config.width < 1200) // Menu's breakpoint
  config.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /*
    using the window object to pass global variables outside the core JS file
    for example, this enables animations called from single.min.js to use
    this configuration :)

    yes, this is kinda ugly but it helps to avoid importing this file everywhere
    and maintaining a copy of the config for each route
  */
  window.config = config

  // also returning it
  return config
}

// function convertRemToPixels(rem) {
//   // source:
//   // https://stackoverflow.com/questions/36532307/rem-px-in-javascript
//   return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
// }

export function browserSupport() {
  // note: browser agent detection sucks (https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent)

  // check for the CSS.support API support (https://caniuse.com/#feat=css-supports-api)
  if (window.CSS) {
    /*
      Missing support based on the 4 following safety checks:
      IE (8,10,11),
      Edge (12,13),
      Opera (12.1,33,34),
      Opera Mini (5.0-8.0),
      IE Mobile (10,11),
      UC Browser for Android (9.9)
      Firefox (38,41,42),
      Chrome (46,47),
      Safari (8,9),
      iOS Safari (8.1-8.4,9.0-9.2),
      Android Browser (4.2-4.3,4.4,4.4.3-4.4.4),
      Chrome for Android (47),

      Source: doiuse.herokuapp.com

      note: if a browser doesn't support display:grid, it does not support display:flex either
    */
    if(window.CSS.supports('display', 'grid')
    && window.CSS.supports('grid-template-columns: 60px 1fr 60px')
    && window.CSS.supports('position', 'fixed')
    && window.CSS.supports('height: calc(100vh - 75px)')) {
      if(typeof Promise == "undefined" && Promise.toString().indexOf("[native code]") == -1){
        console.error('[JAVASCRIPT] Promises : NOT supported')
        displayNoSupportMsg()
      }
    } else {
      console.error('[CSS] display:grid, grid-template-X, position:fixed, calc(vh): one or more NOT supported')
      displayNoSupportMsg()
    }
  } else {
    // if the browser does not support the CSS.support API,
    // it sure as hell does not support anything else either.
    displayNoSupportMsg()
  }
}

function displayNoSupportMsg() {
  var msg = document.createElement("div")
  msg.style.padding = "100px 25px 25px 25px"

  var mainTitle = document.createElement("h1")
  mainTitle.innerHTML = "Arrêtez de surfer avec votre tamagochi !"
  msg.appendChild(mainTitle)

  var firstParagraph = document.createElement("p")
  firstParagraph.innerHTML = "Votre navigateur ne supporte pas une ou plusieurs des fonctionnalités nécessaires au bon fonctionnement de ce magnifique et inoubliable site internet."
  msg.appendChild(firstParagraph)

  var secondParagraph = document.createElement("p")
  secondParagraph.innerHTML = "Pour une navigation sans vague, il est conseillé de télécharger la dernière version de <a href=\"https://www.mozilla.org/fr/firefox/new/\" rel=\"noopener\">Firefox</a> ou <a href=\"https://www.google.com/intl/fr/chrome/\" rel=\"noopener\">Chrome</a>."
  msg.appendChild(secondParagraph)

  var thirdParagraph = document.createElement("p")
  thirdParagraph.innerHTML = "Par ailleurs, il est fortement encouragé d'installer les dernières versions des navigateurs pour des raisons de sécurité."
  msg.appendChild(thirdParagraph)

  var fourthParagraph = document.createElement("p")
  fourthParagraph.innerHTML = "Si vous utilisez déjà la dernière version de Firefox ou Chrome, et que vous voyez quand même ce message, merci de bien vouloir insul... contacter l'incompétent développeur responsable via Twitter : <a href=\"https://twitter.com/artboratoire/\">https://twitter.com/artboratoire/</a>."
  msg.appendChild(fourthParagraph)

  document.body.insertBefore(msg, document.getElementById("barba-wrapper"))
  // if the animation has begun, the body may be with overflow:hidden so we need to remove it
  document.body.style.overflow = 'auto'
}
