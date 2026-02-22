function ServicesPage() {
  const services = [
    {
      title: 'Lawn Care',
      description: 'Routine mowing, edging, and seasonal lawn maintenance to keep your property looking sharp.'
    },
    {
      title: 'Garden Design',
      description: 'Custom planting layouts and landscape design to suit your space and style.'
    },
    {
      title: 'Hedge & Shrub Trimming',
      description: 'Clean, professional trimming to maintain healthy growth and a polished appearance.'
    },
    {
      title: 'Patio & Pathway Installation',
      description: 'Durable hardscaping solutions that improve access and outdoor living areas.'
    },
    {
      title: 'Mulching & Soil Care',
      description: 'Mulch application and soil improvements to protect plants and support growth.'
    },
    {
      title: 'Seasonal Cleanups',
      description: 'Spring and autumn cleanups including leaf removal, pruning, and bed refresh.'
    }
  ]

  return (
    <main className="container my-5">
      <section className="text-center mb-5">
        <h1 className="mb-3">Our Services</h1>
        <p className="lead text-muted mb-0">Professional landscaping services tailored to your home or business.</p>
      </section>

      <section className="row g-4">
        {services.map((service) => (
          <div className="col-md-6 col-lg-4" key={service.title}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5 card-title">{service.title}</h3>
                <p className="card-text text-muted mb-0">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default ServicesPage