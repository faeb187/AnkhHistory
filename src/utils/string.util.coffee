#
# UTIL string
#
export camelize = (word, delimiter = "/") =>
  if typeof word isnt "string" then return ""
  word
    .split delimiter
    .map (w, i) =>
      "#{(i && w[0].toUpperCase()) || w[0]}#{w.slice 1}"
    .join ""
