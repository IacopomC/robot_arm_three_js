import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";

function generateBalls() {

    let balls = [];

    const radius = 0.4;
    const widthSegments = 12;
    const heightSegments = 8;
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
     
    function rand(min, max) {
      if (max === undefined) {
        max = min;
        min = 0;
      }

      let x = min + (max - min) * Math.random();
      
      let z = min + (max - min) * Math.random();

      while( x**2+z**2 < 9){
        x = min + (max - min) * Math.random();
      
        z = min + (max - min) * Math.random();
      }
      return [x,0,z];
    }

    function randC(min, max) {
      if (max === undefined) {
        max = min;
        min = 0;
      }

      return min + (max - min) * Math.random();
    }
     
    function randomColor() {
      return `hsl(${randC(360) | 0}, ${randC(50, 100) | 0}%, 10%)`;
    }
     
    const numObjects = 20;
    for (let i = 0; i < numObjects; ++i) {
      const material = new THREE.MeshLambertMaterial({
        color: randomColor(),
      });
     
      const ball = new THREE.Mesh(geometry, material);

      let ballCoor = rand(-5, 5);
     
      ball.position.set(ballCoor[0], ballCoor[1], ballCoor[2]);

      ball.receiveShadow = true;

      balls.push(ball);
    }

    return balls;
}

export default generateBalls;