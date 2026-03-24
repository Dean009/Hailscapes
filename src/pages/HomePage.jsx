import { useEffect, useState } from 'react'

const DEFAULT_PORTFOLIO_IMAGES = [
  '1.jpg',
  '1.1.jpg',
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

const ADMIN_IMAGES_STORAGE_KEY = 'hailscapes-admin-images-v1'
const ADMIN_BEFORE_IMAGES_STORAGE_KEY = 'hailscapes-admin-before-images-v1'
const ADMIN_AFTER_IMAGES_STORAGE_KEY = 'hailscapes-admin-after-images-v1'
const ADMIN_AUTH_STORAGE_KEY = 'hailscapes-admin-auth-v1'
const FALLBACK_ADMIN_PASSCODE = 'hailscapes-admin'
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024

function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [adminImages, setAdminImages] = useState([])
  const [beforeImages, setBeforeImages] = useState([])
  const [afterImages, setAfterImages] = useState([])
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)
  const [adminPasscode, setAdminPasscode] = useState('')
  const [adminAuthError, setAdminAuthError] = useState('')
  const [adminUploadError, setAdminUploadError] = useState('')
  const [isAdminStorageAvailable, setIsAdminStorageAvailable] = useState(true)
  const [isNavSolid, setIsNavSolid] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const expectedPasscode = import.meta.env.VITE_ADMIN_PASSWORD || FALLBACK_ADMIN_PASSCODE

  const portfolioImages = [
    ...DEFAULT_PORTFOLIO_IMAGES.map((imageName) => ({
      id: imageName,
      src: `/groundworks/${imageName}`,
      alt: 'Groundworks project image',
      type: 'default'
    })),
    ...adminImages
  ]

  const activePortfolioImage = portfolioImages[currentSlideIndex] || portfolioImages[0]

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_IMAGES_STORAGE_KEY)
      if (!stored) {
        return
      }

      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        setAdminImages(parsed)
      }
    } catch {
      setAdminImages([])
    }
  }, [])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_BEFORE_IMAGES_STORAGE_KEY)
      if (!stored) {
        return
      }

      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        setBeforeImages(parsed)
      }
    } catch {
      setBeforeImages([])
    }
  }, [])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_AFTER_IMAGES_STORAGE_KEY)
      if (!stored) {
        return
      }

      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        setAfterImages(parsed)
      }
    } catch {
      setAfterImages([])
    }
  }, [])

  useEffect(() => {
    if (!isAdminStorageAvailable) {
      return
    }

    try {
      localStorage.setItem(ADMIN_IMAGES_STORAGE_KEY, JSON.stringify(adminImages))
      localStorage.setItem(ADMIN_BEFORE_IMAGES_STORAGE_KEY, JSON.stringify(beforeImages))
      localStorage.setItem(ADMIN_AFTER_IMAGES_STORAGE_KEY, JSON.stringify(afterImages))
    } catch {
      setIsAdminStorageAvailable(false)
      setAdminUploadError('Image saved for now, but browser storage is full. Remove some uploads or use smaller files.')
    }
  }, [adminImages, beforeImages, afterImages, isAdminStorageAvailable])

  useEffect(() => {
    setIsAdminAuthenticated(localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true')
  }, [])

  useEffect(() => {
    localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, isAdminAuthenticated ? 'true' : 'false')
  }, [isAdminAuthenticated])

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
        setIsAdminLoginOpen(false)
      }
    }

    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setIsNavSolid(window.scrollY > 36)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (portfolioImages.length === 0) {
      setCurrentSlideIndex(0)
      return
    }

    if (currentSlideIndex > portfolioImages.length - 1) {
      setCurrentSlideIndex(portfolioImages.length - 1)
    }
  }, [portfolioImages, currentSlideIndex])

  const toDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(new Error(`Failed to read ${file.name}`))
      reader.readAsDataURL(file)
    })

  const handleImageUpload = async (event, imageType, setImageList, label) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) {
      return
    }

    const oversizeFile = files.find((file) => file.size > MAX_UPLOAD_BYTES)
    if (oversizeFile) {
      setAdminUploadError(`${label}: "${oversizeFile.name}" is too large. Please upload images up to 4MB each.`)
      event.target.value = ''
      return
    }

    setAdminUploadError('')

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const src = await toDataUrl(file)
          return {
            id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${file.name}`,
            src,
            alt: file.name,
            type: imageType
          }
        })
      )

      setImageList((current) => [...current, ...uploaded])
    } catch (error) {
      console.error(error)
      setAdminUploadError(`${label}: upload failed. Please try a different image file.`)
    } finally {
      event.target.value = ''
    }
  }

  const removeAdminImage = (imageId, setImageList) => {
    setImageList((current) => current.filter((image) => image.id !== imageId))

    if (selectedImage?.id === imageId) {
      setSelectedImage(null)
    }
  }

  const handleAdminLoginSubmit = (event) => {
    event.preventDefault()

    if (adminPasscode.trim() !== expectedPasscode) {
      setAdminAuthError('Incorrect passcode. Please try again.')
      return
    }

    setIsAdminAuthenticated(true)
    setIsAdminLoginOpen(false)
    setAdminPasscode('')
    setAdminAuthError('')
  }

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false)
    setAdminPasscode('')
    setAdminAuthError('')
  }

  const showPreviousSlide = () => {
    setCurrentSlideIndex((current) => (current === 0 ? portfolioImages.length - 1 : current - 1))
  }

  const showNextSlide = () => {
    setCurrentSlideIndex((current) => (current === portfolioImages.length - 1 ? 0 : current + 1))
  }

  return (
    <div className="agency-site">
      <main>
        <section
          className="premium-hero"
          id="home"
          style={{ backgroundImage: 'url(/groundworks/IMG-20260227-WA0011.jpg)' }}
        >
          <nav className={`floating-nav ${isNavSolid ? 'is-solid' : ''}`} aria-label="Primary navigation">
            <a className="brand-lockup" href="#home" aria-label="Go to homepage">
              <img className="brand-logo-image" src="/logo.png" alt="Hail Landscaping logo" />
              <span>Hail Landscaping</span>
            </a>
            <div className="floating-nav-links">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#portfolio">Projects</a>
              <a href="#contact">Contact</a>
            </div>
          </nav>

          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-logo-feature" aria-hidden="true">
                <img src="/logo.png" alt="" loading="eager" decoding="async" />
              </div>
              <p className="eyebrow">Scott Hail Landscaping</p>
              <h1>
                Create Your Dream
                <br />
                Outdoor Space
              </h1>
              <p className="hero-copy" id="about">
                Premium landscaping and groundwork solutions for homes, estates, and commercial properties across
                Cumbria.
              </p>
              <div className="hero-cta-row">
                <a className="hero-cta-primary" href="#contact">Get Started</a>
                <a className="hero-cta-secondary" href="#portfolio">View Projects</a>
              </div>
            </div>

            <aside className="hero-info-card" aria-label="Company metric">
              <p className="hero-info-kicker">Trusted Locally</p>
              <p className="hero-info-value">500+ Clients</p>
              <p className="hero-info-meta">Landscaping and groundwork projects delivered with precision.</p>
            </aside>

            <article className="hero-featured-card" aria-label="Featured project">
              <p className="hero-featured-tag">Featured Project</p>
              <h3>Carlisle Terrace Build</h3>
              <p>Natural stone patio, structured drainage, and precision finishing for year-round use.</p>
              <a href="#portfolio" aria-label="See featured projects">
                View Project <span aria-hidden="true">-&gt;</span>
              </a>
            </article>
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

        <section className="featured-video-section" aria-labelledby="featured-video-title">
          <div className="featured-video-shell">
            <div className="section-topline featured-video-topline">
              <span>Featured Video</span>
              <span>02</span>
            </div>
            <div className="featured-video-copy">
              <h2 id="featured-video-title">See a Hailscapes project in motion.</h2>
              <p>Full-site groundwork and landscaping footage captured from one of the latest installations.</p>
            </div>
            <div className="featured-video-frame">
              <video
                className="featured-video-player"
                src="/groundworks/project1.mp4"
                poster="/groundworks/1.jpg"
                controls
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </section>

        <section className="content-section" id="portfolio">
          <div className="section-topline">
            <span>Portfolio</span>
            <span>03</span>
          </div>
          <h2>Selected landscaping projects completed across Cumbria.</h2>
          {activePortfolioImage ? (
            <div className="portfolio-carousel">
              <div className="portfolio-carousel-stage">
                <button
                  type="button"
                  className="carousel-nav carousel-nav-prev"
                  onClick={showPreviousSlide}
                  aria-label="Show previous project image"
                >
                  Prev
                </button>

                <figure className="portfolio-carousel-figure">
                  <button
                    type="button"
                    className="portfolio-carousel-button"
                    onClick={() => setSelectedImage({
                      id: activePortfolioImage.id,
                      src: activePortfolioImage.src,
                      alt: activePortfolioImage.alt,
                      index: currentSlideIndex
                    })}
                    aria-label={`Open full size image ${currentSlideIndex + 1}`}
                  >
                    <img
                      src={activePortfolioImage.src}
                      alt={`Groundworks project ${currentSlideIndex + 1}`}
                      loading="lazy"
                    />
                  </button>
                </figure>

                <button
                  type="button"
                  className="carousel-nav carousel-nav-next"
                  onClick={showNextSlide}
                  aria-label="Show next project image"
                >
                  Next
                </button>
              </div>

              <div className="portfolio-carousel-meta">
                <p>Project image {currentSlideIndex + 1} of {portfolioImages.length}</p>
              </div>

              <div className="portfolio-thumbnail-strip" aria-label="Project thumbnails">
                {portfolioImages.map((image, index) => (
                  <button
                    type="button"
                    key={image.id}
                    className={`portfolio-thumbnail ${index === currentSlideIndex ? 'is-active' : ''}`}
                    onClick={() => setCurrentSlideIndex(index)}
                    aria-label={`Show project image ${index + 1}`}
                  >
                    <img src={image.src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {isAdminAuthenticated ? (
          <section className="content-section" id="admin">
            <div className="section-topline">
              <span>Admin</span>
              <span>04</span>
            </div>
            <h2>Manage collage, before, and after photos for this browser session and future visits.</h2>

            <div className="admin-panel">
              <div className="admin-panel-actions">
                <p>Admin mode is active on this device.</p>
                <button type="button" onClick={handleAdminLogout}>Log Out</button>
              </div>

              <h3 className="admin-upload-heading">Collage Photos</h3>
              <label className="admin-upload" htmlFor="admin-image-upload">
                <span>Add Images to Collage</span>
                <input
                  id="admin-image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => handleImageUpload(event, 'admin-collage', setAdminImages, 'Collage photos')}
                />
              </label>
              {adminUploadError ? <p className="admin-upload-error">{adminUploadError}</p> : null}

              {adminImages.length > 0 ? (
                <div className="admin-image-list">
                  {adminImages.map((image, index) => (
                    <article className="admin-image-card" key={image.id}>
                      <img src={image.src} alt={image.alt || `Admin uploaded image ${index + 1}`} loading="lazy" />
                      <div className="admin-image-meta">
                        <p>{image.alt}</p>
                        <button type="button" onClick={() => removeAdminImage(image.id, setAdminImages)}>
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="admin-empty-state">No admin uploads yet. Add images above to include them in the collage.</p>
              )}

              <h3 className="admin-upload-heading">Before Photos</h3>
              <label className="admin-upload" htmlFor="admin-before-upload">
                <span>Add Before Photos (Multiple)</span>
                <input
                  id="admin-before-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => handleImageUpload(event, 'admin-before', setBeforeImages, 'Before photos')}
                />
              </label>

              {beforeImages.length > 0 ? (
                <div className="admin-image-list">
                  {beforeImages.map((image, index) => (
                    <article className="admin-image-card" key={image.id}>
                      <img src={image.src} alt={image.alt || `Before uploaded image ${index + 1}`} loading="lazy" />
                      <div className="admin-image-meta">
                        <p>{image.alt}</p>
                        <button type="button" onClick={() => removeAdminImage(image.id, setBeforeImages)}>
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="admin-empty-state">No before photos uploaded yet.</p>
              )}

              <h3 className="admin-upload-heading">After Photos</h3>
              <label className="admin-upload" htmlFor="admin-after-upload">
                <span>Add After Photos (Multiple)</span>
                <input
                  id="admin-after-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => handleImageUpload(event, 'admin-after', setAfterImages, 'After photos')}
                />
              </label>

              {afterImages.length > 0 ? (
                <div className="admin-image-list">
                  {afterImages.map((image, index) => (
                    <article className="admin-image-card" key={image.id}>
                      <img src={image.src} alt={image.alt || `After uploaded image ${index + 1}`} loading="lazy" />
                      <div className="admin-image-meta">
                        <p>{image.alt}</p>
                        <button type="button" onClick={() => removeAdminImage(image.id, setAfterImages)}>
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="admin-empty-state">No after photos uploaded yet.</p>
              )}
            </div>
          </section>
        ) : null}

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
            <button
              type="button"
              className="team-access-link"
              onClick={() => {
                setIsAdminLoginOpen(true)
                setAdminAuthError('')
              }}
            >
              Team Login
            </button>
            {isAdminAuthenticated ? <a href="#admin">Open Admin Panel</a> : null}
          </div>
        </section>
      </main>

      {isAdminLoginOpen ? (
        <div
          className="admin-login-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Admin login"
          onClick={() => setIsAdminLoginOpen(false)}
        >
          <form className="admin-login-modal" onSubmit={handleAdminLoginSubmit} onClick={(event) => event.stopPropagation()}>
            <h3>Admin Login</h3>
            <p>Enter the team passcode to access collage management tools.</p>
            <label htmlFor="admin-passcode">Passcode</label>
            <input
              id="admin-passcode"
              type="password"
              value={adminPasscode}
              onChange={(event) => setAdminPasscode(event.target.value)}
              autoComplete="current-password"
              required
            />
            {adminAuthError ? <p className="admin-login-error">{adminAuthError}</p> : null}
            <div className="admin-login-actions">
              <button type="button" onClick={() => setIsAdminLoginOpen(false)}>Cancel</button>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      ) : null}

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
              src={selectedImage.src}
              alt={`${selectedImage.alt || 'Groundworks project'} ${selectedImage.index + 1} full size`}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default HomePage