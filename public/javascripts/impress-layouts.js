function layoutCircleV1(options) {
    var radius = options.radius;
    var elements = document.querySelectorAll(".step");
    if (!radius || radius < 900) {
        radius = 1024 / (2 * Math.tan(Math.PI / elements.length));
    }
    var r = radius;
    for (var i = 0; i < elements.length; i++) {
        var phi = -i / (elements.length - 1) * 2 * Math.PI;
        var x = r * Math.cos(phi);
        var y = r * Math.sin(phi);
        var rotation = phi / (2 * Math.PI) * 360 - 90;
        elements[i].dataset.x = Math.round(x);
        elements[i].dataset.y = Math.round(y);
        elements[i].dataset.rotateY = Math.round(rotation);
        elements[i].dataset.rotateX = 90;
    }
}

function layoutCircleV2(options) {
    var radius = options.radius;
    var elements = document.querySelectorAll(".step");
    if (!radius || radius < 900) {
        radius = 1024 / (2 * Math.tan(Math.PI / elements.length));
    }
    var r = radius;
    for (var i = 0; i < elements.length; i++) {
        var phi = -i / (elements.length - 1) * 2 * Math.PI;
        var x = r * Math.cos(phi);
        var y = r * Math.sin(phi);
        var rotation = phi / (2 * Math.PI) * 360 - 90;
        elements[i].dataset.x = Math.round(x);
        elements[i].dataset.y = Math.round(y);
        elements[i].dataset.rotateY = Math.round(rotation) - 180;
        elements[i].dataset.rotateX = 90;
    }
}

function layoutCircleV3(options) {
    var radius = options.radius;
    var elements = document.querySelectorAll(".step");
    if (!radius || radius < 900) {
        radius = 1024 / (2 * Math.tan(Math.PI / elements.length));
    }
    var r = radius;
    for (var i = 0; i < elements.length; i++) {
        var phi = -i / (elements.length - 1) * 2 * Math.PI;
        var x = r * Math.cos(phi);
        var y = r * Math.sin(phi);
        var rotation = phi / (2 * Math.PI) * 360 - 90;
        elements[i].dataset.x = Math.round(x);
        elements[i].dataset.y = Math.round(y);
        elements[i].dataset.rotate = Math.round(rotation);
    }
}

function layoutCircleV4(options) {
    var radius = options.radius;
    var elements = document.querySelectorAll(".step");
    if (!radius || radius < 900) {
        radius = 1024 / (2 * Math.tan(Math.PI / elements.length));
    }
    var r = radius;
    for (var i = 0; i < elements.length; i++) {
        var phi = -i / (elements.length - 1) * 2 * Math.PI;
        var x = r * Math.cos(phi);
        var y = r * Math.sin(phi);
        var rotation = phi / (2 * Math.PI) * 360 - 90;
        elements[i].dataset.x = Math.round(x);
        elements[i].dataset.y = Math.round(y);
        elements[i].dataset.rotateY = Math.round(rotation) - 90;
        elements[i].dataset.rotateX = 90;
    }
}

function layoutChain(options) {
    var distance = options.distance;
    var elements = document.querySelectorAll(".step");
    var positionX = 0;
    if (!distance || distance < 700) {
        distance = 700;
    }
    for (var i = 0; i < elements.length; i++) {
        var phi = -i / (elements.length - 1) * 2 * Math.PI;
        var rotation = phi / (2 * Math.PI) * 360;
        elements[i].dataset.rotateX = Math.round(rotation);
        elements[i].dataset.rotateZ = Math.round(rotation);
        elements[i].dataset.x = positionX;
        positionX = positionX + distance;   
    }
}




function layoutLinearGrid(options) {
    var numberOfColumns = options.numberOfColumns;
    var distanceX = options.distanceX;
    var distanceY = options.distanceY;
    var elements = document.querySelectorAll(".step");
    var positionX = 100;
    var positionY = 100;
    if (!distanceX || distanceX < 900) {
        options.distanceX = 1500;
    }
    if (!distanceY || distanceY < 700) {
        options.distanceY = 1000;
    }
    if (!numberOfColumns || numberOfColumns < 1) {
        options.numberOfColumns = 5;
    }
    for (var index = 0; index < elements.length; index++) {
        elements[index].dataset.x = positionX;
        elements[index].dataset.y = positionY;
        if ((index + 1) % numberOfColumns === 0) {
            positionY = positionY + distanceY;
            positionX = 100;
        } else {
            positionX = positionX + distanceX;
        }
    }
}



