import {CubeTexture,} from "@babylonjs/core";

import { SceneData } from "./interfaces";

export default function createRunScene(runScene: SceneData) {
 
//stash for messages to other scripts via externalData
  var stash: { [key: string]: string } = { message: "Empty Stash" };
 
const environmentTexture = new CubeTexture(
    "assets/textures/industrialSky.env",
    runScene.scene
  );
  const skybox = runScene.scene.createDefaultSkybox(
    environmentTexture,
    true,
    10000,
    0.1
  );

  runScene.scene.onAfterRenderObservable.add(() => {});
}
