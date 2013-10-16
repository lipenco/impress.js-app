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

window.ondragover = function(e) {e.preventDefault();
    //   imageCounter++;
    // var imageField = $('<img id="link'+imageCounter+'"style="position: absolute" >');
    // $(this).parent().find(".step-wrapper").prepend(imageField);   
    // var inputField = $('<input class="photo-input" style="visibility: collapse; width: 0px;" type="file">');
    // $(this).parent().find(".step-wrapper").before(inputField); 
    // inputField.click();
    //  return imageCounter;
};
window.ondrop = function(e) {
      
      e.preventDefault(); 
      upload(e.dataTransfer.files[0]);    
};

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
         if (document.getElementById('link'+imageCounter) ) {
           document.getElementById('link'+imageCounter).src  = response;
           }
            
            parent.$("#data-store").data()["imageNum"] = imageCounter;

        }
        // Ok, I don't handle the errors. An exercice for the reader.
        xhr.setRequestHeader('Authorization', 'Client-ID 24ef784af7d62de');

        /* And now, we send the formdata */
        xhr.send(fd);


}


$(document).on('click', '.add-edit', function() {
   $(".images").hide();
    if ( ! $(this).hasClass("active")) {
        $(this).parent().after("<div class='images'></div>");
        $(".images").load("/editor.html", '.editor-elements',
        function (responseText, status, response) {}); 
        $(this).addClass("active");
        $('.add-icon').removeClass("active");
        $('.add-deco').removeClass("active");
        $('.add-background').removeClass("active");   
    } else {
      $(".images").hide("slow");
      $(this).removeClass("active");
    } 
    return false;



    // var editField = $('<div class="editor" contenteditable="true"><p>New text</p></div>');
    // $(this).parent().find(".step-wrapper").prepend(editField);   
    //  $(".editor").popline(); 

});

$(document).on('click', '.editor-elements.h1', function() {
   $(this).parent().prev('.step').find(".step-wrapper").prepend('<div class="editor" contenteditable="true"><h1>Title</h1></div>'); 
   $(".editor").popline(); 
}); 

$(document).on('click', '.editor-elements.h2', function() {
   $(this).parent().prev('.step').find(".step-wrapper").prepend('<div class="editor" contenteditable="true"><h2>Heading</h2></div>'); 
   $(".editor").popline(); 
}); 

$(document).on('click', '.editor-elements.h3', function() {
   $(this).parent().prev('.step').find(".step-wrapper").prepend('<div class="editor" contenteditable="true"><h3>Heading</h3></div>'); 
   $(".editor").popline(); 
}); 

$(document).on('click', '.editor-elements.h4', function() {
   $(this).parent().prev('.step').find(".step-wrapper").prepend('<div class="editor" contenteditable="true"><h4>Heading</h4></div>'); 
   $(".editor").popline(); 
});

$(document).on('click', '.editor-elements.p', function() {
   $(this).parent().prev('.step').find(".step-wrapper").prepend('<div class="editor" contenteditable="true"><p>Paragraph</p></div>'); 
   $(".editor").popline(); 
}); 

$(document).on('click', '.add-background', function(event){ 
   $(".images").hide();
    if ( ! $(this).hasClass("active")) {
        $(this).parent().after("<div class='images'></div>");
        $(".images").load("/images_background.html", null,
        function (responseText, status, response) {}); 
        $(this).addClass("active");
        $('.add-icon').removeClass("active");
        $('.add-deco').removeClass("active");
        $('.add-edit').removeClass("active"); 
    } else {
      $(".images").hide("slow");
      $(this).removeClass("active");
    } 
    return false;
});



$(document).on('click', '.add-icon', function(event){ 
    $(".images").hide();
    if ( ! $(this).hasClass("active")) {
        $(this).parent().after("<div class='images'></div>");
        $(".images").load("/icons.html", null,
        function (responseText, status, response) {}); 
        $(this).addClass("active");
        $('.add-background').removeClass("active");
        $('.add-deco').removeClass("active");
        $('.add-edit').removeClass("active"); 
    } else {
      $(".images").hide("slow");
      $(this).removeClass("active");
    } 
    return false;
});

$(document).on('click', '.add-deco', function(event){ 
    $(".images").hide();
    $('.add-background').removeClass("active");
    $('.add-icon').removeClass("active");
    if ( ! $(this).hasClass("active")) {
        $(this).parent().after("<div class='images'></div>");
        $(".images").load("/deco.html", null,
        function (responseText, status, response) {}); 
        $(this).addClass("active");
        $('.add-background').removeClass("active");
        $('.add-icon').removeClass("active");
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
  if ($('.add-deco').hasClass("active")) {
     imageCounter ++;
      var src = $(this).data('src');
      var imageField = $('<img id="link'+imageCounter+'" class="decor" style="position: absolute, top:0">');
      $(this).parent().prev('.step').find(".step-wrapper").prepend(imageField); 
      document.getElementById('link'+imageCounter).src = src;
      parent.$("#data-store").data()["imageNum"] = imageCounter;   
   }
});


var draggableAndSortable = function() {

   $( "#sortable" ).sortable({ handle: ".sort-slides", axis: "y" });
  
   $(document).on('mousedown', '.step-wrapper img', function() {   
         if ($(event.target).hasClass("icon-on-img")) {
            return false;
           }   
        $(this).resizable();
        $(".ui-wrapper").draggable().append('<img class="icon-layer-up icon-on-img" src="/assets/icon_layer_up.png"><img class="icon-layer-down icon-on-img" src="/assets/icon_layer_down.png"><img class="icon-trash icon-on-img" src="/assets/icon_trash.png"><img class="icon-copy-el icon-on-img" src="/assets/icon_copy.png">');  
        $(".icon-on-img").css('z-index', 1);
   });

  $(document).on('mouseover', '.editor', function(event) { 
     $(".editor").popline();
    });

  $(document).on('click', '.editor', function(event) {      
        if ($(event.target).hasClass("icon-move")) {
            return false;
           }
        if ($(".icon-move",this).length==0) {
             $(this).append("<i class='icon-move icon'></i>");
         }
        $(this).resizable().draggable({ handle: ".icon-move" }); 
        $(this).css('position', 'absolute');
        storeData(); 
    return false;
   });
  
};

$(document).on('click', '.icon-layer-up', function(event) {  
  console.log($(this).before().find('.decor'));
  $(this).prev('.ui-wrapper').find('.decor').css( "position", "absolute");
 return false;
});

$(document).on('click', '.icon-trash', function() {  
  $(this).parent().remove();
});


