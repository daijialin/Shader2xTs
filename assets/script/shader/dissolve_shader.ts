import ShaderComponent from "./shader_component";
import ShaderMaterial from "./shader_material";
const { ccclass, menu } = cc._decorator;

@ccclass
@menu('custom/Shader/Dissolve')
export default class DissolveShader extends ShaderComponent {

    protected _shaderName = "Dissolve"
    protected _needUpdate = true

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
    
    void main()
    {
        vec4 c = color * texture2D(texture,uv0);
        float height = c.r;
        if(height < time)
        {
            discard;
        }
        if(height < time+0.04)
        {
            // 溶解颜色，可以自定义
            c = vec4(.9,.6,0.3,c.a);
        }
        gl_FragColor = c;
    }
    `
}
