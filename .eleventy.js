const fs = require('fs')

/* 11ty */
const pluginRss = require("@11ty/eleventy-plugin-rss")
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const eleventySass = require("eleventy-sass");

const esbuildBundler = require('./esbuild-bundler.11ty.js');

const lodash = require('lodash');
const { execSync } = require('child_process')

const uslug = require("uslug");

const cstUtils = require('./config/utils')

/* Data specifics */
const archives = require('./src/_data/archives')
const homePage = require('./src/_data/home')

const authors = require('./src/_data/authors')

const postsPerPage = 10
const defaultTaxonomy = "article" 
/* Input folder */
const input = "src"

function uslugify(s) {
	return uslug(s);
}

function sortByPublished(a, b) {
    // Parse the published date strings into Date objects (or use dayjs)
    let dateA = new Date(a.data.published); 
    let dateB = new Date(b.data.published);
    // Sort in descending order (most recent first)
    return dateB - dateA;
}

module.exports = (eleventyConfig) => {
    /* Plugins */
    eleventyConfig.addPlugin(pluginRss)
    eleventyConfig.addPlugin(EleventyRenderPlugin)
    
    /* 
        Adding anchors to markdown headings 
        https://syntackle.com/blog/adding-custom-anchors-to-headings-in-markdown-eleventy-3NxBhIJO2OIr4XOj5LKc/
    */
   // https://github.com/nagaozen/markdown-it-toc-done-right?tab=readme-ov-file#unicode-support
    var md = require("markdown-it")({
        html: true,
        xhtmlOut: true,
        typographer: true // https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
    }).use( require("markdown-it-anchor"), { permalink: false, slugify: uslugify } )
      .use( require("markdown-it-toc-done-right"), { slugify: uslugify,  listType: 'ul' } )
      .use( require("markdown-it-footnote") )

    eleventyConfig.setLibrary("md", md)


    /* Making sure assets are available in docs */
    eleventyConfig.addPassthroughCopy(`./${input}/assets/`)

    eleventyConfig.addPassthroughCopy({ "./src/content/**/*.mp4": "files" });
    eleventyConfig.addPassthroughCopy({ "./src/content/**/*.pdf": "files" });

    require("./config/images.js")(eleventyConfig)
    require("./config/embedded.js")(eleventyConfig)

    eleventyConfig.addCollection("recentPostsHome", function(collectionApi) {
        // Get the first nbArticles for the home page 
        return collectionApi.getFilteredByTag(defaultTaxonomy)
            .filter(post => !homePage.excludeTags.some(tag => post.data.tags.includes(tag)))
            .sort(sortByPublished)
            .slice(0, homePage.nbArticles);
    });
    
    eleventyConfig.addCollection("randomPost", function(collectionApi) {
        // Get a random post from the ones not displayed on the front page already
        let randomPost = collectionApi.getFilteredByTag(defaultTaxonomy)
            .filter(post => !homePage.excludeTags.some(tag => post.data.tags.includes(tag)))
            .sort(sortByPublished)
            .filter((_, index) => index >= homePage.nbArticles) // Exclude the posts already used for the home page
            .sort(() => 0.5 - Math.random()) // Shuffle the remaining posts
            .shift(); // Get the first post from the shuffled array
        
        randomPost = randomPost ? randomPost : []
        return randomPost
    })

    eleventyConfig.addCollection("doublePagination", function(collectionApi) {
        /* 
        Infinite glory to zachleat
        https://github.com/11ty/eleventy/issues/332#issuecomment-445236776 
        requires lodash.chunk
        */
        // Get unique list of tags
        let tagSet = new Set();
        collectionApi.getAllSorted().map(function(item) {
            if( "tags" in item.data ) {
                let tags = item.data.tags;
                // optionally filter things out before you iterate over?
                for (let tag of tags) {
                    tagSet.add(tag);
                }
            }
        });

        // Get each item that matches the tag
        let paginationSize = postsPerPage;
        let tagMap = [];
        let tagArray = [...tagSet];
        for( let tagName of tagArray) {
            let tagItems = collectionApi.getFilteredByTag(tagName).sort(sortByPublished);
            let pagedItems = lodash.chunk(tagItems, paginationSize);
            // console.log( tagName, tagItems.length, pagedItems.length );
            for( let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
                tagMap.push({
                    tagName: tagName,
                    pageNumber: pageNumber,
                    pageData: pagedItems[pageNumber]
                });
            }
        }
        /* return data looks like:
            [{
                tagName: "tag1",
                pageNumber: 0
                pageData: [] // array of items
            },{
                tagName: "tag1",
                pageNumber: 1
                pageData: [] // array of items
            },{
                tagName: "tag1",
                pageNumber: 2
                pageData: [] // array of items
            },{
                tagName: "tag2",
                pageNumber: 0
                pageData: [] // array of items
            }]
        */
        //console.log( tagMap );
        return tagMap;
    });


    eleventyConfig.addCollection("doublePaginationAuthor", function(collectionApi) {
        /* 
        Adapted from
        https://github.com/11ty/eleventy/issues/332#issuecomment-445236776 
        requires lodash.chunk
        */
        // Get unique list of tags
        let authorArray = [] 
        for(let a of authors) {
            authorArray.push(a.key)
        }

        // Get each item that matches the tag
        let paginationSize = postsPerPage;
        let authorMap = [];
        for(let authorKey of authorArray) {
            let posts = collectionApi.getFilteredByTag(defaultTaxonomy).sort(sortByPublished)
        
            let authorItems = posts.filter(p => {
                if(!p.data.author) return false;
                let authors = Array.isArray(p.data.author) ? p.data.author : [p.data.author]
                return authors.includes(authorKey);
            });
            let pagedItems = lodash.chunk(authorItems, paginationSize);
            for( let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
                authorMap.push({
                    authorKey: authorKey,
                    nbPosts: authorItems.length,
                    pageNumber: pageNumber,
                    pageData: pagedItems[pageNumber]
                });
            }
        }
        return authorMap;
    });
    
    eleventyConfig.addCollection("relatedPosts", function (collectionApi) {
        const posts = cstUtils.shuffleArray(collectionApi.getFilteredByTag(defaultTaxonomy)) // Adjust the glob to match your post path
        return function getRelatedPosts(currentPostURL, relatedSlugs = [], tags = []) {
            let relatedPosts = [];
            
            // 1. Find posts from 'relatedSlugs'
            relatedSlugs.forEach(slug => {
              const matchedPost = posts.find(p => p.url.includes(slug)); // going for a loosy check based on slug
              if (matchedPost && matchedPost.url !== currentPostURL) {
                relatedPosts.push(matchedPost);
              }
            });

            // 2. If not enough posts, find more from the tags
            if (relatedPosts.length < 6) {
                if (tags.length > 0) {
                    let currentTags = tags.filter(t => t !== defaultTaxonomy);

                    // Putting the category itself, which is in first place by default, to the last place
                    // e.g. before: [ 'decouvertes-artistiques', 'art-abstrait', 'peinture' ]
                    // after: [ 'art-abstrait', 'peinture', 'decouvertes-artistiques' ]
                    // so we select thematically closer content first, and then pad with the rest
                    let category = currentTags.shift()
                    currentTags.push(category)
                    for(let currentTag of currentTags) {
                        const postsWithTag = cstUtils.shuffleArray(posts.filter(post => {
                            return post.data.tags && post.data.tags.some(tag => tag == currentTag) && post.url !== currentPostURL;
                        }));

                        postsWithTag.forEach(post => {
                            if (relatedPosts.length < 6 && !relatedPosts.includes(post)) {
                                relatedPosts.push(post);
                            }
                        });
                    }
                }

            }
      
            // 3. If still not enough, fill with random posts
            if (relatedPosts.length < 6) {
              const remainingPosts = posts.filter(post => post.url !== currentPostURL && !relatedPosts.includes(post));
              const shuffledPosts = cstUtils.shuffleArray(remainingPosts);
      
              relatedPosts = relatedPosts.concat(shuffledPosts.slice(0, 6 - relatedPosts.length));
            }

            return relatedPosts.slice(0, 6); // Return only up to 6 posts
        };
    });

    eleventyConfig.addFilter('publishedReverse', (obj) => {
        return obj.sort(sortByPublished)
    })

    /* Inspited by: 
    https://www.raymondcamden.com/2020/08/24/supporting-multiple-authors-in-an-eleventy-blog 
    Added support for multiple authors (array) and single authors (string)
    */
    eleventyConfig.addFilter("getAuthors", (authors_obj, authors) => {
        if(!Array.isArray(authors)) {
            authors = [authors]
        }
        return authors_obj.filter(a => authors.includes(a.key));
    });

    eleventyConfig.addFilter('toISO', (d, format) => {
        if(format == "fromString") {
            d = new Date(d)
        }
        return d.toISOString()
    })

    eleventyConfig.addFilter('removeFirstSlash', (str) => {
        if(str.startsWith('/')) {
            return str.replace(/^\//, '')
        }
        return str 
    })

    
    /*  CSV icon shortcode */
    eleventyConfig.addShortcode("svg", cstUtils.getSvgString)
        
  
    /* Filter returning a random item from an array */
    eleventyConfig.addFilter("randomItem", (arr) => {
        arr.sort(() => {
            return 0.5 - Math.random()
        })
        return arr.slice(0, 1)
    })

    /* Filter returning all tags, with excections */
    eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts", defaultTaxonomy, "page"].indexOf(tag) === -1);
	});
    
    /* Filter used for cache busting (takes an URL and adds the last modification time as parameter)
    Source: https://bnijenhuis.nl/notes/cache-busting-in-eleventy/
    */
    eleventyConfig.addFilter("bust", (url) => {
        const [urlPart, paramPart] = url.split("?")
        const params = new URLSearchParams(paramPart || "")
        let relativeUrl = (urlPart.charAt(0) == "/") ? urlPart.substring(1): urlPart
        relativeUrl = `./docs/${relativeUrl}`
        try {
            const fileStats = fs.statSync(relativeUrl);
            params.set("v", fileStats.mtimeMs)
        } catch (error) { 
            console.log(error)
        }

        return `${urlPart}?${params}`
    })

    eleventyConfig.addShortcode("socialString", () => {
        return `<a class="force-link" href="https://www.instagram.com/lartboratoire_/" target="_blank">Instagram</a> ou <a class="force-link" href="https://x.com/artboratoire" target="_blank">X/Twitter</a>`
    })

    eleventyConfig.addShortcode("signature", (str) => {
        return `<p class="signature">${str}</p>`
    })

    /* Assets */
    eleventyConfig.addShortcode("context_var", (assets, is_js=false) => {
        let js_var = "css_assets"
        let dir = "styles"
        let ext = "css"

        if(is_js) {
            js_var = "js_assets"
            ext = "min.js"
            dir = "scripts"
        }
        let res = `var ${js_var} = {`
        for(let a of assets) {
            // ('/assets/styles/'+ asset +'.css') | url | bust
            let busted = eleventyConfig.nunjucksFilters.bust(eleventyConfig.nunjucksFilters.url(`/assets/${dir}/${a}.${ext}`))
            res = `${res} '${a}': '${busted}',`
        }
        res += "}"

        return res
    })

    eleventyConfig.setNunjucksEnvironmentOptions({
        throwOnUndefined: true, // Throw errors for undefined variables
    });
    
    eleventyConfig.on('eleventy.after', () => {
        execSync(`npx pagefind --site docs --glob \"**/*.html\"`, { encoding: 'utf-8' })
    })

    esbuildBundler(eleventyConfig)
    eleventyConfig.addPlugin(eleventySass, {
        compileOptions: {
            permalink: function(contents, inputPath) {
                // Output all compiled CSS files into the assets/styles/ folder
                let pathParts = inputPath.split('/');
                let fileName = pathParts[pathParts.length - 1].replace('.scss', '.css');
                return `/assets/styles/${fileName}`;
            }        
        }
    }) 

    return {
        markdownTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "docs",
        },
    }
}