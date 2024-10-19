export function revealImage(trHide, breakpoint, delay) {
  if(window.config.width > breakpoint) {
    let duration = 400
    /* First thing: a11y */
    if(window.config.prefersReducedMotion) {
      duration = 0
    }

    trHide.parentNode.style.display = 'initial'

    anime({
      targets: trHide,
      translateY: ['0%', '-100%'],
      easing: 'easeInOutCirc',
      duration: duration,
      delay: delay,
      complete: () => {
        trHide.parentNode.style.display = 'none'
      }
    })
  } else {
    trHide.parentNode.style.display = 'none'
  }
}
