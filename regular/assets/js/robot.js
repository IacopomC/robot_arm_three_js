import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";

function createRobot() {

    // Color meshes
    const orange_mesh =  new THREE.MeshStandardMaterial( {
        color: 0xE55C08,
        metalness: 1,
        roughness: 0.4
    });
  
    const grey_mesh =  new THREE.MeshStandardMaterial( {
        color: 0x756C6A,
        metalness: 1,
        roughness: 0.4
    });
  
    // Robot primitives
    const arm_group = new THREE.Group();

    const grey_base_geometry = new THREE.CylinderGeometry(2.5, 2.5, 0.8, 32);
    const gray_base = new THREE.Mesh(grey_base_geometry, grey_mesh);
    gray_base.position.set(0, 0.4, 0);
    gray_base.castShadow = true;
    gray_base.receiveShadow = true;
    
    arm_group.add(gray_base);
  
    const orange_base_geometry = new THREE.CylinderGeometry(2, 2, 0.5, 32);
    const orange_base = new THREE.Mesh(orange_base_geometry, orange_mesh);
    orange_base.castShadow = true;
    orange_base.receiveShadow = true;
    orange_base.position.set(0, 0.7, 0);

    arm_group.add(orange_base);
    
    const base_box_geometry = new THREE.BoxGeometry(0.8, 2.0, 0.3);
    const base_box = new THREE.Mesh(base_box_geometry, orange_mesh);
    base_box.position.set(-0.4, 1.2, -0.2);
    base_box.rotation.z = Math.PI/4;
    base_box.castShadow = true;
    base_box.receiveShadow = true;

    arm_group.add(base_box);

    // Define bounding box to change rotation
    // axis of the two arms together
    const bbox = new THREE.Group();

    const first_junc_group = new THREE.Group();

    bbox.add(first_junc_group);

    // Offset the two arms to change the center
    // of rotation from center to cylinder position
    first_junc_group.position.set(0.9, -1.9, 0);

    // Place group in desired position
    bbox.position.set(-0.9, 1.9, 0);

    const junction_geometry = new THREE.CylinderGeometry(0.6, 0.6, 0.8, 32);
    const first_junction = new THREE.Mesh(junction_geometry, grey_mesh);
    first_junction.position.set(-0.9, 1.9, 0);
    first_junction.rotation.x = Math.PI/2;
    first_junction.castShadow = true;
    first_junction.receiveShadow = true;

    first_junc_group.add(first_junction);
    
    const first_arm_geometry = new THREE.BoxGeometry(0.8, 3.5, 0.3);
    const first_arm = new THREE.Mesh(first_arm_geometry, orange_mesh);
    first_arm.position.set(-2.4, 3.4, 0.2);
    first_arm.rotation.z = Math.PI/4;
    first_arm.castShadow = true;
    first_arm.receiveShadow = true;

    first_junc_group.add(first_arm);

    // Define bounding box to change rotation
    // axis of the two arms together
    const bbox2 = new THREE.Group();

    const second_junc_group = new THREE.Group();
 
    bbox2.add(second_junc_group);

    // Offset the upper arm to change the center
    // of rotation from center to second cylinder position
    second_junc_group.position.set(3.9, -4.5, 0);

    // Place group in desired position
    bbox2.position.set(-3.9, 4.5, 0);
 
    const second_junction = new THREE.Mesh(junction_geometry, grey_mesh);
    second_junction.position.set(-3.9, 4.5, 0);
    second_junction.rotation.x = Math.PI/2;
    second_junction.castShadow = true;
    second_junction.receiveShadow = true;

    second_junc_group.add(second_junction);

    const second_base_geometry = new THREE.CylinderGeometry(0.4, 0.6, 3, 32);
    const second_base = new THREE.Mesh(second_base_geometry, orange_mesh);
    second_base.position.set(-3.5, 4.9, -0.8);
    second_base.rotation.z = -Math.PI/3;
    second_base.castShadow = true;
    second_base.receiveShadow = true;

    second_junc_group.add(second_base);
    
    const second_arm_geometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 32);
    const second_arm = new THREE.Mesh(second_arm_geometry, grey_mesh);
    second_arm.position.set(-1.5, 6.1, -0.8);
    second_arm.rotation.z = -Math.PI/3;
    second_arm.castShadow = true;
    second_arm.receiveShadow = true;

    second_junc_group.add(second_arm);

    const side_arm_geometry = new THREE.BoxGeometry(0.8, 2.0, 0.3);
    const arm_sides = new THREE.Mesh(side_arm_geometry, orange_mesh);
    arm_sides.position.set(-1.5, 6.1, -0.8);
    arm_sides.rotation.z = -Math.PI/3;
    arm_sides.castShadow = true;
    arm_sides.receiveShadow = true;

    second_junc_group.add(arm_sides);

    const hand_group = new THREE.Group();

    const hand_junction_geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const hand_junction = new THREE.Mesh(hand_junction_geometry, orange_mesh);
    hand_junction.position.set(-0.5, 6.65, -0.8);
    hand_junction.rotation.z = -Math.PI/3;
    hand_junction.castShadow = true;
    hand_junction.receiveShadow = true;

    hand_group.add(hand_junction);

    const lateral_geometry = new THREE.BoxGeometry(0.8, 1.2, 0.1);
    const lateral_junc_1 = new THREE.Mesh(lateral_geometry, orange_mesh);
    lateral_junc_1.position.set(-0.42, 6.72, -1.2);
    lateral_junc_1.rotation.z = -Math.PI/3;
    lateral_junc_1.castShadow = true;
    lateral_junc_1.receiveShadow = true;

    hand_group.add(lateral_junc_1);

    const lateral_junc_2 = new THREE.Mesh(lateral_geometry, orange_mesh);
    lateral_junc_2.position.set(-0.42, 6.72, -0.4);
    lateral_junc_2.rotation.z = -Math.PI/3;
    lateral_junc_2.castShadow = true;
    lateral_junc_2.receiveShadow = true;

    hand_group.add(lateral_junc_2);

    const wrist_bottom_geometry = new THREE.CylinderGeometry(0.45, 0.3, 0.8, 32);
    const wrist_bottom = new THREE.Mesh(wrist_bottom_geometry, grey_mesh);
    wrist_bottom.position.set(-0.12, 6.85, -0.8);
    wrist_bottom.rotation.z = -Math.PI/3;
    wrist_bottom.castShadow = true;
    wrist_bottom.receiveShadow = true;

    hand_group.add(wrist_bottom);

    const wrist_top_geometry = new THREE.CylinderGeometry(0.3, 0.45, 0.3, 32);
    const wrist_top = new THREE.Mesh(wrist_top_geometry, orange_mesh);
    wrist_top.position.set(0.35, 7.1, -0.8);
    wrist_top.rotation.z = -Math.PI/3;
    wrist_top.castShadow = true;
    wrist_top.receiveShadow = true;

    hand_group.add(wrist_top);

    const pliersBaseGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.1);
    const pliersBase = new THREE.Mesh(pliersBaseGeometry, grey_mesh);
    pliersBase.position.set(0.5, 7.2, -0.8);
    pliersBase.rotation.x = Math.PI/2;
    pliersBase.rotation.y = -Math.PI/3;
    pliersBase.castShadow = true;
    pliersBase.receiveShadow = true;

    hand_group.add(pliersBase);

    const pliersRotGeometry = new THREE.SphereGeometry(0.1, 12, 8);

    const pliersleftRot = new THREE.Mesh(pliersRotGeometry, grey_mesh);
    pliersleftRot.position.set(0.5, 7.2, -0.6);
    pliersleftRot.castShadow = true;
    pliersleftRot.receiveShadow = true;

    hand_group.add(pliersleftRot);

    const pliersrightRot = new THREE.Mesh(pliersRotGeometry, grey_mesh);
    pliersrightRot.position.set(0.5, 7.2, -1);
    pliersrightRot.castShadow = true;
    pliersrightRot.receiveShadow = true;

    hand_group.add(pliersrightRot);

    const lowLeftPlierGeom = new THREE.CylinderGeometry(0.05, 0.1, 0.5);
    const lowLeftPlier = new THREE.Mesh(lowLeftPlierGeom, grey_mesh);
    lowLeftPlier.position.set(0.6, 7.26, -0.54);
    lowLeftPlier.rotation.z = -Math.PI/3;
    lowLeftPlier.rotation.y = -Math.PI/6;
    lowLeftPlier.castShadow = true;
    lowLeftPlier.receiveShadow = true;

    hand_group.add(lowLeftPlier);

    const lowRightPlier = new THREE.Mesh(lowLeftPlierGeom, grey_mesh);
    lowRightPlier.position.set(0.6, 7.26, -1.06);
    lowRightPlier.rotation.z = -Math.PI/3;
    lowRightPlier.rotation.y = Math.PI/6;
    lowRightPlier.castShadow = true;
    lowRightPlier.receiveShadow = true;

    hand_group.add(lowRightPlier);

    const leftPlierMid = new THREE.Mesh(pliersRotGeometry, grey_mesh);
    leftPlierMid.position.set(0.8, 7.38, -0.42);
    leftPlierMid.castShadow = true;
    leftPlierMid.receiveShadow = true;

    hand_group.add(leftPlierMid);

    const rightPlierMid = new THREE.Mesh(pliersRotGeometry, grey_mesh);
    rightPlierMid.position.set(0.8, 7.38, -1.16);
    rightPlierMid.castShadow = true;
    rightPlierMid.receiveShadow = true;

    hand_group.add(rightPlierMid);

    const leftPlierTopGeom = new THREE.CylinderGeometry(0.02, 0.08, 0.3);
    const leftPlierTop = new THREE.Mesh(leftPlierTopGeom, grey_mesh);
    leftPlierTop.position.set(0.88, 7.42, -0.47);
    leftPlierTop.rotation.z = -Math.PI/3;
    leftPlierTop.rotation.y = Math.PI/6;
    leftPlierTop.castShadow = true;
    leftPlierTop.receiveShadow = true;

    hand_group.add(leftPlierTop);

    const rightPlierTop = new THREE.Mesh(leftPlierTopGeom, grey_mesh);
    rightPlierTop.position.set(0.88, 7.42, -1.11);
    rightPlierTop.rotation.z = -Math.PI/3;
    rightPlierTop.rotation.y = -Math.PI/6;
    rightPlierTop.castShadow = true;
    rightPlierTop.receiveShadow = true;

    hand_group.add(rightPlierTop);

    // Create invisible box just to better
    // calculate ball picking motion angle
    const invisibleBoxGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const invisibleBox = new THREE.Mesh(invisibleBoxGeometry, orange_mesh);
    invisibleBox.position.set(0.35, 7.1, 0);
    invisibleBox.rotation.z = -Math.PI/3;
    invisibleBox.visible = false;

    hand_group.add(invisibleBox);

    second_junc_group.add(hand_group);

    first_junc_group.add(bbox2);

    arm_group.add(bbox);

    return arm_group;
}

export default createRobot;