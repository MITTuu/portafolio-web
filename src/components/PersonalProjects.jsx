import { useState, useEffect } from 'react'
import { Github, ExternalLink, Play, Smartphone, Globe } from 'lucide-react'

export default function PersonalProjects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadProjects()
    }, [])

    const loadProjects = async () => {
        try {
            const res = await fetch('/data/personal-projects.json')
            const data = await res.json()
            setProjects(data.projects || [])
        } catch (error) {
            console.error('Error cargando proyectos:', error)
        } finally {
            setLoading(false)
        }
    }

    const getProjectIcon = (type) => {
        switch (type) {
            case 'game':   return <Play size={22} />
            case 'mobile': return <Smartphone size={22} />
            case 'web':    return <Globe size={22} />
            default:       return <ExternalLink size={22} />
        }
    }

    return (
        <section id="personal-projects" className="section">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">★ QUEST LOG ★</span>
                    <h2 className="section-title">Proyectos Personales</h2>
                    <p className="section-description">
                        Proyectos en el área de desarrollo de videojuegos/aplicaciones
                    </p>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <p>Cargando proyectos...</p>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="loading-state">
                        <p>No hay proyectos disponibles aún</p>
                    </div>
                ) : (
                    <div className="personal-projects-grid">
                        {projects.map((project) => (
                            <div key={project.id} className="project-card">
                                {/* Pixel window title bar */}
                                <div className="project-window-bar">
                                    <div className="project-window-dots">
                                        <span className="project-window-dot"></span>
                                        <span className="project-window-dot"></span>
                                        <span className="project-window-dot"></span>
                                    </div>
                                    <span className="project-window-label">
                                        {project.name?.toUpperCase() || 'PROJECT.EXE'}
                                    </span>
                                </div>

                                <div className="project-icon-wrapper">
                                    <div className="project-icon">
                                        {getProjectIcon(project.type)}
                                    </div>
                                    <span className="project-type-badge">
                                        {project.typeLabel}
                                    </span>
                                </div>

                                {project.videoEmbed ? (
                                    <div className="project-video-wrapper">
                                        <iframe
                                            className="project-video"
                                            src={project.videoEmbed}
                                            title={project.name}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="project-image"
                                    />
                                ) : null}

                                <div className="project-content">
                                    <h3 className="project-name">{project.name}</h3>
                                    <p className="project-description">{project.description}</p>

                                    <div className="project-features">
                                        <h4>► Características principales:</h4>
                                        <ul>
                                            {project.features.map((feature, idx) => (
                                                <li key={idx}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="project-technologies">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="project-links">
                                        {project.repository && (
                                            <a
                                                href={project.repository}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link"
                                            >
                                                <Github size={16} />
                                                Código
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link project-link-primary"
                                            >
                                                <ExternalLink size={16} />
                                                Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}