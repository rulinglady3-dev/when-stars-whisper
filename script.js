const canvas = document.querySelector("#space");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


camera.position.z = 5;


// YILDIZLAR

const starGeometry = new THREE.BufferGeometry();

const starCount = 6000;

const positions = [];


for(let i=0;i<starCount;i++){

    positions.push(
        (Math.random()-0.5)*2000,
        (Math.random()-0.5)*2000,
        Math.random()*-2000
    );

}

// NEBULA EFEKTİ

const nebulaGeometry = new THREE.BufferGeometry();

const nebulaPositions = [];

for(let i = 0; i < 1500; i++){

    const radius = Math.random() * 700;

    const angle = Math.random() * Math.PI * 2;


    nebulaPositions.push(
        Math.cos(angle) * radius,
        (Math.random()-0.5) * 300,
        Math.sin(angle) * radius - 800
    );

}


nebulaGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        nebulaPositions,
        3
    )
);


const nebulaMaterial = new THREE.PointsMaterial({

    color:0x9b5cff,

    size:8,

    transparent:true,

    opacity:0.12,

    blending:THREE.AdditiveBlending

});


const nebula = new THREE.Points(
    nebulaGeometry,
    nebulaMaterial
);


scene.add(nebula);


starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        positions,
        3
    )
);


const starMaterial = new THREE.PointsMaterial({

    color:0xffffff,
    size:2,
    transparent:true,
    opacity:.9

});


const stars = new THREE.Points(
    starGeometry,
    starMaterial
);


scene.add(stars);



// ANİMASYON

function animate(){

    // SİNEMATİK UÇUŞ

let time = Date.now()*0.0002;


camera.position.z -= 0.05;


camera.position.x =
Math.sin(time)*2;


camera.position.y =
Math.cos(time*0.8)*1.5;



camera.rotation.y =
Math.sin(time)*0.25;


camera.rotation.z =
Math.sin(time*0.7)*0.08;

}

    // yıldız hareketi

    stars.rotation.z +=0.0005;


    renderer.render(
        scene,
        camera
    );

}


animate();



// ekran boyutu

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();


renderer.setSize(
window.innerWidth,
window.innerHeight
);


});
