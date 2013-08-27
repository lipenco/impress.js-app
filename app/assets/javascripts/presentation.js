var updatePreview = function() {
  var num_slides = document.getElementById("num_slides").value;
  var layout = getLayout();
  var shape = getShape();
  var automated = getAuto();
  var theme = getTheme();
  document.getElementById("preview").src = "presentation?layout=" + layout + "&num_slides=" + num_slides + "&shape=" + shape + "&automated=" + automated + "&theme=" + theme;
};

var getLayout = function() {
  var layoutType = "vertical";
  if (document.querySelector('#vertical.active')) {
    layoutType = document.getElementById("vertical").value;
  }
  else if (document.querySelector('#linear.active')) {
    layoutType = document.getElementById("linear").value;
  }
  else if (document.querySelector('#circle.active')) {
    layoutType = document.getElementById("circle").value;
  }
  return layoutType;
};

var getShape = function() {
  var shape = "rectangle";
  if (document.querySelector('#circle.active')) {
    shape = document.getElementById("circle").value;
  }
  else if (document.querySelector('#rectangle.active')) {
    shape = document.getElementById("rectangle").value;
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




