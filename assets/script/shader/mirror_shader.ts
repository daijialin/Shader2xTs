import ShaderComponent from "./shader_component";
const { ccclass, menu } = cc._decorator;

@ccclass
@menu('custom/Shader/Mirror')
export default class MirrorShader extends ShaderComponent {

    protected _shaderName = "Mirror"

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
        vec4 c = color * texture2D(texture, uv0);
        c.r *= 0.5;
        c.g *= 0.8;
        c.b += c.a * 0.2;
        gl_FragColor = c;
    }
    `
}
