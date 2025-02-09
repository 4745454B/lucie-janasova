import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";

const navItems = ["Můj příběh", "Kontakt", "Fotogalerie"];

const Nav = () => {
  const headerRef = useRef(null);
  const linksRef = useRef(null);
  const logoRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useGSAP(() => {
    gsap.from(logoRef.current.children, {
      y: 50, // Start from below
      opacity: 0, // Fade in
      rotateZ: -10, // Slight rotation
      scale: 0.8, // Start smaller
      duration: 1.2, // Duration per letter
      ease: "elastic.out(1, 0.6)", // Elastic bounce effect
      stagger: 0.07, // Slight delay between letters
    });

    // Animate each letter of the links from bottom to top
    gsap.from(linksRef.current.querySelectorAll("span"), {
      y: 50, // Start from below
      opacity: 0, // Fade in
      rotateZ: -10, // Slight rotation
      scale: 0.8, // Start smaller
      duration: 1.2, // Duration per letter
      ease: "elastic.out(1, 0.6)", // Elastic bounce effect
      stagger: 0.07, // Slight delay between letters
    });
  });

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header
        ref={headerRef}
        className="absolute top-1/2 w-full -translate-y-1/2"
      >
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <h1 ref={logoRef} className="text-4xl font-zentry text-white">
              {Array.from("Lucie Janášová").map((char, index) => (
                <span key={index} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            <div ref={linksRef} className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {Array.from(item).map((char, charIndex) => (
                    <span key={charIndex} className="inline-block">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
