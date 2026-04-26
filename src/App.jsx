import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Footer from './components/Footer';
import BackgroundShapes from './components/BackgroundShapes';
import PersonalProjects from './components/PersonalProjects';

import './styles/App.css';
import './styles/Navigation.css';
import './styles/Hero.css';
import './styles/Profile.css';
import './styles/Footer.css';
import './styles/PersonalProjects.css';

export default function App() {
  const [profileData, setProfileData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    try {
      const profileRes = await fetch('/data/profile.json');
      const profile = await profileRes.json();
      setProfileData(profile);

      const coursesRes = await fetch('/data/courses.json');
      const courses = await coursesRes.json();
      setCoursesData(courses);

      generateJSONLD(profile);

      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  }

  const generateJSONLD = (profile) => {
    const jsonLD = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: 'Estudiante de Ingeniería en Computación',
      description: profile.bio,
      image: profile.photo,
      url: window.location.href,
      sameAs: [profile.linkedin, profile.github],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Instituto Tecnológico de Costa Rica'
      }
    }
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLD);
    document.head.appendChild(script);
  }

  if (loading) {
    return (
      <div className="loading-page">
        <dix className="spinner"></dix>
        <p>Cargando portafolio...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <BackgroundShapes />
      <Navigation />
      <Hero profileData={profileData} />
      <Profile profileData={profileData} />
      <PersonalProjects />
      <Footer />
    </div>
  );
}