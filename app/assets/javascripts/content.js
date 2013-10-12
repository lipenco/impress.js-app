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

// window.ondragover = function(e) {e.preventDefault()};
window.ondrop = function(e) { e.preventDefault(); upload(e.dataTransfer.files[0]); console.log(e.dataTransfer.files[0]) };

function upload(file) {

    if (!file || !file.type.match(/image.*/)) return;

        // document.body.className = "uploading";

        var fd = new FormData(); // I wrote about it: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
        fd.append("image", file); // Append the file
        var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
        xhr.open("POST", "https://api.imgur.com/3/image.json"); // Boooom!
        xhr.onload = function () {
            imageCounter;
            var response1 = JSON.parse(xhr.responseText);
            var response = JSON.parse(xhr.responseText).data.link;
            console.log(response);
          setTimeout(function () {
           document.getElementById('link'+imageCounter).src  = response;
           }, 1500);
            
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


$(document).on('click', '.add-background', function(event){ 
   $(".images").hide();
   $('.add-icon').removeClass("active");
    if ( ! $(this).hasClass("active")) {
        $(this).parent().after("<div class='images'></div>");
        $(".images").load("/images_background.html", null,
        function (responseText, status, response) {}); 
        $(this).addClass("active");
        $('.add-icon').removeClass("active");
    } else {
      $(".images").hide("slow");
      $(this).removeClass("active");
    } 
    return false;
});



$(document).on('click', '.add-icon', function(event){ 
    $(".images").hide();
    $('.add-background').removeClass("active");
    if ( ! $(this).hasClass("active")) {
        $(this).parent().after("<div class='images'></div>");
        $(".images").load("/icons.html", null,
        function (responseText, status, response) {}); 
        $(this).addClass("active");
        $('.add-background').removeClass("active");
    } else {
      $(".images").hide("slow");
      $(this).removeClass("active");
    } 
    return false;
});



$(document).on('click', '.images img', function(){ 
  if ($('.add-icon').hasClass("active")) {
     imageCounter ++;
      var src = $(this).data('src');
      var imageField = $('<img id="link'+imageCounter+'"style="position: absolute" >');
      $(this).parent().prev('.step').find(".step-wrapper").prepend(imageField); 
      document.getElementById('link'+imageCounter).src = src;
      parent.$("#data-store").data()["imageNum"] = imageCounter;
      
   }
  if ($('.add-background').hasClass("active")) {
    var src = $(this).data('src');
    $(this).parent().prev('.step').css("background" , "url("+src+")");
  } 
});


