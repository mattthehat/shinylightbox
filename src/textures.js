import * as THREE from 'three'

export default () => {
    const textureLoader = new THREE.TextureLoader();

    const doorColourTexture = textureLoader.load('/textures/door/color.jpg')
    const doorAmbientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
    const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
    const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
    const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
    const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
    const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')

    const metcapTexture = textureLoader.load('/textures/metcaps/1.png')
}