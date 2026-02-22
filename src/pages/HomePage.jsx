import { useState } from 'react'

function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div>
      <header className="bg-success text-white py-5 shadow-sm">
        <div className="container">
          <div className="text-center">
            <img
              src="/logo.png"
              alt="Hail Landscapes Logo"
              className="mb-3"
              style={{ maxWidth: '350px', width: '100%' }}
            />
            <h1 className="display-3 fw-bold">Hail Landscapes</h1>
            <p className="lead mb-0">Professional Landscaping Services</p>
            <p className="mb-0">Transform Your Outdoor Space</p>
          </div>
        </div>
      </header>

      <main className="container my-5">
        <section className="text-center mb-5">
          <h2 className="mb-4">Welcome to Hail Landscapes</h2>
          <p className="lead text-muted">
            We specialize in creating beautiful outdoor spaces that enhance your property's value and appeal.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-center mb-4">Our Work</h2>
          <div id="carouselBeforeAfter" className="carousel slide shadow" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselBeforeAfter" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselBeforeAfter" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselBeforeAfter" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row g-0">
                  <div className="col-md-6">
                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                      <div className="text-center">
                        <h3>BEFORE</h3>
                        <p>Project 1 - Before</p>
                        <small className="text-muted">Add your before image here</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bg-success text-white d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                      <div className="text-center">
                        <h3>AFTER</h3>
                        <p>Project 1 - After</p>
                        <small className="text-muted">Add your after image here</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row g-0">
                  <div className="col-md-6">
                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                      <div className="text-center">
                        <h3>BEFORE</h3>
                        <p>Project 2 - Before</p>
                        <small className="text-muted">Add your before image here</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bg-success text-white d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                      <div className="text-center">
                        <h3>AFTER</h3>
                        <p>Project 2 - After</p>
                        <small className="text-muted">Add your after image here</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row g-0">
                  <div className="col-md-6">
                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                      <div className="text-center">
                        <h3>BEFORE</h3>
                        <p>Project 3 - Before</p>
                        <small className="text-muted">Add your before image here</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bg-success text-white d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                      <div className="text-center">
                        <h3>AFTER</h3>
                        <p>Project 3 - After</p>
                        <small className="text-muted">Add your after image here</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselBeforeAfter" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselBeforeAfter" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>

        <section id="contact" className="mb-5">
          <h2 className="text-center mb-4">Contact Us</h2>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow">
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-success btn-lg">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage