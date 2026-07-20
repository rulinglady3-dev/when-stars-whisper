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

    requestAnimationFrame(animate);


    // ileri uçuş hissi

    camera.position.z -= 0.08;


    // yumuşak dönüş

    camera.rotation.z = 
    Math.sin(Date.now()*0.0003)*0.15;


    camera.rotation.y =
    Math.sin(Date.now()*0.0002)*0.2;



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
