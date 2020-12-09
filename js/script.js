(function () {
  'use strict';

  const URL_MP3 = './audio/yodel.mp3';
  const URL_AAC= './audio/aactest.mp4';

  const contextMP3 = new AudioContext();
  const playButtonMP3 = document.querySelector('#play_mp3');

  const contextAAC = new AudioContext();
  const playButtonAAC = document.querySelector('#play_aac');

  let bufferMP3;
  let bufferAAC;

  window.fetch(URL_MP3)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => contextMP3.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      playButtonMP3.disabled = false;
      bufferMP3 = audioBuffer;
    });

  window.fetch(URL_AAC)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => contextAAC.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      playButtonAAC.disabled = false;
      bufferAAC = audioBuffer;
    });

  playButtonMP3.onclick = () => play(bufferMP3, contextMP3);
  playButtonAAC.onclick = () => play(bufferAAC, contextAAC);

  function play(audioBuffer, context) {
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
  }
}());
