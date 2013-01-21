/**
  SoundCloud player interface
  @constructor */
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
    }
  };

  /** Play sound attached to the current event grandparent. */
  /* FIXME: this is very DOM dependent */
  this.playSound = function(e){
    var soundEl = this.parentNode.parentNode,
        soundId = soundEl.dataset.soundId;
    e.preventDefault();

    console.log(soundEl);

    if ( soundEl !== _self.currentSoundEl ) {
      if ( _self.currentSound ) {
        _self.currentSound.stop();
      }
      SC.stream('/tracks/' + soundId, streamSound);
    }
    //this only needs to be accessed by playSound()
    function streamSound(sound) {
      _self.currentSound = sound;
      _self.currentSoundEl = soundEl;
      addClass(soundEl, 'current');
      sound.play({
        onfinish: function _onfinish() {
          removeClass(soundEl, 'current');
          playNextSound(soundEl.nextElementSibling);
        }
      });
    }
  };

  /** Play the next sound in the queue */
  /* uses the next element */
  function playNextSound(soundEl) {
    if ( soundEl ) {
      soundEl.querySelector('.play_button').click();
    }
  }

}
