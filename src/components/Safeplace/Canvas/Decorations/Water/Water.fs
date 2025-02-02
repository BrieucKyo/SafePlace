uniform sampler2D uShadowTexture;
uniform sampler2D uBackground;
uniform sampler2D uLevel1;
uniform sampler2D uLevel2;

uniform float uUseShadow;
uniform float uTime;
uniform float uFlowIntensity;
uniform float uFlowSpeed;
uniform vec3 uHslTransform;

varying vec2 vWorldUv;
varying vec2 vFlowUv;
varying vec2 vUv;

#pragma glslify: rgb2hsv = require('../../../../../utils/shaders/rgb2hsv')
#pragma glslify: hsv2rgb = require('../../../../../utils/shaders/hsv2rgb')

#include <fog_pars_fragment>

void main()
{
  vec2 ot = vec2(vFlowUv.x + uTime * uFlowSpeed, vFlowUv.y + 0.379 + uTime * uFlowSpeed);
  vec2 offset = vec2(
    sin(ot.x) + sin(1.8 * ot.x + 4.3) + sin(2.7 * ot.x + 0.93) + sin(5. * ot.x + 8.94),
    sin(ot.y + 0.2) + sin(1.8 * ot.y + 4.3) + sin(2.7 * ot.y + 0.93) + sin(5. * ot.y + 8.94)
  ) * uFlowIntensity;

  vec2 uv = vWorldUv + offset - uTime * 0.005;

  vec4 back = texture2D(uBackground, uv);
  vec4 level1 = texture2D(uLevel1, uv);
  vec4 level2 = texture2D(uLevel2, uv);
  vec3 shadow = (uUseShadow > 0.5 ? texture2D(uShadowTexture, vUv).rgb : vec3(1.));

  vec3 color = back.rgb;
  color = mix(color, level1.rgb, level1.a);
  color = mix(color, level2.rgb, level2.a);

  color = rgb2hsv(color) * uHslTransform;
  color = hsv2rgb(color) * shadow;

  gl_FragColor = vec4(clamp(color, 0., 1.), 1.);

  #include <fog_fragment>
}
