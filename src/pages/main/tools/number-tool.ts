import {AbstractAnnotationTool} from "./abstract-annotation-tool.ts";
import {ToolName} from "../../../common/tool-name.ts";
import {CircleNumber} from "../cursor.ts";
import {GraphContainer} from "../graphs/graph.ts";
import {Image} from "../graphs/image.ts";

export class NumberTool extends AbstractAnnotationTool {

    private num: number;
    private customCursor: CircleNumber;

    constructor(container: GraphContainer, touchpad: HTMLElement) {
        super(container, touchpad);
        this.styleContext.strokeWidth = 20;
        this.styleContext.strokeColor = 'rgba(255,0,0,0.3)';

        this.num = 1;
        this.customCursor = new CircleNumber(touchpad);
        this.customCursor.style.num = this.num;
    }

    name(): string {
        return ToolName.NUMBER_TOOL;
    }

    active() {
        super.active();
        this.customCursor.active()
    }


    deactive() {
        super.deactive();
        this.customCursor.deactive();
    }

    onMouseDown(mouseDownEvent: MouseEvent): void {
        let svg = this.customCursor.getSVG();
        console.log('number svg:', svg);
        const diameter = this.customCursor.diameter;
        const imageSource = document.createElement('img');
        imageSource.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
        imageSource.onload = () => {
            const image = new Image({
                x: mouseDownEvent.x - diameter/2,
                y: mouseDownEvent.y- diameter/2,
                width: diameter,
                height: diameter,
                imageSource
            })
            this.add(image);
        }

        this.num++;
        this.customCursor.style.num = this.num;
    }

    onMouseMove(_mouseMoveEvent: MouseEvent): void {
    }

}