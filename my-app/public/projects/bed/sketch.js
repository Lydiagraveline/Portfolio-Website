let flowers;
let flowersMesh;
let modelScale = 2;
let controlSensitivity = 2;
let rX = 0;
let rY = 0;
val = 0;

function preload() {
  flowers = loadModel('mybed.obj', true);
  flowersMesh = loadImage('bedmesh.png');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  cam = createCamera();
  perspective();
}

function draw() {
  stroke(0);
  strokeWeight(0);
  //background(100);
  orbitControl(5);
  //myControls();
  scale(modelScale);
  rotateZ(PI)
  //rotateX(frameCount * 0.01);
  //rotateY(frameCount * 0.01);
  rotateY(rY);
  rotateX(rX);
  model(flowers);
  texture(flowersMesh);

  if (keyIsDown(UP_ARROW)){
    rX = rX - 0.01;
  } else if (keyIsDown(DOWN_ARROW)) {
    rX = rX + 0.01;
  } else if (keyIsDown(LEFT_ARROW)){
    rY = rY + 0.01;
  } else if (keyIsDown(RIGHT_ARROW)) {
    rY = rY - 0.01;
  }
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    //rY = rY - 1;
  } else if (keyCode === DOWN_ARROW) {
    //rY = rY + frameCount * 0.01;
    console.log('down arrow');
  }
  if (keyCode === LEFT_ARROW) {
    //rX = rotateX - 5;
  } else if (keyCode === RIGHT_ARROW) {
   // rX = rX + 5;
  }
  
}

// code from --> https://editor.p5js.org/tinywitchdraws/sketches/I_AhTKO6Q
p5.prototype.myControls = function(sensitivityX, sensitivityY, sensitivityZ) {
  //init 3d 
  this._assert3d('myControls');

   //If the mouse is not in bounds of the canvas, disable all behaviors:
   const mouseInCanvas =
   this.mouseX < this.width &&
   this.mouseX > 0 &&
   this.mouseY < this.height &&
   this.mouseY > 0;
 if (!mouseInCanvas) return;

 //const cam = this._renderer._curCamera;
 //default zooms

 if (typeof sensitivityX === 'undefined') {
   sensitivityX = controlSensitivity;
 }
 if (typeof sensitivityY === 'undefined') {
   sensitivityY = sensitivityX;
 }
 if (typeof sensitivityZ === 'undefined') {
   sensitivityZ = 0.5;
 }
//zoom
  const scaleFactor = this.height < this.width ? this.height : this.width;
  this._renderer._curCamera._orbit(0, 0, val * scaleFactor);

 if (this.mouseIsPressed) {
   // ORBIT BEHAVIOR
   if (this.mouseButton === this.LEFT) {
     const deltaTheta =
       -sensitivityX * (this.mouseX - this.pmouseX) / scaleFactor;
     const deltaPhi =
       sensitivityY * (this.mouseY - this.pmouseY) / scaleFactor;
     this._renderer._curCamera._orbit(deltaTheta, deltaPhi, 0);
   } else if (this.mouseButton === this.RIGHT) {
     // PANNING BEHAVIOR along X/Z camera axes and restricted to X/Z plane
     // in world space
     const local = cam._getLocalAxes();

     // normalize portions along X/Z axes
     const xmag = Math.sqrt(local.x[0] * local.x[0] + local.x[2] * local.x[2]);
     if (xmag !== 0) {
       local.x[0] /= xmag;
       local.x[2] /= xmag;
      }

     // normalize portions along X/Z axes
     const ymag = Math.sqrt(local.y[0] * local.y[0] + local.y[2] * local.y[2]);
     if (ymag !== 0) {
       local.y[0] /= ymag;
       local.y[2] /= ymag;
     }

     // move along those vectors by amount controlled by mouseX, pmouseY
     const dx = -1 * sensitivityX * (this.mouseX - this.pmouseX);
     const dz = -1 * sensitivityY * (this.mouseY - this.pmouseY);

     //restrict movement to XZ plane in world space
     cam.setPosition(
       cam.eyeX + dx * local.x[0] + dz * local.z[0],
       cam.eyeY,
       cam.eyeZ + dx * local.x[2] + dz * local.z[2]
     );
  }
 }
 return this;
};