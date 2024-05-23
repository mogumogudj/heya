import React, { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../css/faq.css";

function Faq() {

    const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    { question: 'Is there a fee to use Heya?', answer: 'Heya operates on a Freemium model. The core functionality of the platform, such as searching for rooms and posting listings, is free. We charge a small transaction fee for successful bookings and offer optional paid features for enhanced visibility and additional services.' },
    { question: 'How do I sign up for Heya?', answer: 'Answer 2' },
    { question: 'How do I list my room on Heya?', answer: 'Answer 3' },
    { question: 'What is hospitawonen?', answer: 'Answer 4' },
    { question: 'How does Heya ensure the safety and trustworthiness of listings?', answer: 'Answer 5' },
    { question: 'What should I do if I have an issue with my booking?', answer: 'Answer 6' },
    { question: 'Can I promote my listing for better visibility?', answer: 'Answer 7' },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };


    return (
        <div className="page__container">
            <Nav />
            <header className="title__center normal__header">
                    <h6>Heya</h6>
                    <h1>FAQ</h1>
                </header>


                <div className="faq-container">
        <div className="left">
          <img src="../street.webp" alt="FAQ" className="faq-image" />
        </div>
        <div className="right">
          <div className="search-container">
            <input type="text" placeholder="Where do I find..." className="search-bar" />
            <span className="search-icon">&#128269;</span>
          </div>
          <h1>Frequently Asked Questions</h1>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h5 onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  <span className="toggle-icon">{openFAQ === index ? '-' : '+'}</span>
                </h5>
                {openFAQ === index && <p>{faq.answer}</p>}
              </div>
            ))}
          </div>
          <div className="footer-faq">
            <button className="load-more white__button">Load more...</button>
            <a href="#" className="contact-link">Get in contact with us</a>
          </div>
        </div>
      </div>
                
            <Footer />
        </div>
    )
}

export default Faq