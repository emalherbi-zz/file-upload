function fileUpload(inputName, types, _callback) {
  'use strict';
  var input = document.getElementById(inputName);
  //
  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    alert('Your browser doesn\'t support files.');
    return;
  }
  //
  if (!input.files) {
    alert('Your browser doesn\'t support files.');
    return;
  }
  //
  if (input.files.length === 0) {
    alert('Please, select a file to send!');
    return;
  }
  //
  for (var i = 0, il = input.files.length; i < il; i++) {
    var file = input.files[i];
    var xhr = new XMLHttpRequest();
    //
    if (xhr.upload) {
      //
      var type = file.name.split('.')[1];
      if (types.indexOf(type) === -1) {
        alert('Only extensions are accepted: ' + types + '.');
        return;
      }
      //
      xhr.onreadystatechange = function(e) {
        console.log('onreadystatechange');
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var fileName = xhr.responseText;
            _callback(fileName);
          } else {
            console.log('Error', xhr.statusText);
          }
        }
      };
      //
      xhr.addEventListener('load', function(e) {
        console.log('load');
      }, false);
      //
      xhr.upload.addEventListener('progress', function(e) {
        console.log('progress');
      }, false);
      //
      xhr.open('POST', 'file-upload.php', true);
      xhr.setRequestHeader('X-FILENAME', file.name);
      xhr.send(file);
    }
  }
  //
  return false;
}