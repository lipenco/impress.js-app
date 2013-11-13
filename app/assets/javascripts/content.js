

$(document).on('click', '.add-picture', function() { 
    parent.$("#data-store").data()["imageNum"] += 1;
    var imageCounter = parent.$("#data-store").data()["imageNum"];
    var imageField = $('<img id="link'+imageCounter+'" class="decor" style="position: absolute" >');
    $(this).parent().find(".step-wrapper").prepend(imageField);   
    var inputField = $('<input class="photo-input" style="visibility: collapse; width: 0px;" type="file">');
    $(this).parent().find(".step-wrapper").before(inputField); 
    inputField.click();


    // imageCounter = parent.$("#data-store").data("imageNum");

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
            var imageCounter = parent.$("#data-store").data()["imageNum"];
            var response1 = JSON.parse(xhr.responseText);
            var response = JSON.parse(xhr.responseText).data.link;
            console.log(response);
         if (document.getElementById('link'+imageCounter) ) {
           document.getElementById('link'+imageCounter).src  = response;
           }
            
         

        }
        // Ok, I don't handle the errors. An exercice for the reader.
        xhr.setRequestHeader('Authorization', 'Client-ID 24ef784af7d62de');

        /* And now, we send the formdata */
        xhr.send(fd);


}


$(document).on('click', '.add-edit', function() {
   $(this).parent().find(".step-wrapper").prepend('<div class="editor" contenteditable="true"><h2  class="text2">Title</h2></div>'); 
   $(".editor").popline(); 
});


// $(document).on('dblclick', '.slide', function(e) {
//   var editor = $('<div class="editor" contenteditable="true" style="position:absolute"><h2  class="text2">Title</h2></div>').css({
//         'left' : e.pageX,
//         'top'  : e.pageY
//     });
//    $(this).find(".step-wrapper").prepend(editor);
//    $(".editor").popline(); 
//    return false;
// });


$(document).on('click', '.add-wallpaper', function(event){ 
   $(".images").hide();
    if ( ! $(this).hasClass("active")) {
        $('.container-fluid').before("<div class='images-absolute'></div>");
        $(".images-absolute").load("/images_background.html", null,
        function (responseText, status, response) {}); 
        $(this).addClass("active");
        $('.add-icon').removeClass("active");
        $('.add-deco').removeClass("active");
        $('.add-edit').removeClass("active"); 
        $('.add-background').removeClass("active"); 
    } else {
      $(".images-absolute").hide("slow");
      $(this).removeClass("active");
    } 
    return false;
}).on('click', function (e){
      event.target = $(".step");
      $(".images-absolute").hide("slow");
     $('.add-wallpaper').removeClass("active");
});


$(".slide").on('click', function (){
     $(".images-absolute").hide("slow");
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
        $('.add-wallpaper').removeClass("active"); 
        
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
        $('.add-wallpaper').removeClass("active"); 
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
        $('.add-wallpaper').removeClass("active");
    } else {
      $(".images").hide("slow");
      $(this).removeClass("active");
    } 
    return false;
});



$(document).on('click', '.images img', function(){ 
  if ($('.add-icon').hasClass("active")) {
     parent.$("#data-store").data()["imageNum"] +=1;
     var imageCounter = parent.$("#data-store").data()["imageNum"];
      var src = $(this).data('src');
      var imageField = $('<img id="link'+imageCounter+'"style="position: absolute" >');
      $(this).parent().prev('.step').find(".step-wrapper").prepend(imageField); 
      document.getElementById('link'+imageCounter).src = src;
      
   }
  if ($('.add-background').hasClass("active")) {
    var src = $(this).data('src');
    $(this).parent().prev('.step').css("background" , "url("+src+")");
  } 
  if ($('.add-deco').hasClass("active")) {
     parent.$("#data-store").data()["imageNum"] +=1;
     var imageCounter = parent.$("#data-store").data()["imageNum"];
      var src = $(this).data('src');
      var imageField = $('<img id="link'+imageCounter+'" class="decor" style="position: absolute, top:0">');
      $(this).parent().prev('.step').find(".step-wrapper").prepend(imageField); 
      document.getElementById('link'+imageCounter).src = src;  
   }
  
    
});

$(document).on('click', '.images-absolute img', function(){ 
   if ($('.add-wallpaper').hasClass("active")) {
    var src = $(this).data('src');
    $('body').css("background" , "url("+src+")");
    parent.$("#data-store").data()["wallpaper"] = src;
  }  
});

