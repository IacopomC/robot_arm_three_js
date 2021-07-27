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

    const grey_base_geometry = new THREE.CylinderGeometry(0.25, 0.25, 0.08, 32);
    const gray_base = new THREE.Mesh(grey_base_geometry, grey_mesh);
    gray_base.position.set(0, 0.04, 0);
    gray_base.castShadow = true;
    gray_base.receiveShadow = true;

    arm_group.add(gray_base);
  
    const orange_base_geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
    const orange_base = new THREE.Mesh(orange_base_geometry, orange_mesh);
    orange_base.position.set(0, 0.07, 0);
    orange_base.castShadow = true;
    orange_base.receiveShadow = true;

    arm_group.add(orange_base);
    
    const base_box_geometry = new THREE.BoxGeometry(0.08, 0.2, 0.03);
    const base_box = new THREE.Mesh(base_box_geometry, orange_mesh);
    base_box.position.set(-0.04, 0.12, -0.02);
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
    first_junc_group.position.set(0.09, -0.19, 0);

    // Place group in desired position
    bbox.position.set(-0.09, 0.19, 0);

    const junction_geometry = new THREE.CylinderGeometry(0.06, 0.06, 0.08, 32);
    const first_junction = new THREE.Mesh(junction_geometry, grey_mesh);
    first_junction.position.set(-0.09, 0.19, 0);
    first_junction.rotation.x = Math.PI/2;
    first_junction.castShadow = true;
    first_junction.receiveShadow = true;

    first_junc_group.add(first_junction);
    
    const first_arm_geometry = new THREE.BoxGeometry(0.08, 0.35, 0.03);
    const first_arm = new THREE.Mesh(first_arm_geometry, orange_mesh);
    first_arm.position.set(-0.24, 0.34, 0.02);
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
    second_junc_group.position.set(0.39, -0.45, 0);

    // Place group in desired position
    bbox2.position.set(-0.39, 0.45, 0);
 
    const second_junction = new THREE.Mesh(junction_geometry, grey_mesh);
    second_junction.position.set(-0.39, 0.45, 0);
    second_junction.rotation.x = Math.PI/2;
    second_junction.castShadow = true;
    second_junction.receiveShadow = true;

    second_junc_group.add(second_junction);

    const second_base_geometry = new THREE.CylinderGeometry(0.04, 0.06, 0.3, 32);
    const second_base = new THREE.Mesh(second_base_geometry, orange_mesh);
    second_base.position.set(-0.35, 0.49, -0.08);
    second_base.rotation.z = -Math.PI/3;
    second_base.castShadow = true;
    second_base.receiveShadow = true;

    second_junc_group.add(second_base);
    
    const second_arm_geometry = new THREE.CylinderGeometry(0.03, 0.03, 0.2, 32);
    const second_arm = new THREE.Mesh(second_arm_geometry, grey_mesh);
    second_arm.position.set(-0.15, 0.61, -0.08);
    second_arm.rotation.z = -Math.PI/3;
    second_arm.castShadow = true;
    second_arm.receiveShadow = true;

    second_junc_group.add(second_arm);

    const side_arm_geometry = new THREE.BoxGeometry(0.08, 0.2, 0.03);
    const arm_sides = new THREE.Mesh(side_arm_geometry, orange_mesh);
    arm_sides.position.set(-0.15, 0.61, -0.08);
    arm_sides.rotation.z = -Math.PI/3;
    arm_sides.castShadow = true;
    arm_sides.receiveShadow = true;

    second_junc_group.add(arm_sides);

    const hand_group = new THREE.Group();

    const hand_junction_geometry = new THREE.BoxGeometry(0.08, 0.08, 0.08);
    const hand_junction = new THREE.Mesh(hand_junction_geometry, orange_mesh);
    hand_junction.position.set(-0.05, 0.665, -0.08);
    hand_junction.rotation.z = -Math.PI/3;
    hand_junction.castShadow = true;
    hand_junction.receiveShadow = true;

    hand_group.add(hand_junction);

    const lateral_geometry = new THREE.BoxGeometry(0.08, 0.12, 0.01);
    const lateral_junc_1 = new THREE.Mesh(lateral_geometry, orange_mesh);
    lateral_junc_1.position.set(-0.042, 0.672, -0.12);
    lateral_junc_1.rotation.z = -Math.PI/3;
    lateral_junc_1.castShadow = true;
    lateral_junc_1.receiveShadow = true;

    hand_group.add(lateral_junc_1);

    const lateral_junc_2 = new THREE.Mesh(lateral_geometry, orange_mesh);
    lateral_junc_2.position.set(-0.042, 0.672, -0.04);
    lateral_junc_2.rotation.z = -Math.PI/3;
    lateral_junc_2.castShadow = true;
    lateral_junc_2.receiveShadow = true;

    hand_group.add(lateral_junc_2);

    const wrist_bottom_geometry = new THREE.CylinderGeometry(0.045, 0.03, 0.08, 32);
    const wrist_bottom = new THREE.Mesh(wrist_bottom_geometry, grey_mesh);
    wrist_bottom.position.set(-0.012, 0.685, -0.08);
    wrist_bottom.rotation.z = -Math.PI/3;
    wrist_bottom.castShadow = true;
    wrist_bottom.receiveShadow = true;

    hand_group.add(wrist_bottom);

    const wrist_top_geometry = new THREE.CylinderGeometry(0.03, 0.045, 0.03, 32);
    const wrist_top = new THREE.Mesh(wrist_top_geometry, orange_mesh);
    wrist_top.position.set(0.035, 0.71, -0.08);
    wrist_top.rotation.z = -Math.PI/3;
    wrist_top.castShadow = true;
    wrist_top.receiveShadow = true;

    hand_group.add(wrist_top);
    const pliersBaseGeometry = new THREE.BoxGeometry(0.02, 0.04, 0.01);
    const pliersBase = new THREE.Mesh(pliersBaseGeometry, grey_mesh);
    pliersBase.position.set(0.05, 0.72, -0.08);
    pliersBase.rotation.x = Math.PI/2;
    pliersBase.rotation.y = -Math.PI/3;
    pliersBase.castShadow = true;
    pliersBase.receiveShadow = true;

    hand_group.add(pliersBase);

    const pliersRotGeometry = new THREE.SphereGeometry(0.01, 12, 8);

    const pliersleftRot = new THREE.Mesh(pliersRotGeometry, grey_mesh);
    pliersleftRot.position.set(0.05, 0.72, -0.06);
    pliersleftRot.castShadow = true;
    pliersleftRot.receiveShadow = true;

    hand_group.add(pliersleftRot);

    const pliersrightRot = new THREE.Mesh(pliersRotGeometry, grey_mesh);
    pliersrightRot.position.set(0.05, 0.72, -0.1);
    pliersrightRot.castShadow = true;
    pliersrightRot.receiveShadow = true;

    hand_group.add(pliersrightRot);

    const lowLeftPlierGeom = new THREE.CylinderGeometry(0.005, 0.01, 0.05);
    const lowLeftPlier = new THREE.Mesh(lowLeftPlierGeom, grey_mesh);
    lowLeftPlier.position.set(0.06, 0.726, -0.054);
    lowLeftPlier.rotation.z = -Math.PI/3;
    lowLeftPlier.rotation.y = -Math.PI/6;
    lowLeftPlier.castShadow = true;
    lowLeftPlier.receiveShadow = true;    

    hand_group.add(lowLeftPlier);

    const lowRightPlier = new THREE.Mesh(lowLeftPlierGeom, grey_mesh);
    lowRightPlier.position.set(0.06, 0.726, -0.106);
    lowRightPlier.rotation.z = -Math.PI/3;
    lowRightPlier.rotation.y = Math.PI/6;
    lowRightPlier.castShadow = true;
    lowRightPlier.receiveShadow = true;

    hand_group.add(lowRightPlier);

    const leftPlierMid = new THREE.Mesh(pliersRotGeometry, grey_mesh);
    leftPlierMid.position.set(0.08, 0.738, -0.042);
    leftPlierMid.castShadow = true;
    leftPlierMid.receiveShadow = true;

    hand_group.add(leftPlierMid);

    const rightPlierMid = new THREE.Mesh(pliersRotGeometry, grey_mesh);
    rightPlierMid.position.set(0.08, 0.738, -0.116);
    rightPlierMid.castShadow = true;
    rightPlierMid.receiveShadow = true;

    hand_group.add(rightPlierMid);

    const leftPlierTopGeom = new THREE.CylinderGeometry(0.002, 0.008, 0.03);
    const leftPlierTop = new THREE.Mesh(leftPlierTopGeom, grey_mesh);
    leftPlierTop.position.set(0.088, 0.742, -0.047);
    leftPlierTop.rotation.z = -Math.PI/3;
    leftPlierTop.rotation.y = Math.PI/6;
    leftPlierTop.castShadow = true;
    leftPlierTop.receiveShadow = true;

    hand_group.add(leftPlierTop);

    const rightPlierTop = new THREE.Mesh(leftPlierTopGeom, grey_mesh);
    rightPlierTop.position.set(0.088, 0.742, -0.111);
    rightPlierTop.rotation.z = -Math.PI/3;
    rightPlierTop.rotation.y = -Math.PI/6;
    rightPlierTop.castShadow = true;
    rightPlierTop.receiveShadow = true;

    hand_group.add(rightPlierTop);

    // Create invisible box just to better
    // calculate ball picking motion angle
    const invisibleBoxGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.08);
    const invisibleBox = new THREE.Mesh(invisibleBoxGeometry, orange_mesh);
    invisibleBox.position.set(0.035, 0.71, 0);
    invisibleBox.rotation.z = -Math.PI/3;
    invisibleBox.visible = false;

    hand_group.add(invisibleBox);

    second_junc_group.add(hand_group);

    first_junc_group.add(bbox2);

    arm_group.add(bbox);

    return arm_group;
}

export default createRobot;