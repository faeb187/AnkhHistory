###
  @CONF   nav
###
module.exports =
  id    : 'nav'
  name  : 'nav'
  events:
    click: [
      ev  : 'helper-site-load'
    ]
  items : [
    { id: 'site-care', lang: 'care', path: '/care', items: [
      { id: 'site-careOverview', lang: 'overview', path: '/care/overview' }
    ] }
    { id: 'site-partner', lang: 'partner', path: '/partner', items: [
      { id: 'site-partnerProducts', lang: 'products', path: '/partner/products' },
      { id: 'site-partnerProductsAdditional', lang: 'productsAdditional', path: '/partner/productsAdditional' }
    ] }
    { id: 'site-reports', lang: 'reports', path: '/reports', items: [
      { id: 'site-reportsOverview', lang: 'overview', path: '/reports/overview' }
    ] }
  ]
