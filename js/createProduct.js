function createProduct() {
    // Create a group to hold all product parts
    const product = new THREE.Group();
    
    // Example: Create a simple chair using basic geometries
    
    // Chair seat (box)
    const seatGeometry = new THREE.BoxGeometry(2, 0.2, 2);
    const seatMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x654321,
        roughness: 0.7,
        metalness: 0.1
    });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.y = 0.5;
    seat.castShadow = true;
    seat.receiveShadow = true;
    seat.userData.name = "Seat";
    product.add(seat);
    
    // Chair back (box)
    const backGeometry = new THREE.BoxGeometry(2, 1.5, 0.2);
    const backMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x654321,
        roughness: 0.7,
        metalness: 0.1
    });
    const back = new THREE.Mesh(backGeometry, backMaterial);
    back.position.set(0, 1.25, -1);
    back.castShadow = true;
    back.receiveShadow = true;
    back.userData.name = "Back";
    product.add(back);
    
    // Chair legs (cylinders)
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16);
    const legMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.5,
        metalness: 0.5
    });
    
    const positions = [
        [0.9, 0.25, 0.9],
        [-0.9, 0.25, 0.9],
        [0.9, 0.25, -0.9],
        [-0.9, 0.25, -0.9]
    ];
    
    positions.forEach((pos, i) => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        leg.receiveShadow = true;
        leg.userData.name = `Leg ${i+1}`;
        product.add(leg);
    });
    
    return product;
}