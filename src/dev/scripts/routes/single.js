import {showIcon} from '../toolkit/animations/showIcon'
import {hideIcon} from '../toolkit/animations/hideIcon'
import {swapIcons} from '../toolkit/animations/swapIcons'
import {textAppear} from '../toolkit/animations/textAppear'

import {PopUp} from '../components/popup/logic'
import {startModule} from '../toolkit/start'


startModule('single', () => {start()})

function start() {
  console.log("single!")
  let contentCta = document.getElementsByClassName('content-cta')[0]
  if(contentCta) {
    let wrapper = contentCta.getElementsByClassName('card-popup-wrapper')[0]
    let shareButton = document.getElementById('share-cta')
    new PopUp(wrapper, shareButton, shareButton)
    document.getElementById('sharing-copy-link').addEventListener('click', copyLink)
  }

  let nsfwImages = document.getElementsByClassName('nsfw')
  for(let nsfwImg of nsfwImages) {
    nsfwImg.addEventListener('click', displayNsfwImg)
  }

  // loading the search function only on the /rechercher page 
  // this is a bit ugly, but should be changed for v2 
  //             delusional ^^^^^^^^^^^^^^^^^^^^^^^^^
  if(window.location.href.includes("rechercher")) {
    let className = "pagefind-js"
    let script = document.createElement("script")
    script.src = "/pagefind/pagefind-ui.js"
    script.classList.add(className)
    script.onload = function() {
        new PagefindUI({ element: '#pagefind-search', showImages: false })
    };
  
    document.head.appendChild(script)
  }
}


/*
  Function revealing NSFW content by changing the filter blur and removing
  the pseudo element
  as it is not available through JavaScript APIs, we're using a CSS class
*/
function displayNsfwImg(e) {
  let target = e.target
  let targetClassElement = target.parentNode
  // the user can either click the image or the pseudo element
  if(target.classList.contains('nsfw')) {
    // if the element contains the class,
    // it means the user has clicked on the text
    targetClassElement = target
    target = e.target.firstElementChild
  }

  targetClassElement.classList.add('nsfw-fadeout')
}

/*
  Atomic functions are the best.
*/
function copyLink(e) {
  copyTextToClipboard(e.target.value)
}


/*
  Main copy function, using the clipboard API
*/
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
  }

  navigator.clipboard.writeText(text).then(()=>{
    copySuccess()
  }, (err)=>{
    copyFail()
  })
}


/*
  Fallback function called if the clipboard API is not supported
*/
function fallbackCopyTextToClipboard(text) {
  let textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position='fixed'  //avoid scrolling to bottom
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    let success = document.execCommand('copy')
    if(success) {
      copySuccess()
    } else {
      copyFail()
    }
  } catch (err) {
    copyFail()
  }

  // do not forget to remove the textArea
  document.body.removeChild(textArea)
}


/*
  Helpler hiding the previous icon, showing the green one
*/
function copySuccess() {
  let input = document.getElementById('sharing-copy-link')
  let icon =  input.previousElementSibling
  let parent = input.parentNode

  swapIcons(icon.getElementsByClassName('copy-base'),
            icon.getElementsByClassName('copy-success'))

  // showing the success text roughly at the same time the new icon appears
  textAppear(parent, 'Copié', 500)
}


/*
  Helper hiding the previous icon, showing the red one
*/
function copyFail() {
  let icon =  document.getElementById('sharing-copy-link').previousElementSibling

  swapIcons(icon.getElementsByClassName('copy-base'),
            icon.getElementsByClassName('copy-error'))
}
