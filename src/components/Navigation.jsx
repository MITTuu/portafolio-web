import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeLink, setActiveLink] = useState('home')

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'profile', 'personal-projects'];
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

    const toggleMenu = () => setIsOpen(!isOpen)

    const handleNavClick = (href) => {
        setIsOpen(false)
        setActiveLink(href.substring(1))
    }

    const links = [
        { href: '#home',              label: '▶ INICIO'    },
        { href: '#profile',           label: '◆ PERFIL'    },
        { href: '#personal-projects', label: '★ PROYECTOS' },
    ]

    return (
        <nav className="navbar">
            <div className="nav-container">
                <a href="#" className="nav-logo">
                    <span className="logo-bracket">[</span>
                    <span className="logo-text">DEV.EXE</span>
                    <span className="logo-bracket">]</span>
                </a>

                <button
                    className="nav-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
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