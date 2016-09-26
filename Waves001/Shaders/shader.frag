#include "uniforms.glsl"
#include "pi.glsl"

in vec2 vTexcoord;
out vec4 oColor;

uniform float palette; //UI:0.0,1.0,1.0
uniform float frequence; //UI:0.0,64.0,1.0
uniform float power; //UI:0.0,4.0,1.0
uniform float timeScale; //UI:0.0,4.0,1.0
uniform float contrast; //UI:0.0,256.0,1.0


vec2 aspect = vec2( iResolution.x / iResolution.y, 1.0 );
float sind( in vec2 pos )
{
    float dist = 1.0 - length( vTexcoord * aspect - pos );
    dist = abs( cos( dist * PI * int(frequence) + iGlobalTime * timeScale ) );
    dist = pow( dist, power );
    return dist;
}

const int total = 3;
vec2 coords[total] = vec2[total](

vec2( 1.0, 0.5 ),
vec2( 0.0, 0.5 ),

vec2( 0.5, 0.5 )

 );

void main(void)
{
    vec3 c = vec3( 0.0 );
    for( int i = 0; i < total; i++ )
    {
        float value = sind( coords[ i ] * aspect );
        // c += texture( iPalettes, vec2( value, palette ) );
        c += vec3( value );
    }
    c /= float(total);
    c = pow( c, vec3( contrast ) );
    oColor = vec4( 1.0 - 2* c, 1.0 - 2 * c );
}
