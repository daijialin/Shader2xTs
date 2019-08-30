import ShaderComponent from "./shader_component";
import ShaderMaterial from "./shader_material";
const { ccclass, menu } = cc._decorator;

@ccclass
@menu('custom/Shader/Blur')
export default class BlurShader extends ShaderComponent {

    protected _shaderName = "Blur"

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
    uniform float num;
    varying vec2 uv0;
    void main () {
        vec4 sum = vec4(0.0);
        vec2 size = vec2(num,num);
        sum += texture2D(texture, uv0 - 0.4 * size) * 0.05;
        sum += texture2D(texture, uv0 - 0.3 * size) * 0.09;
        sum += texture2D(texture, uv0 - 0.2 * size) * 0.12;
        sum += texture2D(texture, uv0 - 0.1 * size) * 0.15;
        sum += texture2D(texture, uv0             ) * 0.16;
        sum += texture2D(texture, uv0 + 0.1 * size) * 0.15;
        sum += texture2D(texture, uv0 + 0.2 * size) * 0.12;
        sum += texture2D(texture, uv0 + 0.3 * size) * 0.09;
        sum += texture2D(texture, uv0 + 0.4 * size) * 0.05;
        
        vec4 vectemp = vec4(0,0,0,0);
        vec4 substract = vec4(0,0,0,0);
        vectemp = (sum - substract) * color;
    
        float alpha = texture2D(texture, uv0).a;
        if(alpha < 0.05) { gl_FragColor = vec4(0 , 0 , 0 , 0); }
        else { gl_FragColor = vectemp; }
    }
    `
    protected setParamValue(material: ShaderMaterial) {
        material.setNum(0.03);
    }
}
