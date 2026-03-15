import { useEffect, useState } from 'react'

function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null)

  const portfolioImages = [
    'IMG-20260227-WA0001.jpg',
    'IMG-20260227-WA0002.jpg',
    'IMG-20260227-WA0003.jpg',
    'IMG-20260227-WA0004.jpg',
    'IMG-20260227-WA0005.jpg',
    'IMG-20260227-WA0006.jpg',
    'IMG-20260227-WA0007.jpg',
    'IMG-20260227-WA0008.jpg',
    'IMG-20260227-WA0009.jpg',
    'IMG-20260227-WA0010.jpg',
    'IMG-20260227-WA0011.jpg',
    'IMG-20260227-WA0012.jpg',
    'IMG-20260227-WA0013.jpg',
    'IMG-20260227-WA0014.jpg',
    'IMG-20260227-WA0015.jpg',
    'IMG-20260227-WA0016.jpg',
    'IMG-20260227-WA0017.jpg',
    'IMG-20260227-WA0018.jpg',
    'IMG-20260227-WA0019.jpg',
    'IMG-20260227-WA0020.jpg',
    'IMG-20260227-WA0021.jpg',
    'IMG-20260227-WA0022.jpg',
    'IMG-20260227-WA0023.jpg',
    'IMG-20260227-WA0025.jpg',
    'IMG-20260227-WA0026.jpg',
    'IMG-20260227-WA0027.jpg',
    'IMG-20260227-WA0028.jpg',
    'IMG-20260227-WA0029.jpg',
    'IMG-20260227-WA0030.jpg'
  ]

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  return (
    <div className="agency-site">
      <header className="top-header">
        <div className="header-meta">Premium landscaping and groundwork services for homes and estates.</div>
        <div className="header-logo-wrap">
          <img className="header-logo-image" src="/logo.png" alt="Hail Landscaping logo" />
          <div className="header-logo">Hail Landscaping</div>
        </div>
        <div className="header-cities">Cumbria · Lake District · North West</div>
      </header>

      <div className="primary-nav-wrap">
        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#blog">Blog</a>
          <a href="#shop">Shop</a>
          <a href="#education">Education</a>
          <a href="#events">Events</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="social-links" aria-label="Social media links">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="LinkedIn">IN</a>
          <a href="#" aria-label="Behance">BE</a>
        </div>
      </div>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">Scott Hail Landscaping</p>
            <h1>
              Landscaping &amp;
              <br />
              Groundworks
              <br />
              for Homes,
              <br />
              Estates &amp;
              <br />
              Businesses.
            </h1>
            <p className="hero-copy" id="about">
              Based in Cumbria and led by Scott Hail, we create clean, durable, and beautifully finished outdoor
              spaces. From first design ideas to final planting, every detail is delivered with care.
            </p>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-logo-card">
              <div className="hero-logo-badge">
                <img className="hero-logo-image" src="/logo.png" alt="Hail Landscaping logo" />
              </div>
            </div>
          </div>
        </section>

        <section className="content-section" id="services">
          <div className="section-topline">
            <span>Services</span>
            <span>01</span>
          </div>
          <h2>Strategic services built for premium digital growth.</h2>
          <div className="service-grid">
            <article>
              <h3>Landscape Design & Build</h3>
              <p>Complete garden transformations including layout planning, planting schemes, and hard landscaping.</p>
            </article>
            <article>
              <h3>Driveways, Patios & Stonework</h3>
              <p>Precision paving and stone installation built for everyday use and long-term performance.</p>
            </article>
            <article>
              <h3>Groundworks & Site Prep</h3>
              <p>Professional excavation, drainage, and foundation preparation to keep projects moving smoothly.</p>
            </article>
          </div>
        </section>

        <section className="content-section" id="portfolio">
          <div className="section-topline">
            <span>Portfolio</span>
            <span>02</span>
          </div>
          <h2>Selected landscaping projects completed across Cumbria.</h2>
          <div className="portfolio-gallery">
            {portfolioImages.map((imageName, index) => (
              <figure className="portfolio-item" key={imageName}>
                <button
                  type="button"
                  className="portfolio-button"
                  onClick={() => setSelectedImage({ imageName, index })}
                  aria-label={`Open full size image ${index + 1}`}
                >
                  <img
                    src={`/groundworks/${imageName}`}
                    alt={`Groundworks project ${index + 1}`}
                    loading="lazy"
                  />
                </button>
              </figure>
            ))}
          </div>
        </section>

        <section className="content-section testimonials" id="events">
          <div className="section-topline">
            <span>Testimonials</span>
            <span>03</span>
          </div>
          <h2>Trusted by homeowners and businesses throughout Cumbria.</h2>
          <blockquote>
            “Scott and the team were brilliant from start to finish. The workmanship was excellent,
            communication was clear, and our garden now looks fantastic all year round.”
            <cite>Homeowner, Carlisle</cite>
          </blockquote>
        </section>

        <section className="contact-cta" id="contact">
          <p className="eyebrow">Start Your Project</p>
          <h2>Book a site visit with Scott Hail and get a clear plan for your outdoor space.</h2>
          <a className="cta-button" href="mailto:scott@haillandscaping.co.uk">scott@haillandscaping.co.uk</a>
          <div className="ghost-links" id="blog">
            <a href="#">View Recent Projects</a>
            <a href="#" id="shop">Request a Quote</a>
            <a href="#" id="education">Service Areas</a>
          </div>
        </section>
      </main>

      {selectedImage ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Full size project image"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close full size image"
          >
            Close
          </button>

          <div className="lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <img
              src={`/groundworks/${selectedImage.imageName}`}
              alt={`Groundworks project ${selectedImage.index + 1} full size`}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default HomePage