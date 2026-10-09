"use client";

import Link from "next/link";
import './contact.css';
import {
  IconHeadset,
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconSend,
  IconHelpCircle
} from "@tabler/icons-react";

export default function ContactScreen() {
  return (
    <section className="contact-page">
      
      <div className="contact-header">
        <div className="contact-container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="current">Contact Us</span>
          </div>
          <div className="header-title-box">
            <div className="header-icon">
              <IconHeadset size={32} stroke={1.5} />
            </div>
            <div className="header-text">
              <h1>Contact Us</h1>
              <p>We'd love to hear from you. Get in touch with our team.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-container contact-body">
        
        <div className="info-cards-wrapper">
          
          <div className="info-card">
            <div className="info-icon">
              <IconPhone size={24} stroke={1.5} />
            </div>
            <div className="info-content">
              <h3>Phone</h3>
              <p>Mon-Fri from 8am to 6pm</p>
              <p className="highlight">+1 (800) 123-4567</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <IconMail size={24} stroke={1.5} />
            </div>
            <div className="info-content">
              <h3>Email</h3>
              <p>We'll respond within 24 hours</p>
              <p className="highlight">support@freshcart.com</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <IconMapPin size={24} stroke={1.5} />
            </div>
            <div className="info-content">
              <h3>Office</h3>
              <p>
                123 Commerce Street<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <IconClock size={24} stroke={1.5} />
            </div>
            <div className="info-content">
              <h3>Business Hours</h3>
              <p>
                Monday - Friday: 8am - 6pm<br />
                Saturday: 9am - 4pm<br />
                Sunday: Closed
              </p>
            </div>
          </div>

          <div className="social-card">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <div className="social-icon"><IconBrandFacebook size={20} stroke={1.5}/></div>
              <div className="social-icon"><IconBrandTwitter size={20} stroke={1.5}/></div>
              <div className="social-icon"><IconBrandInstagram size={20} stroke={1.5}/></div>
              <div className="social-icon"><IconBrandLinkedin size={20} stroke={1.5}/></div>
            </div>
          </div>

        </div>

        <div className="form-section">
          
          <div className="form-card">
            <div className="form-header">
              <div className="form-header-icon">
                <IconHeadset size={24} stroke={1.5} />
              </div>
              <div>
                <h2>Send us a Message</h2>
                <p>Fill out the form and we'll get back to you</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="John Doe" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" className="form-control" />
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select className="form-control">
                  <option>Select a subject</option>
                  <option>Order Inquiry</option>
                  <option>Returns & Refunds</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows={5} placeholder="How can we help you?" className="form-control"></textarea>
              </div>

              <button type="submit" className="btn-submit">
                <IconSend size={20} stroke={1.5} />
                Send Message
              </button>
            </form>
          </div>

          <div className="help-banner">
            <div className="help-icon">
              <IconHelpCircle size={20} stroke={2} />
            </div>
            <div className="help-content">
              <h3>Looking for quick answers?</h3>
              <p>Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.</p>
              <Link href="#" className="help-link">
                Visit Help Center →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}