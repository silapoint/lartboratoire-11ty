import {openCard as animOpenCard,
        closeCard as animCloseCard,
        updateCard as animUpdateCard,
        // updateToSearchCard as animUpdateToSearchCard,
        // updateFromSearchCard as animUpdateFromSearchCard,
        swapMenuButton as animSwapMenuButton} from './animations'


/*
  This global object is instanciated after the page load in `core.js`

  Apart from the different ui compenents later used in the relevant functions,
  this object aims to help the manipulation of event listeners with a list
  of handlers for touch events to be removed if needs be

  Note: all the functions that could've been contained inside this object has
  been put outside of it to reduce the code imported with the object in other
  files. Only the starting function remains.
*/
export const MENU = {
  start() {
    // logic properties
    //this.touchEventsHandlers = []

    /*
      declaring UI variables so we don't have to parse the DOM over and over
      again inside the menu's functions
      note: the cards' names are relevant and corresponds to their id in the DOM
    */
    this.ui = {
      'toggleButton': document.getElementById('menu-button'),
      'mainMenuItems': document.getElementById('main-menu').getElementsByClassName('item'),

      'crosses': document.getElementById('nav').getElementsByClassName('svg-cross'),

      'mainMenuCard': document.getElementById('main-menu'),
      'categoriesCard': document.getElementById('categories-card'),
      'themesCard': document.getElementById('themes-card'),
      'informationsCard': document.getElementById('informations-card'),
      // 'searchCard': document.getElementById('search-card'),

      'currentCard': undefined,
    }

    // declaring the menu's states
    this.state = {
      'cardOpen': false,
      'firstOpen': true,
    }

    // everything's ready we can now move on onto the next part:
    // waiting for user's interaction
    this.setListeners()
  }, // start()


  setListeners() {
    this.ui.toggleButton.addEventListener('click', toggleMenu)

    for(let item of this.ui.mainMenuItems) {
      item.addEventListener('click', toggleCard)
    }

    for(let cross of this.ui.crosses) {
      cross.addEventListener('click', closeCard)
    }

    // making sure the menu closes if the user clicks on anything but it
    // note: this needs to be the main and not #top as it changes on page
    // transition (ty Barba)
    document.getElementsByTagName('main')[0].addEventListener('click', closeCard)

    // closing the menu on page transitions
    window.addEventListener('pageLeave', function(e) {
      closeCard()
    })
  }, // setListeners
} /* MENU global object */


/*
  Listener callback used to toggle a menu's card

  Cases:
    - a card is opened, the click is on the same list item: close
    - the click is on a direct link (i.e: participate): close
    - a card is opened, the click is on another item: update the card
    - nothing is opened: open the relevant card
*/
function toggleCard(e) {
    if(MENU.state.cardOpen) {
      let targetId = e.target.id
      let currentId = targetId + '-card'

      if(currentId === MENU.ui.currentCard.id
        || e.target.classList.contains('ignore-click')) {
        // the user has clicked on the same menu's item
        closeCard(e)
      } else {
        // if a card is already opened and if the user has clicked on another
        // menu's item, then, we have to update the card
        updateCard(MENU.ui[targetId + 'Card'])
      }
    } else {
      if(!e.target.classList.contains('ignore-click')) {
        openCard(e)
      }
    }
}


/*
  Listener callback used to toggle the menu main card
  (aka the one seen only on mobile sized devices)
*/
function toggleMenu(e) {
  if(MENU.state.cardOpen) {
    closeCard(e)
  } else {
    openCard(e)
  }
}


/*
  Logic function dealing with the opening of a card

  it is used on the first opening occurence;
  if a card is already opened, the updateCard function is used instead
*/
function openCard(e) {
  if(MENU.state.firstOpen) {
    /* if it's the first time the menu is ever opened, we're removing the
    the display:none; on cards
    */
    MENU.ui.mainMenuCard.style.display = 'grid'
    MENU.ui.categoriesCard.style.display = 'grid'
    MENU.ui.themesCard.style.display = 'grid'
    MENU.ui.informationsCard.style.display = 'grid'
    // MENU.ui.searchCard.style.display = 'grid'

    MENU.state.firstOpen = false
  }

  let target = e.target

  // selecting the correct card in the UI and updating the state accordingly
  if(target.id === 'menu-button') {
    MENU.ui.currentCard = MENU.ui.mainMenuCard
  } else {
    // the list item HTML id corresponds to the JavaScript object name :)
    MENU.ui.currentCard = MENU.ui[target.id + 'Card']
  }

  MENU.state.cardOpen = true
  updateMenuButton(false)

  // animating the card into view
  animOpenCard(MENU.ui.currentCard)

  // updating the default a11y data
  target.setAttribute('aria-expanded', 'true')
}


