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
  box1: Mesh;
  box2: Mesh;
  box3: Mesh;
  octahedron: Mesh;
  player: Promise<void | ISceneLoaderAsyncResult>;
  ground: Mesh;
}