#include "uniforms.glsl"
#include "pi.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;


vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0, 
                     0.0, 
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}



void main(void)
{
    vec3 color = vec3(0.0);
    vec2 toCenter = vec2(0.5)-vTexcoord;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = length(toCenter)*2.0;
  
    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    oColor = vec4 ( hsb2rgb(vec3 ( (angle/TWO_PI)+ iAnimationTime,-0.5 + ( 2.0 * sin(3.0 * iAnimationTime) -radius), 1.0)) , 1.0);

    //oColor = vec4(color,1.0);

}

    
