import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
    StandardMaterial,
    Texture,
    Color3
  } from "@babylonjs/core";
  
  
  function createOctahedron(scene: Scene) {
  let octahedron = MeshBuilder.CreatePolyhedron(
    "oct",
    { type: 1, size: 0.35 },
    scene
  );
  octahedron.position.x = 1;
  octahedron.position.y = 1;
  octahedron.position.z = 1;
  
    var texture = new StandardMaterial("reflective", scene);
    texture.ambientTexture = new Texture("./assets/textures/wood.jpg", scene);
    texture.diffuseColor = new Color3(1, 1, 1);
    octahedron.material = texture;
    return octahedron;
  }
  
  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
  }
  
  function createSphere(scene: Scene) {
    let sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene,
    );
    sphere.position.y = 1;
    var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./assets/textures/wood.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  sphere.material = texture;
    return sphere;
  }
  
  function createGround(scene: Scene) {
    let ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      scene,
    );
    var texture = new StandardMaterial("reflective", scene);
    texture.ambientTexture = new Texture("./assets/textures/floor.jpg", scene);
    texture.diffuseColor = new Color3(1, 1, 1);
    ground.material = texture;
    return ground;
  }
  
  function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 10,
      camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene,
    );
    camera.attachControl(true);
    return camera;
  }
  
  export default function createStartScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      octahedron?: Mesh;
      light?: Light;
      sphere?: Mesh;
      ground?: Mesh;
      camera?: Camera;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    // that.scene.debugLayer.show();
  
    that.octahedron = createOctahedron(that.scene);
    that.light = createLight(that.scene);
    that.sphere = createSphere(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    return that;
  }