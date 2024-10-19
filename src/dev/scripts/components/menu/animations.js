import {showIcon} from '../../toolkit/animations/showIcon'
import {hideIcon} from '../../toolkit/animations/hideIcon'


/*
  Basic animation (opacity out / in) for the menu's button
  (visible on mobile devices)
*/
export function swapMenuButton(button, newContent) {
  if(window.config.isMobile) {
    let duration = 300
    /* First thing: a11y */
    if(window.config.prefersReducedMotion) {
      duration = 0
    }

    let tl = anime.timeline({
      easing: 'easeInOutCirc'
    });

    tl.add({
      targets: button,
      opacity: [1, 0],
      duration: duration,
      complete: (a) => {
        button.innerHTML = newContent
      },
    })

    tl.add({
      targets: button,
      opacity: [0, 1],
      duration: duration,
    })
  } else {
    // no need to animate anything if the button is not visible
    // this is still needed in case the user resizes the window
    button.innerHTML = newContent
  }
}


/*
  Animating the card's opening
  1. sliding it from the right
  2. showing the text (title or title+sub title) with unique translate/opacity
  3. svg shenannigans
*/
export function openCard(card) {
  let duration = 300
  /* First thing: a11y */
  if(window.config.prefersReducedMotion) {
    duration = 0
  }

  let tl = anime.timeline({
    easing: 'easeInOutCirc'
  });

  tl.add({
    targets: card,
    translateX: ['100%', '0%'],
    duration: duration,
  })

  tl = showTextBlocks(tl, card, duration, duration)

  tl = showIcon(tl, card.querySelectorAll('.svg-cross path'), duration, duration)
}


/*
  Animating the card's closing
  1. SVG shenannigans
  2. hiding the text (title or title+sub title) with global translate/opacity
  3. sliding the card to the right
*/
export function closeCard(card) {
  let duration = 300
  /* First thing: a11y */
  if(window.config.prefersReducedMotion) {
    duration = 0
  }

  let tl = anime.timeline({
    easing: 'easeInOutCirc'
  });

  tl = hideIcon(tl, card.querySelectorAll('.svg-cross path'), duration, 0)

  tl = hideTextBlocks(tl, card, duration, duration)

  tl.add({
    targets: card,
    translateX: ['0%', '100%'],
    duration: duration,
    delay: 100,
  })

  tl.finished.then(()=> {
    resetCSSMain(card)
  })
}


/*
  Updating an already opened card
  1. hiding the previous text (title or title+sub title) with translate/opacity
  2. showing the new one over it

  play with the background :)
*/
export function updateCard(previousCard, nextCard) {
  let duration = 300
  /* First thing: a11y */
  if(window.config.prefersReducedMotion) {
    duration = 0
  }

  let tl = anime.timeline({
    easing: 'easeInOutCirc',
  });

  tl = hideTextBlocks(tl, previousCard, duration, 0)

  if(window.config.isMobile) {
    // hiding the previous cross on mobile devices
    // when the animation goes back to the main menu
    tl = hideIcon(tl, previousCard.querySelectorAll('.svg-cross path'), duration, 0)
  }

  sneakySlideIn(nextCard)

  // if the previousCard is a bit scrolled, the previous cross can appear
  // in a weird spot. we can still see it with this solution, but it's smoother
  if(previousCard.scrollTop != 0) {
    tl = hideIcon(tl, previousCard.querySelectorAll('.svg-cross path'), duration, 0)
  }
  // if it's not scrolled, the showIcon animation will cover the previous cross
  tl = showIcon(tl, nextCard.querySelectorAll('.svg-cross path'), duration, 0)

  tl = showTextBlocks(tl, nextCard, duration, duration)

  tl.finished.then(()=> {
    // when everything has been animated, reapplying the previous CSS values
    resetCSSAfterUpdate(previousCard, nextCard)
    resetCSSMain(previousCard)
  });
}


/*
  As the search card does not follow the same pattern as other cards,
  it needs a custom update functions :)

  1. Hiding the text
  2. Changing the previous card's height to match the search one
  3. Revealing the search (opacity)
*/
export function updateToSearchCard(previousCard, searchCard) {
  let duration = 300
  /* First thing: a11y */
  if(window.config.prefersReducedMotion) {
    duration = 0
  }

  let tl = anime.timeline({
    easing: 'easeInOutCirc',
  });

  tl = hideTextBlocks(tl, previousCard, duration, 0)

  if(!window.config.isMobile) {
    // making the previousCard shrink to match the search's height
    previousCard.style.overflow = 'hidden';

    tl.add({
      targets: previousCard,
      height: [previousCard.clientHeight, searchCard.clientHeight],
      duration: duration,
    })
  }

  sneakySlideIn(searchCard)

  tl.add({
    targets: searchCard,
    opacity: [0, 1],
    duration: duration
  })

  if(window.config.isMobile) {
    // showing the cross icon so the animation mimics the updateCard one
    tl = showIcon(tl, searchCard.querySelectorAll('.svg-cross path'), duration, duration)
  } else {
    // forcing the icon to appear to avoid some weird ass glitch
    tl = showIcon(tl, searchCard.querySelectorAll('.svg-cross path'), 0, 0)
  }

  tl.finished.then(()=> {
    // when everything has been animated, reapplying the previous CSS values
    resetCSSAfterUpdate(previousCard, searchCard)
    resetCSSMain(previousCard)
  })
}


