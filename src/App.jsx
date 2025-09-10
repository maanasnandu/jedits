import React, { useState, useEffect } from 'react'
import jEdits from './assets/jedits_hero.jpg'
import afterEf from './assets/after-effects_5611014.png'
import premierp from './assets/premiere-pro_9814226.png'
import davin from './assets/davinci_1146094.png'
const App = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      })
      setActiveSection(sectionId)
    }
    setIsMobileMenuOpen(false)
  }

  const handleNavLinkClick = (e, sectionId) => {
    e.preventDefault()
    scrollToSection(sectionId)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'services', name: 'Services' },
    { id: 'works', name: 'Works' },
    { id: 'contact', name: 'Contact' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)

      const sections = ['home', 'services', 'works', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          if (scrollPosition >= section.offsetTop - 100) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='appContainer'>
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
        integrity='sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=='
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />

      <style>{`
        /* Global Styles */
        * {
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Geneva, Verdana, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          margin: 0;
          padding: 0;
        }

        .appContainer {
          background-color: #f8f7f5;
          min-height: 100vh;
          color: #2d3748;
        }
        
        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          z-index: 50;
          width: 100%;
          transition: all 0.3s ease;
        }

        .navbar.scrolled {
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .navbarContainer {
          max-width: 1280px;
          margin: auto;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
          
        .navLogo {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .navLogo span {
          color: #54a0ff;
        }

        .navLinks {
          display: none;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .navLinks {
            display: flex;
          }
        }

        .navLink {
          position: relative;
          color: #4a5568;
          font-weight: 600;
          transition: color 0.2s ease;
          padding-bottom: 0.25rem;
        }

        .navLink:hover {
          color: #54a0ff;
        }

        .navLink.active {
          color: #54a0ff;
        }
        
        .navLink::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #54a0ff;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .navLink:hover::after,
        .navLink.active::after {
          transform: scaleX(1);
        }

        .softwareIcons {
          width: 4.5rem;
          height: 4.5rem;
          padding: 1rem;
        }

        .software-icon-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .software-icon-name {
          position: absolute;
          bottom: 1rem;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          font-size: 0.75rem;
          white-space: nowrap;
        }
        
        .software-icon-container:hover .software-icon-name {
          opacity: 1;
          visibility: visible;
        }

        .mobileMenuToggle {
          display: block;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
          color: #2d3748;
        }

        @media (min-width: 768px) {
          .mobileMenuToggle {
            display: none;
          }
        }

        .mobileMenu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #fff;
          z-index: 40;
          padding-top: 6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
        }

        .mobileMenu.open {
          transform: translateX(0);
        }

        /* Hero Section */
        .heroSection {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          color: #fff;
          overflow: hidden;
        }

        .heroBackground {
          position: absolute;
          inset: 0;
        }

        .heroImage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: opacity 1s ease-in-out;
          opacity: 0;
        }
        
        .heroImage.visible {
          opacity: 0.3;
          z-index: 1;
        }

        .heroContent {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 42rem;
          background-color: rgba(26, 32, 44, 0.6);
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .profileImage {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .profileImage img {
          border-radius: 9999px;
          width: 8rem;
          height: 8rem;
          object-fit: cover;
          border: 4px solid #54a0ff;
        }

        .heroTitle {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          margin-bottom: 1rem;
        }

        @media (min-width: 768px) {
          .heroTitle {
            font-size: 3rem;
          }
        }

        .heroTitle span {
          color: #54a0ff;
        }

        .heroSubtitle {
          font-size: 1.125rem;
          color: #d1d5db;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .heroSubtitle {
            font-size: 1.25rem;
          }
        }

        .heroButton {
          display: inline-block;
          padding: 0.75rem 2rem;
          background-color: #54a0ff;
          color: #fff;
          font-weight: 700;
          border-radius: 9999px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .heroButton:hover {
          background-color: #222f3e;
          transform: scale(1.05);
        }

        /* Services Section */
        .servicesSection {
          padding-top: 5rem;
          padding-bottom: 5rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .servicesContainer {
          max-width: 1280px;
          margin: auto;
        }

        .sectionTitle {
          font-size: 2.25rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
        }

        .sectionTitle span {
          color: #54a0ff;
        }

        .servicesGrid {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr;
        }

        @media (min-width: 768px) {
          .servicesGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .servicesGrid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .serviceCard {
          background-color: #fff;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: box-shadow 0.3s ease;
        }

        .serviceCard:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .serviceIcon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
        }

        .serviceIcon i {
          font-size: 2.5rem;
          color: #54a0ff;
        }
        
        .serviceIcon img, .serviceIcon svg {
          height: 2.5rem;
          width: 2.5rem;
          color: #54a0ff;
        }


        .serviceTitle {
          font-size: 1.25rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .serviceDescription {
          text-align: center;
          color: #4a5568;
        }

        /* Works Section */
        .worksSection {
          padding-top: 5rem;
          padding-bottom: 5rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          background-color: #f7fafc;
        }

        .worksContainer {
          max-width: 1280px;
          margin: auto;
        }

        .worksGrid {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr;
        }

        @media (min-width: 640px) {
          .worksGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .worksGrid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .workCard {
          background-color: #fff;
          border-radius: 0.5rem;
          box-shadow: 0 14px 16px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          transition: all 0.5s ease;
        }

        .workCard:hover {
          box-shadow: 0 20px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transform: translateY(-0.5rem);
        }

        .workImage {
          width: 100%;
          height: 12rem;
          object-fit: cover;
        }

        .workContent {
          padding: 1.5rem;
        }

        .workTitle {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .workCategory {
          font-size: 0.875rem;
          color: #6b7280;
        }

        /* Contact Section */
        .contactSection {
          padding-top: 5rem;
          padding-bottom: 5rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .contactContainer {
          max-width: 42rem;
          margin: auto;
          text-align: center;
        }

        .contactTitle {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .contactTitle span {
          color: #54a0ff;
        }

        .contactSubtitle {
          font-size: 1.125rem;
          color: #4a5568;
          margin-bottom: 2rem;
        }

        .contactInfo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .contactLink {
          color: #2d3748;
          font-size: 1.125rem;
          transition: color 0.15s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .contactLink:hover {
          color: #54a0ff;
        }

        .contactLink svg {
          height: 1.5rem;
          width: 1.5rem;
        }

        .socialLinks {
          display: flex;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .socialLink {
          color: #4a5568;
          transition: color 0.15s ease;
          font-size: 2.5rem;
        }

        .socialLink:hover {
          color: #54a0ff;
        }
        
        .socialLink.youtube:hover {
          color: #ef4444;
        }

        .socialLink.instagram:hover {
          color: #e1306c;
        }

        /* Footer */
        .footer {
          background-color: #1a202c;
          color: #fff;
          padding: 1.5rem;
          text-align: center;
        }
        
        /* Scroll-to-Top Button */
        .scrollToTop {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 50;
          opacity: 0;
          transform: translateY(1rem);
          transition: all 0.3s ease;
          pointer-events: none;
          padding: 0.75rem;
          background-color: #1a202c;
          color: #fff;
          border-radius: 9999px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: none;
          cursor: pointer;
        }
        
        .scrollToTop.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
      `}</style>

      <Navbar
        sections={sections}
        activeSection={activeSection}
        handleNavLinkClick={handleNavLinkClick}
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <HeroSection scrollToContact={() => scrollToSection('contact')} />
      <ServicesSection />
      <WorksSection />
      <ContactSection />
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

// Scroll to top button component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <button
      onClick={scrollToTop}
      className={`scrollToTop ${isVisible ? 'visible' : ''}`}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 10l7-7m0 0l7 7m-7-7v18'
        />
      </svg>
    </button>
  )
}

