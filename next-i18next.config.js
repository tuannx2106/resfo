// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    localePath: path.resolve('./public/locales'),
  },
}