function layoutSnakeGrid(options) {
    var numberOfColumns = options.numberOfColumns;
    var distanceX = options.distanceX;
    var distanceY = options.distanceY;
    var elements = document.querySelectorAll(".step");
    var positionX = 100;
    var positionY = 100;
    var rowType = "even";
    if (!distanceX || distanceX < 900) {
        distanceX = 1500;
    }
    if (!distanceY || distanceY < 700) {
        distanceY = 1000;
    }
    if (!numberOfColumns || numberOfColumns < 1) {
        numberOfColumns = 5;
    }
    for (var index = 0; index < elements.length; index++) {
        elements[index].dataset.x = positionX;
        elements[index].dataset.y = positionY;
        if ((index + 1) % numberOfColumns === 0) {
            positionY = positionY + distanceY;
            if (rowType === "even") {
                rowType = "odd";
                positionX = (distanceX * (numberOfColumns - 1)) + 100;
            } else {
                rowType = "even";
                positionX = 100;
            }
        } else {
            if (rowType === "even") {
                positionX = positionX + distanceX;
            } else {
                positionX = positionX - distanceX;
            }
        }
    }
}


function layoutVerticalGrid(options) {
    var numberOfColumns = options.numberOfColumns;
    var distanceX = options.distanceX;
    var distanceY = options.distanceY;
    var elements = document.querySelectorAll(".step");
    var positionX = 100;
    var positionY = 100;
    if (!distanceX || distanceX < 900) {
        distanceX = 1500;
    }
    if (!distanceY || distanceY < 700) {
        distanceY = 1000;
    }
    if (!numberOfColumns || numberOfColumns < 1) {
        numberOfColumns = 5;
    }
    for (var index = 0; index < elements.length; index++) {
        elements[index].dataset.x = positionX;
        elements[index].dataset.y = positionY;
        if ((index + 1) % numberOfColumns === 0) {
            positionX = positionX + distanceX;
            positionY = 100;
        } else {
            positionY = positionY + distanceY;
        }
    }
}


function MoveElementsFromEachOtherX(distanceX, elements) {   
    var positionX = parseInt(elements[0].dataset.x);
    for (var index = 0; index < elements.length; index++) {
      positionX = positionX + distanceX;
      elements[index].dataset.x = positionX; 
    }
}

function MoveElementsFromEachOtherY(distanceY, elements) {   
    var positionY = parseInt(elements[0].dataset.y);
    for (var index = 0; index < elements.length; index++) {
      positionY = positionY + distanceY;
      elements[index].dataset.y = positionY; 
    }
}

function MoveElementsFromEachOtherZ(distanceZ, elements) {   
    var positionZ = parseInt(elements[0].dataset.z);
    for (var index = 0; index < elements.length; index++) {
      positionZ = positionZ + distanceZ;
      elements[index].dataset.z = positionZ; 
    }
}


function RescaleEveryTwoElements(scale, elements) {
    for (var index = 0; index < elements.length; index+=2) {
      elements[index].dataset.scale = 2; 
    }
}


function layoutLinear(distanceX, scale) {
      var elements = document.querySelectorAll(".step");
      if (!distanceX || distanceX < 1000) {
        distanceX = 1500;
      }
      elements[0].dataset.x = 0;
      RescaleEveryTwoElements(scale, elements) ;
      MoveElementsFromEachOtherX(distanceX, elements) ;
}


function layoutVertical(distanceY) {
    var elements = document.querySelectorAll(".step");
    if (!distanceY || distanceY < 700) {
        distanceY = 900;
    }
    elements[0].dataset.y = 0; 
    MoveElementsFromEachOtherY(distanceY, elements) ;
}


function layoutDeep(distanceZ) {
    var elements = document.querySelectorAll(".step");
    if (!distanceZ || distanceZ < 900) {
        distanceZ = 1000;
    }
    elements[0].dataset.z = 0; 
    MoveElementsFromEachOtherZ(distanceZ, elements);
}



