import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeLink, setActiveLink] = useState('home')

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'profile', 'hobbies', 'works', 'personal-projects', 'recommendations', 'blog'];
            let current = 'home';

            sections.forEach(section => {
                const el = document.getElementById(section);
                if (!el) return;

                const rect = el.getBoundingClientRect();

                if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
                    current = section;
                }
            });

            setActiveLink(current);
        };


        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleNavClick = (href) => {
        setIsOpen(false)
        setActiveLink(href.substring(1))
    }

    const links = [
        { href: '#home', label: 'Inicio' },
        { href: '#profile', label: 'Perfil' },
        { href: '#hobbies', label: 'Hobbies' },
        { href: '#works', label: 'Trabajos' },
        { href: '#personal-projects', label: 'Proyectos' },
        { href: '#recommendations', label: 'Recomendaciones' },
        { href: '#blog', label: 'Blog' }
    ]

    return (
        <nav className="navbar">
            <div className="nav-container">
                <a href="#" className="nav-logo">
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-text">Portafolio</span>
                    <span className="logo-bracket">/&gt;</span>
                </a>

                <button
                    className="nav-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    {links.map(link => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className={`nav-link ${activeLink === link.href.substring(1) ? 'active' : ''}`}
                                onClick={() => handleNavClick(link.href)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}