const withOptimizedImages = require('next-optimized-images')

module.exports = withOptimizedImages({
    optimizeImagesInDev: true,
    target: 'serverless',

    i18n: {
        locales: ['en-GB', 'it-IT'],
        defaultLocale: 'en-GB'
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.ya?ml$/,
            use: 'js-yaml-loader'
        })

        return config
    }
})
