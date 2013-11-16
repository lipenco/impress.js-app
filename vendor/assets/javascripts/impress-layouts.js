function layoutRandom() {
  var elements = document.querySelectorAll(".step");
   if (elements[0]) {
    elements[0].dataset.x = "-100";
    elements[0].dataset.y = "2800";
    elements[0].dataset.rotate = "270";
    elements[0].dataset.delay = "3";
   }
   if (elements[1]) {
    elements[1].dataset.x = "400";
    elements[1].dataset.y = "-800";
    elements[1].dataset.rotate = "320";
    elements[1].dataset.delay = "4";
   }
   if (elements[2]) {
    elements[2].dataset.x = "-100";
    elements[2].dataset.y = "-1600";
    elements[2].dataset.rotate = "270";
    elements[2].dataset.delay = "17";
   }
   if (elements[3]) {
    elements[3].dataset.x = "-800";
    elements[3].dataset.y = "-800";
    elements[3].dataset.rotate = "90";
    elements[3].dataset.delay = "0.5";
   }
   if (elements[4]) {
    elements[4].dataset.x = "600";
    elements[4].dataset.y = "600";
    elements[4].dataset.rotate = "1000";
    elements[4].dataset.delay = "0.5";
   }
   if (elements[5]) {
    elements[5].dataset.x = "2400";
    elements[5].dataset.y = "600";
    elements[5].dataset.delay = "0.5";
   }
   if (elements[6]) {
    elements[6].dataset.x = "4200";
    elements[6].dataset.y = "600";
    elements[6].dataset.z = "1000";
    elements[6].dataset.delay = "0.5";
   }
   if (elements[7]) {
    elements[7].dataset.x = "6000";
    elements[7].dataset.y = "600";
    elements[7].dataset.delay = "0.5";
    }
   if (elements[8]) {
    elements[8].dataset.x = "7800";
    elements[8].dataset.y = "1000";
    elements[8].dataset.rotate = "90";
    elements[8].dataset.delay = "0.5";
    }
   if (elements[9]) {
    elements[9].dataset.x = "7800";
    elements[9].dataset.y = "2000";
    elements[9].dataset.rotate = "90";
    elements[9].dataset.delay = "5.5";
    }
    if (elements[10]) {
        elements[10].dataset.x = "6400";
        elements[10].dataset.y = "4000";
        elements[10].dataset.rotate = "90";
        elements[10].dataset.delay = "0.5";
    }
    if (elements[11]) {
        elements[11].dataset.x = "5400";
        elements[11].dataset.y = "3600";
        elements[11].dataset.rotate = "135";
        elements[11].dataset.delay = "3";
    }
    if (elements[12]) {
        elements[12].dataset.x = "4800";
        elements[12].dataset.y = "2200";
        elements[12].dataset.rotate = "180";
        elements[12].dataset.delay = "3";
    }
    if (elements[13]) {
        elements[13].dataset.x = "2000";
        elements[13].dataset.y = "1500";
        elements[13].dataset.z = "-500";
        elements[13].dataset.delay = "12";
    }
    if (elements[14]) {
        elements[14].dataset.x = "-500";
        elements[14].dataset.y = "1800";
        elements[14].dataset.rotate = "0";
        elements[14].dataset.delay = "0.5";
    }
    // if (elements[15]) {
    //     elements[15].dataset.x = "-7440";
    //     elements[15].dataset.y = "440";
    //     elements[15].dataset.rotate = "90";
    //     elements[15].dataset.rotateY = "90";
    //     elements[15].dataset.scale = "20";
    // }
    // if (elements[16]) {
    //     elements[16].dataset.x = "7340";
    //     elements[16].dataset.y = "3740";
    //     elements[16].dataset.rotate = "90";
    //     elements[16].dataset.scale = "8";
    // }
    // if (elements[17]) {
    //     elements[17].dataset.x = "7640";
    //     elements[17].dataset.y = "1740";
    //     elements[17].dataset.scale = "0.1";
    // }

}



