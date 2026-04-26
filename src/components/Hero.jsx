import { ArrowRight, Gamepad2 } from 'lucide-react'

export default function Hero({ profileData }) {
    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        {profileData?.name || 'Cargando...'}
                    </h1>

                    {/* Dialogue box */}
                    <div className="hero-dialogue">
                        <div className="hero-dialogue-header">
                            <span className="hero-dialogue-dot"></span>
                            <span className="hero-dialogue-name">MENSAJE DEL JUGADOR</span>
                        </div>
                        <p className="hero-description">
                            Este portafolio documenta mi viaje en la programación, cada línea de código cuenta una historia de aprendizaje y crecimiento continuo.
                        </p>
                    </div>

                    <div className="hero-cta">
                        <a href="#personal-projects" className="btn btn-primary">
                            <Gamepad2 size={16} />
                            <span>Ver Proyectos</span>
                        </a>
                        <a href="#profile" className="btn btn-secondary">
                            <span>Conocer más</span>
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="hero-scroll">
                <span className="scroll-indicator">▼ SCROLL ▼</span>
            </div>
        </section>
    )
}