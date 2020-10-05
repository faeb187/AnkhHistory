###
  UI ARTICLE
  @AUTHOR faeb187
###
module.exports = (->

  # @REQUIRE local modules
  $$    = require '../helpers/dom'

  # @REQUIRE NPM modules
  moment  = require 'moment'

  return {

    # @DESC   build new article
    # @PARAM  opt.title           {string}  title
    # @PARAM  opt.items           {[json]}  paragraph or code block
    # @PARAM  opt.items.$.lang    {json}    id to paragraph text or programming lang
    # @PARAM  opt.items.$.code    {json}    code block with syntax highlighting
    # @PARAM  opt.author          {json}    author object
    # @PARAM  opt.author.username {string}  author username
    # @PARAM  opt.author.email    {string}  author email
    # @PARAM  opt.author.website  {string}  author website
    # @PARAM  opt.createdAt       {date}    date of article creation
    # @RETURN {void}
    # @PUBLIC
    init: ( opt ) ->
      
      # DEFINE variables
      opt   = opt or {}
      $t    = opt.target
      title = opt.title
      itms  = opt.items

      # MANDATORY target, title & items
      if !$t or !title or !itms then return
      
      # MARKUP UI
      $ui = $$ '<article/>', 'class': 'ui-article'

      # ADD article title
      $title = $$ '<h2/>', 'data-lang': title
      $ui.appendChild $title

      # ADD article items
      for itm in itms
        
        # code block
        if itm.code
          $pre            = $$ '<pre/>'
          $code           = $$ '<code/>', 'class': itm.lang
          $code.innerHTML = itm.code
          $pre.appendChild  $code
          $elm            = $$( '<p/>' ).appendChild $pre
        
        # normal paragraph
        else $elm = $$ '<p/>', 'data-lang': itm.lang
        
        $ui.appendChild $elm

      # article footer required?
      if opt.author or opt.createdAt
        $footer = $$ '<footer/>'

        # add article author
        if opt.author
          $address = $$ '<address/>'
          $address.innerText = 'by ' + opt.author.username
          $footer.appendChild $address

        # add article creation date
        if opt.createdAt
          $time = $$ '<time/>',
            datetime: opt.createdAt
            pubdate : 'pubdate'

          $time.innerHTML = moment( opt.createdAt ).fromNow()
          $footer.appendChild $time
          
        # APPEND UI to DOM target
        $ui.appendChild $footer
      $t.appendChild $ui

      return
  }
)()
