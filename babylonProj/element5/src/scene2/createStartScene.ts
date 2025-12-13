// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
import {
    Scene,
    ArcRotateCamera,
    Vector2,
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
    CubeTexture,
    SceneLoader,
    AbstractMesh
  } from "@babylonjs/core";
import { WaterMaterial } from "@babylonjs/materials/water";
  
  function createSky(scene: Scene) {
      const skybox = MeshBuilder.CreateBox("skyBox", { size: 1000 }, scene);
      const skyboxMaterial = new StandardMaterial("skyBox", scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new CubeTexture(
        "./assets/textures/skybox/skybox",
        scene
      );
      skyboxMaterial.reflectionTexture.coordinatesMode =
        Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
      skyboxMaterial.specularColor = new Color3(0, 0, 0);
      skybox.material = skyboxMaterial;
      return skybox;
    }
  
  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
  }
  
  async function importMeshA(scene: Scene, x: number, y: number): 
  Promise<AbstractMesh> {
  const result = await SceneLoader.ImportMeshAsync(
    "",
    "./assets/mesh/",
    "skull.babylon",
    scene
  );

  const skull = result.meshes[0];
  skull.position.set(0, 12, 0);
  skull.rotation.y = 1.5;

  return skull;
}
  
 function createWater(scene: Scene, skybox: Mesh): Mesh {
  const waterMesh = MeshBuilder.CreateGround(
    "waterMesh",
    { width: 2048, height: 2048, subdivisions: 16 },
    scene
  );

  const water = new WaterMaterial("water", scene, new Vector2(512, 512));

  water.bumpTexture = new Texture("./assets/textures/waterbump.png", scene);
  water.windForce = -10;
  water.waveHeight = 1.7;
  water.bumpHeight = 0.1;
  water.windDirection = new Vector2(1, 1);
  water.waterColor = new Color3(0, 0, 221 / 255);
  water.colorBlendFactor = 0.0;

  // Reflect sky immediately
  water.addToRenderList(skybox);

  waterMesh.material = water;
  return waterMesh;
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
      light?: Light;
      skull?: AbstractMesh;
      ground?: Mesh;
      water?: Mesh;
      sky?: Mesh;
      camera?: Camera;
    }
  
    let that: SceneData = { scene: new Scene(engine) };

  that.sky = createSky(that.scene);
  that.light = createLight(that.scene);
  that.water = createWater(that.scene, that.sky);
  that.camera = createArcRotateCamera(that.scene);

  importMeshA(that.scene, 0, 0).then(skull => {
    that.skull = skull;

    //water reflections for skull
    const waterMat = that.water?.material as WaterMaterial;
    waterMat?.addToRenderList(skull);

    //skull movement
    let t = 0;
    that.scene.registerBeforeRender(function () {
        t += 0.01;
        skull.rotation.x += 0.01*Math.sin(t);
        skull.rotation.y += 0.01*Math.sin(t);
        skull.rotation.z += 0.01*Math.sin(t);
    });
  });

  return that;
}