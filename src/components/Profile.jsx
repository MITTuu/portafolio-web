export default function Profile({ profileData }) {
    if (!profileData) return null

    return (
        <section id="profile" className="section section-dark">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">◆ CHARACTER SHEET ◆</span>
                    <h2 className="section-title">Perfil Profesional</h2>
                </div>

                <div className="profile-split">
                    <div className="profile-sidebar">
                        <div className="profile-card">
                            {/* Window title bar */}
                            <div className="profile-card-header">
                                <span className="profile-card-header-dot"></span>
                                <span className="profile-card-header-dot"></span>
                                <span className="profile-card-header-dot"></span>
                                <span className="profile-card-header-title">PLAYER.DAT</span>
                            </div>

                            <div className="profile-card-body">
                                <div className="profile-image-wrapper">
                                    <img
                                        src={profileData.photo}
                                        alt="Foto de perfil"
                                        className="profile-image"
                                    />
                                    <div className="profile-status">
                                        <span className="status-dot"></span>
                                        ONLINE
                                    </div>
                                </div>
                                <h3 className="profile-name">{profileData.name}</h3>
                                <div className="profile-social">
                                    <a
                                        href={profileData.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        title="LinkedIn"
                                    >
                                        <svg fill="none" height="20px" width="20px" viewBox="-143 145 512 512" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="var(--pixel-dark)" d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z"/>
                                        </svg>
                                    </a>
                                    <a
                                        href={profileData.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        title="GitHub"
                                    >
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.29183 21V18.4407L9.3255 16.6219C9.36595 16.0561 9.58639 15.5228 9.94907 15.11C9.9791 15.0763 9.96988 15.0511 9.94907 15.0485C7.52554 14.746 5.0005 13.7227 5.0005 9.26749C4.9847 8.17021 5.3427 7.10648 6.00437 6.27215C6.10601 6.1482 6.11618 6.09772 6.10194 6.05134C5.81065 4.96474 5.86295 3.98363 6.20527 3.09818C6.22568 3.04599 6.25251 3.02108 6.28698 3.01493C6.50189 2.97661 7.37036 2.92534 9.03298 4.07346C9.22901 4.21168 9.27794 4.22011 9.32344 4.20716C11.1766 3.73226 12.8234 3.73226 14.4038 4.1337C14.7174 4.21872 14.8202 4.17653 14.967 4.07346C16.6257 2.92776 17.4894 2.9764 17.7053 3.01469C17.7404 3.02092 17.7678 3.04628 17.781 3.07946C18.1341 3.97811 18.1894 4.96214 17.946 5.88321C17.9278 6.18875 17.9528 6.21877 17.9956 6.27215C18.6573 7.10648 19.0153 8.17021 18.9995 9.26749C18.9995 13.747 16.4565 14.7435 14.0214 15.015C14.0073 15.0165 14.001 15.0334 14.0105 15.0439C14.2671 15.3296 14.4577 15.6544 14.5811 16.0103C14.7101 16.3824 14.7626 16.7797 14.7351 17.1754V21" stroke="var(--pixel-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M4 17C4.36915 17.0523 4.72159 17.1883 5.03065 17.3975C5.3397 17.6068 5.59726 17.8838 5.7838 18.2078C5.94231 18.4962 6.15601 18.7504 6.41264 18.9557C6.66927 19.161 6.96379 19.3135 7.27929 19.4043C7.59478 19.4952 7.92504 19.5226 8.25112 19.485C8.5772 19.4475 8.89268 19.3457 9.17946 19.1855" stroke="var(--pixel-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-main">
                        <div className="bio-card">
                            <div className="bio-card-header">
                                <h4>▶ BIOGRAFÍA</h4>
                            </div>
                            <div className="bio-card-body">
                                <p>{profileData.bio}</p>
                            </div>
                        </div>

                        {profileData.skills && (
                            <div className="skills-grid">
                                {profileData.skills.map(category => (
                                    <div key={category.category} className="skill-category">
                                        <h4>◆ {category.category}</h4>
                                        <div className="skill-category-body">
                                            {category.items.map(skill => (
                                                <div key={skill.name} className="skill-item">
                                                    <div className="skill-name">
                                                        <span>{skill.name}</span>
                                                        <span>{skill.level} XP</span>
                                                    </div>
                                                    <div className="skill-bar">
                                                        <div
                                                            className="skill-progress"
                                                            style={{ width: `${skill.level}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}