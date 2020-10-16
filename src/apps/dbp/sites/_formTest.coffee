import { dbp } from "../designs/dbp"

_processOpenProduct = JSON.parse JSON.stringify dbp
_processOpenProduct.ids[1].ids[0].ids[1].ids = [
  id: "form"
  ui: "html"
  tag: "form"
  ids: [
    id: "fieldsetPersonalInfo"
    ui: "html"
    tag: "fieldset"
    ids: [
      id: "legendPersonalInfo"
      ui: "html"
      tag: "legend"
      lang: "personalInfo"
    ,
      id: "gender"
      ui: "input"
      label: "gender"
      type: "radio"
      items: [
        name: "gender", id: "female", label: "female"
      ,
        name: "gender", id: "male", label: "male"
      ]
      required: true
    ,
      id: "lastname", ui: "input", label: "lastname", required: true
    ,
      id: "firstname", ui: "input", label: "firstname", required: true
    ,
      id: "zip"
      ui: "input"
      label: "zip"
      inputmode: "numeric"
      required: true
    ,
      id: "city", ui: "input", label: "city", required: true
    ]
  ,
    id: "fieldsetAccountInfo"
    ui: "html"
    tag: "fieldset"
    ids: [
      id: "legendAccountInfo"
      ui: "html"
      tag: "legend"
      lang: "accountInfo"
    ,
      id: "email", ui: "input", label: "email", type: "email", required: true
    ,
      id: "username", ui: "input", label: "username", required: true
    ,
      id: "password"
      ui: "input"
      label: "password"
      type: "password"
      required: true
    ]
  ,
    id: "newsletter"
    ui: "input"
    type: "checkbox"
    items: [id: "newsletter", label: "getNewsletter", checked: true]
    required: true
  ,
    id: "formSubmit", ui: "button", lang: "submit"
  ]
]

export processOpenProduct = _processOpenProduct
