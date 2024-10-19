import {refreshConfig} from "./config"
import {resetMenu} from '../components/menu/logic'
/*
  Setting event listeners on resize / orientation change
  Updating the config accordingly
*/
export function start() {
  window.addEventListener("resize", resizeThrottler, false)
  window.addEventListener("orientationchange", resizeThrottler, false)
  // saving the initial config to do some checks later on

  let resizeTimeout
  function resizeThrottler() {
    // getting the initial width from the set config
    let initWidth = window.config.width

    // ignore resize events as long as an
    // actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null
        let resizedWidth = refreshConfig().width

        // checking if the resize needs to trigger
        // some CSS / animation changes based on the menu's @media query
        if (initWidth >= 1200 && resizedWidth < 1200)  {
          // going from big to smol
          resetMenu(true)
          initWidth = resizedWidth
        }
        if(initWidth < 1200 && resizedWidth >= 1200) {
          // going from smol to big
          resetMenu(false)
          initWidth = resizedWidth
        }
      }, 66) // the function will execute at a rate of 15fps
    }
  }
}
