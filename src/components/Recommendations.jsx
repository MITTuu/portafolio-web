import { useState, useEffect, useMemo } from 'react'
import { Send, ChevronLeft, ChevronRight } from 'lucide-react'

const RECOMMENDATIONS_KEY = 'portfolio_recommendations'
const ITEMS_PER_PAGE = 5

export default function Recommendations() {
    const [recommendations, setRecommendations] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        message: ''
    })
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        loadRecommendations()
    }, [])

    const loadRecommendations = async () => {
        try {
            let recs = JSON.parse(localStorage.getItem(RECOMMENDATIONS_KEY) || '[]')

            if (recs.length === 0) {
                const res = await fetch('/data/recommendations.json')
                const data = await res.json()
                recs = data.recommendations || []
                if (recs.length > 0) {
                    localStorage.setItem(RECOMMENDATIONS_KEY, JSON.stringify(recs))
                }
            }

            setRecommendations(recs)
            setCurrentPage(1)
        } catch (error) {
            console.error('Error cargando recomendaciones:', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.name.trim() || !formData.role.trim() || !formData.message.trim()) {
            alert('Por favor, completa todos los campos')
            return
        }

        const newRecommendation = {
            id: Date.now(),
            name: formData.name,
            role: formData.role,
            message: formData.message,
            date: new Date().toISOString()
        }

        const updated = [newRecommendation, ...recommendations]
        setRecommendations(updated)
        localStorage.setItem(RECOMMENDATIONS_KEY, JSON.stringify(updated))

        setFormData({ name: '', role: '', message: '' })
        setShowSuccess(true)
        setCurrentPage(1)

        setTimeout(() => setShowSuccess(false), 3000)
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('es-ES', options)
    }

    // Calcular paginación
    const totalPages = Math.ceil(recommendations.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentRecommendations = recommendations.slice(startIndex, endIndex)

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }

    return (
        <>
            {showSuccess && (
                <div className="success-toast">
                    <strong>¡Gracias por tu recomendación!</strong>
                    <p>Tu mensaje ha sido guardado exitosamente.</p>
                </div>
            )}

            <section id="recommendations" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Recomendaciones</h2>
                    </div>

                    <div className="recommendations-layout">
                        <div className="recommendation-form-card">
                            <h3>Deja tu recomendación</h3>
                            <form className="rec-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Tu nombre"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        name="role"
                                        placeholder="Tu rol o relación"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <textarea
                                        name="message"
                                        placeholder="Escribe tu recomendación aquí..."
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    <span>Enviar</span>
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>

                        <div className="recommendations-list">
                            {recommendations.length === 0 ? (
                                <div className="loading-state">
                                    <p>No hay recomendaciones aún. ¡Sé el primero en dejar una!</p>
                                </div>
                            ) : (
                                <>
                                    {currentRecommendations.map(rec => (
                                        <div key={rec.id} className="recommendation-card">
                                            <div className="recommendation-header">
                                                <div>
                                                    <div className="recommendation-author">{rec.name}</div>
                                                    <div className="recommendation-role">{rec.role}</div>
                                                </div>
                                                <div className="recommendation-date">{formatDate(rec.date)}</div>
                                            </div>
                                            <p className="recommendation-message">"{rec.message}"</p>
                                        </div>
                                    ))}

                                    {totalPages > 1 && (
                                        <div className="pagination">
                                            <button
                                                onClick={handlePreviousPage}
                                                disabled={currentPage === 1}
                                                className="pagination-btn"
                                                aria-label="Página anterior"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>

                                            <div className="pagination-info">
                                                <span className="pagination-text">
                                                    Página {currentPage} de {totalPages}
                                                </span>
                                                <span className="pagination-count">
                                                    {recommendations.length} recomendaciones
                                                </span>
                                            </div>

                                            <button
                                                onClick={handleNextPage}
                                                disabled={currentPage === totalPages}
                                                className="pagination-btn"
                                                aria-label="Página siguiente"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}