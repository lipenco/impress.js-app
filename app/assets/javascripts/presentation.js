$(document).ready(function () {
    eventsListeners();
    updatePreview();  
    setContent();
    getContentBackToEditor();
    downloadZip();
    animateNumberOfSlides();
    d(); 
     var data = presentationData(); 
     post_to_iframe('/presentation', data, 'post'); 
}); 

var updatePreview = function () {
    setTimeout(function () {
        postData();
    }, 4);
    f();
    var num_slides = getNumberFromShowNum();
    var layout = getLayout();
    var shape = getShape();
    var automated = getAuto();
    var theme = getTheme();
    var substeps = getSubsteps();
    var progress_bar = getProgressBar();
    var source = "?layout=" + layout +
        "&num_slides=" + num_slides +
        "&shape=" + shape +
        "&automated=" + automated +
        "&theme=" + theme +
        "&substeps=" + substeps +
        "&progress_bar=" + progress_bar;
    
    var data = presentationData();

    $("#style-mode").click(function () {
        post_to_iframe('/presentation', data, 'post');
        f();
        d();
        deleteWrapper();   
        
    });
    $("#content-mode").click(function () {
      setTimeout(function () {
        post_to_iframe('/content', data, 'post');
        }, 400);
        e();
        g();
        h();
    });
    var data = presentationData();
    post_to_iframe('/presentation', data, 'post');  
};

 var post_to_iframe = function(path, params, method) {
        method = method || "post"; 
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
             }
        }
    var x = document.getElementById("preview");
    var y = (x.contentWindow || x.contentDocument);
    var body = y.document.querySelector("body");
    body.appendChild(form);
        form.submit();
}




function e() {
    if ($(".appear").css("display") == "none") {
            $(".appear").animate({
                opacity: 1
            }, 500, "easeOutQuint", function () {
                $(".appear").css("display", "block")
            })
    }
 }

function d() {
    $(".appear").css("display", "none")
}

function g() {
    $(".disappear").animate({
        opacity: 0
    }, 500, "easeOutQuint", function () {
        $(".disappear").css("display", "none")
    });
}


function f() {
    $(".disappear").animate({
        opacity: 1
    }, 500, "easeOutQuint", function () {
        $(".disappear").css("display", "block")
    });
}

function h() {
    $('.arrows').addClass('fadeOutRightBig');
    $('.arrows').removeClass('fadeInRightBig');
}




var setContent = function () {
    var style_mode = document.getElementById("style-mode");
    style_mode.addEventListener('click', function () {
        setTimeout(function () {
            postData();  
        }, 1000);
    }, false);
}

var postData = function () {
    var previewDiv = document.getElementById("preview");
    var iframeContent = (previewDiv.contentWindow || previewDiv.contentDocument);
    var slides = iframeContent.document.querySelectorAll(".step");
    var contentObject = $("#data-store").data();
    if (contentObject["wallpaper"] !== undefined) {
         iframeContent.document.querySelector('body').style.backgroundImage = "url(" + contentObject["wallpaper"]+ ")" ;
    }
    if ((contentObject["content[0]"] || contentObject["bacground[0]"]) !== undefined) {
      for (var i = 0; i < slides.length; i++) {
          slides[i].innerHTML = contentObject["content[" + i + "]"];
          slides[i].style.backgroundImage = contentObject["background[" + i + "]"];
      }

    }
}

var getContentBackToEditor = function () {
    var content_mode = document.getElementById("content-mode");
    content_mode.addEventListener('click', function () {
        setTimeout(function () {
            postDataEdit();
        }, 1000);
    }, false);
}

var postDataEdit = function () {
    var x = document.getElementById("preview");
    var y = (x.contentWindow || x.contentDocument);
    var stepWrapper = y.document.querySelectorAll(".step-wrapper");
    var contentObject = $("#data-store").data();
    if (contentObject["content[0]"] !== undefined) {
       for (var i = 0; i < stepWrapper.length; i++) {
          stepWrapper[i].innerHTML = contentObject["content[" + i + "]"];
       }
    }
    var steps = y.document.querySelectorAll(".step");
    if (contentObject["background[0]"] !== undefined) {
       for (var i = 0; i < steps.length; i++) {
          steps[i].style.backgroundImage = contentObject["background[" + i + "]"];
       }
    }
    if (contentObject["wallpaper"] !== undefined) {
    y.$('body').css("background" , "url(" + contentObject["wallpaper"]+ ")" );
    }
}


