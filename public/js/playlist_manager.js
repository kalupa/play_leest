/**
  Manages a playlist
  @constructor
  @param {Player} player - instance of a SoundCloud player
  */
function PlaylistManager(player) {
  var _self = this;

  /** Adds a SoundCloud sound URL to the queue */
  this.addSoundEvent = function(e) {
    e.preventDefault();
    $('#sound_url').val(function(idx, soundUrl) {
      if ( soundUrl !== '' ) {
        SC.get('/resolve', { url: soundUrl }, _self.addSound);
        return '';
      }
      return soundUrl;
    });
    return this;
  };

  /** Creates DOM objects and attaches events for a new sound element */
  this.addSound = function(sound){
    if ( !sound.errors ) {
      $newSound = $('#list').append(renderSound(sound));
      $newSound.find('.play_button').eq(0).on('click', player.playSound);
      $newSound.find('.remove_sound').eq(0).on('click', removeSound);
    }
  };

  /** Creates all the DOM nodes for representing a sound */
  function renderSound(sound) {
    var $htmlEl = $('<li></li>');

    $htmlEl.addClass('playlist_item ' + sound.kind).
      data('sound-id', sound.id).
      attr( {'id': 'sc_' + sound.kind + '_' + sound.id } ).
      append('<div><img src="' + sound.artwork_url + '"></div>').
      append(renderHeader(sound)).
      append(renderNav());

    $htmlEl.find('.move_up').eq(0).on('click', moveSoundUp);
    $htmlEl.find('.move_down').eq(0).on('click', moveSoundDown);

    return $htmlEl;
  }

  /** Removes the sound at the event grandparent. */
  /* FIXME: DOM dependency */
  function removeSound(e){
    e.preventDefault();
    var $thisSound = $( this ).parents().eq(1);
    if ( $thisSound === player.$currentSoundEl ) {
      player.currentSound.stop();
    }
   $thisSound.remove();
   return this;
  }

  /** Renders the sound header */
  function renderHeader(sound) {
    var $htmlEl = $('<div class="header"></div>');
    $htmlEl.
      append($('<div class="play_button_container"><button class="play_button">Play</button>')).
      append($('<div class="title">' + sound.title + '</div>'));
    return $htmlEl;
  }
  /** Renders the sound navigation DOM nodes. */
  function renderNav() {
    var $htmlEl = $('<div class="nav"></div>');
    $htmlEl.
      append($('<button class="move_up">Up</button>')).
      append($('<button class="move_down">Down</button>')).
      append($('<button class="remove_sound">Remove</button>'));
    return $htmlEl;
  }
  /** Moves the sound at the event grandparent up by one */
  /* FIXME: DOM dependency */
  function moveSoundUp(e) {
    e.preventDefault();
    var $thisSound = $( this ).parents().eq(1),
        $prevSound = $thisSound.prev();

    if ( $prevSound ) { // don't try to wrap
      $prevSound.insertBefore( $thisSound );
    }
    return this;
  }
  /** Moves the sound at the event grandparent down by one */
  /* FIXME: DOM dependency */
  function moveSoundDown(e) {
    e.preventDefault();
    var $thisSound = $( this ).parents().eq(1),
        $nextSound = $thisSound.next();

    if ( $nextSound ) {
      $nextSound.insertAfter( $thisSound );
    }
    return this;
  }
}
