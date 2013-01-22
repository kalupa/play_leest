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
    var items;
    if ( e ) { // only preventDefault if stopAll is called by an event
      e.preventDefault();
    }
    if ( _self.currentSound ) {
      items = document.querySelectorAll('.playlist_item');
      if ( items.length ) {
        for (var i in items){
          removeClass(items[i], 'current');
        }
      }
      _self.currentSound.stop();
      _self.currentSound = undefined;
      _self.currentSoundEl = undefined;
    }
  };

  /** Play sound attached to the current event great-grandparent. */
  /* FIXME: this is very DOM dependent */
  this.playSound = function(e){
    var soundEl = this.parentNode.parentNode.parentNode,
        soundId = soundEl.dataset.soundId,
        that = this;

  e.preventDefault();

    if ( _self.currentSound ) {
      removeClass(_self.currentSoundEl.querySelector('.play_button'), 'pause');
      if ( _self.currentSound.paused ){
        addClass(soundEl, 'current');
        addClass(that, 'pause');
        this.removeEventListener('click', _self.playSound);
        this.addEventListener('click', _self.pauseSound);
        _self.currentSound.play();
      } else if ( _self.currentSound.playState && soundEl !== _self.currentSoundEl) {
        _self.currentSound.stop();
      }
    } else {
      SC.stream('/tracks/' + soundId, streamSound);
    }
    //this only needs to be accessed by playSound()
    function streamSound(sound) {
      _self.currentSound = sound;
      _self.currentSoundEl = soundEl;
      addClass(soundEl, 'current');
      addClass(that, 'pause');
      that.removeEventListener('click', _self.playSound);
      that.addEventListener('click', _self.pauseSound);
      sound.play({
        onfinish: function _onfinish() {
          removeClass(soundEl, 'current');
          removeClass(that, 'pause');
          that.removeEventListener('click', _self.pauseSound);
          that.addEventListener('click', _self.playSound);
          if ( soundEl.nextElementSibling ) {
            playNextSound(soundEl.nextElementSibling);
          } else {
            _self.stopAll();
          }
        }
      });
    }
  };

  /** Pause this sound playback */
  this.pauseSound = function(e) {
    var soundEl = this.parentNode.parentNode.parentNode,
        soundId = soundEl.dataset.soundId;

    e.preventDefault();
    removeClass(this, 'pause');
    this.addEventListener('click', _self.playSound);
    this.removeEventListener('click', _self.pauseSound);
    _self.currentSound.pause();
  };

  /** Play the next sound in the queue */
  /* uses the next element */
  function playNextSound(soundEl) {
    if ( soundEl ) {
      soundEl.querySelector('.play_button').click();
    }
  }

}
