function PlaylistManager() {
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
    artwork.className = 'artwork';
    artwork.src       = track.artwork_url;
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
    console.log(e, this);
    thisTrack     = this.parentNode;
    nextTrack     = thisTrack.nextElementSibling;
    nextNextTrack = nextTrack.nextElementSibling;
    playlist      = thisTrack.parentNode;
    if (nextNextTrack !== null) {
      playlist.insertBefore( thisTrack, nextNextTrack ); // there's no insertAfter.
    } else if ( nextTrack !== null) {
      playlist.appendChild(thisTrack); // we're at the end.
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
    renderTrack: renderTrack
  };
}
