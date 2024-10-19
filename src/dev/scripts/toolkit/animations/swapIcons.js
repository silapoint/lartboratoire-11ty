import {hideIcon} from './hideIcon'
import {showIcon} from './showIcon'

/*
  Morphing the base icon into a another one
  returns a new timeline if used as a parameter, else undefined
*/
export function swapIcons(prev, next, timeline = undefined) {
  let duration = 300
  /* First thing: a11y */
  if(window.config.prefersReducedMotion) {
    duration = 0
  }

  let tl = timeline

  if(!timeline) {
    tl = anime.timeline({
      easing: 'easeInOutCirc'
    })
  }

  tl.add({
    targets: prev,
    opacity: [1, 0],
    duration: duration*1.5
  })

  tl = hideIcon(tl, prev, duration, 0)

  tl.add({
    targets: next,
    opacity: [0, 1],
    duration: duration
  })

  tl = showIcon(tl, next, duration, duration+100)

  return tl
}
