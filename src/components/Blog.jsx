import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Blog() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadBlogPosts()
    }, [])

    const loadBlogPosts = async () => {
        try {
            const res = await fetch('/data/blog.json')
            const data = await res.json()
            setPosts(data.posts || [])
        } catch (error) {
            console.error('Error cargando blog:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('es-ES', options)
    }

    return (
        <section id="blog" className="section section-dark">
            <div className="container">
                <div className="section-header">                    
                    <h2 className="section-title">Blog Técnico</h2>
                </div>

                <div className="blog-grid">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Cargando artículos...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="loading-state">
                            <p>No hay artículos publicados aún</p>
                        </div>
                    ) : (
                        posts.map(post => (
                            <article key={post.id} className="blog-post">
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="blog-image"                                        
                                    />
                                )}
                                <div className="blog-content">
                                    <h3 className="blog-title">{post.title}</h3>
                                    <div className="blog-meta">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#ffffffff" stroke-width="2" stroke-linecap="round"></path> </g></svg>                                        
                                            &nbsp;&nbsp;{formatDate(post.date)}
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Calendar / Timer_Remove"> <path id="Vector" d="M9 13H15M21 6L19 4M10 2H14M12 21C7.58172 21 4 17.4183 4 13C4 8.58172 7.58172 5 12 5C16.4183 5 20 8.58172 20 13C20 17.4183 16.4183 21 12 21Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                                            &nbsp;&nbsp;{post.readTime} min lectura
                                        </label>                                   
                                    </div>
                                    <p className="blog-excerpt">{post.excerpt}</p>
                                    <div className="blog-tags">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="blog-tag">{tag}</span>
                                        ))}
                                    </div>
                                    {post.link && (
                                        <a href={post.link} target="_blank" rel="noopener noreferrer" className="blog-link">
                                            Leer más
                                            <ArrowRight size={18} />
                                        </a>
                                    )}
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}