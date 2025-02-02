uniform float uAlpha;
varying vec3 vColor;

#include <fog_pars_fragment>

void main()
{
  vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
  float alpha = step(length(uv - vec2(.5)), .5) * uAlpha;

  if (alpha < 0.01) discard;
  gl_FragColor = vec4(vColor, alpha);
  
  #include <fog_fragment>
}
