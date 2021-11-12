window.onload = function () {
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const save = document.getElementById('save');

    let mediaRecorder = null;
    let audioData = [];

    function startAudio() {
        navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true
          })
          .then(function (audio) { // promiseのresultをaudioStreamに格納
            mediaRecorder = new MediaRecorder(stream);
            audioStream = audio;
          })
          .catch(function (error) { // error
            console.error('mediaDevice.getUserMedia() error:', error);
            return;
          });

          start.addEventListener('click', function(){
            startAudio();
    }
