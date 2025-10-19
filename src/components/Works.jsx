import { useState, useEffect, useMemo } from 'react'
import { Github, ExternalLink, RotateCcw } from 'lucide-react'

export default function Works({ coursesData }) {
    const [courseFilter, setCourseFilter] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [techFilter, setTechFilter] = useState('')

    const allTechnologies = useMemo(() => {
        const techs = new Set()
        coursesData.forEach(course => {
            course.works?.forEach(work => {
                work.technologies?.forEach(tech => techs.add(tech))
            })
        })
        return Array.from(techs).sort()
    }, [coursesData])

    const filteredCourses = useMemo(() => {
        let filtered = coursesData

        if (courseFilter) {
            filtered = filtered.filter(course => course.code === courseFilter)
        }

        if (typeFilter) {
            filtered = filtered.map(course => ({
                ...course,
                works: course.works.filter(work => work.type.toLowerCase() === typeFilter.toLowerCase())
            })).filter(course => course.works.length > 0)
        }

        if (techFilter) {
            filtered = filtered.map(course => ({
                ...course,
                works: course.works.filter(work => work.technologies.includes(techFilter))
            })).filter(course => course.works.length > 0)
        }

        return filtered
    }, [coursesData, courseFilter, typeFilter, techFilter])

    const resetFilters = () => {
        setCourseFilter('')
        setTypeFilter('')
        setTechFilter('')
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('es-ES', options)
    }

    const uniqueTypes = [
        ...new Set(
            coursesData.flatMap(course => course.works.map(work => work.type))
        )
    ];

    return (
        <section id="works" className="section">
            <div className="container">
                <div className="section-header">                    
                    <h2 className="section-title">Proyectos Académicos</h2>
                    <p className="section-description">
                        Una colección de trabajos que reflejan mi evolución técnica
                    </p>
                </div>

                <div className="filters-card">
                    <div className="filters-grid">
                        <div className="filter-group">
                            <label htmlFor="courseFilter">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                </svg>                                
                                Curso
                            </label>
                            <select
                                id="courseFilter"
                                className="filter-select"
                                value={courseFilter}
                                onChange={(e) => setCourseFilter(e.target.value)}
                            >
                                <option value="">Todos</option>
                                {coursesData.map(course => (
                                    <option key={course.code} value={course.code}>
                                        {course.code} - {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="typeFilter">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>                                
                                Tipo
                            </label>
                            <select
                                id="typeFilter"
                                className="filter-select"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="">Todos</option>
                                {uniqueTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="techFilter">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                    <line x1="8" y1="21" x2="16" y2="21"></line>
                                    <line x1="12" y1="17" x2="12" y2="21"></line>
                                </svg>                                
                                Tecnología
                            </label>
                            <select
                                id="techFilter"
                                className="filter-select"
                                value={techFilter}
                                onChange={(e) => setTechFilter(e.target.value)}
                            >
                                <option value="">Todas</option>
                                {allTechnologies.map(tech => (
                                    <option key={tech} value={tech}>
                                        {tech}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button onClick={resetFilters} className="btn-reset">
                        <RotateCcw size={16} />
                        Limpiar Filtros
                    </button>
                </div>

                <div className="courses-container">
                    {filteredCourses.length === 0 ? (
                        <div className="no-results">
                            <h3>No se encontraron resultados</h3>
                            <p>Intenta ajustar los filtros para ver más trabajos</p>
                        </div>
                    ) : (
                        filteredCourses.map(course => (
                            <div key={course.code} className="course-card">
                                <div className="course-header">
                                    <div className="course-code">{course.code} - {course.name}</div>
                                    <div className="course-period">{course.period}</div>
                                    <p className="course-description">{course.description}</p>
                                </div>
                                <div className="works-grid">
                                    {course.works.map((work, idx) => (
                                        <WorkCard key={idx} work={work} formatDate={formatDate} />
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}

function WorkCard({ work, formatDate }) {
    return (
        <div className="work-card">
            <div className="work-header">
                <h3 className="work-name">{work.name}</h3>
                <span className="work-type">{work.type}</span>
            </div>
            <p className="work-description">{work.description}</p>
            <div className="work-meta">
                <div>📅 {formatDate(work.date)}</div>
            </div>
            <div className="work-technologies">
                {work.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                ))}
            </div>
            {(work.repository || work.demo) && (
                <div className="work-links">
                    {work.repository && (
                        <a
                            href={work.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="work-link"
                        >
                            <Github size={16} />
                            Repositorio
                        </a>
                    )}
                    {work.demo && (
                        <a
                            href={work.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="work-link"
                        >
                            <ExternalLink size={16} />
                            Ver sitio
                        </a>
                    )}
                </div>
            )}
        </div>
    )
}