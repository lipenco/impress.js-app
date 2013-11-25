$(document).ready(function () {
    eventsListeners();
    setContent();
    downloadZip();
    savePresentation();
    animateNumberOfSlides();
    d(); 
    var data = presentationData();
    post_to_iframe('/presentation/new', data, 'post'); 
   
}); 


var updatePreview = function () {
    var x = document.getElementById("preview");
    var presId = $(x.contentDocument).find('#id-data').data('presentationid');
    if (presId ==  "") {
        var data = presentationData();
       post_to_iframe('/presentation/new', data, 'post');
    } else { 
       var data = presentationData();
       $.ajax({
            url: "/presentation/"+presId,
            type: 'PUT',
            data: data,
            success: function(result) {
              path = "/presentation/"+presId+"/edit"
              post_to_iframe(path, data, 'post');  
            }
        });
    } 
    f(); 
};


$(document).on('click', '#style-mode', function(){
    storeData();
    setTimeout(function () {
        var x = document.getElementById("preview");
        var presId =  $(document).find('iframe')[0].contentDocument.location.pathname.split("/")[2];
        if (presId == null || isNaN(presId)) {  
            var data = presentationData();     
            post_to_iframe('/presentation/new', data, 'post');
        } else {
           var data = presentationData();   
           $.ajax({
                url: "/presentation/"+presId,
                type: 'PUT',
                data: data,
                success: function(result) {
                  path = "/presentation/"+presId+"/edit";
                  post_to_iframe(path, data, 'post');  
                }
            });
          } 
    }, 500);
    f();
    d();
});
    


$(document).on('click', '#content-mode', function(){ 
    var x = document.getElementById("preview");
    var presId = $(document).find('iframe')[0].contentDocument.location.pathname.split("/")[2];
    if (presId == null || isNaN(presId) ) {
        var data = presentationData();
        console.log("emptyid");
       post_to_iframe('/content', data, 'post');
    } else {
       var data = presentationData();
       post_to_iframe('/presentation/'+presId+'/content', data, 'post'); 
    } 
        e();
        g();
        hintAnimation();
    $("#loading").css('display', 'block');
});

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
    y.$('img.icon-on-edit').remove();
    y.$('.no-edit').remove();
    y.$('.fonts-container').remove();
    y.$('fonts-size-container').remove();
}

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
        var athenticationToken = $(document).find('input[name=authenticity_token]');
        athenticationToken.clone().appendTo(form);

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

function hintAnimation() {
    $('.arrows').addClass('fadeOutRightBig');
    $('.arrows').removeClass('fadeInRightBig');
}




var setContent = function () {
    var style_mode = document.getElementById("style-mode");
    if (style_mode !== null) {
        style_mode.addEventListener('click', function () {
            deleteWrapper();
            setTimeout(function () {
                postData();  
            }, 100);
        }, false);
    }
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
          if (contentObject["background[" + i + "]"] !== "") {
            slides[i].style.backgroundImage = contentObject["background[" + i + "]"];
          }
      }

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
    if (progressgroup !== null) {
        var progresscurrent = progressgroup.querySelector(".current");
    }
    if (progresscurrent !== null) {
        progress_bar = progresscurrent.id;
    }
    return progress_bar;
}

var getName = function () {
    var name = "untitled presentation";
    nameInput = document.getElementById("presentation-name").value;
    if ( nameInput !== "" ) {
        name = nameInput;
    }
    return name;   
}


var setFocusOnIframe = function () {
    var iframe = $("#preview")[0];
    iframe.contentWindow.focus();
    hintAnimation();
}




var animateNumberOfSlides = function () {
    var $showNum = $("#showNum");
    $showNum.numberAnimate();
    $("#addslide").click(function () {
        var counter = parseInt(getNumberFromShowNum()) + 1 ;
        $("#showNum").val(counter );
        $showNum.numberAnimate('set', counter );
    });
    $("#decrement_slide").click(function () {
        var counter = parseInt(getNumberFromShowNum()) - 1 ;
        $("#showNum").val(counter);
        $showNum.numberAnimate('set', counter);
    });
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
        var target = event.target || event.srcElement;
        if(target.id == "presentation-name")return;
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
      var newSlideDiv = $('<div class="step slide"><div class="step-wrapper"></div><div class="sort-slides"><i class="icon-sort icon-22"></i></div><div class="copy-slide"><i class="icon-copy icon-22"></i></div><div class="new-slide"><i class="icon-plus icon-22"></i></div><div class="delete-slide"><i class="icon-minus icon-22"></i></div><div class="add-picture"><i class="icon-picture icon-22"></i></div><div class="add-deco"><i class="icon-paper-clip  icon-22"></i></div><div class="add-edit"><i class="icon-font icon-22"></i></div><div class="add-background"><i class="icon-edit-sign icon-22"></i></div><div class="add-icon"><i class="icon-flag icon-22"></i></div></div>');
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



    var counter = parent.document.getElementById("showNum").value || 8;

    var addNumberToShowNum = function () {
        counter++;
     parent.$("#showNum").val(counter);
     parent.$("#showNum").numberAnimate('set', parent.$("#showNum").val());
     parent.$("#showNum").data("numberanimate-value", counter );
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
        "progress_bar" : getProgressBar(),
        "name" : getName(),
    };    
    var dataObject = $("#data-store").data();
    for ( var key in dataObject ) {
        data[key] = dataObject[key]
    }
    return data;
}

var savePresentation = function () {
    var button = document.getElementById('save-presentation');
    if (button !== null) { 
        button.addEventListener('click', function () { 
            var x = document.getElementById("preview");
            // current_path = $(document).find('iframe')[0].contentDocument.location.pathname
            var presId = $(x.contentDocument).find('#id-data').data('presentationid');
            if (presId == "" ) {
                path = "/presentation";
                var data = presentationData();
                post_to_iframe(path, data, 'post');  
            } else {
                // path = "/presentation/"+presId+"/edit"     
               var data = presentationData();
               $.ajax({
                    url: "/presentation/"+presId,
                    type: 'PUT',
                    data: data,
                    success: function(result) {
                      path = "/presentation/"+presId+"/edit"
                      post_to_iframe(path, data, 'post');  
                    }
                });   
            }
           $('#save-presentation').hide("slow");  
        }, false);

    }
}


  
var downloadZip = function () {
    var button = document.getElementById('download');
    if (button !== null) {
        button.addEventListener('click', function () { 
            var data = presentationData();
            post_to_url('/download', data, 'post');
        }, false)
    }
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


$(document).on('click', '#go-to-sign-up', function(){ 
      $("#login").hide();
      var $form = $("#signupcontainer");
      $form.show("slow" );
 });

$(document).on('click', '#go-to-log-in', function(){ 
       $("#signupcontainer").hide();
      var $form = $("#login");
      $form.show("slow");

});







    






