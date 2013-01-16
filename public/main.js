(function(){
  //'use strict';

  var doc        = document;
  var $          = function(id)  {return document.getElementById(id);};
  var createEl   = function(args){return document.createElement(args);};
  var createText = function(args){return document.createTextNode(args);};

  var loadPage = function loadPage(){
    SC.initialize({
      client_id: '97c9ab904f4aeadba33c8efc1c967b08',
      redirect_uri: 'http://localhost:4567/connected'
    });
    SC.connect(function connect() {

      SC.get('/me',function get(me) {
        $('app').innerHTML(me.username);
      });
    });
  };

  doc.addEventListener('DOMContentLoaded', loadPage);

})();
