import Link from 'next/link';
import BannerSwiper from './BannerSwiper';
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
    <div className="flex h-[180px] justify-center gap-20 md:h-[380px] lg:mt-10">
      <nav aria-label="Category Menu" className="mx-4 hidden lg:block">
        <ul className="flex h-full flex-col justify-evenly">
          {categories.map((category, idx) => (
            <li key={idx} className="flex text-base text-black">
              <Link
                href="#"
                aria-haspopup={category.hasSubmenu ? 'true' : undefined}
                aria-expanded={category.hasSubmenu ? 'false' : undefined}
                className="flex w-full items-center justify-between whitespace-nowrap"
              >
                {category.name}
              </Link>
              {category.hasSubmenu && (
                <span
                  className="pl-8"
                  aria-hidden="true"
                  style={{ fontSize: '1.2em' }}
                >
                  &#8250;
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="h-full w-screen md:w-[900px]">
        <BannerSwiper />
      </div>
    </div>
  );
}
