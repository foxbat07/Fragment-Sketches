#include "uniforms.glsl"
#include "pi.glsl"
#include "random.glsl"
#include "noise2D.glsl"

in vec4 vColor;
in vec2 vTexcoord;

out vec4 oColor;

uniform float numberOfCircles; //slider: 0.1,2.0,1.0
uniform float innerRadius; //slider: 0.1,0.5,0.4
uniform float lineWidth; //slider: 0.0,0.1,0.04
uniform float lineWidth2; //slider: 0.0,0.1,0.04
uniform int wiggleFactor; //slider: 0,20,2
uniform float speed; //slider: 0.0,4.0,0.4



vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}


float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    //vec2 u = f*f*(3.0-2.0*f);

    vec2 u = f*f * (3.0 -2.0* f );

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);


}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}


float shape(vec2 st, float radius) {

	st = vec2(0.5)-st;
    float r = length(st)*2.0;
    float a = atan(st.y,st.x);
    float f = radius;

    //float m = abs(mod(a+iGlobalTime,3.14*2.)-3.14)/3.6;
    //m += noise(st+iGlobalTime*0.1)*.5;

    // a *= 1.+abs(atan(iGlobalTime*0.2))*.1;
    //a *= 1.+noise(st+iGlobalTime*0.1)*0.1;
    //f += sin(a*50.)*noise(st+iGlobalTime*.2)*.1;
    //f += (sin(a*3.) * .1 * pow(m,1.));
    
    float m = abs(mod(a+iGlobalTime * speed,3.14*2.)-3.14)/3.6;
    
    f +=  (sin( a*  (wiggleFactor)  ) * pow ( m , 1.) * 0.04 ) ;

    return 1.-smoothstep(f,f+0.008,r);
}



float shapeBorder(vec2 st, float radius, float width) {
    return shape(st,radius)-shape(st,radius-width);
}






void main(void)
{
	vec2 st = vTexcoord;
	vec3 color = vec3(0.0);

	for ( float i = 0.1 ; i < numberOfCircles ; i+=0.1 )
		{
		 color += vec3 ( 
		  0.5 * shapeBorder( st,i + innerRadius, lineWidth + lineWidth2 *( i ) ) , 
		 0.0 , 
		 shapeBorder( st,i + innerRadius, lineWidth + i * lineWidth2 )  );

		}

	//vec3 color = vec3(1.0) * shapeBorder(st,0.6,0.01);



    oColor = vec4( color , 1.0 );

    
}
