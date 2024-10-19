import {openPopup as animOpenPopup,
        closePopup as animClosePopup} from './animations'

/*
  Base interface to use pop ups accross the website :)
*/
export class PopUp {
  /*
    This constructor sets the various properties and event listeners

    wrapper: the div containing everything
    ariaElem*: the elem on which the a11y attributes have to be set
    triggerElement*: the elem triggering the opening of the pop up

    *: not mandatory
  */
  constructor(wrapper, ariaElem = undefined, triggerElement = undefined) {
    this.wrapper = wrapper
    this.ariaElem = ariaElem

    // this needs to be bound as we want to access to the class' properties
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

    if(triggerElement) {
      // a new PopUp can be created w/out a trigger element
      // e.g. the newsletter response pop ups :)
      triggerElement.addEventListener('click', this.open)
    }

    // closing the popup on click outsite of it (the wrapper covers the page)
    this.wrapper.addEventListener('click', this.close)

    // closing it on page change too (if a link has been click inside the popup)
    window.addEventListener('pageLeave', this.close)
  }


  open(e = undefined) {
    // this function can be used as an event callback or a direct method
    // so the e parameter may not be defined
    if(e) {
      e.preventDefault() // it can be a link, so preventing anything weird
    }

    animOpenPopup(this.wrapper)

    // a11y data update
    if(this.ariaElem) {
      this.ariaElem.setAttribute('aria-expanded', 'true')
    }
  }


  close(e) {
    if(e.target == this.wrapper // clicking outside the popup
      || e.target == window // pageLeave event
      || e.target.classList.contains('svg-cross')
      || e.target.parentNode.classList.contains('svg-cross') ) {
      animClosePopup(this.wrapper)

      // a11y data update
      if(this.ariaElem) {
        this.ariaElem.setAttribute('aria-expanded', 'false')
      }
    }
  }
}