var getLayout = function () {
    var layoutType = "vertical";
    var layoutbuttons = document.getElementById("layout");
    if (layoutbuttons != null) {
        var activebutton = layoutbuttons.querySelector(".current");
    }
    if (activebutton != null) {
        layoutType = activebutton.id;
    }
    return layoutType;
};



var getNumberFromShowNum = function () {
    var num_sildes;
    if (document.getElementById("showNum") !== null) {
        num_sildes =  document.getElementById("showNum").value || 8;
    }

    return num_sildes;
}

//  var currentNumberOfSlides = function () {
//     var current_slides;
//     var x = document.getElementById("preview");
//     var y = (x.contentWindow || x.contentDocument);
//     var currentSteps = y.document.querySelectorAll('.step');
//         for (var i = 0; i < currentSteps.length; i++) {
//         current_slides = currentSteps.length;
//         }
//     return current_slides;
// }

var getShape = function () {
    var shape = "rectangle";
    var shapegroup = document.getElementById("shape");
    if (shapegroup != null) {
        var shapecurrent = shapegroup.querySelector(".current");
    }
    if (shapecurrent != null) {
        shape = shapecurrent.id;
    }
    return shape;
};

var getAuto = function () {
    var automated = "false";
    var autogroup = document.getElementById("autobuttons");
    if (autogroup != null) {
        var autocurrent = autogroup.querySelector(".current");
    }
    if (autocurrent != null) {
        if (autocurrent.id == "auto") {
            automated = "true";
        }
    }
    return automated;
}

var getTheme = function () {
    var theme = "basic";
    var themegroup = document.getElementById("theme");
    if (themegroup != null) {
        var themecurrent = themegroup.querySelector(".current");
    }
    if (themecurrent != null) {
        theme = themecurrent.id;
    }
    return theme;
}

var getSubsteps = function () {
    var substeps = "false";
    var substepsgroup = document.getElementById("substepsbutton");
    if (substepsgroup != null) {
        var substepscurrent = substepsgroup.querySelector(".current");
    }
    if (substepscurrent != null) {
        if (substepscurrent.id == "substeps") {
            substeps = "true";
        }
    }
    return substeps;
}

var getProgressBar = function () {
    var progress_bar = "no-pbar";
    var progressgroup = document.getElementById("progress");
    if (progressgroup != null) {
        var progresscurrent = progressgroup.querySelector(".current");
    }
    if (progresscurrent != null) {
        progress_bar = progresscurrent.id;
    }
    return progress_bar;
}


var setFocusOnIframe = function () {
    var iframe = $("#preview")[0];
    iframe.contentWindow.focus();
    h();
}




var animateNumberOfSlides = function () {
    var $showNum = $("#showNum");
    $showNum.numberAnimate();
    var counter = getNumberFromShowNum();
    $("#addslide").click(function () {
        counter++;
        $("#showNum").val(counter);
        $showNum.numberAnimate('set', $("#showNum").val());
    });
    $("#decrement_slide").click(function () {
        counter--;
        $("#showNum").val(counter);
        $showNum.numberAnimate('set', $("#showNum").val());
    });
}

var deleteWrapper = function () {
    var x = document.getElementById("preview");
    var y = (x.contentWindow || x.contentDocument);
    y.$(".ui-wrapper").each(function(){
    $(this).find('img').attr('style',$(this).attr('style'));
     });
    y.$('.ui-wrapper').children().unwrap();
    y.$('.ui-resizable-handle').remove();
    y.$('.icon-on-img').remove();
    y.$('.icon-on-edit').remove();
    y.$('.no-edit').remove();
}


