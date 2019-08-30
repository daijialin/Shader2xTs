import ShaderBase from "./shader_base";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GaussBlurShader extends ShaderBase {

    @property()
    num: number = 0.03


    protected init() {
        super.init()
        this.setProperty("num", this.num)
    }

}
