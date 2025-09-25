"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DarkLogo from "@/public/images/darklogo.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MobileMenuBarIcon from "@/public/images/menu-bar-mobile.png";
import MobileMenuBarCross from "@/public/images/close-menu.png";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;

    if (window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: document.documentElement,
          start: "150px top",
          toggleClass: { targets: header, className: "scrolled" },
          onEnter: () => {
            gsap.to(header, {
              y: 0,
              duration: 0.8,
              ease: "power3.in",
              onStart: () => {
                header.style.position = "sticky";
                header.style.top = "0";
                header.style.left = "0";
                header.style.width = "100%";
                header.style.zIndex = "999";
                header.style.transition = "transform 0.8s ease";
              },
            });
          },
        });
    }
    
  }, []);

  return (
    <header ref={headerRef} className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo-wrap">
            <Link href="/">
              <Image
                src={DarkLogo}
                alt="Sky Turf Logo"
                width={2000}
                className="header__logo"
              />
            </Link>
          </div>

          <nav className="header__nav-wrap header__nav-wrap--desktop">
            <Link href="/">
              <span className="header__nav-item">Home</span>
            </Link>
            <Link href="/aboutus">
              <span className="header__nav-item">About Us</span>
            </Link>
            <Link href="/facilities">
              <span className="header__nav-item">Facilities</span>
            </Link>
            <Link href="/gallery">
              <span className="header__nav-item">Gallery</span>
            </Link>
            <Link href="/contactus">
              <span className="header__nav-item">Contact Us</span>
            </Link>
            <Link href="/signin">
              <span className="primary-button">Sign In</span>
            </Link>
          </nav>

          <div className='header__mobile-menu' onClick={toggleMenu}>
            <Image
              className='header__mobile-menu-bar'
              src={MobileMenuBarIcon}
              alt="mobile nav bar icon"
            />
          </div>

          {isMenuOpen && (
              <div className="header__mobile">
                  <div className="header__mobile-header">
                    <div className="header__mobile-menu-header">
                      <div className="header__logo-wrap">
                        <Link href="/" onClick={toggleMenu}>
                          <Image
                            src={DarkLogo}
                            alt="Sky Turf Logo"
                            width={2000}
                            className="header__logo"
                          />
                        </Link>
                      </div>
                    </div>
                    <div>
                      <div className='header__mobile-menu-cross-wrap' onClick={toggleMenu}>
                        <Image
                          className='header__mobile-menu-cross'
                          src={MobileMenuBarCross}
                          alt="mobile nav bar icon"
                        />
                      </div>
                    </div>
                  </div>
                  <nav className="header__nav-wrap header__nav-wrap--mobile">
                    <Link href="/">
                      <span className="header__nav-item" onClick={toggleMenu}>Home</span>
                    </Link>
                    <Link href="/aboutus">
                      <span className="header__nav-item" onClick={toggleMenu}>About Us</span>
                    </Link>
                    <Link href="/facilities">
                      <span className="header__nav-item" onClick={toggleMenu}>Facilities</span>
                    </Link>
                    <Link href="/gallery">
                      <span className="header__nav-item" onClick={toggleMenu}>Gallery</span>
                    </Link>
                    <Link href="/contactus">
                      <span className="header__nav-item" onClick={toggleMenu}>Contact Us</span>
                    </Link>
                    <Link href="/signin">
                      <span className="primary-button header__nav-item-button--mobile" onClick={toggleMenu}>Sign In</span>
                    </Link>
                  </nav>
              </div>
              
          )}

          
        </div>
      </div>
    </header>
  );
};

export default Header;