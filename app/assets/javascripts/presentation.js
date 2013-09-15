$(document).ready(function () {
    eventsListeners();
    updatePreview();
    addSlide();
    setContent();
    getContentBackToEditor();
    downloadZip();
});

var updatePreview = function () {
    setTimeout(function () {
        postData();
    }, 1000);
    var num_slides = currentNumberOfSlides() ||  getNumber();
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

    if (document.getElementById("preview") !== null) {
        document.getElementById("preview").src = "presentation" + source;
    }
    $("#style-mode").click(function () {
        document.getElementById("preview").src = "presentation" + source;
        f();
    });
    $("#content-mode").click(function () {
        document.getElementById("preview").src = "content" + source;
        g();
        h();
    });

};


function g() {
    $(".disapear").animate({
        opacity: 0
    }, 500, "easeOutQuint", function () {
        $(".disapear").css("display", "none")
    });
}


function f() {
    $(".disapear").animate({
        opacity: 1
    }, 500, "easeOutQuint", function () {
        $(".disapear").css("display", "block")
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
    if (contentObject["content[0]"] !== undefined) {
      for (var i = 0; i < slides.length; i++) {
          slides[i].innerHTML = contentObject["content[" + i + "]"];
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
    var editor = y.document.querySelectorAll(".editor");
    var contentObject = $("#data-store").data();
    if (contentObject["content[0]"] !== undefined) {
       for (var i = 0; i < editor.length; i++) {
          editor[i].innerHTML = contentObject["content[" + i + "]"];
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



var getNumber = function () {
    var num_sildes;
    if (document.getElementById("showNum") !== null) {
        num_sildes =  document.getElementById("showNum").value || 9;
    }

    return num_sildes;
}

 var currentNumberOfSlides = function () {
    var current_slides;
    var x = document.getElementById("preview");
    var y = (x.contentWindow || x.contentDocument);
    var currentSteps = y.document.querySelectorAll('.step');
        for (var i = 0; i < currentSteps.length; i++) {
        current_slides = currentSteps.length;
        }
    return current_slides;
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

var addSlide = function () {
    var $showNum = $("#showNum");
    $showNum.numberAnimate();
    var counter = 9;
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

    var newSlideButton = document.querySelectorAll('.new-slide');
    for (var i = 0; i < newSlideButton.length; i++) { 
        newSlideButton[i].addEventListener('click', function(){
        newSlide(); }, false )
    }
    var newSlide = function() {
        var newSlideDiv = $('<div class="step slide"><div  class="editor editorr" contenteditable="true"><h2>New Slide</h2></div></div>');
        $(".container-fluid").append(newSlideDiv);  

    } 
}


  
var downloadZip = function () {
    var button = document.getElementById('download');
    button.addEventListener('click', function () { 
    var data = {
        "num_slides" : getNumber(),
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
    post_to_url('/download', data, 'post');
    }, false)
}

var post_to_url = function(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
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
    var editor = document.querySelectorAll('.editor');
    for (var i = 0; i < editor.length; i++) {
        var content = editor[i].innerHTML;
        editor[i].addEventListener('blur', function () {
            storeData();

        }, false);
    }

    var storeData = function () {
        var editor = document.querySelectorAll('.editor');
        for (var i = 0; i < editor.length; i++) {
            parent.$("#data-store").data("content[" + i + "]", editor[i].innerHTML);
        }
    }
}