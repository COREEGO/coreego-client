import moment from "moment";
import { BASE_URL } from "./variables";

export const dateParse = (date: Date) => {
  let dateParse = moment(date).fromNow();

  if (moment(new Date()).diff(date, "d") > 0) {
    dateParse = moment(date).fromNow();
  }

  return dateParse;
};

// à supprimer
export const getViolationField = (
  violations: Array<any>,
  fieldName: string
) => {
  let violationField: any = null;
  if (Array.isArray(violations) && violations.length) {
    violationField = violations.find(
      (violation: any) => violation.propertyPath === fieldName
    );
  }
  return violationField;
};

export const getFirstImage = (images: Array<any>) => {
  const url = images.length ? BASE_URL + images[0].filePath : null;
  if (url) return url;
  return;
};

export const wonToEuro = (price: number) => {
  let convertir: any = 0;
  if (price > 0) {
    // Convertir le prix en euros avec deux décimales
    convertir = (0.0007 * price).toFixed(2);

    // Formatter le nombre avec des espaces tous les trois chiffres
    convertir = convertir.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return convertir;
  }
  return convertir;
};

export const findMatchingUser = (datas: Array<any>, user: any) => {
  return datas.find((data: any) => data?.user?.id === user.id);
};

export const isAlreadySaved = (likes: Array<any>, user: any) => {
  return likes.find((like: any) => like.user.id === user.id);
};

export const templateColumns = ({
  base,
  sm,
  md,
  lg,
}: {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
}) => {
  const template: any = {};

  if (base) template.base = `repeat(${base}, 1fr)`;
  if (sm) template.sm = `repeat(${sm}, 1fr)`; // Fix: Use 'sm' property instead of 'base' for sm
  if (md) template.md = `repeat(${md}, 1fr)`; // Fix: Use 'md' property instead of 'base' for md
  if (lg) template.lg = `repeat(${lg}, 1fr)`; // Fix: Use 'lg' property instead of 'base' for lg

  return template;
};

export const getValueFiltered : any = (datas: Array<any>, value: string = "") => {
  let DATAS = [...datas]
  return value.length ? [...DATAS].filter((language: any) => language.label.toLowerCase().includes(value.toLowerCase())) : datas
};
