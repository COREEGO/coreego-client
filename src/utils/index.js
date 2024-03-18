import moment from "moment";
import { IMAGE_PATH } from "./variables";
import { apiFetch } from "../http-common/apiFetch";

export const dateParse = (date) => {
  let dateParse = moment(date).fromNow();

  if (moment(new Date()).diff(date, "d") > 0) {
    dateParse = moment(date).fromNow();
  }

  return dateParse;
};

export const getViolationField = (error, setError) => {
  if ("errors" in error?.response?.data) {
    const errors = error.response.data.errors;
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        const messages = errors[field];
        for (const message of messages) {
          setError(field, {
            type: "manual",
            message: message
          });
        }
      }
    }
  }
};


export const isKoreanAddress = (address) => {
  return address.includes('South Korea')
}

export const createBlobImage = (image) => {
  return URL.createObjectURL(image)
}

export const getFirstImage = (images) => {
  return images.length ? IMAGE_PATH + images[0].name : "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png";
};

export const wonToEuro = (price) => {
  let convertir = 0;
  if (price > 0) {
    // Convertir le prix en euros avec deux décimales
    convertir = (0.0007 * price).toFixed(2);

    // Formatter le nombre avec des espaces tous les trois chiffres
    convertir = convertir.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return convertir;
  }
  return convertir;
};

export const findMatchingUser = (datas, user) => {
  return datas.find((data) => data?.user?.id === user.id);
};

export const isAlreadySaved = (likes, user) => {
  return likes.find((like) => like.user.id === user.id);
};


export const getValueFiltered = (
  datas,
  value = ""
) => {
  let DATAS = [...datas];
  return value.length
    ? [...DATAS].filter((language) =>
        language.label.toLowerCase().includes(value.toLowerCase())
      )
    : datas;
};

export const belongsToAuth = (userId, authId) => {
  return authId && userId === authId;
};

export const mutationUrl = async (url) => {
  return await apiFetch(url, "GET");
};

export const youtubeLink = (pseudo) => {
  return `https://www.youtube.com/@${pseudo}`
}

export const instagramLink = (pseudo) => {
  return `https://www.instagram.com/${pseudo}`
}

export const tiktokLink = (pseudo) => {
  return `https://www.tiktok.com/@${pseudo}`
}

export const facebookLink = (pseudo) => {
  return `https://www.facebook.com/${pseudo}`
}

export const allowedExtensions = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "capture=camera",
];

export const cleanHtmlText = (htmlString) => {

  const cleanText = htmlString.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  return cleanText;
}

export const isAdmin = (role) => role.is_admin;


export const getChartCountArray = (datas) => {
  return [
		{
			count: datas?.count?.users,
			title: "Utilisateurs",
			color: "#ff8a65"
		},
		{
			count: datas?.count?.discussions,
			title: "Discussions",
			color: "#7986cb"
		},
		{
			count: datas?.count?.products,
			title: "Produits",
			color: "#f06292"
		},
		{
			count: datas?.count?.places,
			title: "lieux",
			color: "#4db6ac"
		},
		{
			count: datas?.count?.comments,
			title: "commentaires",
			color: "#dce775"
		},
		{
			count: datas?.count?.reviews,
			title: "Reviews",
			color: "#ffb74d"
		}
	];
}