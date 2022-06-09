function welcome() {
    // 캔버스 초기화
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector("#welcome-canvas");

    // three 초기화
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
    });

    const aspectRatio = window.innerWidth / window.innerHeight;
    renderer.setDrawingBufferSize(window.innerWidth, window.innerHeight, aspectRatio);

    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 2000);

    window.addEventListener("resize", (event) => {
        const aspectRatio = window.innerWidth / window.innerHeight;
        renderer.setDrawingBufferSize(window.innerWidth, window.innerHeight, aspectRatio);
        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();
    });

    // 객체 초기화

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x30264d });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 카메라 위치 초기화
    camera.position.z = 5;

    // 렌더링 준비
    const renderTime = new THREE.Clock(true);

    render();

    function render() {
        const animationFrame = window.requestAnimationFrame(() => { render(); });
        const deltaTime = renderTime.getDelta();

        update(deltaTime);

        renderer.render(scene, camera);
    }

    function update(deltaTime) {
        cube.rotation.x += 1 * deltaTime;
        cube.rotation.y += 1 * deltaTime;
    }
}

welcome();