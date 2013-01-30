(function(){
  //'use strict';
  var SC_CONFIG =  {
        client_id:    client_id,
        redirect_uri: 'http://localhost:9292/connected'
      },
      player,
      playlistManager;

  player = new Player(SC_CONFIG);
  playlistManager = new PlaylistManager(player);

  $(document).ready(player.load);

  $('#add').on('click', playlistManager.addSoundEvent);
  $('#stop').on('click', player.stopAll);


})();
