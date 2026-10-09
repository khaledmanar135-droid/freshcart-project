"use client";

import Link from "next/link";
import './privacy.css';
import { 
  IconShieldCheck, 
  IconDatabase, 
  IconUserExclamation,
  IconLock,
  IconShare,
  IconUserCheck,
  IconCookie,
  IconClock,
  IconMail,
  IconArrowLeft,
  IconArrowRight
} from "@tabler/icons-react";

export default function PrivacyScreen() {
  
  const articles = [
    {
      id: 1,
      title: "Information We Collect",
      icon: <IconDatabase stroke={1.5} />,
      items: [
        { num: "1.1", text: <span><strong>Personal Data:</strong> Name, email address, phone number, and shipping address.</span> },
        { num: "1.2", text: <span><strong>Payment Data:</strong> Credit card information processed securely through our payment providers.</span> },
        { num: "1.3", text: <span><strong>Technical Data:</strong> IP address, browser type, device information, and access times.</span> },
        { num: "1.4", text: <span><strong>Usage Data:</strong> Pages viewed, products browsed, and actions taken within our platform.</span> },
      ]
    },
    {
      id: 2,
      title: "How We Use Your Information",
      icon: <IconUserExclamation stroke={1.5} />,
      items: [
        { num: "2.1", text: "To process and fulfill your orders." },
        { num: "2.2", text: "To send order confirmations and shipping updates." },
        { num: "2.3", text: "To provide customer support and respond to inquiries." },
        { num: "2.4", text: "To improve our products, services, and user experience." },
        { num: "2.5", text: "To send promotional communications (with your consent)." },
      ]
    },
    {
      id: 3,
      title: "Data Protection",
      icon: <IconLock stroke={1.5} />,
      items: [
        { num: "3.1", text: "We implement industry-standard encryption (SSL/TLS) for all data transfers." },
        { num: "3.2", text: "Payment information is processed by PCI-compliant payment providers." },
        { num: "3.3", text: "We conduct regular security audits and vulnerability assessments." },
        { num: "3.4", text: "Access to personal data is restricted to authorized personnel only." },
      ]
    },
    {
      id: 4,
      title: "Information Sharing",
      icon: <IconShare stroke={1.5} />,
      items: [
        { num: "4.1", text: "We do not sell, trade, or rent your personal information to third parties." },
        { num: "4.2", text: "We may share data with trusted service providers who assist in our operations." },
        { num: "4.3", text: "We may disclose information when required by law or to protect our rights." },
      ]
    },
    {
      id: 5,
      title: "Your Rights",
      icon: <IconUserCheck stroke={1.5} />,
      items: [
        { num: "5.1", text: <span><strong>Access:</strong> Request a copy of your personal data.</span> },
        { num: "5.2", text: <span><strong>Rectification:</strong> Request correction of inaccurate data.</span> },
        { num: "5.3", text: <span><strong>Erasure:</strong> Request deletion of your personal data.</span> },
        { num: "5.4", text: <span><strong>Portability:</strong> Request your data in a portable format.</span> },
        { num: "5.5", text: <span><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time.</span> },
      ]
    },
    {
      id: 6,
      title: "Cookies",
      icon: <IconCookie stroke={1.5} />,
      items: [
        { num: "6.1", text: "We use cookies to enhance your browsing experience and remember preferences." },
        { num: "6.2", text: "You can control cookie settings through your browser preferences." },
        { num: "6.3", text: "Disabling cookies may affect the functionality of certain features." },
      ]
    },
    {
      id: 7,
      title: "Data Retention",
      icon: <IconClock stroke={1.5} />,
      items: [
        { num: "", text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request." },
      ]
    },
    {
      id: 8,
      title: "Contact Us",
      icon: <IconMail stroke={1.5} />,
      items: [
        { num: "", text: <span>For questions about this Privacy Policy or to exercise your rights, contact our Data Protection Officer at <a href="mailto:privacy@freshcart.com" className="text-[#16a34a] hover:underline">privacy@freshcart.com</a></span> },
      ]
    }
  ];

  return (
    <section className="privacy-page">
      
      {/* Header */}
      <div className="privacy-header">
        <div className="privacy-container">
          <div className="breadcrumb">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="font-bold text-white">Privacy Policy</span>
          </div>
          
          <div className="header-title-box">
            <div className="header-icon">
              <IconShieldCheck size={40} stroke={1.5} />
            </div>
            <div className="header-text">
              <h1>Privacy Policy</h1>
              <p>Last updated: February 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="privacy-container">
        {/* Intro Banner */}
        <div className="privacy-intro">
          <div className="intro-icon">
            <IconShieldCheck size={24} stroke={2} />
          </div>
          <div className="intro-text">
            <h2>Your Privacy Matters</h2>
            <p>This Privacy Policy describes how FreshCart collects, uses, and protects your personal information when you use our services. We are committed to ensuring that your privacy is protected.</p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="articles-grid">
          {articles.map((article) => (
            <div className="article-card" key={article.id}>
              <div className="article-header">
                <div className="article-icon">
                  {article.icon}
                </div>
                <div className="article-title-wrap">
                  <span className="article-num">ARTICLE {article.id}</span>
                  <h3 className="article-title">{article.title}</h3>
                </div>
              </div>
              
              <ul className="article-list">
                {article.items.map((item, index) => (
                  <li className="article-item" key={index}>
                    {item.num && <span className="item-num">{item.num}</span>}
                    <div className="item-text">{item.text}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="privacy-actions">
          <Link href="/" className="btn-back">
            <IconArrowLeft size={20} />
            Back to Home
          </Link>
          <Link href="/terms-of-service" className="btn-next">
            View Terms of Service
            <IconArrowRight size={20} />
          </Link>
        </div>

      </div>
    </section>
  );
}