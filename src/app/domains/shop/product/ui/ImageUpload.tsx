'use client';

import { useState } from 'react';

interface ImageUploadProps {
  label: string;
  required?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  onChange: (files: File | File[] | null) => void;
  error?: string;
}

export default function ImageUpload({
  label,
  required = false,
  multiple = false,
  maxFiles = 4,
  onChange,
  error,
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (multiple) {
      const remainingSlots = maxFiles - files.length;
      const newFiles = selectedFiles.slice(0, remainingSlots);

      if (newFiles.length === 0) return;

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);

      // 새로 추가된 파일들의 미리보기 생성
      const newPreviews: string[] = [];
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target?.result as string);
          if (newPreviews.length === newFiles.length) {
            setPreviews(prev => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });

      onChange(updatedFiles);
    } else {
      const file = selectedFiles[0];
      if (file) {
        setFiles([file]);
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews([e.target?.result as string]);
        };
        reader.readAsDataURL(file);
        onChange(file);
      }
    }

    // input 초기화
    event.target.value = '';
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviews(newPreviews);

    if (multiple) {
      onChange(newFiles);
    } else {
      onChange(null);
    }
  };

  const inputId = `${label.replace(/\s+/g, '-')}-upload`;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label} {required && '*'}
      </label>

      {previews.length > 0 ? (
        <div className="space-y-2">
          <div className={`grid gap-2 ${multiple ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`${label} ${index + 1}`}
                  className={`w-full rounded-md border object-cover ${
                    multiple ? 'h-24' : 'h-32'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className={`absolute top-1 right-1 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 ${
                    multiple ? 'h-5 w-5 text-xs' : 'h-6 w-6 text-sm'
                  }`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {multiple && files.length < maxFiles && (
            <div className="flex h-[96px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-neutral-100 p-4 text-center transition-colors hover:bg-gray-50">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple={multiple}
                id={`${inputId}-add`}
                onChange={handleFileChange}
              />
              <label htmlFor={`${inputId}-add`} className="cursor-pointer">
                <p className="text-gray-500">추가 이미지 업로드</p>
                <p className="mt-1 text-sm text-gray-400">
                  남은 개수: {maxFiles - files.length}개
                </p>
              </label>
            </div>
          )}
        </div>
      ) : (
        <div className={`flex cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-neutral-100 p-4 text-center transition-colors hover:bg-gray-50 ${
          multiple ? 'h-[96px]' : 'h-[128px]'
        }`}>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple={multiple}
            id={inputId}
            onChange={handleFileChange}
          />
          <label htmlFor={inputId} className="cursor-pointer">
            <p className="text-gray-500">
              {multiple ? '서브 이미지를 업로드하세요' : '대표 이미지를 업로드하세요'}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {multiple ? `최대 ${maxFiles}개까지 선택 가능` : '클릭하여 선택'}
            </p>
          </label>
        </div>
      )}

      {error && (
        <div className="text-base leading-6 text-[#db4444]">
          {error}
        </div>
      )}
    </div>
  );
}