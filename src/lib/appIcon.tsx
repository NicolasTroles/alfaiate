import { ImageResponse } from 'next/og';

/**
 * The favicon and the touch icon, drawn in code.
 *
 * The client's logo file has not arrived yet, so rather than ship a 404 for
 * /favicon.ico this renders the same stand-in mark that Brand.tsx draws: a
 * navy rounded square, "TV", and the amber power dot.
 *
 * TO SWAP IN THE REAL LOGO: delete src/app/icon.tsx and src/app/apple-icon.tsx
 * and drop the real files at src/app/icon.png and src/app/apple-icon.png —
 * the App Router picks those up by filename with no other change.
 */
export function renderAppIcon(size: number) {
  const radius = Math.round(size * 0.22);
  const dot = Math.max(2, Math.round(size * 0.1));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: '#001F4F',
          borderRadius: radius,
          color: '#FFFFFF',
          fontSize: Math.round(size * 0.46),
          fontWeight: 700,
          letterSpacing: -Math.round(size * 0.02),
        }}
      >
        TV
        <div
          style={{
            position: 'absolute',
            right: Math.round(size * 0.13),
            bottom: Math.round(size * 0.13),
            width: dot,
            height: dot,
            borderRadius: dot,
            background: '#FDA201',
          }}
        />
      </div>
    ),
    { width: size, height: size },
  );
}
