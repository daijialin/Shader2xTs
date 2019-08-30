import ShaderBase from "./shader_base";


const { ccclass, property } = cc._decorator;

@ccclass
export default class WaterShader extends ShaderBase {

    protected init() {
        super.init()
        var iResolution = new cc.Vec3(this.node.width, this.node.height, 0);
        this.setProperty("iResolution", iResolution)
    }


}
