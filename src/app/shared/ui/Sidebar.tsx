'use client';

import { useRouter } from 'next/navigation';
import useSidebarStore from '../store/useSidebarStore';

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
export default function Sidebar() {
  const { isOpen, close } = useSidebarStore();
  const router = useRouter();

  const handleClick = (category: string) => {
    close(); // ✅ 먼저 사이드바 등 닫기
    router.push(`/product?category=${encodeURIComponent(category)}`);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-full transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
    >
      <button
        onClick={close}
        className="m-4 self-end p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="Close sidebar"
      >
        &#x2715; {/* ✕ 문자 */}
      </button>
      {/* 사이드바 내용 */}
      <nav className="flex flex-col items-center py-10">
        <ul className="justify-center space-y-5">
          {categories.map((category, idx) => (
            <li
              key={idx}
              className="flex w-full items-center justify-between text-base whitespace-nowrap transition-all duration-200 hover:font-semibold hover:text-black"
              onClick={() => handleClick(category.name)}
            >
              {/* href={`/product?category=${encodeURIComponent(category.name)}`} */}
              {category.name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
