const inputName = {
  attributes: { name: "inputName", placeholder: "name" },
  icon: "person",
  id: "inputName",
  label: "name",
  lang: "name",
  ui: "input",
  parentId: "form",
};
const inputFirstName = {
  attributes: { name: "inputFirstName", placeholder: "firstName" },
  icon: "person",
  id: "inputFirstName",
  label: "firstName",
  lang: "firstName",
  ui: "input",
  parentId: "form",
};
const inputEmail = {
  attributes: { name: "inputEmail", placeholder: "email", type: "email" },
  icon: "mail",
  id: "inputEmail",
  label: "email",
  lang: "email",
  ui: "input",
  parentId: "form",
};
const inputBirthday = {
  attributes: { name: "inputDate", placeholder: "birthday", type: "date" },
  icon: "calendar",
  id: "inputBirthday",
  label: "birthday",
  lang: "birthday",
  ui: "input",
  parentId: "form",
};
const inputNumber = {
  attributes: { name: "inputNumber", type: "number" },
  icon: "happy",
  id: "inputNumber",
  label: "favoriteNumber",
  lang: "favoriteNumber",
  ui: "input",
  parentId: "form",
};
const inputTel = {
  attributes: { name: "inputTel", placeholder: "phoneNumber", type: "tel" },
  icon: "call",
  id: "inputTel",
  label: "phoneNumber",
  lang: "phoneNumber",
  ui: "input",
  parentId: "form",
};
const inputColor = {
  attributes: {
    name: "inputColor",
    placeholder: "favoriteColor",
    type: "color",
  },
  id: "inputColor",
  label: "favoriteColor",
  lang: "favoriteColor",
  ui: "input",
  parentId: "form",
};
const inputSubmit = {
  attributes: { type: "submit" },
  id: "inputSubmit",
  lang: "submit",
  ui: "input",
  parentId: "form",
};

export {
  inputColor,
  inputBirthday,
  inputEmail,
  inputFirstName,
  inputName,
  inputNumber,
  inputSubmit,
  inputTel,
};
