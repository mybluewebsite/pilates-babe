import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// ------------------------------------------------------------------
// 1. LAYOUT WRAPPER (Keeps Navbar & Footer persistent across pages)
// ------------------------------------------------------------------
const Layout = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeLegalPage, setActiveLegalPage] = useState(null); 

  return (
    <div className="d-flex flex-column min-vh-100 relative">
      {/* Navbar */}
      <nav id="navbar" className="navbar navbar-expand-lg">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img id="navbar-brand-img" src="/assets/images/pilatesbabe_logo.png" alt="PilatesBabe logo" style={{ height: '11rem' }} />
          </Link>
          <button className="navbar-toggler" type="button" onClick={() => setIsNavOpen(!isNavOpen)} aria-expanded={isNavOpen} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li><Link className="nav-item" to="/" onClick={() => setIsNavOpen(false)}>HOME</Link></li>
              <li><Link className="nav-item" to="/timetable" onClick={() => setIsNavOpen(false)}>TIMETABLE</Link></li>
              <li><Link className="nav-item" to="/about" onClick={() => setIsNavOpen(false)}>ABOUT</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="pink-spacer"></div>

      {/* Dynamic Page Content gets injected here */}
      <main className="flex-grow-1">
        {children}
      </main>

      {/* Footer */}
      <footer id="contact" className="mt-auto footer-spacer svg-layer-4">
        <div className="container">
          <h1>Contact me Babe</h1>
          <div className="social-link">
            <p>
              <a href="mailto:pilatesbabecardiff@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email me">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </p>
            <p>
              <a href="https://instagram.com/pilatesbabecardiff" target="_blank" rel="noopener noreferrer" aria-label="Visit my Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </p>
          </div>
          <div className="legal-wrapper mt-3 text-center">
            <h4>
              Pilates Babe Cardiff &copy; {new Date().getFullYear()} | All Rights Reserved <br className="d-md-none" />
              <span className="d-none d-md-inline"> | </span>
              <button className="legal-btn" onClick={() => setActiveLegalPage('terms')}>Terms & Conditions</button>
              <span> | </span>
              <button className="legal-btn" onClick={() => setActiveLegalPage('privacy')}>Privacy Policy</button>
            </h4>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      {activeLegalPage && (
        <div className="modal-overlay" onClick={() => setActiveLegalPage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setActiveLegalPage(null)}>X</button>
            <div className="legal-text">
              <h2>{activeLegalPage === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}</h2>
              <p>Your {activeLegalPage} text goes here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ------------------------------------------------------------------
// 2. PAGE COMPONENTS
// ------------------------------------------------------------------

const HomePage = () => (
  <>
    <section id="intro">
      <div className="intro-content container">
        <img src="/assets/images/white_placeholder.webp" id="intro-img" alt="Pilates Babe doing Pilates" />
        <div id="intro-header">
          <h2>BOOK HERE</h2>
        </div>
      </div>
      <p className="intro-text">
        YOUR FRIENDLY NEIGHBOURHOOD MAT AND REFORMER PILATES TEACHER HERE TO CREATE A COMMUNITY OF BABES IN CARDIFF.
      </p>
    </section>

    <section className="card spacer svg-layer-5" id="classes">
      <div className="grid container">
        <div className="service">
          <h3>Reformer Pilates</h3>
          <p>Reformer pilates is a low-impact, full-body workout performed on a specialised machine called a reformer...</p>
        </div>
        <div className="service">
          <h3>Mat Pilates</h3>
          <p>Mat pilates is the most simple form of pilates as it primarily uses your body weight as resistance...</p>
        </div>
      </div>
      <div id="grid-image" className="spacer svg-layer-3"></div>
    </section>
  </>
);

const TimetablePage = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const scheduleRows = Array(5).fill([
    { text: "7:00am - Mat", studio: "Studio A" },
    { text: "6:00pm - Reformer", studio: "Studio B" },
    { text: "7:00am - Mat", studio: "Studio A" },
    { text: "6:00pm - Reformer", studio: "Studio B" },
    { text: "8:00am - Mat", studio: "Studio A" },
    { text: "9:00am - Reformer", studio: "Studio A" },
    { text: "9:00am - Reformer", studio: "Studio A" }
  ]);

  return (
    <section id="timetable" className="spacer svg-layer-1">
      <aside className="timetable container">
        <div className="schedule-grid">
          {days.map(day => <div className="day" key={day}>{day}</div>)}
          {scheduleRows.map((row, rowIndex) => 
            row.map((cls, colIndex) => (
              <div className="class-slot class" key={`${rowIndex}-${colIndex}`}>
                {cls.text}<br /><small>{cls.studio}</small>
              </div>
            ))
          )}
        </div>
        <p className="timetable-note mt-4">
          Tuesday and Thursday are both booked via the QR code, all other classes are booked direct with the studios - follow links.
        </p>
      </aside>
    </section>
  );
};

const AboutPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const faqs = [
    { question: "What is pilates?", answer: "Pilates is a mind, body & spirit practice. Originated by the late Joseph Pilates..." },
    { question: "Why choose pilates?", answer: "Strength training is particularly important for women going through the menopause..." },
    { question: "What should I wear?", answer: "Wear comfortable, stretchy, and form-fitting clothing such as leggings or cycling shorts..." },
    { question: "What should I bring?", answer: "For Pilates, you typically need to bring non-slip socks, a water bottle, and a small towel..." }
  ];

  return (
    <>
      <section className="card spacer" id="about">
        <div className="bio container">
          <div className="bio-img-div svg-layer-2">
            <img src="/assets/images/about_me.png" alt="Hannah smiling during a Pilates class" id="bio-img" />
          </div>
          <div className="text">
            <p>Hi, I'm Hannah,</p>
            <p>I've basically grown up in gyms. I was that sporty kid, and honestly, that never really changed...</p>
            <p>While I love a good hot yoga session and going for a run or a bike ride with my kids, what really keeps me sane is Pilates...</p>
          </div>
        </div>
      </section>

      <section id="faqs" className="card faq-spacer svg-layer-4 container">
        <h2>FAQs</h2>
        <div className="faq">
          {faqs.map((faq, index) => (
            <div className="q" key={index} onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}>
              <strong>{faq.question}</strong>
              <div className={`answer ${openFaqIndex === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

// ------------------------------------------------------------------
// 3. MAIN APP ROUTER
// ------------------------------------------------------------------
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;