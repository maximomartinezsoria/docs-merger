const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    require('tailwindcss')('tailwind.config.js'),
    require('autoprefixer'),
    process.env.ENV === 'production' 
    ? 
    cssnano({
      preset: 'default'
    })
    : '',
    process.env.ENV === 'production' 
    ? 
    purgecss({
        content: ['./public/*.html'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
    : '',
  ]
}
