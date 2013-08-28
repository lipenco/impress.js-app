$(document).ready(function() {
    updatePreview();
});

var updatePreview = function() {
  var num_slides = getNumber();
  var layout = getLayout();
  var shape = getShape();
  var automated = getAuto();
  var theme = getTheme();
  var substeps = getSubsteps();
  document.getElementById("preview").src = 
  "presentation?layout=" + layout + 
  "&num_slides=" + num_slides + 
  "&shape=" + shape + 
  "&automated=" + automated + 
  "&theme=" + theme +
  "&substeps=" + substeps;
};


//   switch () {
// case "vertical":
//   layoutType = document.getElementById("vertical").value;
//   break;
// case "linear"):
//   layoutType = document.getElementById("linear").value;
//   break;
// case "circlev1":
//   layoutType = document.getElementById("circlev1").value;
//   break;
// case "circlev2":
//   layoutType = document.getElementById("circlev2").value;
//   break;
// case "circlev3":
//   layoutType = document.getElementById("circlev3").value;
//   break;
// case "circlev4":
//   layoutType = document.getElementById("circlev4").value;
//   break;
// case "chain":
//   layoutType = document.getElementById("chain").value;
//   break;
// case "deep":
//   layoutType = document.getElementById("deep").value;
//   break;
// case "snakegrid":
//   layoutType = document.getElementById("snakegrid").value;
//   break;
// case "verticalgrid":
//   layoutType = document.getElementById("verticalgrid").value;
//   break;
// }
// return layoutType;

var getLayout = function() {
  var layoutType = "vertical"
  if (document.querySelector('#vertical.active')) {
    layoutType = document.getElementById("vertical").value;
  }
  else if (document.querySelector('#linear.active')) {
    layoutType = document.getElementById("linear").value;
  }
  else if (document.querySelector('#circlev2.active')) {
    layoutType = document.getElementById("circlev2").value;
  }
  return layoutType;
}


var getNumber = function () {
  var num_sildes = document.getElementById("num_slides").value;
  if (!num_sildes) {
    num_sildes = "6";
  };
  return num_sildes;
};

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

var setFocusOnIframe = function () {
  var iframe = $("#preview")[0];
    iframe.contentWindow.focus();
}




