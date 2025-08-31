import React, { useState, useEffect } from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaArrowUp } from 'react-icons/fa'

function Footer() {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="pt-5 pb-4 mt-5"
      style={{
        background: 'linear-gradient(to right, #413BFF, #6050DC)',
        color: '#fff',
        position: 'relative'
      }}
    >
      <div className="container text-center">

        {/* Section Navigation Links */}
        <div className="mb-4">
          <a href="#" className="text-white text-decoration-none mx-3 footer-link">Home</a>
          <a href="#" className="text-white text-decoration-none mx-3 footer-link">About</a>
          <a href="#" className="text-white text-decoration-none mx-3 footer-link">Shop</a>
          <a href="#" className="text-white text-decoration-none mx-3 footer-link">Contact</a>
        </div>

        {/* Social Media Icons */}
        <div className="mb-4">
          <a href="#" className="text-white mx-3 fs-4 social-icon" title="Facebook"><FaFacebook /></a>
          <a href="#" className="text-white mx-3 fs-4 social-icon" title="Twitter"><FaTwitter /></a>
          <a href="#" className="text-white mx-3 fs-4 social-icon" title="Instagram"><FaInstagram /></a>
        </div>

        {/* Newsletter Signup */}
        <div className="mb-4">
          <h6 className="fw-bold mb-2">Join our mailing list</h6>
          <div className="d-flex justify-content-center flex-wrap gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="form-control rounded-pill px-4"
              style={{ maxWidth: '280px', minWidth: '200px' }}
            />
            <button className="btn btn-light text-primary fw-semibold rounded-pill px-4">
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-4 mb-0 small">© {new Date().getFullYear()} Weavum Technology. All rights reserved.</p>
      </div>

      {/* Scroll-to-Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="btn btn-light rounded-circle shadow"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 1050,
            padding: '12px 14px'
          }}
          title="Scroll to top"
        >
          <FaArrowUp color="#6050DC" />
        </button>
      )}
    </footer>
  )
}

export default Footer
