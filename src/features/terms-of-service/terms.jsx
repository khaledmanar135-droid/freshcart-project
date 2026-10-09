"use client";

import Link from "next/link";
import './terms.css';
import { 
  IconFileText, 
  IconUserCircle, 
  IconShieldCheck,
  IconCreditCard,
  IconArrowLeft,
  IconArrowRight
} from "@tabler/icons-react";

export default function TermsScreen() {
  
  const articles = [
    {
      id: 1,
      title: "Acceptance of Terms",
      icon: <IconShieldCheck stroke={1.5} />,
      items: [
        { num: "1.1", text: "By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms." },
        { num: "1.2", text: "If you do not agree to these Terms, you must not access or use the Service." },
        { num: "1.3", text: "We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting." },
      ]
    },
    {
      id: 2,
      title: "User Eligibility",
      icon: <IconUserCircle stroke={1.5} />,
      items: [
        { num: "2.1", text: "The Service is intended for users who are at least eighteen (18) years of age." },
        { num: "2.2", text: "By using the Service, you represent and warrant that you are of legal age to form a binding contract." },
        { num: "2.3", text: "If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity." },
      ]
    },
    {
      id: 3,
      title: "Account Registration",
      icon: <IconFileText stroke={1.5} />,
      items: [
        { num: "3.1", text: "You may be required to create an account to access certain features of the Service." },
        { num: "3.2", text: "You agree to provide accurate, current, and complete information during registration." },
        { num: "3.3", text: "You are solely responsible for maintaining the confidentiality of your account credentials." },
        { num: "3.4", text: "You agree to notify us immediately of any unauthorized use of your account." },
      ]
    },
    {
      id: 4,
      title: "Orders and Payments",
      icon: <IconCreditCard stroke={1.5} />,
      items: [
        { num: "4.1", text: "All orders placed through the Service are subject to acceptance and availability." },
        { num: "4.2", text: "Prices are subject to change without notice prior to order confirmation." },
        { num: "4.3", text: "Payment must be made in full at the time of purchase through approved payment methods." },
        { num: "4.4", text: "We reserve the right to refuse or cancel any order at our sole discretion." },
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
            <span className="font-bold text-white">Terms of Service</span>
          </div>
          
          <div className="header-title-box">
            <div className="header-icon">
              <IconFileText size={40} stroke={1.5} />
            </div>
            <div className="header-text">
              <h1>Terms of Service</h1>
              <p>Last updated: February 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="privacy-container">
        {/* Intro Banner */}
        <div className="privacy-intro">
          <div className="intro-icon">
            <IconFileText size={24} stroke={2} />
          </div>
          <div className="intro-text">
            <h2>Important Notice</h2>
            <p>By accessing and using FreshCart, you accept and agree to be bound by the terms and provisions of this agreement. Please read these terms carefully before using our services.</p>
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
          <Link href="/privacy-policy" className="btn-next">
            View Privacy Policy
            <IconArrowRight size={20} />
          </Link>
        </div>

      </div>
    </section>
  );
}