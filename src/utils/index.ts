import moment from "moment";
import { BASE_URL, IMAGE_PATH } from "./variables";
import { apiFetch } from "../http-common/apiFetch";

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
  const url = images.length ? IMAGE_PATH + images[0].name : null;
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


export const getValueFiltered: any = (
  datas: Array<any>,
  value: string = ""
) => {
  let DATAS = [...datas];
  return value.length
    ? [...DATAS].filter((language: any) =>
        language.label.toLowerCase().includes(value.toLowerCase())
      )
    : datas;
};

export const belongsToAuth = (userId: number, authId: number) => {
  return authId && userId === authId;
};

export const mutationUrl = async (url: string) => {
  return await apiFetch(url, "GET");
};

export const youtubeLink = (pseudo:string) => {
  return `https://www.youtube.com/@${pseudo}`
}

export const instagramLink = (pseudo:string) => {
  return `https://www.instagram.com/${pseudo}`
}

export const tiktokLink = (pseudo:string) => {
  return `https://www.tiktok.com/@${pseudo}`
}

export const facebookLink = (pseudo:string) => {
  return `https://www.facebook.com/${pseudo}`
}

export const allowedExtensions = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "capture=camera",
];

export const cleanHtmlText = (htmlString:string) => {

  const cleanText = htmlString.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  return cleanText;
}
