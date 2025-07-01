import Link from 'next/link';
import BannerSwiper from './BannerSwiper';
const categories = [
  { name: 'Woman’s Fashion' },
  { name: 'Men’s Fashion' },
  { name: 'Electronics' },
  { name: 'Home & Lifestyle' },
  { name: 'Medicine' },
  { name: 'Sports & Outdoor' },
  { name: 'Baby’s & Toys' },
  { name: 'Groceries & Pets' },
  { name: 'Health & Beauty' },
];
export default function BannerSection() {
  return (
    <div className="flex h-[180px] justify-center gap-20 md:h-[380px] lg:mt-10">
      <nav aria-label="Category Menu" className="mx-4 hidden px-4 lg:block">
        <ul className="flex h-full flex-col justify-evenly">
          {categories.map((category, idx) => (
            <li key={idx} className="flex text-base text-black">
              <Link
                href={`/product?category=${encodeURIComponent(category.name)}`}
                className="flex w-full items-center justify-between whitespace-nowrap transition-all duration-200 hover:font-semibold hover:text-black"
              >
                {category.name}
              </Link>
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
