/**
  Manages a playlist
  @constructor
  @param {Player} player - instance of a SoundCloud player
  */
function PlaylistManager(player) {
  var _self = this;

  /** Adds a SoundCloud sound URL to the queue */
  this.addSoundEvent = function(e) {
    var soundUrlInput = $('#sound_url'),
        soundUrl = soundUrlInput.value,
        playButton,
        removeButton,
        newsound;
    e.preventDefault();
    if ( soundUrl !== '' ) {
      soundUrlInput.value = '';
      SC.get('/resolve', { url: soundUrl }, _self.addSound);
    }
  };

  /** Creates DOM objects and attaches events for a new sound element */
  this.addSound = function(sound){
    if ( !sound.errors ) {
      newSound = $('#list').appendChild(renderSound(sound));
      playButton = newSound.querySelector('.play_button');
      removeButton = newSound.querySelector('.remove_sound');

      playButton.addEventListener('click', player.playSound);
      removeButton.addEventListener('click', removeSound);
    }
  };

  /** Removes the sound at the event grandparent. */
  /* FIXME: DOM dependency */
  function removeSound(e){
    var soundEl = this.parentNode.parentNode;
    e.preventDefault();
    if ( soundEl === player.currentSoundEl ) {
      player.currentSound.stop();
    }
    // remove listeners before they go out of scope
    soundEl.querySelector('.play_button').removeEventListener('click', player.playSound);
    soundEl.querySelector('.remove_sound').removeEventListener('click', removeSound);
    soundEl.querySelector('.move_up').removeEventListener('click', moveSoundUp);
    soundEl.querySelector('.move_down').removeEventListener('click', moveSoundDown);

    soundEl.parentNode.removeChild(soundEl);
  }

  /** Creates all the DOM nodes for representing a sound */
  function renderSound(sound) {
    var htmlEl = createEl('li'),
        moveUpButton,
        removeButton;

    addClass(htmlEl, 'playlist_item ' + sound.kind);
    htmlEl.dataset.soundId = sound.id;
    htmlEl.id = 'sc_' + sound.kind + '_' + sound.id;

    htmlEl.appendChild(renderArtwork(sound));
    htmlEl.appendChild(renderHeader(sound));
    htmlEl.appendChild(renderNav());

    htmlEl.querySelector('.move_up').addEventListener('click', moveSoundUp);
    htmlEl.querySelector('.move_down').addEventListener('click', moveSoundDown);

    return htmlEl;
  }

  /** Renders the artwork DOM node */
  function renderArtwork(sound) {
    var artwork = createEl('div'),
        img = createEl('img'),
        artwork_url = sound.artwork_url;

    addClass(artwork, 'artwork');
    img.src = artwork_url;

    artwork.appendChild(img);
    return artwork;
  }
  /** Renders the sound header */
  function renderHeader(sound) {
    var htmlEl = createEl('div');
    addClass(htmlEl,'header');
    htmlEl.appendChild(renderPlayButton(sound));
    htmlEl.appendChild(renderSoundTitle(sound));
    return htmlEl;
  }
  function renderPlayButton(sound){
    var htmlEl = createEl('div'),
        playButton = createEl('button');
    addClass(htmlEl, 'play_button_container');
    addClass(playButton,'play_button');
    playButton.appendChild(createText('Play'));
    htmlEl.appendChild(playButton);
    return htmlEl;
  }
  function renderSoundTitle(sound){
    var title = createEl('div');
    addClass(title, 'title');
    title.appendChild(createText(sound.title));
    return title;
  }
  /** Renders the sound navigation DOM nodes. */
  function renderNav() {
    var htmlEl = createEl('div'),
        moveUpButton = renderMoveUpButton(),
        moveDownButton = renderMoveDownButton();
    addClass(htmlEl, 'nav');
    htmlEl.appendChild(moveUpButton);
    htmlEl.appendChild(moveDownButton);
    htmlEl.appendChild(renderRemoveButton());
    return htmlEl;
  }
  function renderMoveUpButton() {
    var moveUp = createEl('button');
    addClass(moveUp, 'move_up');
    moveUp.appendChild(createText('Up'));
    return moveUp;
  }
  /** Moves the sound at the event grandparent up by one */
  /* FIXME: DOM dependency */
  function moveSoundUp(e) {
    var thisSound,
        prevSound,
        playlist;
    e.preventDefault();
    thisSound = this.parentNode.parentNode;
    prevSound = thisSound.previousElementSibling;

    if ( prevSound ) { // don't try to wrap
      playlist = thisSound.parentNode;
      playlist.insertBefore( thisSound, prevSound );
    }
  }
  function renderMoveDownButton() {
    var moveDown = createEl('button');
    addClass(moveDown, 'move_down');
    moveDown.appendChild(createText('Down'));
    return moveDown;
  }
  /** Moves the sound at the event grandparent down by one */
  /* FIXME: DOM dependency */
  function moveSoundDown(e) {
    var thisSound,
        nextSound,
        playlist;
    e.preventDefault();
    thisSound = this.parentNode.parentNode;
    nextSound = thisSound.nextElementSibling;
    playlist = thisSound.parentNode;

    if ( nextSound ) {
      nextNextSound = nextSound.nextElementSibling;
      if ( nextNextSound ) {
        playlist.insertBefore( thisSound, nextNextSound ); // there's no insertAfter.
      } else {
        playlist.appendChild(thisSound); // we're at the end.
      }
    }
  }
  function renderRemoveButton(){
    var removeButton = createEl('button');
    addClass(removeButton, 'remove_sound');
    removeButton.appendChild(createText('Remove'));
    return removeButton;
  }

}
