import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

const gui = new dat.GUI()

const params = {
    color: 0xffffff,
}

gui.addColor(params, 'color')
    .onChange(() => {
        material.color.set(params.color)
    })

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorColourTexture = textureLoader.load('/textures/door/color.jpg')
const doorAmbientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')

const spaceBG = textureLoader.load('https://i.insider.com/5dfab6ce855cc20c514e79f6?width=1100&format=jpeg&auto=webp')


const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/5/px.png',
    '/textures/environmentMaps/5/nx.png',
    '/textures/environmentMaps/5/py.png',
    '/textures/environmentMaps/5/ny.png',
    '/textures/environmentMaps/5/pz.png',
    '/textures/environmentMaps/5/nz.png',
])



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

scene.background = environmentMapTexture

// Objects

// const material = new THREE.MeshBasicMaterial({color: '#ff0000'})

// material.color = new THREE.Color('#ff0000')
// material.map = doorColourTexture
// // material.wireframe = true
// // material.opacity = 0.5
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial({color: 'red'})
// // material.flatShading = true

// const material = new THREE.MeshMatcapMaterial({map: matcapTexture})

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial({color: 0xff0000})

// const material = new THREE.MeshPhongMaterial({color: 0xff0000})
// material.shininess = 60
// material.specular = new THREE.Color('green')

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

const material = new THREE.MeshStandardMaterial({color: params.color})
material.metalness = 1
material.roughness = 0
material.envMap = environmentMapTexture
// material.map = doorColourTexture
// material.aoMap = doorAmbientTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

gui.add(material, 'metalness')
    .min(0.1)
    .max(1)
    .step(0.01)

gui.add(material, 'roughness')
.min(0.1)
.max(1)
.step(0.01)


// gui.add(material, 'displacementScale')
// .min(0.01)
// .max(1)
// .step(0.01)




const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 64,64),
    material
)

sphere.position.x = -2

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1,1, 100,100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusKnotBufferGeometry(10,2, 64, 128),
    material
)

// torus.position.x = 2

scene.add(torus)

plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

// LIGHTS

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.4)
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 10;

scene.add(pointLight)


gui.add(pointLight, 'intensity')
    .min(0.1)
    .max(10)
    .step(0.1)

gui.add(material, 'aoMapIntensity')
    .min(1)
    .max(10)
    .step(0.01)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 40
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()