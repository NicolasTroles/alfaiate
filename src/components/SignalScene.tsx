'use client';

import { useEffect, type RefObject } from 'react';
import * as THREE from 'three';

/**
 * The diagnostic section's centrepiece: a broken television signal being
 * repaired, scrubbed by scroll position.
 *
 * The whole sequence is one fragment shader reading a single `uProgress`
 * uniform driven by how far through the pinned section you have scrolled:
 *
 *   0.00 - 0.30  snow. Full-amplitude noise, hard RGB channel separation,
 *                a rolling hsync bar and torn scanlines. The set as it
 *                arrives at the bench.
 *   0.30 - 0.55  the test pattern surfaces through the noise — vertical
 *                bars in the brand palette instead of SMPTE's primaries.
 *   0.55 - 0.80  bars fall back, the measurement grid and crosshair lock,
 *                the roll bar slows and dies.
 *   0.80 - 1.00  picture locked: a clean navy panel with one slow scan and
 *                a steady amber indicator. Repaired.
 *
 * Deliberately restrained at the end of the range: the chapter copy is read
 * on top of this, so the final state is calm and low-contrast rather than a
 * finale. The loudest frame is the first one, where there is no text yet.
 *
 * Like PanelScene this is a single fullscreen quad with no geometry, and the
 * scroll handler only writes a uniform — React never re-renders per frame.
 */

const VERTEX_SHADER = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uProgress;

  const vec3 NAVY = vec3(0.0, 0.1216, 0.3098);       // #001F4F
  const vec3 NAVY_DEEP = vec3(0.0, 0.0863, 0.2275);  // #00163A
  const vec3 SIGNAL = vec3(0.0, 0.3451, 0.6);        // #005899
  const vec3 BEAM = vec3(0.0, 0.0, 1.0);             // #0000FF
  const vec3 AMBER = vec3(0.9922, 0.6314, 0.0039);   // #FDA201
  const vec3 PANEL = vec3(0.9569, 0.9647, 0.9725);   // #F4F6F8

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float hash1(float n) {
    return fract(sin(n * 91.3458) * 47453.5453);
  }

  // One of the seven vertical bars of the test pattern, in brand colors.
  vec3 barColor(float i) {
    if (i < 1.0) return PANEL;
    if (i < 2.0) return AMBER;
    if (i < 3.0) return SIGNAL;
    if (i < 4.0) return PANEL * 0.55;
    if (i < 5.0) return BEAM;
    if (i < 6.0) return AMBER * 0.65;
    return SIGNAL * 0.6;
  }

  void main() {
    vec2 frag = gl_FragCoord.xy;
    vec2 uv = frag / uResolution;
    float p = clamp(uProgress, 0.0, 1.0);

    // --- stage weights ------------------------------------------------------
    float snow = smoothstep(0.46, 0.02, p);                       // dies early
    float bars = smoothstep(0.16, 0.40, p) * smoothstep(0.86, 0.56, p);
    float grid = smoothstep(0.34, 0.62, p) * mix(1.0, 0.5, smoothstep(0.78, 1.0, p));
    float lock = smoothstep(0.70, 1.0, p);
    float broken = 1.0 - smoothstep(0.0, 0.72, p);                // roll + tear

    // --- horizontal tearing -------------------------------------------------
    // Bands of the image slip sideways, worst at the start.
    float band = floor(uv.y * 46.0);
    float slip = (hash1(band + floor(uTime * 9.0)) - 0.5);
    slip *= step(0.86, hash1(band * 3.1 + floor(uTime * 6.0))) * 0.16 * broken;
    vec2 tornUv = vec2(uv.x + slip, uv.y);

    // --- RGB channel separation --------------------------------------------
    // Closes as the signal is repaired; a real symptom of a failing panel driver
    // stage, and the most instantly readable "broken TV" cue there is.
    float split = 0.028 * broken * broken;

    // --- test pattern -------------------------------------------------------
    float barIndex = floor(clamp(tornUv.x, 0.0, 0.9999) * 7.0);
    vec3 pattern = barColor(barIndex);
    // Bars lose saturation toward the bottom fifth, the way a real pattern
    // carries a black/white reference strip.
    pattern = mix(pattern, PANEL * 0.2, smoothstep(0.82, 1.0, 1.0 - tornUv.y));

    // --- compose ------------------------------------------------------------
    vec3 color = mix(NAVY_DEEP, NAVY, smoothstep(0.0, 1.0, uv.y));
    color += pattern * bars * 0.46;

    // Channel-split ghosting of the pattern, sampled at three offsets.
    float gr = floor(clamp(tornUv.x + split, 0.0, 0.9999) * 7.0);
    float gb = floor(clamp(tornUv.x - split, 0.0, 0.9999) * 7.0);
    color.r += barColor(gr).r * bars * 0.2;
    color.b += barColor(gb).b * bars * 0.2;

    // --- snow ---------------------------------------------------------------
    // Cell size is in device pixels and deliberately coarse — at 1-2px the
    // noise reads as fabric texture rather than television static.
    float n = hash(floor(frag / 4.0) + floor(uTime * 20.0) * 57.0);
    float n2 = hash(floor(frag / 11.0) + floor(uTime * 13.0) * 21.0);
    // Snow is tinted rather than grey: it stays inside the palette even at
    // full amplitude, and the coarse second octave gives it the clumping a
    // real noise floor has.
    vec3 snowColor = mix(NAVY_DEEP, mix(SIGNAL, PANEL, n), 0.25 + 0.75 * n);
    color = mix(color, snowColor, snow * (0.45 + 0.55 * n2));

    // --- rolling hsync bar --------------------------------------------------
    float rollY = fract(uTime * mix(0.42, 0.06, p) + 0.5);
    float rollDist = abs(fract(uv.y - rollY + 0.5) - 0.5);
    float roll = exp(-pow(rollDist / 0.055, 2.0)) * broken;
    color += mix(SIGNAL, PANEL, 0.4) * roll * 0.32;
    color += AMBER * exp(-pow(rollDist / 0.006, 2.0)) * broken * 0.5;

    // --- measurement grid + crosshair --------------------------------------
    vec2 g = abs(fract(uv * vec2(16.0, 9.0)) - 0.5);
    float gridLine = (1.0 - smoothstep(0.0, 0.02, min(g.x, g.y)));
    color += SIGNAL * gridLine * grid * 0.6;

    vec2 c = abs(uv - 0.5);
    float cross = (1.0 - smoothstep(0.0, 0.0016, c.x)) + (1.0 - smoothstep(0.0, 0.0028, c.y));
    color += AMBER * clamp(cross, 0.0, 1.0) * grid * 0.55;

    // Corner registration ticks, the framing marks of a service pattern.
    vec2 corner = min(uv, 1.0 - uv);
    float tick =
      (1.0 - smoothstep(0.0, 0.003, corner.x)) * step(corner.y, 0.06) +
      (1.0 - smoothstep(0.0, 0.005, corner.y)) * step(corner.x, 0.04);
    color += AMBER * clamp(tick, 0.0, 1.0) * grid * 0.8;

    // --- locked picture -----------------------------------------------------
    // A calm blue bloom and one slow scan travelling down a clean panel.
    float bloom = exp(-pow(length((uv - 0.5) * vec2(1.4, 1.0)) / 0.42, 2.0));
    color += SIGNAL * bloom * lock * 0.42;
    float scan = exp(-pow((uv.y - fract(uTime * 0.09)) / 0.16, 2.0));
    color += SIGNAL * scan * lock * 0.1;

    // --- panel texture ------------------------------------------------------
    // Static scanlines over everything, at CRT scale.
    float lines = 0.5 + 0.5 * sin(frag.y * 1.9);
    color *= 1.0 - lines * 0.075;

    // Vignette, heavier while the signal is bad.
    float vignette = smoothstep(1.2, 0.32, length((uv - 0.5) * vec2(1.2, 1.0)));
    color *= mix(0.62, 0.92, vignette) + 0.08 * lock;

    gl_FragColor = vec4(color, 1.0);
  }
