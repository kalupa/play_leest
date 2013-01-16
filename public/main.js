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
    SC.connect(
       function() {
        console.log('connect');
        SC.get('/me',function get(me) {
          console.log('get /me');
          $('app').appendChild((createText(me.username)));
        });
        SC.get('/me/activities', function(items){
          var collection = items.collection;
          for (var item in collection) {
            console.log(collection[item].origin.title);
          }
        });
      }
    );
  };

  function renderTrack(track) {
    var htmlEl = creatEl('div');
    htmlEl.id = ''

    var title = createText(track.title);
    var description = createText(track.description);

    return htmlEl;
  }

  doc.addEventListener('DOMContentLoaded', loadPage);

})();
