import ShaderComponent from "./shader_component";
import ShaderMaterial from "./shader_material";
const { ccclass, menu } = cc._decorator;

@ccclass
@menu('custom/Shader/GaussBlur')
export default class GaussBlurShader extends ShaderComponent {

    protected _shaderName = "GaussBlur"

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
    #define repeats 5.
    uniform sampler2D texture;
    uniform vec4 color;
    uniform float num;
    varying vec2 uv0;
    
    vec4 draw(vec2 uv) {
        return color * texture2D(texture,uv).rgba; 
    }
    float grid(float var, float size) {
        return floor(var*size)/size;
    }
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }
    void main()
    {
        vec4 blurred_image = vec4(0.);
        for (float i = 0.; i < repeats; i++) { 
            vec2 q = vec2(cos(degrees((i/repeats)*360.)),sin(degrees((i/repeats)*360.))) * (rand(vec2(i,uv0.x+uv0.y))+num); 
            vec2 uv2 = uv0+(q*num);
            blurred_image += draw(uv2)/2.;
            q = vec2(cos(degrees((i/repeats)*360.)),sin(degrees((i/repeats)*360.))) * (rand(vec2(i+2.,uv0.x+uv0.y+24.))+num); 
            uv2 = uv0+(q*num);
            blurred_image += draw(uv2)/2.;
        }
        blurred_image /= repeats;
        gl_FragColor = vec4(blurred_image);
    }
    `

    protected setParamValue(material: ShaderMaterial) {
        material.setNum(0.03);
    }
}
