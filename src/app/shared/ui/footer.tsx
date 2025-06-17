'use client';
import Link from 'next/link';

function FooterSection({
  id,
  title,
  children,
  className = '',
  ...props
}: React.ComponentProps<'section'> & { id: string; title: string }) {
  return (
    <section
      aria-labelledby={id}
      className={`space-y-3 ${className}`}
      {...props}
    >
      <h2 id={id} className="text-lg font-bold">
        {title}
      </h2>
      {children}
    </section>
  );
}

function FooterNav({
  id,
  title,
  links,
}: {
  id: string;
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-labelledby={id} className="space-y-2">
      <h2 id={id} className="text-lg font-bold">
        {title}
      </h2>
      <ul className="space-y-1">
        {links.map(({ href, label }) => (
          <li key={href + label}>
            <Link href={href} className="hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-20 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <FooterSection
            id="footer-support"
            title="Support"
            className="space-y-2"
          >
            <address className="text-sm text-gray-300 not-italic">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
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
          </FooterSection>

          <FooterNav
            id="footer-account"
            title="Account"
            links={[
              { href: '#', label: 'My Account' },
              { href: '/auth/login', label: 'Login / Register' },
              { href: '/cart', label: 'Cart' },
              { href: '/wishlist', label: 'Wishlist' },
              { href: '#', label: 'Shop' },
            ]}
          />

          <FooterNav
            id="footer-quicklink"
            title="Quick Link"
            links={[
              { href: '#', label: 'Privacy Policy' },
              { href: '#', label: 'Terms Of Use' },
              { href: '#', label: 'FAQ' },
              { href: '#', label: 'Contact' },
            ]}
          />
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        <span aria-label="Copyright">©</span> Copyright yunrap 2025. All rights
        reserved
      </div>
    </footer>
  );
}
