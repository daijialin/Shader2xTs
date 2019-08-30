

const { ccclass, property, requireComponent, executeInEditMode } = cc._decorator;

@ccclass
@requireComponent(cc.Sprite)
export default class ShaderBase extends cc.Component {

    @property()
    needUpdate: boolean = false
    @property()
    needColor: boolean = false
    @property({
        tooltip: CC_DEV && '颜色',
        visible() { return this.needColor }
    })
    blendColor: cc.Color = cc.Color.WHITE

    @property({ tooltip: "速度", visible() { return this.needUpdate } })
    speed: number = 1

    private _material: cc.Material = null
    private _sprite: cc.Sprite = null
    protected _start = 0

    onLoad() {
        cc.dynamicAtlasManager.enabled = false;
        this.init()
    }

    protected init() {
        this._sprite = this.node.getComponent(cc.Sprite);
        this._material = this._sprite.sharedMaterials[0];
    }

    protected update(dt) {
        if (!this._sprite || !this._material) return;
        if (this.needUpdate) {
            this._setShaderTime(dt);
        }
        if (this.needColor) {
            this._setShaderColor(this.blendColor)
        }
    }

    protected _setShaderColor(c0: cc.Color) {
        let r = c0.getR(), g = c0.getG(), b = c0.getB(), a = c0.getA();
        let color = { r: 1.0, g: 1.0, b: 1.0, a: 1.0 };
        color.r = r / 255
        color.g = g / 255
        color.b = b / 255
        color.a = a / 255
        this.setProperty("color", color)
    }

    protected _setShaderTime(dt) {
        let start = this._start;
        if (start > 10000) {
            start = 0;
        }
        start += dt * this.speed;
        this._start = start;
        this.setProperty("time", start)
    }

    protected setProperty(key, value) {
        this._material.setProperty(key, value)
        this._sprite.setMaterial(0, this._material);
    }

    protected getProperty(key) {
        if (!this._material) {
            return null
        }
        return this._material.getProperty(key)
    }
}