`;

type SignalSceneProps = {
  /** The tall outer section whose scroll range drives `uProgress`. */
  sectionRef: RefObject<HTMLElement>;
  /** Called with 0-1 progress so the overlay can switch chapters. */
  onProgress?: (progress: number) => void;
};

export default function SignalScene({ sectionRef, onProgress }: SignalSceneProps) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const container = section.querySelector<HTMLElement>('[data-signal-canvas]');
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      // Reduced motion starts on the repaired frame rather than the snow: the
      // point of the section is the outcome, and the outcome is the calm one.
      uProgress: { value: reduceMotion ? 1 : 0 },
    };

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const applySize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      const ratio = renderer.getPixelRatio();
      uniforms.uResolution.value.set(w * ratio, h * ratio);
    };
    applySize();

    const resizeObserver = new ResizeObserver(() => {
      applySize();
      if (reduceMotion) renderer.render(scene, camera);
    });
    resizeObserver.observe(container);

    // --- scroll progress ----------------------------------------------------
    // Measured off the outer section: 0 when its top hits the top of the
    // viewport, 1 when its bottom does. Read inside the frame loop, so the
    // scroll listener itself does no layout work.
    let target = uniforms.uProgress.value;
    let reported = -1;
    const measure = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      target = Math.min(1, Math.max(0, -rect.top / travel));
    };

    // Elapsed seconds, paused and resumed by hand. (THREE.Clock is deprecated
    // as of three 0.185, and a running total is all this needs: pausing has
    // to hold the value, not reset it, or the animation jumps when the canvas
    // scrolls back into view.)
    let elapsed = 0;
    let lastTick = 0;
    const tickTime = () => {
      const now = performance.now();
      elapsed += (now - lastTick) / 1000;
      lastTick = now;
      return elapsed;
    };
    let frame = 0;
    let visible = true;

    const loop = () => {
      frame = requestAnimationFrame(loop);
      measure();
      // Eased toward the target rather than snapped to it — the equivalent of
      // GSAP's `scrub: 1`, so a flicked scroll reads as a signal settling
      // instead of a jump cut.
      const current = uniforms.uProgress.value;
      uniforms.uProgress.value = current + (target - current) * 0.12;
      uniforms.uTime.value = tickTime();
      renderer.render(scene, camera);

      if (onProgress) {
        const rounded = Math.round(uniforms.uProgress.value * 100) / 100;
        if (rounded !== reported) {
          reported = rounded;
          onProgress(rounded);
        }
      }
    };

    const start = () => {
      if (frame || !visible || reduceMotion) return;
      lastTick = performance.now();
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    if (reduceMotion) {
      renderer.render(scene, camera);
      onProgress?.(1);
      return () => {
        resizeObserver.disconnect();
        quad.geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(section);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    start();

    return () => {
      stop();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      resizeObserver.disconnect();
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [sectionRef, onProgress]);

  return null;
}
