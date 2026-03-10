import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

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
            <img
              id="navbar-brand-img"
              src="/assets/images/pilatesbabe_logo.png"
              alt="PilatesBabe logo"
              style={{ height: "11rem" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li>
                <Link
                  className="nav-item"
                  to="/"
                  onClick={() => setIsNavOpen(false)}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  className="nav-item"
                  to="/timetable"
                  onClick={() => setIsNavOpen(false)}
                >
                  TIMETABLE
                </Link>
              </li>
              <li>
                <Link
                  className="nav-item"
                  to="/about"
                  onClick={() => setIsNavOpen(false)}
                >
                  ABOUT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="pink-spacer"></div>

      {/* Dynamic Page Content gets injected here */}
      <main className="flex-grow-1">{children}</main>

      {/* Footer */}
      <footer id="contact" className="mt-auto footer-spacer svg-layer-4">
        <div className="container">
          <h1>Contact me Babe</h1>
          <div className="social-link">
            <p>
              <a
                href="mailto:pilatesbabecardiff@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email me"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
            </p>
            <p>
              <a
                href="https://instagram.com/pilatesbabecardiff"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </p>
          </div>
          <div className="legal-wrapper mt-3 text-center">
            <h4>
              Pilates Babe Cardiff &copy; {new Date().getFullYear()} | All
              Rights Reserved <br className="d-md-none" />
              <span className="d-none d-md-inline"> | </span>
              <button
                className="legal-btn"
                onClick={() => setActiveLegalPage("terms")}
              >
                Terms & Conditions
              </button>
              <span> | </span>
              <button
                className="legal-btn"
                onClick={() => setActiveLegalPage("privacy")}
              >
                Privacy Policy
              </button>
            </h4>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      {activeLegalPage && (
        <div className="modal-overlay" onClick={() => setActiveLegalPage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setActiveLegalPage(null)}
            >
              X
            </button>
            <div className="legal-text">
              <h2>
                {activeLegalPage === "terms"
                  ? "Terms & Conditions"
                  : "Privacy Policy"}
              </h2>
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
        <img
          src="/assets/images/white_placeholder.webp"
          id="intro-img"
          alt="Pilates Babe doing Pilates"
        />
        <div id="intro-header">
          <h2>BOOK HERE</h2>
        </div>
      </div>
      <p className="intro-text">
        YOUR FRIENDLY NEIGHBOURHOOD MAT AND REFORMER PILATES TEACHER HERE TO
        CREATE A COMMUNITY OF BABES IN CARDIFF.
      </p>
    </section>

    <section className="card spacer svg-layer-5" id="classes">
      <div className="grid container">
        <div className="service">
          <h3>Reformer Pilates</h3>
          <p>
            Reformer pilates is a low-impact, full-body workout performed on a
            specialised machine called a reformer, which uses a combination of
            springs, ropes, and a sliding carriage to provide adjustable
            resistance and support. Unlike mat pilates, it adds a unique element
            of resistance to exercises, enhancing strength, flexibility, and
            balance. The reformer machine allows for precision, a wider range of
            exercises, and a more challenging workout compared to body-weight
            only methods.
          </p>
        </div>
        <div className="service">
          <h3>Mat Pilates</h3>
          <p>
            Mat pilates is the most simple form of pilates as it primarily uses
            your body weight as resistance. Although multiple forms of pilates
            exist, including reformer and cadillac/trapeze pilates (both of
            which use specialist pieces of pilates equipment), mat pilates is
            good for all levels of expertise and only requires a mat to
            participate. mat pilates is good for all levels of expertise and
            only requires a mat to participate. It also helps to lengthen,
            strengthen and balance your body while also increasing concentration
            and flexibility.
          </p>
        </div>
      </div>
      <div id="grid-image" className="spacer svg-layer-3"></div>
    </section>
  </>
);

const TimetablePage = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const scheduleRows = Array(5).fill([
    { text: "7:00am - Mat", studio: "Studio A" },
    { text: "6:00pm - Reformer", studio: "Studio B" },
    { text: "7:00am - Mat", studio: "Studio A" },
    { text: "6:00pm - Reformer", studio: "Studio B" },
    { text: "8:00am - Mat", studio: "Studio A" },
    { text: "9:00am - Reformer", studio: "Studio A" },
    { text: "9:00am - Reformer", studio: "Studio A" },
  ]);

  return (
    <section id="timetable" className="spacer svg-layer-1">
      <aside className="timetable container">
        <div className="schedule-grid">
          {days.map((day) => (
            <div className="day" key={day}>
              {day}
            </div>
          ))}
          {scheduleRows.map((row, rowIndex) =>
            row.map((cls, colIndex) => (
              <div className="class-slot class" key={`${rowIndex}-${colIndex}`}>
                {cls.text}
                <br />
                <small>{cls.studio}</small>
              </div>
            )),
          )}
        </div>
        <p className="timetable-note mt-4">
          Tuesday and Thursday are both booked via the QR code, all other
          classes are booked direct with the studios - follow links.
        </p>
      </aside>
    </section>
  );
};

const AboutPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const faqs = [
    {
      question: "What is Pilates?",
      answer:
        "Pilates is a low-impact form of exercise that focuses on controlled, intentional movement. It works to strengthen your core, improve posture, increase flexibility and build full-body strength while supporting mobility and stability.",
    },
    {
      question: "Why choose Pilates?",
      answer:
        "Pilates helps you build strength from the inside out. It improves posture, stability, flexibility and body awareness while being kind to your joints. Whether you're looking to feel stronger, move better, prevent injury or simply take time to connect with your body, Pilates is a powerful way to do it.",
    },
    {
      question: "What should I wear?",
      answer:
        "Wear comfortable clothing that you can move freely in. Leggings, shorts or joggers paired with a fitted top work best so you can move easily and see your alignment during exercises. Grip socks are great if you have them, but regular socks or bare feet are also fine.",
    },
    {
      question: "What should I bring?",
      answer:
        "Just bring yourself and some water. Mats and any equipment needed for the class are provided.",
    },
    {
      question: "How do I book sessions?",
      answer:
        "Sessions can be booked through the online booking system. Simply choose your class, select a time that works for you and secure your spot. Spaces are limited, so booking in advance is recommended.",
    },
    {
      question: "Do you have an age policy?",
      answer:
        "Classes are suitable for anyone aged 16 and over. If you are under 18, a parent or guardian may need to provide consent.",
    },
    {
      question: "How do I pay?",
      answer:
        "All payments are made online at the time of booking to secure your place in class.",
    },
    {
      question: "Can I cancel?",
      answer:
        "Yes. If you need to cancel your class, please do so within the cancellation window stated at booking so the space can be offered to someone else. Late cancellations or no-shows may still be charged.",
    },
    {
      question: "Can I come if I'm pregnant?",
      answer:
        "You're welcome to attend classes during your second trimester, provided you were active before pregnancy and your healthcare provider has confirmed it's safe for you to exercise. Please let me know before class so I can offer appropriate modifications. However, classes are not suitable during the first or third trimester.",
    },
    {
      question: "Can I come if I've just had a baby?",
      answer:
        "Yes, but only once you've been cleared by your healthcare provider (usually at your 6-8 week postnatal check). Everyone's recovery is different, so please let me know beforehand and we can ease you back into movement safely.",
    },
    {
      question: "Can I come if I'm a total beginner?",
      answer:
        "Absolutely. Classes are designed to be welcoming for all levels, including complete beginners. Options and modifications are offered throughout the class so you can work at a pace that feels right for your body while still being challenged. Pilates is all about learning and building strength over time, so everyone starts somewhere.",
    },
  ];

  return (
    <>
      <section className="card spacer" id="about">
        <div className="bio container">
          <div className="bio-img-div svg-layer-2">
            <img
              src="/assets/images/about_me.png"
              alt="Hannah demonstrating a Pilates pose"
              id="bio-img"
            />
          </div>
          <div className="text">
            <p>Hi, I'm Hannah,</p>
            <p>
              I've grown up in gyms. From gymnastics to twenty years of
              cheerleading coaching and competing, I've pushed my body to the
              limit. I've been a teacher for over a decade, a PE teacher for
              four years, but after three kids and years of high-impact sports,
              I needed something different.
            </p>
            <p>
              It's been the ultimate rehabilitation for my body and therapy for
              my mind. It's how I fell back in love with myself, and now, I want
              to share that with you. I'm building a community where you leave
              feeling like a total babe who can conquer the world.
            </p>
            <p>
              No experience necessary. No pressure. Just book the dang class,
              you deserve to do something for you!
            </p>
            <p>Core - Community - Confidence</p>
            <p>See you soon, Babe!</p>
          </div>
        </div>
      </section>

      <section id="faqs" className="card faq-spacer svg-layer-4 container">
        <h2>FAQs</h2>
        <div className="faq">
          {faqs.map((faq, index) => (
            <div
              className="q"
              key={index}
              onClick={() =>
                setOpenFaqIndex(openFaqIndex === index ? null : index)
              }
            >
              <strong>{faq.question}</strong>
              <div className={`answer ${openFaqIndex === index ? "open" : ""}`}>
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
