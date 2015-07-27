// http://facebook.github.io/react/docs/working-with-the-browser.html#polyfills-needed-to-support-older-browsers
require('./polyfills/es5-shim')

var Lang = require('./lang')
Lang.set(require('./lang/zh-cn'))

module.exports = {
  Form: require('./components/form.jsx'),
  Input: require('./components/input.jsx'),
  Rating: require('./components/rating.jsx'),
  Lang: Lang,

  Actions: {
    Loading: require('./actions/loading'),
    Message: require('./actions/message')
  },
  
  // mixins
  Mixins: {
    Classable: require('./mixins/classable'),
    ClickAwayable: require('./mixins/click-awayable'),
    Fixable: require('./mixins/fixable'),
    //Pageable: require('./mixins/pageable'),
    //Requestable: require('./mixins/requestable'),
    Validatable: require('./mixins/validatable'),
    WindowListenable: require('./mixins/window-listenable')
  },

  Utils: {
    Circle: require('./utils/circle'),
    Color: require('./utils/color'),
    CssEvent: require('./utils/css-event'),
    Datetime: require('./utils/date-time'),
    Dom: require('./utils/dom'),
    Events: require('./utils/events'),
    Objects: require('./utils/objects'),
    //Request: require('./utils/request'),
    Superagent: require('./superagent'),
    Strings: require('./utils/strings')
  }
}
