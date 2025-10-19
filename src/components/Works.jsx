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
        const date = new Date(dateString)
        if (isNaN(date)) return 'Sin fecha definida'

        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return date.toLocaleDateString('es-ES', options)
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#555555ff" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                    &nbsp;&nbsp;{formatDate(work.date)}
                </div>
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