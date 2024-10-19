import {displayTitle} from '../toolkit/animations/displayTitle'
import {revealImage} from '../toolkit/animations/revealImage'
import {startModule} from '../toolkit/start'

const EYES = {
  /*
    Using this constant to initialize the maximum of data outside of
    the event loop
  */
  start() {
    this.ui = {
      'hoverArea': document.getElementsByClassName('home-header')[0],
      'subTitle': document.querySelector('.home-subtitle .hide-link'),
      'pupilLeft': document.getElementById('pupil-left'),
      'pupilRight': document.getElementById('pupil-right'),
      'trHide': document.getElementsByClassName('tr-hide')[0]
    }

    // maximum distance the eyes can travel on the x and y axis
    this.ranges = {
      'left': {
        x: 50,
        y: 14,
      },
      'right': {
        x: 52,
        y: 22,
      },
    }

    // Running at most 1 time per 100ms
    this.ui.hoverArea.addEventListener('mousemove', followEyes)
    displayTitle('home-title')
    revealImage(this.ui.trHide, 800, 300)
  },
}


/*
  Note: this needs to be added after the const definition else EYES is undefined
*/
startModule('home', () => {
  EYES.start()
})

function followEyes(e) {
  // get mouse position as a percentage of the screen
  let posLeftPercetange = (e.pageX / window.config.width) // turn cursorX pos into a percentage
  let posTopPercentage = (e.pageY / window.config.windowHeight) // turn cursorY pos into a percentage
  // move the pupils with the same percentage as the mouse position
  setPupilsPosition(posLeftPercetange, posTopPercentage)
}


function setPupilsPosition(posLeftPercetange, posTopPercentage) {
  let x = EYES.ranges.left.x * posLeftPercetange
  let y = EYES.ranges.left.y * posTopPercentage
  EYES.ui.pupilLeft.style.transform = 'translate3d('+ x +'px,'+ y +'px, 0)'
  EYES.ui.pupilRight.style.transform = 'translate3d('+ x +'px,'+ y +'px, 0)'
}
