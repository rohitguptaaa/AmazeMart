import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const footerLinks = {
  'Get to Know Us': [
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'About ShopZone', href: '/about' },
    { name: 'Investor Relations', href: '/investors' },
    { name: 'ShopZone Devices', href: '/devices' },
  ],
  'Make Money with Us': [
    { name: 'Sell products on ShopZone', href: '/sell' },
    { name: 'Sell on ShopZone Business', href: '/business' },
    { name: 'Become an Affiliate', href: '/affiliate' },
    { name: 'Advertise Your Products', href: '/advertise' },
    { name: 'Self-Publish with Us', href: '/publish' },
  ],
  'Payment Products': [
    { name: 'ShopZone Business Card', href: '/business-card' },
    { name: 'Shop with Points', href: '/points' },
    { name: 'Reload Your Balance', href: '/reload' },
    { name: 'Currency Converter', href: '/currency' },
  ],
  'Let Us Help You': [
    { name: 'Your Account', href: '/account' },
    { name: 'Your Orders', href: '/orders' },
    { name: 'Shipping Rates & Policies', href: '/shipping' },
    { name: 'Returns & Replacements', href: '/returns' },
    { name: 'Help', href: '/help' },
  ],
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full py-4 bg-amazon-navy-light hover:bg-amazon-navy-light/80 text-sm text-center transition-colors"
      >
        Back to top
      </button>

      {/* Main Footer Links */}
      <div className="border-b border-secondary-foreground/20">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-bold mb-3">{title}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-secondary-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            Amaze<span className="text-primary">mart</span>
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-secondary-foreground transition-colors"
              aria-label="Facebook"
            >
              <FiFacebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-secondary-foreground transition-colors"
              aria-label="Twitter"
            >
              <FiTwitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-secondary-foreground transition-colors"
              aria-label="Instagram"
            >
              <FiInstagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-secondary-foreground transition-colors"
              aria-label="YouTube"
            >
              <FiYoutube className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AmazeMart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
