import { ArrowRight } from 'lucide-react'

export default function Hero({ profileData }) {
    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-content">                    
                    <h1 className="hero-title">
                        <span className="gradient-text">
                            {profileData?.name || 'Cargando...'}
                        </span>
                    </h1>
                    <p className="hero-description">
                        Este portafolio documenta mi viaje en la programación, cada línea de código cuenta una historia de aprendizaje y crecimiento continuo.
                    </p>
                    <div className="hero-cta">
                        <a href="#works" className="btn btn-primary">
                            <span>Explorar proyectos</span>
                            <ArrowRight size={20} />
                        </a>
                        <a href="#profile" className="btn btn-secondary">
                            <span>Conocer más</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}