/*
  Reverse of updateToSearchCard for the same reasons

  1. Hiding the form (opacity)
  2. Matching height from search to new card
  3. Showing new card's text
*/
export function updateFromSearchCard(searchCard, nextCard) {
  let duration = 300
  /* First thing: a11y */
  if(window.config.prefersReducedMotion) {
    duration = 0
  }

  let tl = anime.timeline({
    easing: 'easeInOutCirc',
  });

  // hidding the form (not the SVG cross)
  let searchFrom = document.getElementById('menu-search-form')
  tl.add({
    targets: searchFrom,
    opacity: [1, 0],
    duration: duration
  })

  if(!window.config.isMobile) {
    // making the searchCard grow to match the nextCard's height
    tl.add({
      targets: searchCard,
      height: [searchCard.clientHeight, nextCard.clientHeight],
      duration: duration,
    })

    // forcing the cross the appear
    tl = showIcon(tl, searchCard.querySelectorAll('.svg-cross path'), duration, 0)
  } else {
    // hiding the cross to mimic the other cards' animation
    tl = hideIcon(tl, searchCard.querySelectorAll('.svg-cross path'), duration, 0)
  }

  sneakySlideIn(nextCard)

  tl = showTextBlocks(tl, nextCard, duration, duration)

  tl.finished.then(()=> {
    // when everything has been animated, reapplying the previous CSS values
    resetCSSAfterUpdate(searchCard, nextCard)
    searchFrom.style.opacity = 1
  })
}


/*
  Helper function used to reveal text blocks inside a card

  timeline: the animeJS timeline object
  card: the card in which text blocks are
  duration: the anime's length for both blocks
  offset: at which time to start the animations

  returns: the updated timeline
*/
function showTextBlocks(timeline, card, duration, offset) {
  // creating arrays from HTMLCollections and selecting the first 5 elements
  // this helps saving time on the animation when there are a lot of items
  let items = [...card.getElementsByClassName('item')].slice(0, 5)
  let descriptions = card.getElementsByClassName('menu-card-description-text')

  timeline.add({
    targets: items,
    opacity: [0, 1],
    translateY: [10, 0],
    duration: duration,
    delay: anime.stagger(150),
  }, offset)

  timeline.add({
    targets: descriptions,
    opacity: [0, 1],
    duration: duration,
  }, offset)

  return timeline
}


/*
  Helper function used to hide text blocks inside a card
  Contrary to showTextBlocks, this one works with the whole ul tag to go faster
  It's also better for the rest of the animations process. Less glitchy.

  timeline: the animeJS timeline object
  card: the card in which text blocks are
  duration: the anime's length for both blocks
  offset: at which time to start the animations

  returns: the updated timeline
*/
function hideTextBlocks(timeline, card, duration, offset) {
  timeline.add({
    targets:  card.querySelector('ul'),
    opacity: [1, 0],
    translateY: [0, 10],
    duration: duration,
  }, offset)

  timeline.add({
    targets: card.getElementsByClassName('menu-card-description-text'),
    opacity: [1, 0],
    duration: duration,
  }, offset)

  return timeline
}


/*
  Helper function sliding a card in view without the viewer noticing
  (that's good old background magic)
*/
function sneakySlideIn(card) {
  // updating the card's style to match the animation process
  // the background of the previous card is still there so it's OK
  card.style.background = 'none'
  // else the duplicated shadow looks weird
  card.style.boxShadow = 'none'
  // to be sure the new card actually goes over the previous one
  card.style.zIndex = '1000'

  card.style.transform = 'translateX(0%)'
}


/*
  Helper function resetting various CSS values after a card update
*/
function resetCSSAfterUpdate(previousCard, nextCard) {
  nextCard.style.boxShadow = '-4px 4px 4px rgba(0, 0, 0, 0.25)'
  nextCard.style.background = '#1f1f1f'
  previousCard.style.transform = 'translateX(100%)'
  nextCard.style.zIndex = 999
  previousCard.style.height = ''
  previousCard.style.overflow = ''
}

/*
*/
function resetCSSMain(card) {
  let ul = card.querySelector('ul')
  ul.style.opacity = 1
  ul.style.transform = 'translateY(0px)'

  // do not forget to reset the scroll too for later updates
  card.scrollTop = 0
}
