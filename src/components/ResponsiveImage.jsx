import { useState } from 'react'

// Rewrite only Commons thumbnails, leaving other hosts and original files alone.
export const sized = (src, width) => /^https:\/\/(?:upload|thumb)\.wikimedia\.org\/wikipedia\/commons\/thumb\//.test(src) && /\/\d+px-[^/]+$/.test(src)
  ? src.replace(/\/\d+px-([^/]+)$/, `/${width}px-$1`) : src

export default function ResponsiveImage({ src, alt = '', sizes, eager = false, className = '' }) {
  const [failedSrc, setFailedSrc] = useState(null)
  if (!src || failedSrc === src) return <span role="img" aria-label={alt || 'Imagem indisponível'} className={className} />
  const responsive = sized(src, 330) !== src || sized(src, 960) !== src
  return <img crossOrigin={/wikimedia\.org\//.test(src) ? 'anonymous' : undefined} src={sized(src, 960)}
    srcSet={responsive ? [330, 960, 1920].map(width => `${sized(src, width)} ${width}w`).join(', ') : undefined}
    sizes={responsive ? sizes : undefined} alt={alt}
    loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined}
    decoding="async" className={className} onError={() => setFailedSrc(src)} />
}
