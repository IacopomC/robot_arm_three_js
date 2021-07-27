import * as THREE from '../../../../../node_modules/three/build/three.module.js';

function createRing() {

    // Torus parameters
    const radius = 0.1;  
    const tubeRadius = 0.015;  
    const radialSegments = 8;  
    const tubularSegments = 24;  

    const geometry = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);

    const material = new THREE.MeshLambertMaterial( { color: 0x072904, side: THREE.DoubleSide } );

    const ring = new THREE.Mesh( geometry, material );
    
    // Define position and orientation
    ring.rotation.x = Math.PI/2;
    ring.position.set(0.5, 0.5, 0);

    ring.receiveShadow = true;

    return ring;
}

export default createRing;