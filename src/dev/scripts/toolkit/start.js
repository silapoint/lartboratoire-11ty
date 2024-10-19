/*
  Function used to correctly start some module

  namespace: conditionnal namespace to start the module only when needed
  callback: the function to call to actually start the module
*/
export function startModule(namespace, callback) {
  /*
    Direct load
  */
  window.addEventListener('load', function(e) {
    callback()
  })

  /*
    First load after transition (the file was just added)
  */
  if(document.readyState == 'complete') {
    let top = document.getElementById('top')
    if(top && top.dataset.barbaNamespace == namespace) {
      callback()
    }
  }

  /*
    Second load after transition (the file already is loaded)
  */
  window.addEventListener('pageLoad', function(e) {
    let top = document.getElementById('top')
    if(top && top.dataset.barbaNamespace == namespace) {
      callback()
    }
  })
}
