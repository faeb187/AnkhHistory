export productSelection = [
  id: "breadcrumb"
  ui: "breadcrumb"
  events: ui: [name: "ui-breadcrumb-update", target: "breadcrumb"]
  numbered: true
  readonly: true
  items: [...steps]
,
  id: "openProductAccordion"
  ui: "accordion"
  ids: [
    id: "accordionPay"
    ui: "details"
    summary: lang: "pay"
  ,
    id: "accordionSaveUp"
    ui: "details"
    summary: lang: "saveUp"
  ,
    id: "accordionPrecaution"
    ui: "details"
    summary: lang: "precaution"
  ,
    id: "accordionInvest"
    ui: "details"
    summary: lang: "invest"
  ,
    id: "accordionFinance"
    ui: "details"
    summary: lang: "finance"
  ,
    id: "accordionVarious"
    ui: "details"
    summary: lang: "various"
  ]
]
