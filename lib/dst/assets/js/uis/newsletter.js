/*
  UI NEWSLETTER
  @desc   inits UI form (email & submit)
  @author faeb187
*/
module.exports = (function() {
  var Ui;
  
  // PRIVATE

  Ui = {
    form: require('./form')
  };
  return {
    // @DESC init newsletter

    // PUBLIC

    init: function(opt) {
      opt = opt || {};
      opt.type = 'newsletter';
      // APPEND email field to form options
      opt.ids = [
        {
          id: 'email'
        }
      ];
      // INIT UI form with type newsletter
      return Ui.form.init(opt);
    }
  };
})();
