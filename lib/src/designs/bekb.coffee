module.exports =
  ids: [
    {
      id  : 'back'
      ids : [
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
              ids : [{ id: 'nav' }]
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
    { id: 'navToggle' }
  ]