var eventsListeners = function () {
    var buttons = document.querySelectorAll(".btn-p");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            setTimeout(function () {
                updatePreview();
            }, 1);
        }, false);
    };

    document.addEventListener("keydown", function (event) {
        if (event.keyCode === 9 || (event.keyCode >= 32 && event.keyCode <= 34) || (event.keyCode >= 37 && event.keyCode <= 40)) {
            setFocusOnIframe();
        }
    }, false);


    $(document).on('click', '.copy-slide', function(event){ 
       $(this).parent().after($(this).parent().clone());
       addNumberToShowNum(); 
       storeContentFromContentMode();
       storeData();
       $(".editor").popline();   
       return false;  
     });

    $(document).on('click', '.new-slide', function(event){
      var newSlideDiv = $('<div class="step slide"><div class="step-wrapper"><div  class="editor" contenteditable="true"><h2>New Slide</h2></div></div><div class="sort-slides"><i class="icon-sort icon-22"></i></div><div class="copy-slide"><i class="icon-copy icon-22"></i></div><div class="new-slide"><i class="icon-plus icon-22"></i></div><div class="delete-slide"><i class="icon-minus icon-22"></i></div><div class="add-picture"><i class="icon-picture icon-22"></i></div><div class="add-deco"><i class="icon-paper-clip  icon-22"></i></div><div class="add-edit"><i class="icon-font icon-22"></i></div><div class="add-background"><i class="icon-edit-sign icon-22"></i></div><div class="add-icon"><i class="icon-flag icon-22"></i></div></div>');
       $(this).parent().after(newSlideDiv);    
       addNumberToShowNum(); 
       storeContentFromContentMode();
       storeData(); 
       $(".editor").popline(); 
       return false;  
     });
     
    $(document).on('click', '.delete-slide', function(event){ 
         $(this).parent().remove();   
         decreseNumberFromShowNum(); 
         storeContentFromContentMode(); 
         storeData();  
         $(".editor").popline();  
         return false;
     });



    var counter = parent.document.getElementById("showNum").value || 9;
    var addNumberToShowNum = function () {
        counter++;
     parent.$("#showNum").val(counter);
     parent.$("#showNum").numberAnimate('set', parent.$("#showNum").val());
     var slideReps = document.querySelectorAll('.slide-rep');
            if (slideReps.length < counter) {
                newDiv = '<li class="slide-rep" data-loc="slide'+counter+'">'+counter+'</li>'
                $(".slide-rep").last().after(newDiv);
            }  
    }
    var decreseNumberFromShowNum = function() {
        counter--;
     parent.$("#showNum").val(counter);
     parent.$("#showNum").numberAnimate('set', parent.$("#showNum").val());
     var slideReps = document.querySelectorAll('.slide-rep');
            if (slideReps.length > counter) {
                $(".slide-rep").last().remove();
            } 
    }  
       
}


var storeData = function () {
    var stepWrapper = document.querySelectorAll('.step-wrapper');
    for (var i = 0; i < stepWrapper.length; i++) {
        // var pictures_number = imageCounter || 0;
        parent.$("#data-store").data("content[" + i + "]", stepWrapper[i].innerHTML);
    }
    var steps = document.querySelectorAll('.step');
    for (var i = 0; i < steps.length; i++) {
      parent.$("#data-store").data("background[" + i + "]", steps[i].style.backgroundImage);
    }
}

var presentationData = function(){
    var data = {
        "num_slides" : getNumberFromShowNum(),
        "layout" : getLayout(),
        "shape" : getShape(),
        "automated" : getAuto(),
        "theme" : getTheme(),
        "substeps" : getSubsteps(),
        "progress_bar" : getProgressBar()
    };    
    var dataObject = $("#data-store").data();
    for ( var key in dataObject ) {
        data[key] = dataObject[key]
    }
    return data;
}
  
var downloadZip = function () {
    var button = document.getElementById('download');
    button.addEventListener('click', function () { 
        var data = presentationData();
        post_to_url('/download', data, 'post');
    }, false)
}

var post_to_url = function(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}



var storeContentFromContentMode = function () {
    var stepWrapper = document.querySelectorAll('.step-wrapper');
    for (var i = 0; i < stepWrapper.length; i++) {
        var content = stepWrapper[i].innerHTML;
        stepWrapper[i].addEventListener('blur', function () {    
          storeData(); 
        }, false);
    }

}


$(document).on('click', '#login', function(){ 
      $(window).resize(centerLoginForm);
      centerLoginForm();
      var $form = $("#login");
      $form.show("slow" );
 });


var centerLoginForm =  function () {
  $("#login").css('left', $(window).width()/2 - $("#login").width()/2);
}



$(document).on('click', '#go-to-sign-up', function(){ 
      $(window).resize(centerLoginForm);
      centerLoginForm();
      $("#login").hide();
      // var $form = $("#sign-up");
      // $form.show("slow" );
 });




    






