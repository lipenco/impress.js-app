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
  var source =  "?layout=" + layout + 
  "&num_slides=" + num_slides + 
  "&shape=" + shape + 
  "&automated=" + automated + 
  "&theme=" + theme +
  "&substeps=" + substeps +
  "&progress_bar=" + progress_bar;

  // for(i=0; i<num_slides; i++){
  //   if($("#data-store").data("content["+i+"]")) {
  //     source += "&content["+i+"]=" + $("#data-store").data("content["+i+"]");
  //   }
  // }

  if (document.getElementById("preview") !== null) {
    document.getElementById("preview").src = "presentation" + source;   
  }
  if (document.getElementById("download") !== null) {
    document.getElementById("download").href = "download" + source;
  } 
  $("#style-mode").click(function(){
    document.getElementById("preview").src = "presentation" + source;
    f();  
  });
  $("#content-mode").click(function(){
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


var setFocusOnIframe = function () {
  var iframe = $("#preview")[0];
    iframe.contentWindow.focus();
    h();
}

var addSlide = function() {
  var $showNum = $("#showNum"); 
  console.log($showNum)
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

      var style_mode = document.getElementById("style-mode");
         style_mode.addEventListener('click', function() {
          postData(); }, false);
         
      var postData = function() {
        if($("#data-store").data("content["+i+"]")) {
          $.post('../home.html.erb', null, 
          $("#impress").html.data("content["+i+"]", editor[i].innerHTML)
          );
         } 
       }
 }

 var storeContentFromContentMode = function() {
    var editor = document.querySelectorAll('.editor');
      for (var i = 0; i< editor.length; i++) {
        var content = editor[i].innerHTML;
        editor[i].addEventListener('blur', function(){
        storeData(); }, false);
      }
     
    var storeData = function () {
      var editor = document.querySelectorAll('.editor');
      for (var i = 0; i< editor.length; i++) {
        parent.$("#data-store").data("content["+i+"]", editor[i].innerHTML);
      } 
    } 
 }


 
