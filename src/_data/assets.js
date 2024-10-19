module.exports = {
    css: {
        all: ["core", "home", "single", "archive", "404"],
        contexts: {
             // core by default
            "home": ["core", "home"],
            "single": ["core", "single"],
            "archive": ["core", "archive"],
            "404": ["core", "404"],    
        },
    },
    js: {
        all: ["core", "home", "single", "404", "anime", "barba_v2"],
        contexts: {
            // core & libs by default
            "home": ["core", "home", "anime", "barba_v2"],
            "single": ["core", "single", "anime", "barba_v2"],
            "archive": ["core", "anime", "barba_v2"],
            "404": ["core", "404", "anime", "barba_v2"],    
        }
    }
}