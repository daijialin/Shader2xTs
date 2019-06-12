import ShaderComponent from "./shader_component";
import ShaderMaterial from "./shader_material";

const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('custom/Shader/Flash')
export default class FlashShader extends ShaderComponent {

    @property({ tooltip: "流光倾斜程度0-0.5" })
    angle: number = 0.5
    @property({ tooltip: "流光增亮强度0.004-0.005" })
    strength: number = 0.004

    protected _shaderName = "Flash"

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
    uniform float time;
    varying vec2 uv0;
    uniform float offset; //偏移值         (调整该值改变流光的倾斜程度)
    uniform float strength; //偏移值         (调整该值改变流光的倾斜程度)
    
    void main()
    {
        vec4 src_color = color * texture2D(texture, uv0).rgba;
        float start = tan(time/1.414);  //流光的起始x坐标
        if(uv0.x < (start - offset * uv0.y))
        {
            vec3 improve = strength * vec3(255, 255, 255);
            vec3 result = improve * vec3( src_color.r, src_color.g, src_color.b);
            gl_FragColor = vec4(result, src_color.a);
    
        }else{
            gl_FragColor = src_color;
        }
    }
    `
    protected _defines = []

    protected _params = [{ name: 'offset', type: renderer.PARAM_FLOAT }, { name: 'strength', type: renderer.PARAM_FLOAT }]

    protected _needUpdate = true

    protected setParamValue(material: ShaderMaterial) {
        material.setParamValue("offset", this.angle)
        material.setParamValue("strength", this.strength)
    }

}
