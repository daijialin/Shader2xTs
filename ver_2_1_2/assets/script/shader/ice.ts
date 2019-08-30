import ShaderBase from "./shader_base";


const { ccclass, property } = cc._decorator;

@ccclass
export default class IceShader extends ShaderBase {


    @property({ tooltip: "增亮强度" })
    strength: number = 1.5

    protected init() {
        super.init()
        this.setProperty("strength", this.strength)
    }


}
