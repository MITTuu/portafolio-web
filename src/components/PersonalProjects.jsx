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
            case 'game':
                return <Play size={24} />
            case 'mobile':
                return <Smartphone size={24} />
            case 'web':
                return <Globe size={24} />
            default:
                return <ExternalLink size={24} />
        }
    }

    return (
        <section id="personal-projects" className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Proyectos Personales</h2>
                    <p className="section-description">
                        Explora mis iniciativas personales más allá del ámbito académico
                    </p>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Cargando proyectos...</p>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="loading-state">
                        <p>No hay proyectos personales disponibles aún</p>
                    </div>
                ) : (
                    <div className="personal-projects-grid">
                        {projects.map((project) => (
                            <div key={project.id} className="project-card">
                                <div className="project-icon-wrapper">
                                    <div className="project-icon">
                                        {getProjectIcon(project.type)}
                                    </div>
                                    <span className="project-type-badge">
                                        {project.typeLabel}
                                    </span>
                                </div>

                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="project-image"
                                    />
                                )}

                                <div className="project-content">
                                    <h3 className="project-name">{project.name}</h3>
                                    <p className="project-description">{project.description}</p>

                                    <div className="project-features">
                                        <h4>Características principales:</h4>
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
                                                <Github size={18} />
                                                Código fuente
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link project-link-primary"
                                            >
                                                <ExternalLink size={18} />
                                                Ver proyecto
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