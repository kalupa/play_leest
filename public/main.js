(function(){
  //'use strict';
  var playlistManager = PlaylistManager();
  var player = new Player(playlistManager);
  function setupEvents() {
    $('#add').addEventListener('click', player.addTrack);
    $('#stop').addEventListener('click', player.stopAll);
  }
  setupEvents();
})();
