(function(){
  //'use strict';
  var SC_CONFIG =  {
        client_id:    '97c9ab904f4aeadba33c8efc1c967b08',
        redirect_uri: 'http://localhost:9292/connected'
      },
      player,
      playlistManager;

  player = new Player(SC_CONFIG);
  playlistManager = new PlaylistManager(player);

  document.addEventListener('DOMContentLoaded', player.load);

  $('#add').addEventListener('click', playlistManager.addSoundEvent);
  $('#stop').addEventListener('click', player.stopAll);


})();
