import Link from 'next/link';
import SwiperDemo from './BannerSwiper';
const categories = [
  { name: 'Woman’s Fashion', hasSubmenu: true },
  { name: 'Men’s Fashion', hasSubmenu: true },
  { name: 'Electronics', hasSubmenu: false },
  { name: 'Home & Lifestyle', hasSubmenu: false },
  { name: 'Medicine', hasSubmenu: false },
  { name: 'Sports & Outdoor', hasSubmenu: false },
  { name: 'Baby’s & Toys', hasSubmenu: false },
  { name: 'Groceries & Pets', hasSubmenu: false },
  { name: 'Health & Beauty', hasSubmenu: false },
];
export default function BannerSection() {
  return (
    <div className="mx-auto flex h-[380px] max-w-6xl">
      <nav aria-label="Category Menu" className="mx-4 mt-10 hidden lg:block">
        <ul className="flex flex-col space-y-3">
          {categories.map((category, idx) => (
            <li key={idx} className="text-base text-black">
              <Link
                href="#"
                aria-haspopup={category.hasSubmenu ? 'true' : undefined}
                aria-expanded={category.hasSubmenu ? 'false' : undefined}
                className="flex w-full items-center justify-between"
              >
                {category.name}
                {category.hasSubmenu && (
                  <span
                    className="pl-8 align-super"
                    aria-hidden="true"
                    style={{ fontSize: '1.2em' }}
                  >
                    &#8250;
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="h-full w-full flex-1 sm:w-[600px]">
        <SwiperDemo />
      </div>
    </div>
  );
}
