import ShaderComponent from "./shader_component";
const { ccclass, menu } = cc._decorator;

@ccclass
@menu('custom/Shader/Stone')
export default class StoneShader extends ShaderComponent {

    protected _shaderName = "Stone"

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
        float clrbright = (c.r + c.g + c.b) * (1. / 3.);
        float gray = (0.6) * clrbright;
        gl_FragColor = vec4(gray, gray, gray, c.a);
    }
    `
}
