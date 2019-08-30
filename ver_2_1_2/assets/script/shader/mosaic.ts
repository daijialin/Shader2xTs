import ShaderBase from "./shader_base";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MosaicShader extends ShaderBase {

    @property()
    mosaicSize: number = 16

    protected init() {
        super.init()
        var iResolution = new cc.Vec3(this.node.width, this.node.height, 0);
        this.setProperty("iResolution", iResolution)
        this.setProperty("mosaicSize", this.mosaicSize);
    }


}
