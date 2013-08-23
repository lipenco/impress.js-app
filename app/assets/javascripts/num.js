
var getNumberFromForm = function () {
num_slides = document.getElementById("num_slides").value;
document.getElementById("preview").src = "presentation?num_slides=" + num_slides;
}
document.addEventListener("keyup", getNumberFromForm, false);