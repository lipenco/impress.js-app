var updatePreview = function() {
  var layout = getLayout();
  var num_slides = document.getElementById("num_slides").value;
  document.getElementById("preview").src = "presentation?layout=" + layout + "&num_slides=" + num_slides;
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

document.addEventListener('click', updatePreview, false);
// document.getElementById('preview').focus();


