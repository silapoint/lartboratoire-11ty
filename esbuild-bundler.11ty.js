const path = require('path')
const fs = require('fs')

const { minify } = require('terser')
const esbuild = require('esbuild')

const jsInputPath = './src/dev/scripts/routes/'
const jsOutputPath = './src/assets/scripts/'


const jsAssetsPaths = [
  {
    src: './src/dev/scripts/core.js',
    dest: jsOutputPath,
    name: 'core.min.js'
  },
  {
    src: jsInputPath + 'home.js',
    dest: jsOutputPath,
    name: 'home.min.js'
  },
  {
    src: jsInputPath + 'single.js',
    dest: jsOutputPath,
    name: 'single.min.js'
  },
  {
    src: jsInputPath + 'glitch-art.js',
    dest: jsOutputPath,
    name: 'glitch-art.min.js'
  },
  {
    src: jsInputPath + '404.js',
    dest: jsOutputPath,
    name: '404.min.js'
  },
]


module.exports = function(eleventyConfig) {
  eleventyConfig.on('beforeBuild', async () => {
    for (const element of jsAssetsPaths) {
      const outDir = path.resolve(__dirname, element.dest)
      const outFile = path.join(outDir, element.name)
      const tempFile = path.join(outDir, `temp-${element.name}`)

      try {
        // Step 1: Build with esbuild
        await esbuild.build({
          entryPoints: [element.src],
          outfile: tempFile,
          bundle: true,
          target: 'es2015',
          write: true, // Write to temp file
        })

        // Step 2: Minify with Terser
        const code = fs.readFileSync(tempFile, 'utf-8')
        const minified = await minify(code)

        // Step 3: Write minified code to the final output file
        fs.writeFileSync(outFile, minified.code)
        console.log(`Built and minified ${element.src} to ${outFile}`)

        // Optionally remove the temp file
        fs.unlinkSync(tempFile)
      } catch (err) {
        console.error(`Error processing ${element.src}`, err)
      }
    }
  })

  eleventyConfig.watchIgnores.add("./src/assets/scripts/");
  eleventyConfig.addWatchTarget("./src/dev/");
}