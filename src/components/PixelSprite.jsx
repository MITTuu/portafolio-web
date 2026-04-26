import '../styles/PixelSprite.css'

/**
 * Pixel art character sprite made entirely with CSS box-shadows.
 * No emojis, no images — pure CSS pixels.
 * Grid size: 1 "pixel" = 1 unit (scaled via font-size on the root element).
 */
export default function PixelSprite({ size = 8 }) {
    return (
        <div className="pixel-sprite-wrapper" style={{ '--px': `${size}px` }}>
            {/* Each row is one div; each cell is drawn via box-shadow */}
            <div className="pixel-sprite">
                <span className="px-row row-1"></span>
                <span className="px-row row-2"></span>
                <span className="px-row row-3"></span>
                <span className="px-row row-4"></span>
                <span className="px-row row-5"></span>
                <span className="px-row row-6"></span>
                <span className="px-row row-7"></span>
                <span className="px-row row-8"></span>
                <span className="px-row row-9"></span>
                <span className="px-row row-10"></span>
                <span className="px-row row-11"></span>
                <span className="px-row row-12"></span>
            </div>
        </div>
    )
}
