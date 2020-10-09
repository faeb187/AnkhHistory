nav = require '../conf/nav'
navMobile = require '../conf/navResponsive'

module.exports =
  ids: [
    {
      id  : 'back'
      name: 'html'
      ids : [
        {
          id: 'slider-lft'
          name: 'slider'
          ids: [{...navMobile}]
        }
      ]
    }
    {
      id  : 'front'
      name: 'html'
      ids : [
        {
          id  : 'cnt'
          name: 'html'
          ids : [
            {
              id  : 'h'
              name: 'html'
              tag: 'header'
              ids : [
                {...nav, media: min: 'xs'}
                {id: 'search', name: 'search', placeholder: 'search'}
              ]
            }
            {id: 'm', name: 'html', tag: 'main'}
          ]
        }
        {
          id  : 'f'
          name: 'html'
          tag: 'footer'
          ids : [
            {id: 'copyright', name: 'html', tag: 'small', text: 'copyright' }
            {id: 'lang', name: 'lang'}
          ]
        }
      ]
    }
    {
      id: 'navToggle'
      name: 'icon'
      icon: 'menu-outline'
      events: click: [ev: 'ui-slider-toggle', arg: {id: 'slider-lft'}]
      media: max: 'xs'
    }
  ]