// Navbar Component
const Navbar = ({
  sections,
  activeSection,
  handleNavLinkClick,
  isScrolled,
  isMobileMenuOpen,
  toggleMobileMenu
}) => (
  <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
    <div className='navbarContainer'>
      <div className='navLogo'>
        J - <span className='navLogoSpan'>Edits</span>
      </div>
      <div className='navLinks'>
        {sections.map(section => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={e => handleNavLinkClick(e, section.id)}
            className={`navLink ${
              activeSection === section.id ? 'active' : ''
            }`}
          >
            {section.name}
          </a>
        ))}
      </div>
      <button onClick={toggleMobileMenu} className='mobileMenuToggle'>
        <i className='fa-solid fa-bars'></i>
      </button>
    </div>
    <div className={`mobileMenu ${isMobileMenuOpen ? 'open' : ''}`}>
      {sections.map(section => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={e => handleNavLinkClick(e, section.id)}
          className={`navLink ${activeSection === section.id ? 'active' : ''}`}
        >
          {section.name}
        </a>
      ))}
    </div>
  </nav>
)

// Hero Section Component
const HeroSection = ({ scrollToContact }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const backgroundImages = [
    'https://i.imgur.com/EVWD0jU.png',
    'https://i.imgur.com/umulgLg.png',
    'https://placehold.co/1920x1080/111111/fff?text=Work+3'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        prevIndex => (prevIndex + 1) % backgroundImages.length
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id='home' className='heroSection'>
      <div className='heroBackground'>
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`heroImage ${
              index === currentImageIndex ? 'visible' : ''
            }`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>

      <div className='heroContent'>
        <div className='profileImage'>
          <img src={jEdits} alt='Profile' className='profileImageSrc' />
        </div>
        <h1 className='heroTitle'>
          Crafting Visual <span className='heroTitleSpan'>Stories</span>
        </h1>
        <p className='heroSubtitle'>
          I am a professional video editor specializing in capturing and
          enhancing moments through the art of film.
        </p>
        <button onClick={scrollToContact} className='heroButton'>
          Get in Touch
        </button>
      </div>
    </section>
  )
}

