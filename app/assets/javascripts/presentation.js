$(document).ready(function() {
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
  if (document.getElementById("preview") !== null) {
    document.getElementById("preview").src = "presentation" + source;   
  }
  if (document.getElementById("download") !== null) {
    document.getElementById("download").href = "download" + source;
  }
};


var getLayout = function() {
  var layoutType = "vertical";
  var layoutbuttons = document.getElementById("butonslayout");
  var activebutton = layoutbuttons.querySelector(".active");
  if (activebutton) {
    layoutType = activebutton.value;
  }
  return layoutType;
};


var getNumber = function () { 
  var num_sildes = "9";
  if (document.getElementById("num_slides") !== null) {
   num_sildes = document.getElementById("num_slides").value;
  } 
  return num_sildes;
}

var getShape = function() {
  var shape = "rectangle";
  if (document.querySelector('#circle.active')) {
    shape = document.getElementById("circle").value;
  }
  else if (document.querySelector('#rectangle.active')) {
    shape = document.getElementById("rectangle").value;
  }
  else if (document.querySelector('#blank.active')) {
    shape = document.getElementById("blank").value;
  }
  return shape;
};

var getAuto = function () {
  var automated = "false";
  if (document.querySelector('#auto.active')) {
    automated = "true";
  }
  return automated;
}

var getTheme = function () {
  var theme = "basic";
  if (document.querySelector('#textured.active')) {
    theme = "textured";
  }
  return theme;
}

var getSubsteps = function () {
  var substeps = "false";
  if (document.querySelector('#substeps.active')) {
    substeps = "true";
  }
  return substeps;
}

var getProgressBar = function () {
  var progress_bar = "no-pbar";
  if (document.querySelector('#pbar1.active')) {
    progress_bar = document.getElementById("pbar1").value;
  }
  return progress_bar;
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
  var counter = parseInt($("#num_slides").val()) || 9;
  var counter2 = parseInt($("#showNum").val()) || 9;
  $("#addslide").click(function(){
    counter++;
    counter2++;
    $("#num_slides").val(counter);
    $("#showNum").val(counter2);
    $showNum.numberAnimate('set', $("#showNum").val());
  });
  $("#decrement_slide").click(function(){
    counter--;
    counter2--;
    $("#num_slides").val(counter);
    $("#showNum").val(counter2);
    $showNum.numberAnimate('set', $("#showNum").val());
  });
}



