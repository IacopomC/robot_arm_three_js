import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
import createRobot from './robot.js';
import PickHelper from './pick_helper.js';
import generateBalls from './ball.js';
import createRing from './ring.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  // Turn on shadows in renderer
  renderer.shadowMap.enabled = true;

  // Camera
  const fov = 75;
  const aspect = window.innerWidth/window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set( 8, 9, 8);

  // Controls
  const controls = new OrbitControls(camera, canvas);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xB1ABA7);

  // Grid
  const grid = new THREE.GridHelper( 12, 12, 0x888888, 0x444444 );
  grid.material.opacity = 0.5;
  grid.material.depthWrite = false;
  grid.material.transparent = true;
  scene.add( grid );

  // Light
  {
    const color = 0xFFFFFF;
    const intensity = 6;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
  {
    const color = 0xFFFFFF;
    const intensity = 6;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1, -2, -4);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(0, 10, 0);
    light.castShadow = true; // set light to cast shadow
    scene.add(light);
  }
  
  // Robot
  const robot_arm = createRobot();

  scene.add(robot_arm);

  // Ring
  const ring = createRing();

  scene.add( ring );

  // Balls
  const balls = generateBalls();

  balls.forEach( ball => {
      scene.add(ball);
  });

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  const pickPosition = {x: 0, y: 0};
  const pickHelper = new PickHelper();
  clearPickPosition();

  function render(time) {
    time *= 0.001;  // convert to seconds;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    pickHelper.pick(pickPosition, scene, camera, balls, time);

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * canvas.width  / rect.width,
      y: (event.clientY - rect.top ) * canvas.height / rect.height,
    };
  }

  function setPickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
    pickPosition.y = - (pos.y / canvas.height) * 2 + 1;  // note we flip Y
  }

  function clearPickPosition() {
    // Pick a value unlikely to pick something
    pickPosition.x = -100000;
    pickPosition.y = -100000;
  }

  function pickBall() {

    if (pickHelper.pickedObject){

      // Define useful varaibles
      const robotHand = robot_arm.children[3].children[0].children[2].children[0].children[4];
      const lowerArm = robot_arm.children[3];
      const upperArm = robot_arm.children[3].children[0].children[2];

      let ballObj = pickHelper.pickedObject;
      
      let fps = 60;           // fps/seconds
      let tau = 2;            // 2 seconds
      const step = 1 / (tau * fps);  // step per frame

      let angle = 0;
      
      angle  = Math.atan2(pickHelper.pickedObject.position.z, pickHelper.pickedObject.position.x);

      // Rotation correction between invisible
      // box and robot hand position
      const boxDist = upperArm.position.distanceTo(robotHand.children[14].position);
      
      const handDist = upperArm.position.distanceTo(robotHand.children[4].position);
      
       const corrAngle = Math.acos(boxDist/handDist);

      // Calculate the angle increment
      // from current orientation
      let rotationAngle = angle;

      // Apply correction
      rotationAngle += corrAngle;

      const angleStep = rotationAngle * step;
      let t = 0;
      
      // Define inital offset angles for the two arms
      let initialTheta = Math.PI/3;
      let initialAlpha = -Math.PI/4;

      const [theta,alpha] = calculateAngles();

      const alphaStep = alpha*step;
      const thetaStep = theta*step;

      // Define angles compared to ring position
      const [thetaRing, alphaRing] = calculateRingAngles();

      const alphaRStep = alphaRing*step;
      const thetaRStep = thetaRing*step;
      const angleRStep = corrAngle * step;

      function animateRobotArm(t){

        let ballPicked = false;

        // Forward motion ended, ball picked
        if (t >= 1) {
          ballPicked = true;
          
          // Attach ball picked to robot hand
          // by addind it as a child
          robotHand.add(ballObj);

          // Change ball position in the new frame
          // to match hand position
          ballObj.position.set(0.8, 7.38, -0.79);
        };

        if(ballPicked) {

          // Ball picked, hand back to original position
          if (t >= 2) {

            // Ball reached ring
            if (t >= 3) {
              if (t >= 4) {
                // Restore mouse click
                document.removeEventListener('pointerdown', stopClick);
                return;
              }
              t += step;  // Increment time
              robot_arm.rotation.y += angleRStep;
              lowerArm.rotateZ(alphaRStep);
              upperArm.rotateZ(thetaRStep);
              robotHand.children[robotHand.children.length - 1].visible = false;
            }
            else{
              t += step;  // Increment time
              robot_arm.rotation.y -= angleRStep;
              lowerArm.rotateZ(-alphaRStep);
              upperArm.rotateZ(-thetaRStep);
            }
          }
          // Move back to original position
          else {
            t += step;  // Increment time
            robot_arm.rotation.y += angleStep;
            lowerArm.rotateZ(alphaStep);
            upperArm.rotateZ(thetaStep);
          }
        }
        else{
          // Prevent from clicking other balls during motion
          document.addEventListener('pointerdown', stopClick);

          t += step;  // Increment time
          robot_arm.rotation.y -= angleStep;
          lowerArm.rotateZ(-alphaStep);
          upperArm.rotateZ(-thetaStep);
        }
        requestAnimationFrame(() => animateRobotArm(t));
      }

      function calculateAngles(){

        // Calculate distance between first
        // rotation point and the ball picked
        const pToC = lowerArm.position.distanceTo(pickHelper.pickedObject.position);

        // Calculate distance between first
        // and second rotation point
        // (lower part arm length)
        const cToC = lowerArm.position.distanceTo(robot_arm.children[3].children[0].children[2].position);

        // Calculate distance between second
        // rotation point and end of robot hand
        // (upper part arm length)
        const cToH = upperArm.position.distanceTo(
                        robotHand.children[5].position);

        // Calculate rotation angle around
        // first rotation point (lower arm
        // rotation) using cosine law
        let alpha = Math.acos((Math.pow(cToC, 2) + Math.pow(pToC, 2) - Math.pow(cToH, 2))/(2*cToC*pToC));

        const alphaCorrection = 0.3;

        alpha = Math.PI/2 - alpha - initialAlpha + alphaCorrection;
        
        // Calculate rotation angle around
        // second rotation point (upper arm
        // rotation) using cosine law
        let theta = Math.acos((Math.pow(cToH, 2) + Math.pow(cToC, 2) - Math.pow(pToC, 2))/(2*cToH*cToC));

        const thetaCorrection = 0.1; 

        theta = Math.PI/2 - theta - (Math.PI/2 - initialTheta) + thetaCorrection;

        return [theta, alpha]
      }

      function calculateRingAngles(){
        
        // Calculate distance between first
        // rotation point and the ball picked
        const rToC = ring.position.distanceTo(lowerArm.position);

        // Calculate distance between first
        // and second rotation point
        // (lower part arm length)
        const cToC = lowerArm.position.distanceTo(upperArm.position);

        // Calculate distance between second
        // rotation point and end of robot hand
        // (upper part arm length)
        const cToH = upperArm.position.distanceTo(
                        robotHand.children[5].position);

        // Calculate rotation angle around
        // first rotation point (lower arm
        // rotation) using cosine law
        let alpha = Math.acos((Math.pow(cToC, 2) + Math.pow(rToC, 2) - Math.pow(cToH, 2))/(2*cToC*rToC));

        const alphaCorrection = -Math.PI/7;

        alpha = Math.PI/2 - alpha - initialAlpha + alphaCorrection;
        
        // Calculate rotation angle around
        // second rotation point (upper arm
        // rotation) using cosine law
        let theta = Math.acos((Math.pow(cToH, 2) + Math.pow(cToC, 2) - Math.pow(rToC, 2))/(2*cToH*cToC));

        const thetaCorrection = 0.1; 

        theta = Math.PI/2 - theta - (Math.PI/2 - initialTheta) + thetaCorrection;

        return [theta, alpha]
      }

      animateRobotArm(t);

    }
    
  }

  window.addEventListener('mousemove', setPickPosition);
  window.addEventListener('mouseout', clearPickPosition);
  window.addEventListener('mouseleave', clearPickPosition);
  window.addEventListener('pointerdown', pickBall);
}

function stopClick(e) {
  e.stopPropagation();
  e.preventDefault();
}

main();
