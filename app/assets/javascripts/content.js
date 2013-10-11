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

        /* It is! */
        document.body.className = "uploading";

        /* Lets build a FormData object*/
        var fd = new FormData(); // I wrote about it: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
        fd.append("image", file); // Append the file
        var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
        xhr.open("POST", "https://api.imgur.com/3/image.json"); // Boooom!
        xhr.onload = function () {
            imageCounter;
            var response1 = JSON.parse(xhr.responseText);
            var response = JSON.parse(xhr.responseText).data.link;
            document.getElementById('link'+imageCounter).src  = response;
            parent.$("#data-store").data()["imageNum"] = imageCounter;

        }
        // Ok, I don't handle the errors. An exercice for the reader.
        xhr.setRequestHeader('Authorization', 'Client-ID 24ef784af7d62de');

        /* And now, we send the formdata */
        xhr.send(fd);


}


$(document).on('click', '.add-edit', function() {
    var editField = $('<div class="editor" contenteditable="true"><p>New text</p></div>');
    $(this).parent().find(".step-wrapper").prepend(editField);   
     $(".editor").popline(); 

});



// window.ondragover = function(e) {e.preventDefault()}
// window.ondrop = function(e) {e.preventDefault(); upload(e.dataTransfer.files[0]); }
    

 



