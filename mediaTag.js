// Simple API - will fetch all tags 
var jsmediatags = require("jsmediatags");
 

function getTags(filename){
  jsmediatags.read(filename, {
  onSuccess: function(tag) {
    //console.log(tag);
    albumArt(tag.tags);
  },
  onError: function(error) {
    console.log(':(', error.type, error.info);
  }
});
}
function albumArt(tags){
    var image = tags.picture;
      if (image) {
        var base64String = "";
        for (var i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i]);
        }
        var base64 = "data:" + image.format + ";base64," +
                window.btoa(base64String);
        document.getElementById('album-art').setAttribute('src',base64);
      } else {
        document.getElementById('album-art').style.display = "album-art.png";
        console.log("failed!");
      }
    }
