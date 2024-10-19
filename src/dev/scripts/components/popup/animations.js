import {showIcon} from '../../toolkit/animations/showIcon'
import {hideIcon} from '../../toolkit/animations/hideIcon'


export function openPopup(wrapper, animateIcon = undefined) {
  let duration = 300
  /* First thing: a11y */
  if(window.config.prefersReducedMotion) {
    duration = 0
  }

  let tl = anime.timeline({
    easing: 'easeInOutCirc'
  });

  wrapper.style.display = 'grid'
  wrapper.style.overflow = 'hidden' // else it glitches on mobile

  tl.add({
    targets: wrapper,
    opacity: [0, 1],
    duration: duration,
  })

  let cardPopUp = wrapper.getElementsByClassName('card-popup')[0]

  if(window.config.width < 800) { // the CSS breakpoint is as 800px
    // completely sliding the card in if it's on mobile
    tl.add({
      targets: cardPopUp,
      translateY: ['100%', '0%'],
      duration: duration,
    }, 0)
  } else {
    tl.add({
      targets: cardPopUp,
      translateY: [5, 0],
      duration: duration,
    }, 0)
  }

  // the cross starts to animate a bit sooner so it does not look too long/weird
  tl = showIcon(tl, wrapper.querySelectorAll('.svg-cross path'), duration, duration/2)

  if(cardPopUp.firstElementChild.tagName == 'svg') {
    tl = showIcon(tl, cardPopUp.getElementsByClassName('path-animate'), duration, duration+100)
  }

  tl.finished.then(()=> {
    // do not forget to put that back on place
    wrapper.style.overflow = 'auto'
  })
}


export function closePopup(wrapper) {
  let duration = 300
  /* First thing: a11y */
  if(window.config.prefersReducedMotion) {
    duration = 0
  }

  let tl = anime.timeline({
    easing: 'easeInOutCirc'
  });

  wrapper.style.overflow = 'hidden'

  tl = hideIcon(tl, wrapper.querySelectorAll('.svg-cross path'), duration, 0)

  if(window.config.width < 800) { // the CSS breakpoint is as 800px
    // completely sliding the card in if it's on mobile
    tl.add({
      targets: wrapper.getElementsByClassName('card-popup'),
      translateY: ['0%', '100%'],
      duration: duration,
    }, duration)
  } else {
    // only sliding a bit if on desktop
    tl.add({
      targets: wrapper.getElementsByClassName('card-popup'),
      translateY: [0, 5],
      duration: duration,
    }, duration)
  }

  tl.add({
    targets: wrapper,
    opacity: [1, 0],
    duration: duration,
  }, duration)

  tl.finished.then(()=> {
    wrapper.style.display = 'none'
  })
}
