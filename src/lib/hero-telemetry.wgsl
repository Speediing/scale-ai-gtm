struct Params {
  time: f32,
  texel: vec2f,
}

@group(0) @binding(0) var<uniform> params: Params;

fn hash21(p: vec2f) -> f32 {
  return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453);
}

fn valueNoise(p: vec2f) -> f32 {
  let cell = floor(p);
  let local = fract(p);
  let blend = local * local * (3.0 - 2.0 * local);
  let a = hash21(cell);
  let b = hash21(cell + vec2f(1.0, 0.0));
  let c = hash21(cell + vec2f(0.0, 1.0));
  let d = hash21(cell + vec2f(1.0, 1.0));
  return mix(mix(a, b, blend.x), mix(c, d, blend.x), blend.y);
}

fn paperNoise(p: vec2f) -> f32 {
  let broad = valueNoise(p * 3.0);
  let grain = valueNoise(p * 28.0);
  return broad * 0.72 + grain * 0.28;
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / max(params.texel.x, 1.0e-6);
  let p = (uv - vec2f(0.5)) * vec2f(aspect, 1.0);
  let drift = params.time * 0.018;
  let texture = paperNoise(p + vec2f(drift, -drift * 0.6));

  let left = 1.0 - smoothstep(0.22 + texture * 0.06, 0.58, distance(p, vec2f(-0.38, -0.18)));
  let right = 1.0 - smoothstep(0.18 + texture * 0.08, 0.52, distance(p, vec2f(0.38, 0.20)));
  let veil = 1.0 - smoothstep(0.10, 0.38, abs(p.y + 0.16 * sin(p.x * 4.0 + drift * 8.0)));

  let evergreen = vec3f(0.098, 0.227, 0.161);
  let foundryTan = vec3f(0.659, 0.573, 0.486);
  let colorMix = clamp(right * 0.72 + texture * 0.15, 0.0, 1.0);
  let color = mix(evergreen, foundryTan, colorMix);
  let alpha = clamp((left * 0.13 + right * 0.1 + veil * 0.035) * (0.65 + texture * 0.35), 0.0, 0.16);

  return vec4f(color * alpha, alpha);
}
