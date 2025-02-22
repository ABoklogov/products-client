import { Sort, SortOptions } from "interfaces/Products.interface";

export const SORT_OPTIONS: SortOptions[] = [
  { name: 'Сначала дешевые', code: Sort.PRICE_ASC },
  { name: 'Сначала дорогие', code: Sort.PRICE_DESC },
  { name: 'От А до Я', code: Sort.NAME_ASC },
  { name: 'От Я до А', code: Sort.NAME_DESC },
];