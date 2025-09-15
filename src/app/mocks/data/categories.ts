export interface Category {
  name: string;
  key: string;
  englishName: string;
}

export const getCategoriesWithTranslation = (
  t: (key: string) => string,
): Category[] => [
  {
    name: t('womansFashion'),
    key: 'womansFashion',
    englishName: "Woman's Fashion",
  },
  {
    name: t('mensFashion'),
    key: 'mensFashion',
    englishName: "Men's Fashion",
  },
  {
    name: t('electronics'),
    key: 'electronics',
    englishName: 'Electronics',
  },
  {
    name: t('homeLifestyle'),
    key: 'homeLifestyle',
    englishName: 'Home & Lifestyle',
  },
  {
    name: t('medicine'),
    key: 'medicine',
    englishName: 'Medicine',
  },
  {
    name: t('sportsOutdoor'),
    key: 'sportsOutdoor',
    englishName: 'Sports & Outdoor',
  },
  {
    name: t('babysToys'),
    key: 'babysToys',
    englishName: "Baby's & Toys",
  },
  {
    name: t('groceriesPets'),
    key: 'groceriesPets',
    englishName: 'Groceries & Pets',
  },
  {
    name: t('healthBeauty'),
    key: 'healthBeauty',
    englishName: 'Health & Beauty',
  },
];

export const categoryKeys = [
  'womansFashion',
  'mensFashion',
  'electronics',
  'homeLifestyle',
  'medicine',
  'sportsOutdoor',
  'babysToys',
  'groceriesPets',
  'healthBeauty',
] as const;

export type CategoryKey = (typeof categoryKeys)[number];
