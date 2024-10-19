import {showIcon} from '../../toolkit/animations/showIcon'
import {hideIcon} from '../../toolkit/animations/hideIcon'


export function start() {
  let cardsWithIcons = document.getElementsByClassName('card-with-icon')
  for(let card of cardsWithIcons) {
    card.addEventListener('mouseenter', interactIcon)
  }
}

function interactIcon(e) {
  let duration = 600
  /* First thing: a11y */
  if(window.config.prefersReducedMotion) {
    duration = 0
  }
  let tl = anime.timeline({
    easing: 'easeInOutCirc',
  });

  let paths = e.target.firstElementChild.getElementsByClassName('svg-anim')
  tl = hideIcon(tl, paths, duration, 0)
  tl = showIcon(tl, paths, duration, duration)
}
