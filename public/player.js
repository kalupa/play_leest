function Player() {
  // instance
  var currentTrack,
      currentTrackEl,
      playing,
      initValues = {
        client_id:    '97c9ab904f4aeadba33c8efc1c967b08',
        redirect_uri: 'http://localhost:9292/connected'
      };

  // public
  function stopAll(e) {
    var items;
    if (e!==null) {
      e.preventDefault();
    }
    if ( currentTrack !== undefined ) {
      items = document.querySelectorAll('.playlist_item');
      if ( items.length > 0 ) {
        for (var i in items){
          removeClass(items[i], 'current');
        }
      }
      currentTrack.stop();
      currentTrack = void 0;
    }
  }

  function playTrack(e){
    e.preventDefault();
    var trackEl = this.parentNode,
        trackId = trackEl.dataset.trackId;
    if ( trackEl !== currentTrackEl ) {
      SC.stream('/tracks/' + trackId, function(sound) {
        updateCurrent(sound, trackEl);
        addClass(trackEl, 'current');
        sound.play({
          onfinish: function() {
            removeClass(trackEl, 'current');
            playNextTrack(trackEl.nextElementSibling);
          }
        });
      });
    }
  }

  // private
  function loadPage(){
    SC.initialize(initValues);
  }
  document.addEventListener('DOMContentLoaded', loadPage);

  function updateCurrent(sound, trackEl) {
    currentTrack   = sound;
    currentTrackEl = trackEl;
  }

  function playNextTrack(trackEl) {
    if (trackEl !== null) {
      trackEl.querySelector('.play_button').click();
    }
  }

  return {
    playTrack: playTrack,
    stopAll:  stopAll,
    currentTrack: currentTrack,
    currentTrackEl: currentTrackEl
  };

}
