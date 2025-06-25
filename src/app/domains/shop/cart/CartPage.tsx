'use client';

import { Button } from '@/app/shared/ui/Button';

export default function CartPage() {
  // 모바일일때 list, pc일때 table
  return (
    <>
      <div className="mt-4 mb-20 lg:mt-20">
        <h1 className="py-4 text-xl">
          <span className="opacity-50">HOME /</span> Cart
        </h1>
        <ul className="mb-20 sm:hidden">
          <li className="flex h-18 items-center justify-between border-gray-600 px-4 py-2 shadow-sm">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
          </li>
          <li className="flex justify-between px-4 py-2">
            <span className="font-medium">상품명</span>
            <span className="text-gray-600">$650</span>
            <span>$650</span>
            <span>650</span>
          </li>
          <li className="flex justify-between px-4 py-2">
            <span className="font-medium">상품명</span>
            <span className="text-gray-600">$650</span>
            <span>$650</span>
            <span>650</span>
          </li>
          <li></li>
        </ul>
        <table className="hidden w-full border-separate border-spacing-y-8 sm:table">
          <thead className="h-18 border-b text-gray-600 shadow-sm">
            <tr>
              <th scope="col" className="px-4 py-2 text-left">
                Product
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Price
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Quantity
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="h-25 border-b text-gray-600 shadow-sm hover:bg-gray-50">
              <td>상품명</td>
              <td>$650</td>
              <td>1</td>
              <td>$650</td>
            </tr>
            <tr className="h-25 border-b text-gray-600 shadow-sm hover:bg-gray-50">
              <td>상품명</td>
              <td>$650</td>
              <td>1</td>
              <td>$650</td>
            </tr>
          </tbody>
        </table>
        <div
          className="ml-auto border-1 px-6 py-8 lg:w-[30vw]"
          aria-labelledby="장바구니 합계"
        >
          <h1>Cart Total</h1>
          <ul>
            <li className="flex justify-between border-b-1 border-gray-400 py-4">
              <div>subtotal</div>
              <div>$111</div>
            </li>
            <li className="flex justify-between border-b-1 border-gray-400 py-4">
              <div>Shipping</div>
              <div>Free</div>
            </li>
            <li className="flex justify-between py-4">
              <div>Total</div>
              <div>$123123</div>
            </li>
          </ul>
          <div className="mt-10 flex justify-center">
            <Button size="md" variant="primary">
              pay
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
