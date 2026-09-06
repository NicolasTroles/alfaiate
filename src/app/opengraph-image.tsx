import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/ogImage';

export const alt = 'TV System — assistência técnica em TV, micro-ondas e eletrodomésticos';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage();
}
