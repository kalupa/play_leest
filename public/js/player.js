/**
  SoundCloud player interface
  @constructor
  @param {Object} initValues - sdk initialization values

*/
function Player(initValues) {
  var _self = this;

  /** setup SoundCloud sdk object */
  this.load = function(){
    SC.initialize(initValues);
  };

  /** Kill currently playing sound */
  this.stopAll = function(e) {
    if ( e ) { // only preventDefault if stopAll is called by an event
      e.preventDefault();
    }
    if ( _self.currentSound ) {
      $('.playlist_item').each(removeAllCurrent);

      _self.currentSound.stop();
      _self.currentSound = undefined;
      _self.$currentSoundEl = undefined;
    }
    function removeAllCurrent() {
      $( this ).removeClass('current');
    }
  };

  /** Play sound attached to the current event great-grandparent. */
  /* FIXME: this is very DOM dependent */
  this.playSound = function(e){
    var $soundEl = $( this ).parents().eq(2),//this.parentNode.parentNode.parentNode,
        soundId = $soundEl.data('sound-id'),
        $self = $( this );

  e.preventDefault();

    if ( _self.currentSound ) {
      $('.play_button').removeClass('pause');
      if ( _self.currentSound.paused ){
        $soundEl.addClass('current');
        $( this ).addClass('pause').off().on('click', _self.pauseSound);
        _self.currentSound.play();
      } else if ( _self.currentSound.playState && $soundEl !== _self.$currentSoundEl) {
        _self.currentSound.stop();
      }
    } else {
      SC.stream('/tracks/' + soundId, streamSound);
    }
    //this only needs to be accessed by playSound()
    function streamSound(sound) {
      _self.currentSound = sound;
      _self.$currentSoundEl = $soundEl;
      $soundEl.addClass('current');
      $self.addClass('pause').off().on('click', _self.pauseSound);
      sound.play({
        onfinish: function _onfinish() {
          $soundEl.addClass('current');
          $self.removeClass('pause').off().on('click', _self.playSound);
          if ( $soundEl.next() ) {
            $soundEl.click();
          } else {
            _self.stopAll();
          }
        }
      });
    }
  };

  /** Pause this sound playback */
  this.pauseSound = function(e) {
    e.preventDefault();
    $( this ).removeClass('pause').off().on('click', _self.playSound);
    _self.currentSound.pause();
  };

}
