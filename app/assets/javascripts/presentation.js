$(document).ready(function() {
    eventsListeners();
    updatePreview();
    addSlide();
});

var updatePreview = function() {
  var num_slides = getNumber();
  var layout = getLayout();
  var shape = getShape();
  var automated = getAuto();
  var theme = getTheme();
  var substeps = getSubsteps();
  var progress_bar = getProgressBar();
  var content = getContent();
  var source =  "?layout=" + layout + 
  "&num_slides=" + num_slides + 
  "&shape=" + shape + 
  "&automated=" + automated + 
  "&theme=" + theme +
  "&substeps=" + substeps +
  "&progress_bar=" + progress_bar +
  "&content[0]=" + content;
  if (document.getElementById("preview") !== null) {
    document.getElementById("preview").src = "presentation" + source;   
  }
  if (document.getElementById("download") !== null) {
    document.getElementById("download").href = "download" + source;
  }
  if (document.getElementById("content") !== null) {
    document.getElementById("content").href = "content" + source;   
  }  
};


var getLayout = function() {
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
   num_sildes = document.getElementById("showNum").value  || 9;
  } 
  return num_sildes;
}

var getShape = function() {
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
  if (progresscurrent  != null) {
    progress_bar = progresscurrent.id;
  }
  return progress_bar;
}

var getContent = function() {
  var contentgroup = document.getElementById("editorr");
  if (contentgroup != null) {
   content = contentgroup.innerHTML;
  }
  return content;
}


var setFocusOnIframe = function () {
  var iframe = $("#preview")[0];
    iframe.contentWindow.focus();
  $('.arrows').addClass('fadeOutRightBig');
  $('.arrows').removeClass('fadeInRightBig');
}

var addSlide = function() {

  var $showNum = $("#showNum"); 
  $showNum.numberAnimate();
  var counter = 9;
  $("#addslide").click(function(){
    counter++;
    $("#showNum").val(counter);
    $showNum.numberAnimate('set', $("#showNum").val());
  });
  $("#decrement_slide").click(function(){
    counter--;
    $("#showNum").val(counter);
    $showNum.numberAnimate('set', $("#showNum").val());
  });
}

 var eventsListeners = function() {
      var buttons = document.querySelectorAll(".btn-p");
        for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(){
          setTimeout(function(){
            updatePreview(); 
          }, 1);
        }, false); 
      };
      document.addEventListener("keydown", function ( event ) {
        if ( event.keyCode === 9 || ( event.keyCode >= 32 && event.keyCode <= 34 ) 
          || (event.keyCode >= 37 && event.keyCode <= 40) )
          { setFocusOnIframe();} }, false); 
 }

