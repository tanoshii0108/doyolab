window.onload = function () {
    const start = document.querySelector('.start');
    const stop = document.querySelector('.stop');
    //const save = document.querySelector('.save');

    let chunk = [];

    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMediaに対応しています。');
        navigator.mediaDevices.getUserMedia (
           // constraints - only audio needed for this app
           {
              audio: true
           })
     
           // Success callback
           .then(function(stream) {
            const mediaRecorder = new MediaRecorder(stream);
            start.onclick = function() {
                mediaRecorder.start(10000);
                console.log(mediaRecorder.state);
                console.log("録音スタート");
            }

            mediaRecorder.ondataavailable = function(e) {
                chunk.push(e.data);
            }

            stop.onclick = function() {
                mediaRecorder.stop();
                console.log(mediaRecorder.state);
                console.log("録音ストップ");
            }

            mediaRecorder.onstop = function(e) {
                console.log("録音ストップ");
          
                const blob = new Blob(chunk, { 'type' : 'audio/ogg; codecs=opus' });
                chunk = [];
                const audioURL = window.URL.createObjectURL(blob);
                audio.src = audioURL;
                document.write(audioURL);

                deleteButton.onclick = function(e) {
                    evtTgt = e.target;
                    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                  }
          
                //saveButton.onclick = function(e) {
                
                //}
            }


     
     
           })
     
           // Error callback
           .catch(function(err) {
              console.log('getUserMediaの要求を許可してください。: ' + err);
           }
        );
     } else {
        console.log('getUserMediaはこのブラウザに対応していません。');
     }
}