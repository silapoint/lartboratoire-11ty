import {MENU} from "./components/menu/logic"
import {start as lazy} from './components/lazy'
import {start as transitions} from './components/transitions/logic'
import {start as cards} from './components/cards/logic'

import {browserSupport, refreshConfig as setConfig} from "./toolkit/config"
import {start as resize} from "./toolkit/resize"

/*
  Main event on first load
*/
window.addEventListener('load', function(e) { 
  /* first thing first: checking the browser support */
  browserSupport()
  /* getting the current config */
  setConfig()

  /* Not modified on page change */
  MENU.start()
  resize()

  /* starting the transition madness */
  transitions()

  /* For each page (to be replicated for the pageLoad event listener) */
  lazy()
  cards()
})

/*
  Event fired after every page change
*/
window.addEventListener('pageLoad', function(e) {
  lazy()
  cards()
})
