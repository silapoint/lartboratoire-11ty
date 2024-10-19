/*
  Making a text appear at the bottom of a parent element
  notes:
    this parent element will be set to position:relative; so beware
    the text appears at the *bottom*
  returns a new timeline if used as a parameter, else undefined
*/
export function textAppear(parent, text, delay = 0, timeline = undefined) {
  let duration = 400
  /* First thing: a11y */
  if(window.config.prefersReducedMotion) {
    duration = 0
  }

  let tl = timeline

  if(!timeline) {
    tl = anime.timeline({
      easing: 'easeInOutCirc',
    })
  }

  parent.style.position = 'relative'
  let p = document.createElement('p')
  p.innerHTML = text
  p.classList.add('popup-info-text')
  parent.appendChild(p)

  tl.add({
    targets: p,
    opacity: [0, 1],
    translateY: ['100%', '120%'],
    duration: duration
  }, '+='+delay )

  tl.add({
    targets: p,
    opacity: [1, 0],
    translateY: ['120%', '100%'],
    duration: duration
  }, '+=1000') // hiding the text 1 second after its appearance

  tl.finished.then(()=>{
    // do not forget the remove the p tag
    parent.removeChild(p)
  })

  return tl
}
