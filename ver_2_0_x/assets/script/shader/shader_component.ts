import ShaderMaterial from "./shader_material";

const { ccclass, property, executeInEditMode, requireComponent, disallowMultiple } = cc._decorator;

@ccclass
@requireComponent(cc.Sprite)
@executeInEditMode
export default class ShaderComponent extends cc.Component {

    protected _material: ShaderMaterial = null
    protected _color = cc.color()
    protected _start = 0
    protected _shaderName = ""
    protected _state = 100

    protected _vert = `
    uniform mat4 viewProj;
    attribute vec3 a_position;
    attribute vec2 a_uv0;
    varying vec2 uv0;
    void main () {
        vec4 pos = viewProj * vec4(a_position, 1);
        gl_Position = pos;
        uv0 = a_uv0;
    }`;
    protected _frag = `
    uniform sampler2D texture;
    uniform vec4 color;
    varying vec2 uv0;
    void main () {
        vec4 clrx = color * texture2D(texture, uv0);
        float brightness = (clrx.r + clrx.g + clrx.b) * (1. / 3.);
        float gray = (1.5)*brightness;
        clrx = vec4(gray, gray, gray, clrx.a)*vec4(0.8,1.2,1.5,1);
        gl_FragColor =clrx;
    }
    `
    protected _defines = []

    protected _params = []

    protected _needUpdate = false


    start() {
        this.init()
    }

    init() {
        this.node.getComponent(cc.Sprite).setState(0);
        this._applyShader();
    }

    onEnable() {
        this.init()
    }


    update(dt) {
        if (!this._material) return;
        this._setShaderColor();
        this._setShaderTime(dt);
    }

    protected useShader() {
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
            console.warn('Shader not surpport for canvas');
            return;
        }
        let sprite = this.node.getComponent(cc.Sprite);
        if (!sprite || !sprite.spriteFrame || sprite.getState() === cc.Sprite.State.GRAY) {
            return;
        }
        let material = new ShaderMaterial().create(this._shaderName, this._vert, this._frag, this._defines, this._params);
        let texture = sprite.spriteFrame.getTexture();
        material.setTexture(texture);
        material.updateHash();
        this.setParamValue(material)
        let sp = sprite;
        sp["_material"] = material;
        sp["_renderData"]._material = material;
        sp["_state"] = this._state;
        return material;
    }

    protected setParamValue(material: ShaderMaterial) {

    }

    protected _applyShader() {
        let material = this.useShader();
        this._material = material;
        this._start = 0;
        let clr = this._color;
        clr.setR(255), clr.setG(255), clr.setB(255), clr.setA(255);
        this._setShaderColor();
    }

    protected _setShaderColor() {
        let node = this.node;
        let c0 = node.color;
        let c1 = this._color;
        let r = c0.getR(), g = c0.getG(), b = c0.getB(), a = node.opacity;
        let f = !1;
        if (c1.getR() !== r) { c1.setR(r); f = !0; }
        if (c1.getG() !== g) { c1.setG(g); f = !0; }
        if (c1.getB() !== b) { c1.setB(b); f = !0; }
        if (c1.getA() !== a) { c1.setA(a); f = !0; }
        f && this._material.setColor(r / 255, g / 255, b / 255, a / 255);
    }

    protected _setShaderTime(dt) {
        if (this._needUpdate) {
            let start = this._start;
            if (start > 65535) start = 0;
            start += dt;
            this._material.setTime(start);
            this._start = start;
        }
    }
}
