module.exports = {
    i18n: {
        locales: ['en', 'it'],
        defaultLocale: 'en'
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.ya?ml$/,
            use: 'js-yaml-loader'
        })

        return config
    }
}
