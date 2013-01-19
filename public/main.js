(function(){
  //'use strict';
  var player,
      playlistManager;

  player          = new Player();
  playlistManager = new PlaylistManager(player);

  $('#add').addEventListener('click', playlistManager.addTrack);
  $('#stop').addEventListener('click', player.stopAll);

})();