/*
  Listener callback also used after a toggle
  the event's target can either be the SVG or the main menu's item

  cases:
    - click on the menu's button: close
    - click on a sub menu's cross (can be the svg icon or its path)
      - desktop: close
      - mobile: get back the the main card
*/
function closeCard(e) {
  // when the pageLeave event fires, we gotta make sure the card is not
  // undefined (as it is the first time)
  if(!MENU.ui.currentCard) {
    return
  }

  let currentMenuItem = getCorrespondingMenuItem(MENU.ui.currentCard)
  if(e
    && (e.target.classList.contains('svg-cross')
        || e.target.parentNode.classList.contains('svg-cross'))
    && window.config.isMobile) {
    // going back to the main menu on mobile
    updateCard(MENU.ui.mainMenuCard)

    // updating the a11y data accordingly
    MENU.ui.toggleButton.setAttribute('aria-expanded', 'true')
    currentMenuItem.setAttribute('aria-expanded', 'false')
  } else {
    // animating the card out of view
    animCloseCard(MENU.ui.currentCard)

    // discarding the previous card's state
    MENU.state.cardOpen = false
    MENU.ui.currentCard = undefined

    // updating the a11y data while we have the relevant card
    currentMenuItem.setAttribute('aria-expanded', 'false')

    updateMenuButton(true)
  }
}


/*
  Function used for transitions between two cards, be it main > specific,
  or specific > specific, or specific > main
*/
function updateCard(nextCard) {
  // if(nextCard.id === 'search-card') {
  //   animUpdateToSearchCard(MENU.ui.currentCard, nextCard)
  // } else if(MENU.ui.currentCard.id === 'search-card') {
  //   animUpdateFromSearchCard(MENU.ui.currentCard, nextCard)
  // } else {
    animUpdateCard(MENU.ui.currentCard, nextCard)
  // }

  // updating the a11y data
  if(MENU.ui.currentCard.id === 'main-menu') {
    // on mobile, if the update goes from main menu to a specific card,
    // the aria needs to be updated on the button and not on the currentCard
    // (in this case, currentCard corresponds to #main-menu)
    MENU.ui.toggleButton.setAttribute('aria-expanded', 'false')
  } else {
    getCorrespondingMenuItem(MENU.ui.currentCard).setAttribute('aria-expanded', 'false')
  }

  if(nextCard.id === 'main-menu') {
    // for similar reasons, if it goes from specific card to main menu
    MENU.ui.toggleButton.setAttribute('aria-expanded', 'true')
  } else {
    getCorrespondingMenuItem(nextCard).setAttribute('aria-expanded', 'true')
  }

  // updating the currentCard's value with the new one
  MENU.ui.currentCard = nextCard
}


/*
  Helper function updating the menu's button content

  closed: a boolean representing the state of the menu
*/
function updateMenuButton(closed) {
  if(closed) {
    animSwapMenuButton(MENU.ui.toggleButton, 'menu')
  } else {
    animSwapMenuButton(MENU.ui.toggleButton, 'fermer')
  }
}


/*
  Function used to match the CSS media queries on relevant resize events
*/
export function resetMenu(reduced) {
  if(reduced) {
    // so the main menu is not full screen after a resize
    MENU.ui.mainMenuCard.style.transform = 'translateX(100%)'
  } else {
    // so the main menu does not disappear to the right of the screen
    MENU.ui.mainMenuCard.style.transform = 'translateX(0%)'
    MENU.ui.mainMenuCard.style.boxShadow = ''

    if(MENU.state.cardOpen && MENU.ui.currentCard == MENU.ui.mainMenuCard) {
      // if the main menu's card was opened on mobile, we need to reset the
      // states on resize, as the main menu's card can not be opened on desktop
      MENU.state.cardOpen = false
      MENU.ui.currentCard = undefined
    }
    // so the main menu's items are visible
    for(let item of MENU.ui.mainMenuItems) {
      item.style.opacity = 1
      item.style.transform = 'translateY(0)'
    }
  }
}


/*
  Helper function used to retrieve the main menu item's id from a card's id
*/
function getCorrespondingMenuItem(card) {
  let cardId = card.id
  // removing "-card" from the card's id
  let itemId = cardId.replace('-card','')
  // setting the corresponding DOM el.
  return document.getElementById(itemId)
}
