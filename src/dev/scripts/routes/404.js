import {displayTitle} from '../toolkit/animations/displayTitle'
import {revealImage} from '../toolkit/animations/revealImage'

import {startModule} from '../toolkit/start'


startModule('404', () => {
  displayTitle('error-title')
  revealImage(document.getElementsByClassName('tr-hide')[0], 800, 300)
})
