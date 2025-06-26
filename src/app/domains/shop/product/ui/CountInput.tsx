import React, { SetStateAction } from 'react';

type CountInputProps = {
  quantity: number;
  setQuantity: React.Dispatch<SetStateAction<number>>;
  stock: number;
};

export default function CountInput({
  quantity,
  setQuantity,
  stock = 99,
}: CountInputProps) {
  const decrease = () => setQuantity(q => Math.max(1, q - 1));
  const increase = () => setQuantity(q => Math.min(stock, q + 1));

  return (
    <div className="flex h-12 w-40 items-center overflow-hidden rounded-md border border-gray-300 bg-white">
      <button
        type="button"
        aria-label="수량 감소"
        onClick={decrease}
        disabled={quantity <= 1}
        className={`h-full w-1/4 text-2xl font-bold ${quantity <= 1 ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer text-gray-700 hover:bg-gray-100'} focus:outline-none`}
      >
        −
      </button>
      <input
        type="number"
        min={1}
        max={stock}
        value={quantity}
        readOnly
        aria-label="수량"
        className="w-1/2 border-x border-gray-300 bg-white text-center text-lg font-semibold outline-none"
      />
      <button
        type="button"
        aria-label="수량 증가"
        onClick={increase}
        disabled={quantity >= stock}
        className={`h-full w-1/4 text-2xl font-bold ${quantity >= stock ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer hover:bg-red-100'} focus:outline-none`}
      >
        +
      </button>
    </div>
  );
}