// Software Icons Component
const Softwares = () => {
  const softwareIcons = [
    {
      name: 'Premier Pro',
      url: premierp
    },
    {
      name: 'After Effects',

      url: afterEf
    },
    {
      name: 'Davinci Resolve',
      url: davin
    }
  ]

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100 p-4'>
      <div className='flex justify-around items-center w-full mt-4'>
        {softwareIcons.map(software => (
          <div key={software.name} className='software-icon-container'>
            <img
              src={software.url}
              alt={software.name}
              className='softwareIcons'
            />
            <span className='software-icon-name'>{software.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Services Section Component
const ServicesSection = () => {
  const services = [
    {
      title: 'Video Editing',
      description:
        'Professional cutting, splicing, and sequencing to create compelling narratives.',
      icon: <i className='fa-solid fa-video'></i>
    },
    {
      title: 'Colour Grading',
      description:
        'Enhancing the mood and tone of footage with expert color correction and grading.',
      icon: <i className='fa-solid fa-palette'></i>
    },
    {
      title: 'Invitations',
      description:
        'Creating custom video invitations for special events like weddings and birthdays.',
      icon: <i className='fa-solid fa-envelope-open-text'></i>
    },
    {
      title: 'Softwares',
      description: <Softwares />,
      icon: <i className='fa-solid fa-desktop'></i>
    }
  ]

  return (
    <section id='services' className='servicesSection'>
      <div className='servicesContainer'>
        <h2 className='sectionTitle'>
          My <span className='sectionTitleSpan'>Expertise</span>
        </h2>
        <div className='servicesGrid'>
          {services.map((service, index) => (
            <div key={index} className='serviceCard'>
              <div className='serviceIcon'>{service.icon}</div>
              <h3 className='serviceTitle'>{service.title}</h3>
              <p className='serviceDescription'>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Works Section Component
const WorksSection = () => {
  const works = [
    {
      title: 'Wedding Highlight',
      category: 'Weddings',
      imageUrl: 'https://i.imgur.com/e8wQPOI.png'
    },
    {
      title: 'Birthday Event',
      category: "Birthday's",
      imageUrl: 'https://placehold.co/600x400/111111/fff?text=Birthday+Event'
    },
    {
      title: 'Engagement Reel',
      category: 'Engagement',
      imageUrl: 'https://placehold.co/600x400/363636/fff?text=Engagement+Reel'
    },
    {
      title: 'Short Film',
      category: 'Independent Films',
      imageUrl: 'https://i.imgur.com/jxR4wU1.png'
    }
  ]

  return (
    <section id='works' className='worksSection'>
      <div className='worksContainer'>
        <h2 className='sectionTitle'>
          Featured <span className='sectionTitleSpan'>Works</span>
        </h2>
        <div className='worksGrid'>
          {works.map((work, index) => (
            <div key={index} className='workCard'>
              <img
                src={work.imageUrl}
                alt={work.title}
                className='workImage'
                onError={e => {
                  e.target.onerror = null
                  e.target.src =
                    'https://placehold.co/600x400/1e293b/fff?text=Image+Unavailable'
                }}
              />
              <div className='workContent'>
                <h3 className='workTitle'>{work.title}</h3>
                <p className='workCategory'>{work.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
const ContactSection = () => (
  <section id='contact' className='contactSection'>
    <div className='contactContainer'>
      <h2 className='contactTitle'>
        Let's Create <span className='contactTitleSpan'>Something</span>{' '}
        Together
      </h2>
      <p className='contactSubtitle'>
        Interested in my services? Feel free to reach out. You can also find me
        on social media.
      </p>
      <div className='contactInfo'>
        <a href='tel:+919603515145' className='contactLink'>
          +91 9603515145
        </a>
        <a href='mailto:j.e.s.r.v.pavankumar@gmail.com' className='contactLink'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            />
          </svg>
          <span>j.e.s.r.v.pavankumar@gmail.com</span>
        </a>
        <div className='socialLinks'>
          <a
            href='https://www.youtube.com/@jeditsandgrading'
            target='_blank'
            rel='noopener noreferrer'
            className={`socialLink youtube`}
          >
            <i className='fa-brands fa-youtube'></i>
          </a>
          <a
            href='https://www.instagram.com/j_edits_____/'
            target='_blank'
            rel='noopener noreferrer'
            className='socialLink instagram'
          >
            <i className='fa-brands fa-instagram'></i>
          </a>
        </div>
      </div>
    </div>
  </section>
)

// Footer Component
const Footer = () => (
  <footer className='footer'>
    <p>
      &copy; {new Date().getFullYear()} J-Edits Portfolio. All rights reserved.
    </p>
  </footer>
)

export default App
