function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}

function welcome() {
    // 캔버스 초기화
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector("#welcome-canvas");

    // three 초기화
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
        canvas
    });
    renderer.setClearColor(0x1a1b1e);

    const aspectRatio = window.innerWidth / window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 2000);

    let resizeObserver = new ResizeObserver(() => {
        const aspectRatio = canvas.clientWidth / canvas.clientHeight;
        renderer.setSize(canvas.clientWidth * window.devicePixelRatio, canvas.clientHeight * window.devicePixelRatio, false);
        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();

        console.log("리사이즈!");
    });

    resizeObserver.observe(canvas);

    // 객체 초기화

    const light = new THREE.HemisphereLight(0xffffff, 0x1a1b1e, 1.0);
    light.position.set(- 1.25, 1, 1);
    scene.add(light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    let mainCube = null;

    const forCount = 5;
    const boxSpace = Math.random() * 15 + 5;
    for (var i = -forCount; i <= forCount; i++) {
        for (var j = -forCount; j <= forCount; j++) {
            for (var k = 0; k < forCount * 2; k++) {
                const cube = new THREE.Mesh(geometry, material);
                cube.position.z = -5 - (k * boxSpace);
                cube.position.x = i * boxSpace;
                cube.position.y = j * boxSpace;
                if (i === 0 && j === 0 && k === 0) {
                    mainCube = cube;
                }
                scene.add(cube);
            }
        }
    }
    mainCube.material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    function createRegularTriangle() {
        const geometry = new THREE.BufferGeometry();
        geometry.setFromPoints([
            { x: 0, y: 1, z: 0 },
            { x: -0.86602540378, y: -0.5, z: 0 },
            { x: 0.86602540378, y: -0.5, z: 0 }
        ]);
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        return new THREE.Mesh(geometry, material);
    }

    // 카메라 위치 초기화
    camera.position.z = 10;
    camera.children.push(light);

    // 렌더링 준비
    const totalTime = new THREE.Clock(true);
    totalTime.start();
    const renderTime = new THREE.Clock(true);

    let rx = Math.random() * Math.PI;
    let ry = Math.random() * Math.PI;
    let rz = Math.random() * Math.PI;
    let px = Math.random() * Math.PI;
    let py = Math.random() * Math.PI;
    let pz = Math.random() * Math.PI;

    let mx = 0;
    let my = 0;
    let mx2 = 0;
    let my2 = 0;
    window.addEventListener("mousemove", (event) => {
        mx2 = event.clientX / window.innerWidth - 0.5;
        my2 = event.clientY / window.innerHeight - 0.5;
    });

    render();

    function render() {
        const animationFrame = window.requestAnimationFrame(() => { render(); });
        const deltaTime = renderTime.getDelta();

        update(deltaTime);

        renderer.render(scene, camera);
    }

    function update(deltaTime) {
        const scale = 0.1;
        const colorScale = 0.5;
        const totalElapsedTime = totalTime.getElapsedTime();

        mx = lerp(mx, mx2, deltaTime * 4);
        my = lerp(my, my2, deltaTime * 4);

        camera.rotation.x = Math.sin(rx + totalElapsedTime * scale * 1.16) * 0.5 - my * 0.1;
        camera.rotation.y = Math.cos(ry + totalElapsedTime * scale * 1.12) * 0.2 - mx * 0.1;
        camera.rotation.z = Math.sin(rz + totalElapsedTime * scale * 1.58) * 0.2;
        camera.position.y = Math.cos(py + totalElapsedTime * scale * 0.95) * 3;
        camera.position.x = Math.sin(px + totalElapsedTime * scale * 1.24) * 2;
        camera.position.z = Math.cos(pz + totalElapsedTime * scale * 2.11) * 3;

        material.color = new THREE.Color(
            Math.cos(-totalElapsedTime * colorScale) * .5 + .5,
            Math.cos(-totalElapsedTime * colorScale + (Math.PI / 2)) * .5 + .5,
            Math.cos(-totalElapsedTime * colorScale + (Math.PI)) * .5 + .5);
    }
}

welcome();