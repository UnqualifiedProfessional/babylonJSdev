// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
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
    Color3,
    BoxBlock
  } from "@babylonjs/core";
  
  
  function createBox(scene: Scene) {
  const box = MeshBuilder.CreateBox(
    "box",
    { width: 4, height: 1 },
    scene
  );
  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./assets/textures/wood.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);

  box.position = new Vector3(1, 0.5, 1);
  box.rotation.y = 1;
  box.material = texture;
  let box1 = box.clone("box1");
  box1.position = new Vector3(-1, 0.5, -1);
  box1.rotation.y = 1;
  box1.material = texture;
  let box2 = box.clone("box2");
  box2.position = new Vector3(1, 1.5, -1);
  box2.rotation.y = -1;
  box2.material = texture;
  let box3 = box.clone("box3");
  box3.position = new Vector3(-1, 1.5, 1);
  box3.rotation.y = -1;
  box3.material = texture;
  let box4 = box.clone("box4");
  box4.position = new Vector3(1, 2.5, 1);
  box4.rotation.y = 1;
  box4.material = texture;
  let box5 = box.clone("box5");
  box5.position = new Vector3(-1, 2.5, -1);
  box5.rotation.y = 1;
  box5.material = texture;
  let box6 = box.clone("box6");
  box6.position = new Vector3(1, 3.5, -1);
  box6.rotation.y = -1;
  box6.material = texture;
  let box7 = box.clone("box7");
  box7.position = new Vector3(-1, 3.5, 1);
  box7.rotation.y = -1;
  box7.material = texture;
  let box8 = box.clone("box7");
  box8.position = new Vector3(-2, 1.8, -3);
  box8.rotation.y = -0.8;
  box8.rotation.z = 1;
  box8.material = texture;
  return box;
  }
  
  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
  }
  
  function createGround(scene: Scene) {
    let ground = MeshBuilder.CreateGround(
      "ground",
      { width: 8, height: 8 },
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
      box?: Mesh;
      light?: Light;
      sphere?: Mesh;
      ground?: Mesh;
      camera?: Camera;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    // that.scene.debugLayer.show();
  
    that.box = createBox(that.scene);
    that.light = createLight(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    return that;
  }