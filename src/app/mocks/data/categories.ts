export interface Category {
  name: string;
  key: string;
}

export const getCategoriesWithTranslation = (
  t: (key: string) => string,
): Category[] => [
  {
    name: t('womansFashion'),
    key: 'womansFashion',
  },
  {
    name: t('mensFashion'),
    key: 'mensFashion',
  },
  {
    name: t('electronics'),
    key: 'electronics',
  },
  {
    name: t('homeLifestyle'),
    key: 'homeLifestyle',
  },
  {
    name: t('medicine'),
    key: 'medicine',
  },
  {
    name: t('sportsOutdoor'),
    key: 'sportsOutdoor',
  },
  {
    name: t('babysToys'),
    key: 'babysToys',
  },
  {
    name: t('groceriesPets'),
    key: 'groceriesPets',
  },
  {
    name: t('healthBeauty'),
    key: 'healthBeauty',
  },
];