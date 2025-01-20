import React from "react";
import Image from "next/image";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* <p>&copy; 2025 Movie Match. All Rights Reserved.</p> */}
        <div className={styles.footerLinks}>
          <a
            href="https://www.linkedin.com/in/jakob-m-palmer/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <Image
              aria-hidden
              src="/images/LinkedIn-Logos/LI-In-Bug.png"
              alt="Linkedin icon"
              width={28}
              height={24}
            />
            Linkedin
          </a>
          <a
            href="https://github.com/jakobmpalmer"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <Image
              aria-hidden
             src="/images/github-mark/github-mark/github-mark.svg"
              alt="Github icon"
              width={24}
              height={24}
            />
            Github
          </a>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
