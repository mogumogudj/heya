import React, { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../../shared/components/Footer.jsx';
import '../css/faq.css';
import SearchIcon from '@mui/icons-material/Search';

function Faq() {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        {
            question: 'Is there a fee to use Heya?',
            answer: 'Heya operates on a Freemium model. The core functionality of the platform, such as searching for rooms and posting listings, is free. We charge a small transaction fee for successful bookings and offer optional paid features for enhanced visibility and additional services.',
        },
        { question: 'How do I sign up for Heya?', answer: 'Signing up for Heya is simple. Just click on the "Sign Up" button at the top right corner of our homepage, fill in your details, and verify your email address. Once verified, you can start browsing or listing rooms immediately.' },
        { question: 'How do I list my room on Heya?', answer: 'To list your room on Heya, first sign in to your account. Then, click on the "Become a Host" button, fill out the necessary details about your property, upload high-quality photos, and set your rental terms. Once submitted, our team will review your listing for approval.' },
        { question: 'What is hospitawonen?', answer: 'Hospitawonen is a unique housing concept where homeowners rent out a room in their private home to a student. This arrangement not only provides affordable housing options for students but also fosters a community environment, allowing students to integrate better into the local culture and lifestyle.' },
        { question: 'How does Heya ensure the safety and trustworthiness of listings?', answer: 'Heya prioritizes safety and trust by thoroughly verifying all listings and conducting background checks on homeowners. We also encourage users to leave reviews and ratings after their stay, and our team continuously monitors listings for any suspicious activity or complaints.' },
        { question: 'What should I do if I have an issue with my booking?', answer: 'If you encounter any issues with your booking, please contact our customer support team immediately through the "Help" or Contact section on our website. Provide as much detail as possible about the issue, and our support team will assist you in resolving the matter promptly.' },
        { question: 'Can I promote my listing for better visibility?', answer: 'Yes, Heya offers promotional options for listings. You can choose from various packages to increase the visibility of your listing on our platform, making it more likely to be seen by potential renters. For more details, visit the "Promote Your Listing" section in your account dashboard.' },
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
                        <SearchIcon />
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
                        <a href="#" className="contact-link">
                            Get in contact with us
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Faq;
