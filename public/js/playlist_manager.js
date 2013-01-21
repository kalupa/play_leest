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
      SC.get('/resolve', { url: trackUrl }, setupTrackAndEvents);
    }
  }

  // private
  function setupTrackAndEvents(track){
    if (track.errors === undefined) {
      newTrack     = $('#list').appendChild(renderTrack(track));
      playButton   = newTrack.querySelector('.play_button');
      removeButton = newTrack.querySelector('.remove_track');

      playButton.addEventListener('click', player.playTrack);
      removeButton.addEventListener('click', removeTrack);
    }
  }

  function removeTrack(e){
    var trackEl = this.parentNode;
    e.preventDefault();
    if (trackEl === player.currentTrackEl) {
      player.currentTrack.stop();
    }
    // remove listeners before they go out of scope
    trackEl.querySelector('.play_button').removeEventListener('click', player.playTrack);
    trackEl.querySelector('.remove_track').removeEventListener('click', removeTrack);
    trackEl.querySelector('.move_up').removeEventListener('click', moveTrackUp);
    trackEl.querySelector('.move_down').removeEventListener('click', moveTrackDown);

    trackEl.parentNode.removeChild(trackEl);
  }


  function renderTrack(track) {
    var htmlEl        = createEl('li'),
        moveUpButton,
        removeButton;

    addClass(htmlEl, 'playlist_item ' + track.kind);
    htmlEl.dataset.trackId = track.id;
    htmlEl.id              = track.kind + '_' + track.id;

    htmlEl.appendChild(renderArtwork(track));
    htmlEl.appendChild(renderHeader(track));
    htmlEl.appendChild(renderNav());

    htmlEl.querySelector('.move_up').addEventListener('click', moveTrackUp);
    htmlEl.querySelector('.move_down').addEventListener('click', moveTrackDown);

    return htmlEl;
  }

  function renderArtwork(track) {
    var artwork     = createEl('div'),
        img         = createEl('img'),
        artwork_url = track.artwork_url;

    addClass(artwork, 'artwork');
    img.src = artwork_url;

    artwork.appendChild(img);
    return artwork;
  }
  function renderHeader(track) {
    var htmlEl = createEl('div');
    addClass(htmlEl,'header');
    htmlEl.appendChild(renderPlayButton(track));
    htmlEl.appendChild(renderTrackTitle(track));
    return htmlEl;
  }
  function renderPlayButton(track){
    var playButton = createEl('button');
    addClass(playButton,'play_button');
    playButton.appendChild(createText('Play'));
    return playButton;
  }
  function renderTrackTitle(track){
    var title = createEl('div');
    addClass(title, 'title');
    title.appendChild(createText(track.title));
    return title;
  }
  function renderNav() {
    var htmlEl     = createEl('div'),
    moveUpButton   = renderMoveUpButton(),
    moveDownButton = renderMoveDownButton();
    addClass(htmlEl, 'nav');
    htmlEl.appendChild(moveUpButton);
    htmlEl.appendChild(moveDownButton);
    htmlEl.appendChild(renderRemoveButton());
    return htmlEl;
  }
  function renderMoveUpButton() {
    var moveUp = createEl('a');
    addClass(moveUp, 'move_up');
    moveUp.href = '#';
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
    addClass(moveDown, 'move_down');
    moveDown.href = '#';
    moveDown.appendChild(createText('Down'));
    return moveDown;
  }
  function moveTrackDown(e) {
    var thisTrack,
        nextTrack,
        playlist;
    e.preventDefault();
    thisTrack = this.parentNode;
    nextTrack = thisTrack.nextElementSibling;
    playlist  = thisTrack.parentNode;

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
    var removeButton   = createEl('a');
    removeButton.href  = '#';
    removeButton.title = 'Remove Track';
    addClass(removeButton, 'remove_track');
    removeButton.appendChild(createText('X'));
    return removeButton;
  }

  return {
    addTrack: addTrack
  };
}
