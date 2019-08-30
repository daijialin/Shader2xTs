import ShaderBase from "./shader_base";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlashShader extends ShaderBase {

    @property({ tooltip: "流光倾斜程度" })
    angle: number = 0.5
    @property({ tooltip: "流光增亮强度0-1" })
    strength: number = 0.8

    protected init() {
        super.init()
        this.setProperty("offset", this.angle)
        this.setProperty("strength", this.strength)
    }

}
