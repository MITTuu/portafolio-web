export default function Footer() {
    return (
        <footer className="footer">
            <div className="pixel-divider footer-pixel-bar"></div>
            <div className="container">
                <div className="footer-content">
                    <p className="footer-logo">[ DEV.EXE ]</p>
                    <p className="footer-copy">
                        © {new Date().getFullYear()} — GAME OVER? NO. PRESS START AGAIN.
                    </p>
                </div>
            </div>
        </footer>
    )
}