var draggableAndSortable = function() {

   $( "#sortable" ).sortable({ handle: ".sort-slides", axis: "y" });
  
   $(document).on('mousedown', '.step-wrapper img', function() {   
         if ($(event.target).hasClass("icon-on-img")) {
            return false;
           }  
        if ($(event.target).hasClass("icon-on-edit")) {
            return false;
           }  

        $(this).resizable();
        $(".ui-wrapper").draggable().append('<img class="icon-layer-up icon-on-img" src="/assets/icon_layer_up.png"><img class="icon-layer-down icon-on-img" src="/assets/icon_layer_down.png"><img class="icon-trash1 icon-on-img" src="/assets/icon_trash.png"><img class="icon-copy-el icon-on-img" src="/assets/icon_copy.png">');  
        $(".icon-on-img").css('z-index', 2);
   });

  $(document).on('mouseover', '.editor', function(event) { 
     $(".editor").popline();
    });

 


};



 $(document).on('click', '.editor', function(event) {      
    if ($(event.target).hasClass("icon-on-edit")) {
            return false;
           }   
    if ($(event.target).hasClass("no-edit")) {
        return false;
       }  
        $(this).resizable().draggable({ handle: ".icon-move" }).append('<img class="icon-layer-up2 icon-on-edit" src="/assets/icon_layer_up.png"><img class="icon-layer-down2 icon-on-edit" src="/assets/icon_layer_down.png"><img class="icon-trash2 icon-on-edit" src="/assets/icon_trash.png"><i class="icon-move icon-on-edit"></i><i class="icon-font font2 icon-on-edit"></i><img class="icon-font-size icon-on-edit" src="/assets/font_size2.png">');  
        $(".icon-on-edit").css('z-index', 2);
   });


$(document).on('click', '.icon-layer-up', function() { 
  var currentIndex = $(this).parent(".ui-wrapper").css("z-index"); 
  if ( currentIndex == "auto" ) {
    currentIndex = 0;
  }
  var num = parseInt(currentIndex)+ 1;
   $(this).parent(".ui-wrapper").css("z-index", num );
});

$(document).on('click', '.icon-layer-up2', function() { 
  var currentIndex = $(this).parent(".editor").css("z-index"); 
  if ( currentIndex == "auto" ) {
    currentIndex = 0;
  }
  var num = parseInt(currentIndex)+ 1;
   $(this).parent(".editor").css("z-index", num );
});

$(document).on('click', '.icon-layer-down', function() {  
  var currentIndex = $(this).parent(".ui-wrapper").css("z-index"); 
  if ( currentIndex == "auto" ) {
    currentIndex = 0;
  }
  var num = parseInt(currentIndex)-1 ;
   $(this).parent(".ui-wrapper").css("z-index", num );
});

$(document).on('click', '.icon-layer-down2', function() {  
  var currentIndex = $(this).parent(".editor").css("z-index"); 
  if ( currentIndex == "auto" ) {
    currentIndex = 0;
  }
  var num = parseInt(currentIndex)-1 ;
   $(this).parent(".editor").css("z-index", num );
});

 $(document).on('click', '.icon-trash1', function() { 
      $(this).parent(".ui-wrapper").find("img").hide("slow"); 
      $(this).parent(".ui-wrapper").remove();
      parent.$("#data-store").data()["imageNum"]-=1;

   });


  $(document).on('click', '.icon-copy-el', function() { 
    $(this).parent(".ui-wrapper").after($(this).parent(".ui-wrapper").find(".decor").clone().show("slow"));
    parent.$("#data-store").data()["imageNum"]+=1;
   });


 $(document).on('click', '.icon-trash2', function() { 
     $(this).parent(".editor").hide("slow"); 
 });

$(document).on('click', '.font2', function() { 
   $('.fonts-size-container').hide(); 
     var $this_container = $(this).parent().find(".fonts-container"); 
    if ( !$(this).hasClass("active") ) {
        $(this).addClass("active"); 
        if ( !$this_container.hasClass("active")) {
            $(this).parent().append("<div class='fonts-container'></div>");    
            $(this).parent().find(".fonts-container").load("/fonts.html", null,
            function (responseText, status, response) {});
            $this_container.addClass("active");
        } else {
            $this_container.css("display" , "block");
        }
    } else {
        $this_container.hide("slow");
        $(this).removeClass("active");
    }   
});


$(document).on('click', '.icon-font-size', function() { 
   $('.fonts-container').hide();
   var $this_container = $(this).parent().find(".fonts-size-container");
   if ( !$(this).hasClass("active") ) {
        $(this).addClass("active"); 
        if ( !$this_container.hasClass("active")) {
            $(this).parent().append("<div class='fonts-size-container'></div>");    
            $(this).parent().find(".fonts-size-container").load("/fontssize.html", null,
            function (responseText, status, response) {});
            $this_container.addClass("active");
        } else {
            $this_container.css("display" , "block");
        }
    } else {
        $this_container.hide("slow");
        $(this).removeClass("active");
    }   
}); 



$(document).on('click', '.fonts-size-container ul li', function(){  
    var $el = $(this);
    $el.siblings().removeClass('activefont').find('.icon-check').remove();
    $el.addClass('activefont').append('<i class="icon-check"></i>');
    var fontSize = $el.data('fontsize');
    $(this).closest(".editor").find('.text2').css('font-size', fontSize);
});



if (parent.$("#data-store").data("text") == undefined ) {
    parent.$("#data-store").data("text", ['Lato']);
    } 
$(document).on('click', '.fonts-container ul li', function(){  
    var $el = $(this);
    var fontName = $el.data('fontname');
    $(this).closest(".editor").find('.text2').css('font-family', fontName);
     parent.$("#data-store").data("text").push($el.data('fontname'));
    WebFontConfig = {
        google: { families: parent.$("#data-store").data("text")
      }  
    };
    fontLoad();
});



var fontLoad = function() {
   var wf = document.createElement('script');
    wf.id = 'font-script';
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  

}



