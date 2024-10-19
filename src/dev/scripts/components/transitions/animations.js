/*
  Function sliding the occulting screen in view
*/
export function screenSlideIn(container) {
  return new Promise(resolve => {
    let duration = 400
    /* First thing: a11y */
    if(window.config.prefersReducedMotion) {
      duration = 0
    }

    let trMain = document.getElementById('tr-main') // tr = 'transition'
    trMain.style.display = 'initial'
    trMain.style.opacity = 1

    anime({
      targets: trMain,
      easing: 'easeInOutCirc',
      translateY: ['100%', '0%'],
      duration: duration,
      complete: () => {
        // removing the smooth scroll so it does not screw up the animations
        // (as it's smoothed, the content is still 'traveling' accross then
        // the screen after the end of the animations :/)
        let html = document.getElementsByTagName("html")[0]
        html.classList.remove('smooth-scroll')
        document.body.scrollTop = 0 // Safari
        document.documentElement.scrollTop = 0 // Chrome, Firefox, IE, Opera
        html.classList.add('smooth-scroll')

        resolve()
      }
    })
  })
}

/*
  Function slide the occulting screen out of view
*/
export function screenSlideOut(container) {
  return new Promise(resolve => {

    let duration = 500
    /* First thing: a11y */
    if(window.config.prefersReducedMotion) {
      duration = 0
    }

    let tl = anime.timeline({
      easing: 'easeInOutCirc'
    })

    let trMain = document.getElementById('tr-main')
    tl.add({
      targets: trMain,
      translateY: ['0%', '-100%'],
      duration: duration,
      complete: () => {
        trMain.style.display = 'none'
        resolve()
      },
    })
  })
}


export function positionHash(hash) {
  // if the clicked URL contains an anchor of some kind, we gotta scroll to that
  // specific point after the various animations :)
  // #UX yay
  if(hash) {
    let hashElem = document.getElementById(hash)
    if(hashElem) {
      let html = document.getElementsByTagName("html")[0]
      html.classList.remove('smooth-scroll')
      // we could use the following solution:
      // location.href = '#'
      // location.href = '#' + hash
      // It's based on that: https://stackoverflow.com/questions/5007530/how-do-i-scroll-to-an-element-using-javascript
      // BUT it triggers a bug in Chrome for some unknown reason :)))
      // 'RangeError: Maximum call stack size exceeded'
      // I mean, it works. But that does not sound really safe to me.
      // So instead we'll use this less supported alternative
      // (96% on CanIUse still):
      document.getElementById(hash).scrollIntoView()

      html.classList.add('smooth-scroll')
    }
  }
}
