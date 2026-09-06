'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, ImageIcon } from 'lucide-react';

/**
 * One component, two states.
 *
 * With `src` filled it renders a normal next/image. With `src` empty — or
 * when the file fails to load — it renders itself as the placeholder, at the
 * exact aspect ratio the real photo will occupy, so dropping the photo in
 * later shifts nothing on the page.
 *
 * The placeholder carries a ready-to-run generation prompt for whoever is
 * producing the missing image. That prompt is written in English on purpose:
 * it is an instruction for an image model, not site copy, and English is
 * where those models behave best. Every prompt names this project's palette
 * so generated images arrive already matching the site.
 *
 * The prompt lives in a <details>, not a hover tooltip, so it is reachable by
 * keyboard and on touch.
 */
type PhotoProps = {
  /** Path from /public. Leave empty until the real photo exists. */
  src?: string;
  alt: string;
  /** Shown in the placeholder — what this slot is waiting for, in Portuguese. */
  placeholderLabel: string;
  /** English generation prompt for an image model. */
  prompt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export default function Photo({
  src,
  alt,
  placeholderLabel,
  prompt,
  width,
  height,
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className = '',
}: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, permissions). The prompt is
      // already on screen and selectable, so there is nothing to recover.
    }
  };

  if (src && !failed) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      style={{ aspectRatio: `${width} / ${height}` }}
      className={`pixel-grid flex h-full w-full flex-col justify-center gap-6 rounded-card border border-dashed border-signal/35 bg-panel p-5 ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-signal/10 text-signal">
          <ImageIcon aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </span>
        <div>
          <p className="hud text-signal">Foto pendente</p>
          <p className="mt-1.5 text-sm leading-snug text-ink">{placeholderLabel}</p>
        </div>
      </div>

      <details className="group mt-auto rounded-[10px] border border-line bg-white">
        <summary className="hud flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 px-3.5 text-inkMute transition-colors hover:text-signal">
          Prompt para gerar
          <span aria-hidden="true" className="transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="border-t border-line p-3.5">
          <p className="font-mono text-[11px] leading-relaxed text-inkMute" lang="en">
            {prompt}
          </p>
          <button
            type="button"
            onClick={copyPrompt}
            className="mt-3 inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-[8px] border border-line px-3 text-xs font-semibold text-navy transition-colors hover:bg-panel"
          >
            {copied ? (
              <Check aria-hidden="true" className="h-3.5 w-3.5 text-signal" strokeWidth={2.4} />
            ) : (
              <Copy aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.2} />
            )}
            {copied ? 'Prompt copiado' : 'Copiar prompt'}
          </button>
        </div>
      </details>
    </div>
  );
}
