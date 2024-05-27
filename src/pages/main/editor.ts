import {App, Rect} from "leafer-ui";
import {WebviewWindow} from "@tauri-apps/api/window";

export interface ImageInfo{
    dataURL: string,
    width: number,
    height: number
}

export class Editor {
    private _app: App;
    private _editing: boolean;
    constructor(backgroundImage: ImageInfo) {
        this._app = new App({
            view: window,
            ground: { type: 'draw' },
            tree: {},
            sky:  { type: 'draw' }
        });
        const backgroundRect = new Rect({
            width: backgroundImage.width,
            height: backgroundImage.height,
            fill: {
                type: 'image',
                url: backgroundImage.dataURL,
            }
        });
        this._app.ground.add(backgroundRect);
        this._editing=false;
    }

    get editing(): boolean {
        return this._editing;
    }
}

export class AnnotationTool{

}