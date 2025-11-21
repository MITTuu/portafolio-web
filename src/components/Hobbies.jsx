import { useState, useEffect } from 'react'
import { Gamepad2, Dumbbell, BookOpen, ChevronRight } from 'lucide-react'

export default function Hobbies() {
    const [hobbies, setHobbies] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeHobby, setActiveHobby] = useState(null)

    useEffect(() => {
        loadHobbies()
    }, [])

    const loadHobbies = async () => {
        try {
            const res = await fetch('/data/hobbies.json')
            const data = await res.json()
            setHobbies(data.hobbies || [])
            if (data.hobbies && data.hobbies.length > 0) {
                setActiveHobby(data.hobbies[0].id)
            }
        } catch (error) {
            console.error('Error cargando hobbies:', error)
        } finally {
            setLoading(false)
        }
    }

    const getHobbyIcon = (category) => {
        switch (category) {
            case 'gaming':
                return <Gamepad2 size={32} />
            case 'sports':
                return <Dumbbell size={32} />
            case 'reading':
                return <BookOpen size={32} />
            default:
                return <ChevronRight size={32} />
        }
    }

    const activeHobbyData = hobbies.find(h => h.id === activeHobby)

    return (
        <section id="hobbies" className="section section-dark">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Hobbies e Intereses</h2>
                    <p className="section-description">
                        Lo que me apasiona más allá del código
                    </p>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Cargando información...</p>
                    </div>
                ) : hobbies.length === 0 ? (
                    <div className="loading-state">
                        <p>No hay información disponible</p>
                    </div>
                ) : (
                    <div className="hobbies-layout">
                        <div className="hobbies-sidebar">
                            {hobbies.map((hobby) => (
                                <button
                                    key={hobby.id}
                                    className={`hobby-tab ${activeHobby === hobby.id ? 'active' : ''}`}
                                    onClick={() => setActiveHobby(hobby.id)}
                                >
                                    <div className="hobby-tab-icon">
                                        {getHobbyIcon(hobby.category)}
                                    </div>
                                    <span className="hobby-tab-title">{hobby.title}</span>
                                </button>
                            ))}
                        </div>

                        <div className="hobbies-content">
                            {activeHobbyData && (
                                <div className="hobby-detail">
                                    <div className="hobby-detail-header">
                                        <div className="hobby-detail-icon">
                                            {getHobbyIcon(activeHobbyData.category)}
                                        </div>
                                        <h3>{activeHobbyData.title}</h3>
                                    </div>

                                    <p className="hobby-description">
                                        {activeHobbyData.description}
                                    </p>

                                    {activeHobbyData.highlights && (
                                        <div className="hobby-highlights">
                                            <h4>Destacados:</h4>
                                            <ul>
                                                {activeHobbyData.highlights.map((highlight, idx) => (
                                                    <li key={idx}>{highlight}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {activeHobbyData.favorites && activeHobbyData.favorites.length > 0 && (
                                        <div className="hobby-favorites">
                                            <h4>Favoritos:</h4>
                                            <div className="favorites-grid">
                                                {activeHobbyData.favorites.map((fav, idx) => (
                                                    <div key={idx} className="favorite-item">
                                                        {fav.image && (
                                                            <img
                                                                src={fav.image}
                                                                alt={fav.name}
                                                                className="favorite-image"
                                                            />
                                                        )}
                                                        <div className="favorite-info">
                                                            <h5>{fav.name}</h5>
                                                            {fav.description && (
                                                                <p>{fav.description}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeHobbyData.stats && (
                                        <div className="hobby-stats">
                                            {activeHobbyData.stats.map((stat, idx) => (
                                                <div key={idx} className="stat-card">
                                                    <div className="stat-value">{stat.value}</div>
                                                    <div className="stat-label">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}