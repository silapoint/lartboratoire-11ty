const fs = require('fs')


function getSvgString(file) {
    let relativeFilePath = `./src/assets/icons/${file}.svg`;
    let data = fs.readFileSync(relativeFilePath, 
    function(err, contents) {
        if (err) return err
        return contents
    })
    
    // returning the minified version of the svg string 
    // because line returns screw up the way the svg is 
    // interpreted by browsers
    return data.toString('utf8').replace(/\n|\r/g, "")
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = { getSvgString, shuffleArray }