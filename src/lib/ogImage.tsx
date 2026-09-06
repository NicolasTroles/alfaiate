import { ImageResponse } from 'next/og';
import { site } from '@/config/site.config';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/**
 * The shared social card, rendered at build time by next/og. It repeats the
 * page's own hierarchy — navy field, amber marker, the positioning line — so
 * a shared link looks like the site it opens.
 *
 * No webfont is fetched here on purpose: next/og would have to download and
 * embed the file on every render, and the card is a static image where the
 * system sans is indistinguishable at this size.
 */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #00163A 0%, #001F4F 55%, #003A6B 100%)',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 84,
              height: 68,
              borderRadius: 12,
              background: '#FFFFFF',
              color: '#001F4F',
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            TV
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#FFFFFF', fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
              SYSTEM
            </div>
            <div style={{ color: '#A8BBD4', fontSize: 17, letterSpacing: 3 }}>
              ASSISTÊNCIA TÉCNICA
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ width: 44, height: 3, background: '#FDA201' }} />
            <div style={{ color: '#FDA201', fontSize: 19, letterSpacing: 3 }}>
              QUASE 15 ANOS EM CURITIBA
            </div>
          </div>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              maxWidth: 900,
            }}
          >
            Diagnóstico antes do orçamento.
          </div>
          <div style={{ color: '#A8BBD4', fontSize: 25, marginTop: 26, maxWidth: 940 }}>
            Conserto de TVs LED, LCD e Smart TVs, micro-ondas, fornos elétricos, air fryers e
            lava-louças.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: 5, background: '#FDA201' }} />
          <div style={{ color: '#FFFFFF', fontSize: 21 }}>{site.seo.url.replace('https://', '')}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
