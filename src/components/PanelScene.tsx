'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * The hero backdrop: the inside of an LCD panel.
 *
 * Every display this workshop repairs is, physically, a lattice of pixels
 * made of three vertical subpixel stripes behind a black matrix. That is what
 * this renders — at a scale where you can actually see the structure, lit by
 * a field of "energy" that comes from three sources: a slow diagonal wave, a
 * test sweep that crosses the panel every ~18s the way a bench technician
 * runs a panel test, and the pointer, which lights the cells it passes over.
 *
 * The three stripes are the brand's own light colors rather than literal RGB:
 * signal blue and pure blue carry the field, amber is weighted down in the
 * ambient state and comes up only under the pointer — so orange stays the
 * "detail and action" color the brand brief reserves it for, even here.
 *
 * Implementation notes: this is a single fullscreen quad with a fragment
 * shader — no geometry, no lights, no post-processing, so cost is one
 * shader pass and nothing scales with content. Pure three.js rather than
 * react-three-fiber: the frame loop writes uniforms only and never touches
 * React state, so pointer and time updates never re-render the tree. The loop
 * is stopped whenever the canvas leaves the viewport or the tab is hidden.
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
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform float uCell;
  uniform float uIntro;

  // Brand palette, linearised by hand so the shader never guesses.
  const vec3 NAVY = vec3(0.0, 0.1216, 0.3098);       // #001F4F
  const vec3 NAVY_DEEP = vec3(0.0, 0.0863, 0.2275);  // #00163A
  const vec3 SIGNAL = vec3(0.0, 0.3451, 0.6);        // #005899
  const vec3 BEAM = vec3(0.0, 0.0, 1.0);             // #0000FF
  const vec3 AMBER = vec3(0.9922, 0.6314, 0.0039);   // #FDA201

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 frag = gl_FragCoord.xy;

    // --- panel ground: navy, deepening toward the bottom edge -------------
    float vertical = frag.y / uResolution.y;
    vec3 color = mix(NAVY_DEEP, NAVY, smoothstep(0.0, 0.85, vertical));

    // --- pixel lattice ----------------------------------------------------
    vec2 cell = floor(frag / uCell);
    vec2 inCell = fract(frag / uCell);

    // Three vertical stripes per cell; the gaps between them and between
    // rows are the black matrix of a real panel.
    float stripeIndex = floor(inCell.x * 3.0);
    float stripeX = fract(inCell.x * 3.0);
    float stripeMask =
      smoothstep(0.0, 0.16, stripeX) * smoothstep(1.0, 0.84, stripeX);
    float rowMask =
      smoothstep(0.0, 0.12, inCell.y) * smoothstep(1.0, 0.88, inCell.y);
    float mask = stripeMask * rowMask;

    vec3 stripeColor = stripeIndex < 0.5
      ? AMBER
      : (stripeIndex < 1.5 ? SIGNAL : BEAM);
    // Amber is held back in the ambient field so the panel reads blue at
    // rest; the pointer term below brings it up on contact.
    float stripeWeight = stripeIndex < 0.5 ? 0.42 : 1.0;

    vec2 cellCenter = (cell + 0.5) * uCell;

    // --- energy sources ---------------------------------------------------
    // 1. slow diagonal wave, the panel's idle breathing
    float wave = sin(cellCenter.x * 0.0042 + cellCenter.y * 0.0024 - uTime * 0.5);
    wave = smoothstep(0.55, 1.0, wave) * 0.42;

    // 2. bench test sweep crossing left to right
    float sweepX = fract(uTime * 0.055) * (uResolution.x * 1.5) - uResolution.x * 0.25;
    float sweep = exp(-pow((cellCenter.x - sweepX) / 130.0, 2.0)) * 0.6;

    // 3. pointer bloom
    float radius = min(uResolution.x, uResolution.y) * 0.24;
    float d = distance(cellCenter, uPointer);
    float pointer = exp(-(d * d) / (2.0 * radius * radius)) * uPointerStrength;

    // 4. per-cell twinkle, re-seeded a few times a second
    float seed = hash(cell + floor(uTime * 1.6) * 13.37);
    float twinkle = step(0.965, seed) * 0.5;

    float ambient = 0.085;
    float energy = ambient + wave + sweep + twinkle + pointer * 1.35;

    // The pointer also warms the cell: amber climbs where you touch.
    float warmth = pointer * 0.9;
    vec3 lit = mix(stripeColor * stripeWeight, AMBER, clamp(warmth, 0.0, 0.55));

    color += lit * mask * energy;

    // A hairline of pure blue on the lattice edges — the "small detail" use
    // the brand brief allows for #0000FF.
    float edge = (1.0 - stripeMask) * rowMask * 0.05;
    color += BEAM * edge * (0.4 + pointer);

    // --- framing ----------------------------------------------------------
    vec2 uv = frag / uResolution;
    float vignette = smoothstep(1.15, 0.35, length((uv - 0.5) * vec2(1.25, 1.0)));
    color *= 0.55 + 0.45 * vignette;

    // Intro: the panel powers on from the centre outward.
    float powerOn = smoothstep(0.0, 1.0, uIntro * 1.6 - length(uv - 0.5));
    color = mix(NAVY_DEEP, color, clamp(powerOn, 0.0, 1.0));

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function PanelScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
    } catch {
      // No WebGL (old device, hardware acceleration off). The section behind
      // this canvas is already navy, so bailing out costs only the texture.
      return;
    }

    // A fullscreen fragment shader is fill-rate bound, so the pixel ratio is
    // capped well below what a retina display would ask for.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(-9999, -9999) },
      uPointerStrength: { value: 0 },
      uCell: { value: 26 },
      uIntro: { value: reduceMotion ? 1 : 0 },
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
      // Larger cells on phones: the lattice has to stay legible as structure
      // rather than dissolving into noise on a narrow screen.
      uniforms.uCell.value = (w < 640 ? 20 : 26) * ratio;
    };
    applySize();

    const resizeObserver = new ResizeObserver(() => {
      applySize();
      // Under reduced motion there is no frame loop to pick the new size up,
      // so the single static frame has to be repainted here.
      if (reduceMotion) renderer.render(scene, camera);
    });
    resizeObserver.observe(container);

    // --- pointer ------------------------------------------------------------
    // Tracked in device pixels with y flipped, because gl_FragCoord has its
    // origin at the bottom-left while pointer events do not.
    let targetStrength = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = container.getBoundingClientRect();
      const ratio = renderer.getPixelRatio();
      uniforms.uPointer.value.set(
        (event.clientX - rect.left) * ratio,
        (rect.height - (event.clientY - rect.top)) * ratio,
      );
      targetStrength = 1;
    };
    const onPointerLeave = () => {
      targetStrength = 0;
    };
    // Listening on window rather than the canvas: the hero content sits above
    // the canvas, so pointer events over the headline would otherwise never
    // reach it.
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave);

    // --- frame loop ---------------------------------------------------------
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

    const renderFrame = () => {
      uniforms.uTime.value = tickTime();
      uniforms.uIntro.value = Math.min(1, uniforms.uIntro.value + 0.012);
      uniforms.uPointerStrength.value +=
        (targetStrength - uniforms.uPointerStrength.value) * 0.06;
      renderer.render(scene, camera);
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      renderFrame();
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
      // One static, fully powered-on frame: the texture survives, the motion
      // does not.
      uniforms.uTime.value = 12;
      renderer.render(scene, camera);
    } else {
      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) start();
          else stop();
        },
        { threshold: 0 },
      );
      intersectionObserver.observe(container);

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
        window.removeEventListener('pointermove', onPointerMove);
        container.removeEventListener('pointerleave', onPointerLeave);
        quad.geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
