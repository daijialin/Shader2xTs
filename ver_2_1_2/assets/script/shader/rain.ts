import ShaderBase from "./shader_base";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RainShader extends ShaderBase {


    protected init() {
        super.init()
        var iResolution = new cc.Vec3(this.node.width, this.node.height, 0);
        var texSize = new cc.Vec2(this.node.width, this.node.height);
        this.setProperty("iResolution", iResolution);
        this.setProperty("texSize", texSize);
    }


}
