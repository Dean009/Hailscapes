function AlbumPage() {
  const placeholders = Array.from({ length: 12 }, (_, index) => index + 1)

  return (
    <main className="container my-5">
      <section className="text-center mb-5">
        <h1 className="mb-3">Photo Album</h1>
        <p className="lead text-muted mb-0">Add your project photos here as your gallery grows.</p>
      </section>

      <section className="row g-4">
        {placeholders.map((item) => (
          <div className="col-sm-6 col-lg-3" key={item}>
            <div className="card shadow-sm h-100">
              <div
                className="bg-light border-bottom d-flex align-items-center justify-content-center text-muted"
                style={{ height: '180px' }}
              >
                Image {item}
              </div>
              <div className="card-body text-center">
                <p className="mb-0">Add photo here</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default AlbumPage