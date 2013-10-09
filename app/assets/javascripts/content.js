var imageCounter;
var contentObject = parent.$("#data-store").data();
    if (! jQuery.isEmptyObject(contentObject)) {
     imageCounter = contentObject["imageNum"];
      } else {
      imageCounter =  0;
      }
 



$(document).on('click', '.add-picture', function() {
   
    imageCounter++;
    var imageField = $('<img id="link'+imageCounter+'"style="position: absolute" >');
    $(this).parent().find(".step-wrapper").prepend(imageField);   
    var inputField = $('<input class="photo-input" style="visibility: collapse; width: 0px;" type="file">');
    $(this).parent().find(".step-wrapper").before(inputField); 
    inputField.click();


    // imageCounter = parent.$("#data-store").data("imageNum");
    return imageCounter;
});
 
$(document).on('change', '.photo-input', function() {
    upload(this.files[0]);

});



function upload(file) {

    if (!file || !file.type.match(/image.*/)) return;

    document.body.className = "uploading";

    var fd = new FormData(); // I wrote about it: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
    fd.append("image", file); // Append the file
    fd.append("key", "6528448c258cff474ca9701c5bab6927"); // Get your own key http://api.imgur.com/
    var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
    xhr.open("POST", "http://api.imgur.com/2/upload.json"); // Boooom!
    xhr.onload = function() {
      imageCounter;
      console.log(imageCounter);
     document.getElementById('link'+imageCounter).src = JSON.parse(xhr.responseText).upload.links.original;
        // document.body.className = "uploaded";


     parent.$("#data-store").data()["imageNum"] = imageCounter;
    }

    xhr.send(fd);
   

}



// window.ondragover = function(e) {e.preventDefault()}
// window.ondrop = function(e) {e.preventDefault(); upload(e.dataTransfer.files[0]); }
    

 



