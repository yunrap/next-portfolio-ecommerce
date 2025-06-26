'use client';
import Link from 'next/link';

const navLinkAccount = [
  { href: '#', label: 'My Account' },
  { href: '/auth/login', label: 'Login / Register' },
  { href: '/cart', label: 'Cart' },
  { href: '/wishlist', label: 'Wishlist' },
  { href: '#', label: 'Shop' },
];

const navLink = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms Of Use' },
  { href: '#', label: 'FAQ' },
  { href: '#', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl px-20 py-10 md:mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-3">
          <section
            aria-labelledby="footer-support"
            className="space-y-3 md:mx-auto"
          >
            <h2 id="footer-support" className="text-lg font-bold">
              Support
            </h2>
            <address className="text-sm text-gray-300">
              {` 111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.`}
              <br />
              <a
                href="mailto:exclusive@gmail.com"
                className="text-white underline"
              >
                exclusive@gmail.com
              </a>
              <br />
              <a href="tel:+8801588888999" className="text-white underline">
                +88015-88888-9999
              </a>
            </address>
          </section>
          <nav
            aria-labelledby="footer-account"
            className="w-fit space-y-2 md:mx-auto"
          >
            <h2 id="footer-account" className="text-lg font-bold">
              Account
            </h2>
            <ul className="space-y-1">
              {navLinkAccount.map(({ href, label }) => (
                <li key={href + label}>
                  <Link href={href} className="hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav
            aria-labelledby="footer-quicklink"
            className="w-fit space-y-2 md:mx-auto"
          >
            <h2 id="footer-quicklink" className="text-lg font-bold">
              Quick Link
            </h2>
            <ul className="space-y-1">
              {navLink.map(({ href, label }) => (
                <li key={href + label}>
                  <Link href={href} className="hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        <span aria-label="Copyright">©</span> Copyright yunrap 2025. All rights
        reserved
      </div>
    </footer>
  );
}
