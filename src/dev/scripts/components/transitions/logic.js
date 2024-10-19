import {screenSlideOut, screenSlideIn, positionHash} from './animations'


export function start() {
  /*
    We want to load the CSS and scripts based on the namespaces on transition
    **ONLY IF** they were not previously loaded

    How to achieve that one?
    > Check if the relevant resource already is in the <head> using its class
      - yes? no need to include it again
      - no? include it for the first time

    For more informations, check ./php/includes/assets.php
  */

  /*
    Hiding the current/previous container
    (called by default for all the transitions)
  */
  barba.hooks.leave(({ current, next, trigger }) => {
    // custom event to close everything when leaving the page :)
    dispatchEvent(new Event('pageLeave'))

    return new Promise(resolve => {
      screenSlideIn(current.container).then(() => {
        resolve()
      })
    })
  })

  /*
    Loading the relevant resources (CSS/JS) based on the next namespace
    (called by default for all the transitions)
  */
  barba.hooks.enter(({ current, next, trigger }) => {
    return new Promise(resolve => {
      // this introduces some weird behavior when going back, but it's still
      // better than starting in the middle of articles :)
      window.scrollTo(0, 0);
      loadRessources(next.namespace)
      resolve()
    })
  })

  barba.init({
    // setting debug to true fixes a bug on page timeout (yes)
    // see: https://github.com/barbajs/barba/issues/475
    debug:true,
    timeout: 4000, // doubling the timeout for slow networks :)
    transitions: [
      {
        name: 'default',

        leave(data) {
          // needed for barba to work, but left empty as everything is already
          // set up as global hooks by default
        },

        after({ current, next, trigger }) {
          return new Promise(resolve => {
            // dispatching the event before the end of the slide
            // so the page specific animations are not delayed too much
            dispatchEvent(new Event('pageLoad'))

            screenSlideOut(next.container).then(() => {
              resolve()
              positionHash(next.url.hash)
            })
          })
        },
      }, // base transition
    ],
  })
}


/*
  Helper calling the revelant functions to add some script or style
*/
function loadRessources(namespace) {
  if(js_assets[namespace]) {
    addScript(namespace)
  }

  if(css_assets[namespace]) {
    addStyle(namespace)
  }
}


function addStyle(name) {
  let className = 'css-' + name
  if(!document.getElementsByClassName(className)[0]) {
    let link = document.createElement('link')
    link.href = css_assets[name]
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.classList.add(className)
    document.head.appendChild(link)
  }
}


function addScript(name) {
  let className = 'js-' + name
  if(!document.getElementsByClassName(className)[0]) {
    let script = document.createElement("script")
    // Add script content
    script.src = js_assets[name]
    script.classList.add(className)
    document.head.appendChild(script)
  }
}

