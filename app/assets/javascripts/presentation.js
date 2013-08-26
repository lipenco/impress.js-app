var updatePreview = function() {
  num_slides = document.getElementById("num_slides").value;
  layout = getLayout();
  document.getElementById("preview").src = "presentation?num_slides=" + num_slides + "&layout=" + layout;
}

var getLayout = function() {
  var layoutType = "vertical";
  if(document.querySelector('#vertical.active')) {
    layoutType = document.getElementById("vertical").value;
  }
  else if(document.querySelector('#linear.active')) {
    layoutType = document.getElementById("linear").value;
  }
  else if (document.querySelector('#circle.active')) {
    layoutType = document.getElementById("circle").value;
  }
  return layoutType;
}

document.addEventListener('keyup', updatePreview, false);

var buttons = document.querySelectorAll(".btn");
for (var i = 0; i<buttons.length; i++) {
  console.log(buttons[i]);
  buttons[i].addEventListener('click', updatePreview, false);
}
