"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const navigateToSignup = () => {
    router.push("/signup");
  };
  return (
    <>
      <Header />
      <main className="landing">
        <div className="intro">
          <h1>Uncover Digital Identities</h1>
          <p>
            K2K Discovery: Your all-in-one OSINT platform for comprehensive
            digital intelligence gathering and analysis.
          </p>
          <div>
            <button className="free-trail" onClick={navigateToSignup}>
              Start Free Trail
            </button>
            <button className="watch-demo" title="Coming Soon">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="features">
          <h1>Powerful OSINT Features</h1>
          <div className="wrapper">
            <div className="feature">
              <Image src="/icon/search.svg" alt="" width={40} height={40} />
              <h3>Advanced Reconnaissance</h3>
              <p>
                Comprehensive domain analysis and digital footprint mapping with
                automated tools.
              </p>
            </div>
            <div className="feature">
              <Image src="/icon/shield.svg" alt="" width={40} height={40} />
              <h3>Threat Intelligence</h3>
              <p>
                Real-time monitoring and analysis of potential security threats
                and vulnerabilities
              </p>
            </div>
            <div className="feature">
              <Image src="/icon/globe.svg" alt="" width={40} height={40} />
              <h3>Global Coverage</h3>
              <p>
                Access to worldwide databases and sources for complete
                intelligence gathering
              </p>
            </div>
            <div className="feature">
              <Image src="/icon/lock.svg" alt="" width={40} height={40} />
              <h3>Secure Analysis</h3>
              <p>
                Comprehensive domain analysis and digital footprint mapping with
                automated tools
              </p>
            </div>
          </div>
        </div>
        <div className="input-section">
          <h2>Ready to enhance OSINT capabilities?</h2>
          <p>
            Join thousands of security professionals and researchers who trust
            K2K Discovery for their OSINT needs
          </p>
          <div className="wrapper">
            <input type="text" placeholder="Enter your email" />
            <button>Get started</button>
          </div>
        </div>
        <div className="footer">
          <div className="logo-footer">
            <Image
              src="/img/infosec-logo-1.svg"
              width={240}
              height={120}
              alt=""
            />
          </div>
          <div className="details">
            <div className="card">
              <p className="category">PRODUCTS</p>
              <p className="item">Infosec K2K</p>
              <p className="item">K2K labs</p>
              <p className="item">K2K discovery</p>
            </div>
            <div className="card">
              <p className="category">LOCATIONS</p>
              <p className="item">United Kingdom</p>
              <p className="item">India</p>
              <p className="item">Germany</p>
            </div>
            <div className="card">
              <p className="category">COMPANY</p>
              <p className="item">About us</p>
              <p className="item">Website</p>
            </div>
            <div className="card">
              <p className="category">CONTACTS</p>
              <p className="item">test@gmail.com</p>
              <p className="item">test@gmail.com</p>
              <p className="item">test@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="copy-rights">
          <p>© 2024 Infosec K2K. All rights reserved.</p>
        </div>
      </main>
    </>
  );
}
