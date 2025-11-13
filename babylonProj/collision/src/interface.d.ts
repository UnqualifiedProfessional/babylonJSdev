import {
  Scene,
  Mesh,
  HemisphericLight,
  Camera,
  ISceneLoaderAsyncResult,
} from "@babylonjs/core";

export interface SceneData {
  scene: Scene;
  lightHemispheric: HemisphericLight;
  camera: Camera;
  player: Promise<void | ISceneLoaderAsyncResult>;
  ground: Mesh;
}