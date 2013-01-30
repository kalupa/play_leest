(function(){
  //'use strict';
  var SC_CONFIG =  {
        client_id: client_id
      },
      player,
      playlistManager;

  player = new Player(SC_CONFIG);
  playlistManager = new PlaylistManager(player);

  document.addEventListener('DOMContentLoaded', player.load);

  $('#add').addEventListener('click', playlistManager.addSoundEvent);
  $('#stop').addEventListener('click', player.stopAll);

})();
