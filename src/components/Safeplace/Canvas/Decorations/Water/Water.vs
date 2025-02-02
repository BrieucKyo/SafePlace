uniform float uScale;
uniform float uFlowDirection;

varying vec2 vWorldUv;
varying vec2 vUv;
varying vec2 vFlowUv;

vec2 rotateUV(vec2 uv, float rotation)
{
  float mid = 0.5;
  return vec2(
    cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
    cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
  );
}

#include <fog_pars_vertex>

void main()
{
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vWorldUv = (modelMatrix * vec4(position, 1.)).xz * (1. / uScale);
  vFlowUv = rotateUV(vWorldUv, uFlowDirection);

  #include <fog_vertex>
}
