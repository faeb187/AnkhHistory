/*
  @CONF   nav
  @AUTHOR faeb187
*/
module.exports = {
  id: 'nav',
  name: 'nav',
  events: {
    click: [
      {
        ev: 'helper-site-load'
      }
    ]
  },
  items: [
    {
      id: 'aCare',
      lang: 'care',
      path: '/care'
    },
    {
      id: 'aPartner',
      lang: 'partner',
      path: '/partner',
      items: [
        {
          id: 'aProducts',
          lang: 'products',
          path: '/partner/products'
        },
        {
          id: 'aProductsAdditional',
          lang: 'productsAdditional',
          path: '/partner/productsAdditional'
        }
      ]
    },
    {
      id: 'aReports',
      lang: 'reports',
      path: '/reports'
    }
  ]
};
