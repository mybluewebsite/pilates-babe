import React, { useState, useRef } from "react";
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
            <div className="legal-text text-start">
              {activeLegalPage === "terms" ? (
                <TermsAndConditions />
              ) : (
                <PrivacyPolicy />
              )}
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

// ------------------------------------------------------------------
// WAVY DIVIDER COMPONENT
// ------------------------------------------------------------------
const WaveDivider = ({ inverted = false }) => (
  <div
    className={`wave-divider ${inverted ? "inverted" : ""}`}
    aria-hidden="true"
  ></div>
);

// ------------------------------------------------------------------
// HERO CAROUSEL COMPONENT
// ------------------------------------------------------------------

const HeroCarousel = () => {
  const carouselRef = useRef(null);

  const images = [
    "/assets/images/mat.png",
    "/assets/images/reformer.png",
    "/assets/images/Hannah.png",
    "/assets/images/pilates-event.jpg",
  ];

  // Function to smoothly scroll the track when arrows are clicked
  const scroll = (direction) => {
    if (carouselRef.current) {
      // Scrolls by roughly the width of one image
      const scrollAmount = carouselRef.current.children[0].offsetWidth + 20;
      carouselRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="hero-carousel-wrapper">
      <button
        className="carousel-control prev"
        onClick={() => scroll("prev")}
        aria-label="Previous images"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      <div className="hero-carousel-track" ref={carouselRef}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Pilates Babe slide ${index + 1}`}
            className="carousel-image-slide"
          />
        ))}
      </div>

      <button
        className="carousel-control next"
        onClick={() => scroll("next")}
        aria-label="Next images"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

// ------------------------------------------------------------------
// PAGE 1: HOME
// ------------------------------------------------------------------

const HomePage = () => (
  <>
    <section id="intro">
      <div className="intro-content container">
        <HeroCarousel />
        <div id="intro-header">
          <h2>
            <a
              href="https://gymcatch.com/app/provider/9600/events"
              target="_blank"
              rel="noopener noreferrer"
            >
              BOOK HERE
            </a>
          </h2>
        </div>
      </div>
      <p className="intro-text">
        YOUR FRIENDLY NEIGHBOURHOOD MAT AND REFORMER PILATES TEACHER - HERE TO
        CREATE A COMMUNITY OF BABES IN CARDIFF.
      </p>
    </section>

    <section className="card spacer svg-layer-5" id="classes">
      <div className="grid container">
        <div className="service" id="reformer">
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
        <div className="service" id="mat">
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
      <WaveDivider />
    </section>
  </>
);

const TimetablePage = () => {
  const schedule = [
    {
      day: "Monday",
      classes: [
        { time: "18:15", type: "REFORMER", studio: "LLLHEALING" },
        { time: "20:00", type: "MAT", studio: "CTK" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { time: "06:50", type: "HOT MAT", studio: "OREN WELLNESS" },
        { time: "20:00", type: "MAT", studio: "VIBES" },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { time: "09:05", type: "XPRESS MAT", studio: "ATONE RHIWBINA" },
        { time: "19:15", type: "MAT", studio: "ATONE RHIWBINA" },
      ],
    },
    {
      day: "Thursday",
      classes: [
        { time: "07:30", type: "MAT", studio: "VIBES" },
        { time: "18:00", type: "HOT MAT", studio: "OREN WELLNESS" },
        { time: "20:00", type: "MAT", studio: "DCD" },
      ],
    },
    {
      day: "Friday",
      classes: [
        { time: "09:30", type: "MAT", studio: "CTK CHURCH HALL" },
        { time: "12:30", type: "HOT MAT", studio: "OREN WELLNESS" },
        { time: "EVENING", type: "EVENTS", studio: "VARIOUS" },
      ],
    },
    {
      day: "Saturday",
      classes: [
        { time: "09:45", type: "MAT", studio: "SELF LOVE SUPERSTORE" },
        { time: "EVENING", type: "EVENTS", studio: "VARIOUS" },
      ],
    },
    {
      day: "Sunday",
      classes: [
        { time: "11:00", type: "HOT MAT", studio: "LLLHEALING" },
        { time: "19:00", type: "MAT", studio: "CTK" },
      ],
    },
  ];

  return (
    <section id="timetable" className="spacer svg-layer-1">
      <aside className="timetable container">
        <div className="schedule-grid">
          {schedule.map((daySchedule) => (
            <div className="day-column" key={daySchedule.day}>
              <div className="day">{daySchedule.day}</div>
              {daySchedule.classes.length > 0 ? (
                daySchedule.classes.map((cls, idx) => (
                  <div className="class-slot class mt-2" key={idx}>
                    <strong>
                      {cls.time} - {cls.type}
                    </strong>
                    <br />
                    <small>{cls.studio}</small>
                  </div>
                ))
              ) : (
                <div
                  className="class-slot class mt-2 text-muted"
                  style={{ opacity: 0.5 }}
                >
                  Rest Day
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="timetable-note mt-4">
          <h2>
            <a
              href="https://gymcatch.com/app/provider/9600/events"
              target="_blank"
              rel="noopener noreferrer"
            >
              BOOK HERE
            </a>
          </h2>
          <p>
            You can make a booking using the "BOOK HERE" link above or by
            visiting the respective studio's booking system directly. Please
            note that due to some classes being hosted by third-party studios,
            bookings and cancellation policies may vary. Always check the
            specific studio's guidelines when booking their classes.
          </p>
        </div>
      </aside>
      <WaveDivider />
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
    {
      question: "What if I have an injury or health condition?",
      answer:
        "If you have any injuries or health conditions, please inform me before class so I can offer appropriate modifications and ensure your safety. Pilates is adaptable, and we can work around most limitations to help you move safely and effectively.",
    },
  ];

  return (
    <>
      <section className="card spacer" id="about">
        <div className="bio container">
          <div className="bio-img-div svg-layer-2">
            <img
              src="/assets/images/Hannah-Hill.png"
              alt="A picture of the founder of Pilates Babe Cardiff"
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
        <h2>Frequently Asked Questions</h2>
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
      <WaveDivider />
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

// ------------------------------------------------------------------
// LEGAL CONTENT COMPONENTS
// ------------------------------------------------------------------

const TermsAndConditions = () => (
  <div className="legal-content">
    <h2>Terms & Conditions</h2>
    <p>
      <strong>Last Updated:</strong> March 2026
    </p>

    <h4>1. Introduction</h4>
    <p>
      These Terms & Conditions govern the use of the Pilates Babe Cardiff
      website and services. By booking a class or using our services, users
      agree to these terms.
    </p>

    <h4>2. Services Provided</h4>
    <p>
      Pilates Babe Cardiff provides fitness and health sessions, specifically
      mat and reformer pilates classes. These classes are offered at various
      studio locations and booked either directly through us or via third-party
      studio booking systems.
    </p>

    <h4>3. Booking & Cancellation Policy</h4>
    <ul>
      <li>
        <strong>Direct Bookings:</strong> For classes booked directly with
        Pilates Babe Cardiff, cancellations must be made at least 12 hours
        before the scheduled class time. Late cancellations or no-shows may
        result in the loss of your session credit or a cancellation charge.
      </li>
      <li>
        <strong>Third-Party Studios:</strong> For classes booked directly with
        partner studios (as indicated on our timetable), you must adhere to the
        specific cancellation and booking policies of that respective studio.
      </li>
    </ul>

    <h4>4. Liability Waiver</h4>
    <p>By booking and attending sessions, users acknowledge that:</p>
    <ul>
      <li>
        Participation is entirely voluntary, and all risks related to physical
        activity are assumed by the user.
      </li>
      <li>
        Pilates Babe Cardiff (and Hannah) is not liable for injuries, accidents,
        or health conditions arising from participation.
      </li>
      <li>
        Any relevant medical conditions, injuries, or pregnancies must be
        disclosed to the instructor before attending any sessions.
      </li>
    </ul>

    <h4>5. User Conduct</h4>
    <p>
      We are here to create a community of babes in Cardiff. All users must:
    </p>
    <ul>
      <li>
        Respect the instructor, third-party studio staff, and fellow attendees.
      </li>
      <li>
        Follow specific studio rules, equipment guidelines, and hygiene
        protocols (such as wiping down reformer machines and wearing grip
        socks).
      </li>
    </ul>

    <h4>6. Age Restrictions</h4>
    <p>Users must be at least 16 years old to book and attend classes.</p>

    <h4>7. Payment & Refunds</h4>
    <p>
      Payments made directly to Pilates Babe Cardiff are processed securely.
      Class credits and block bookings are strictly non-refundable, except in
      exceptional circumstances at the sole discretion of Pilates Babe Cardiff.
    </p>

    <h4>8. Contact Information</h4>
    <p>
      For inquiries, please email: <strong>pilatesbabecardiff@gmail.com</strong>{" "}
      or contact us via Instagram <strong>@pilatesbabecardiff</strong>.
    </p>
  </div>
);

const PrivacyPolicy = () => (
  <div className="legal-content">
    <h2>Privacy Policy</h2>
    <p>
      <strong>Last Updated:</strong> March 2026
    </p>

    <h4>1. Introduction</h4>
    <p>
      Welcome to Pilates Babe Cardiff. Your privacy is incredibly important to
      us. This Privacy Policy explains how your personal information is
      collected, used, and protected when you interact with our website and
      attend our classes.
    </p>

    <h4>2. Information Collected</h4>
    <p>
      The following personal data may be collected and processed when you
      interact with us:
    </p>
    <ul>
      <li>
        <strong>Personal Details:</strong> Name, email address, phone number,
        and emergency contact details.
      </li>
      <li>
        <strong>Health Information:</strong> Information provided voluntarily
        (such as through a health questionnaire or PAR-Q) to help assess your
        suitability for mat and reformer pilates and to ensure your safety.
      </li>
      <li>
        <strong>Booking History:</strong> Information on class bookings,
        attendance, and cancellations.
      </li>
    </ul>

    <h4>3. How Information is Used</h4>
    <p>Your personal data is used for the following purposes:</p>
    <ul>
      <li>Managing class bookings, registers, and schedules.</li>
      <li>Ensuring your health and safety during physical exercise.</li>
      <li>
        Sending important updates regarding class changes or cancellations.
      </li>
      <li>Processing payments securely.</li>
      <li>Responding to your direct inquiries or messages.</li>
    </ul>

    <h4>4. Third-Party Services</h4>
    <p>
      Your data may interact with third-party service providers, specifically:
    </p>
    <ul>
      <li>
        <strong>Partner Studios:</strong> If you book a class hosted by one of
        our partner studios, your data will be subject to their booking systems.
      </li>
      <li>
        <strong>Payment Processors:</strong> For direct bookings, payment data
        is processed securely via third-party providers.
      </li>
    </ul>
    <p>We do not sell your personal data to anyone.</p>

    <h4>5. User Rights</h4>
    <p>
      Under UK data protection laws (GDPR), you have the right to request access
      to the personal data we hold about you, request correction of inaccurate
      data, or request deletion of your data.
    </p>

    <h4>6. Contact Information</h4>
    <p>
      To exercise your data rights or for privacy-related inquiries, please
      email: <strong>pilatesbabecardiff@gmail.com</strong>.
    </p>
  </div>
);
