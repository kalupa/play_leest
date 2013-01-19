function PlaylistManager(player) {
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
        if (track.errors === undefined) {
          newTrack     = $('#list').appendChild(renderTrack(track));
          playButton   = newTrack.querySelector('.play_button');
          removeButton = newTrack.querySelector('.remove_track');

          playButton.addEventListener('click', player.playTrack);
          removeButton.addEventListener('click', removeTrack);
        }
      });
    }
  }

  function removeTrack(e){
    e.preventDefault();
    var trackEl = this.parentNode;
    if (trackEl === player.currentTrackEl) {
      player.currentTrack.stop();
    }
    trackEl.querySelector('.play_button').removeEventListener('click', player.playTrack);
    trackEl.querySelector('.remove_track').removeEventListener('click', removeTrack);
    trackEl.parentNode.removeChild(trackEl);
  }

  // private
  function renderTrack(track) {
    var htmlEl        = createEl('li'),
        moveUpButton,
        removeButton;

    htmlEl.className       = 'playlist_item ' + track.kind;
    htmlEl.dataset.trackId = track.id;
    htmlEl.id              = track.kind + '_' + track.id;

    moveUpButton   = renderMoveUpButton();
    moveDownButton = renderMoveDownButton();

    htmlEl.appendChild(renderArtwork(track));
    htmlEl.appendChild(renderPlayButton(track));
    htmlEl.appendChild(renderTrackTitle(track));
    htmlEl.appendChild(moveUpButton);
    htmlEl.appendChild(moveDownButton);
    htmlEl.appendChild(renderRemoveButton());

    moveUpButton.addEventListener('click', moveTrackUp);
    moveDownButton.addEventListener('click', moveTrackDown);

    return htmlEl;
  }

  function renderArtwork(track) {
    var artwork       = createEl('img');
    var artwork_url   = track.artwork_url;
    if (artwork_url === null) {
      artwork_url = 'https://i1.sndcdn.com/avatars-000030524759-jtej49-t200x200.jpg?0c1a674';
    }
    artwork.className = 'artwork';
    artwork.src       = artwork_url;
    return artwork;
  }
  function renderPlayButton(track){
    var playButton       = createEl('a');
    playButton.href      = '#';
    playButton.className = 'play_button';
    playButton.appendChild(createText('Play'));
    return playButton;
  }
  function renderTrackTitle(track){
    var title       = createEl('div');
    title.className = 'title';
    title.appendChild(createText(track.title));
    return title;
  }
  function renderMoveUpButton() {
    var moveUp = createEl('a');
    moveUp.href = '#';
    moveUp.className = 'move_up';
    moveUp.appendChild(createText('Up'));
    return moveUp;
  }
  function moveTrackUp(e) {
    var thisTrack,
        prevTrack,
        playlist;
    e.preventDefault();
    thisTrack = this.parentNode;
    prevTrack = thisTrack.previousElementSibling;
    if (prevTrack !== null) { // don't try to wrap
      playlist = thisTrack.parentNode;
      playlist.insertBefore( thisTrack, prevTrack );
    }
  }
  function renderMoveDownButton() {
    var moveDown = createEl('a');
    moveDown.href = '#';
    moveDown.className = 'move_down';
    moveDown.appendChild(createText('Down'));
    return moveDown;
  }
  function moveTrackDown(e) {
    var thisTrack,
        nextTrack,
        playlist;
    e.preventDefault();
    thisTrack     = this.parentNode;
    nextTrack     = thisTrack.nextElementSibling;
    playlist      = thisTrack.parentNode;
    if (nextTrack !== null) {
      nextNextTrack = nextTrack.nextElementSibling;
      if (nextNextTrack !== null) {
        playlist.insertBefore( thisTrack, nextNextTrack ); // there's no insertAfter.
      } else {
        playlist.appendChild(thisTrack); // we're at the end.
      }
    }
  }
  function renderRemoveButton(){
    var removeButton       = createEl('a');
    removeButton.href      = '#';
    removeButton.className = 'remove_track';
    removeButton.title     = 'Remove Track';
    removeButton.appendChild(createText('X'));
    return removeButton;
  }

  return {
    addTrack: addTrack
  };
}