function layoutCircleV1(options) {
    var radius;
    if (options != undefined) {
        radius = options.radius;
    }
    var elements = document.querySelectorAll(".step");
    if (!radius || radius < 900) {
        radius = 1024 / (2 * Math.tan(Math.PI / elements.length));
    }
    var r = radius;
    for (var i = 0; i < elements.length; i++) {
        var phi = -i / (elements.length) * 2 * Math.PI;
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
    var radius;
    if (options != undefined) {
        radius = options.radius;
    }
    var elements = document.querySelectorAll(".step");
    if (!radius || radius < 900) {
        radius = 1024 / (2 * Math.tan(Math.PI / elements.length));
    }
    var r = radius;
    for (var i = 0; i < elements.length; i++) {
        var phi = -i / (elements.length) * 2 * Math.PI;
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
    var radius;
    if (options != undefined) {
        radius = options.radius;
    }
    var elements = document.querySelectorAll(".step");
    if (!radius || radius < 900) {
        radius = 1024 / (2 * Math.tan(Math.PI /(elements.length + 2)));
    }
    var r = radius;
    for (var i = 0; i < elements.length; i++) {
        var phi = -i / (elements.length) * 2 * Math.PI;
        var x = r * Math.cos(phi);
        var y = r * Math.sin(phi);
        var rotation = phi / (2 * Math.PI) * 360 - 90;
        elements[i].dataset.x = Math.round(x);
        elements[i].dataset.y = Math.round(y);
        elements[i].dataset.rotate = Math.round(rotation);
    }
}

function layoutCircleV4(options) {
    var radius;
    if (options != undefined) {
        radius = options.radius;
    }
    var elements = document.querySelectorAll(".step");
    if (!radius || radius < 900) {
        radius = 1024 / (2 * Math.tan(Math.PI / (elements.length +10) ));
    }
    var r = radius;
    for (var i = 0; i < elements.length; i++) {
        var phi = -i / (elements.length) * 2 * Math.PI;
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
    var distance;
    if (options != undefined) {
        distance = options.distance;
    }
    var elements = document.querySelectorAll(".step");
    var positionX = 0;
    if (!distance || distance < 700) {
        distance = 800;
    }
    for (var i = 0; i < elements.length; i++) {
        var phi = -i / (elements.length) * 2 * Math.PI;
        var rotation = phi / (2 * Math.PI) * 360;
        elements[i].dataset.rotateX = Math.round(rotation);
        elements[i].dataset.rotateZ = Math.round(rotation);
        elements[i].dataset.x = positionX;
        positionX = positionX + distance;   
    }
}


function layoutLinearGrid(options) {
    var numberOfColumns;
    var distanceX;
    var distanceY;
    if (options != undefined) {
        numberOfColumns = options.numberOfColumns;
        distanceX = options.distanceX;
        distanceY = options.distanceY;
    }  
    var elements = document.querySelectorAll(".step");
    var positionX = 0;
    var positionY = 0;
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
            positionX = 0;
        } else {
            positionX = positionX + distanceX;
        }
    }
}



function layoutSnakeGrid(options) {
    var numberOfColumns;
    var distanceX;
    var distanceY;
    if (options != undefined) {
        numberOfColumns = options.numberOfColumns;
        distanceX = options.distanceX;
        distanceY = options.distanceY;
    } 
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
    var numberOfColumns;
    var distanceX;
    var distanceY;
    if (options != undefined) {
        numberOfColumns = options.numberOfColumns;
        distanceX = options.distanceX;
        distanceY = options.distanceY;
    } 
    var elements = document.querySelectorAll(".step");
    var positionX = 100;
    var positionY = 100;
    if (!numberOfColumns || numberOfColumns < 1) {
        numberOfColumns = 5;
    }
    if (!distanceX || distanceX < 900) {
        distanceX = 1500;
    }
    if (!distanceY || distanceY < 700) {
        distanceY = 1000;
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
        distanceZ = 2000;
    }
    elements[0].dataset.z = 0; 
    MoveElementsFromEachOtherZ(distanceZ, elements);
}



