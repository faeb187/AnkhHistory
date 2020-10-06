module.exports =
  ids: [
    {
      id  : 'back'
      ids : [
        { id: 'slider', ids: [{id: 'navResponsive' }]}
      ]
    }
    {
      id  : 'front'
      ids : [
        {
          id  : 'cnt'
          ids : [
            {
              id  : 'header'
              ids : [{ id: 'nav', media: min: 'xs' }]
            }
            {
              id  : 'main'
              ids : []
            }
          ]
        }
        {
          id  : 'footer'
          ids : [
            { id: 'copyright' }
            { id: 'lang'      }
          ]
        }
      ]
    }
    {
      id: 'navToggle'
      media: {
        max: 'xs'
      }
    }
  ]
