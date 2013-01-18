function Player(playlistManager) {
  // instance
  var currentTrack,
      currentTrackEl,
      initValues = {
        client_id:    '97c9ab904f4aeadba33c8efc1c967b08',
        redirect_uri: 'http://localhost:9292/connected'
      };

  // public
  function addTrack(e) {
    e.preventDefault();
    var trackUrlInput = $('#track_url'),
        trackUrl      = trackUrlInput.value,
        playButton,
        removeButton,
        newTrack;
    if ( trackUrl !== '' ) {
      trackUrlInput.value = '';
      SC.get('/resolve', { url: trackUrl }, function(track){
        newTrack     = $('#list').appendChild(playlistManager.renderTrack(track));
        playButton   = newTrack.querySelector('.play_button');
        removeButton = newTrack.querySelector('.remove_track');

        playButton.addEventListener('click', playTrack);
        removeButton.addEventListener('click', removeTrack);
      });
    }
  }
  function stopAll(e) {
    if (e!==null) {
      e.preventDefault();
      currentTrack.stop();
      currentTrack = void 0;
    }
  }

  // private
  function loadPage(){
    SC.initialize(initValues);
  }
  document.addEventListener('DOMContentLoaded', loadPage);

  function playTrack(e){
    e.preventDefault();
    var trackEl = this.parentNode,
        trackId = trackEl.dataset.trackId;
    SC.stream('/tracks/' + trackId, function(sound) {
      sound.play({
        onplay:   function() { updateCurrent(sound, trackEl); },
        onfinish: function() { playNextTrack(trackEl.nextElementSibling); }
      });
      addClass(trackEl, 'current');
    });
  }

  function updateCurrent(sound, trackEl) {
    currentTrack   = sound;
    currentTrackEl = trackEl;
  }

  function playNextTrack(trackEl) {
    if (trackEl !== null) {
      trackEl.querySelector('.play_button').click();
    }
  }

  function removeTrack(e){
    e.preventDefault();
    var trackEl = this.parentNode;
    if (trackEl === currentTrackEl) {
      currentTrack.stop();
    }
    trackEl.querySelector('.play_button').removeEventListener('click', playTrack);
    trackEl.querySelector('.remove_track').removeEventListener('click', removeTrack);
    trackEl.parentNode.removeChild(trackEl);
  }

  return {
    addTrack: addTrack,
    stopAll:  stopAll
  };

}
