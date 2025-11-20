import Giscus from '@giscus/react'

export default function Recommendations() {
    return (
        <section id="recommendations" className="section section-dark">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Recomendaciones</h2>
                    <p className="section-description">
                       Inicia sesión con GitHub para dejar una recomendación.
                    </p>
                </div>

                <div className="giscus-container">
                    <Giscus
                        id="recommendations"
                        repo="MITTuu/portafolio-web"
                        repoId="R_kgDOQFE7Gw"
                        category="Recomendaciones"
                        categoryId="DIC_kwDOQFE7G84Cx_Hi"
                        mapping="specific"
                        term="recomendaciones-portafolio"
                        reactionsEnabled="1"
                        emitMetadata="0"
                        inputPosition="top"
                        theme="dark"
                        lang="es"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    )
}