import moment from "moment";
import { IMAGE_PATH } from "./variables";
import { EXPLORE_ICON, FORUM_ICON, HOME_ICON, MARKET_PLACE_ICON } from "./icon";

export const dateParse = (date) => {
  const diffInYears = moment().diff(moment(date), "years");
  const diffInMonths = moment().diff(moment(date), "months");
  const diffInDays = moment().diff(moment(date), "days");
  const diffInHours = moment().diff(moment(date), "hours");
  const diffInMinutes = moment().diff(moment(date), "minutes");
  const diffInSeconds = moment().diff(moment(date), "seconds");

  if (diffInYears > 0) {
    return diffInYears + " a";
  } else if (diffInMonths > 0) {
    return diffInMonths + " m";
  } else if (diffInDays > 0) {
    return diffInDays + " j"
  } else if (diffInHours > 0) {
    return diffInHours + ' h'
  } else if (diffInMinutes > 0) {
    return diffInMinutes + " min";
  } else {
    return diffInSeconds + " sec";
  }

};

export const getViolationField = (error, setError) => {
  if (error?.response?.data?.errors) {
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

export const belongsToAuth = (userId, authId) => {
  return authId && userId === authId;
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

export const LINKS = [
	{
		path: "/",
		label: "Accueil",
		icon: HOME_ICON
	},
	{
		path: "/forum",
		label: "Forum",
		icon: FORUM_ICON
	},
	{
		path: "/marketplace",
		label: "Marketplace",
		icon: MARKET_PLACE_ICON
	},
	{
		path: "/explorer",
		label: "Explorer",
		icon: EXPLORE_ICON
	}
];

export const productSteps = [
  {
    label: "Titre",
    element: "title"
  },
    {
    label: "Images",
    element: "images"
  },
  {
    label: "Prix",
    element: "price"
  },
  {
    label: "Localisation",
    element: ["city_id", 'district_id']
  },
  {
    label: "Description",
    element: "description"
  }
]

export const placeStep = [
  {
    label: "Titre",
    element: "title"
  },
  {
    label: "Catégorie",
    element: "category_id"
  },
  {
    label: "Images",
    element: "images"
  },
  {
    label: "Localisation",
    element: ["city_id", 'district_id']
  },
  {
    label: "Adresse",
    element: "address"
  },
  {
    label: "Arguments",
    element: "reasons_to_visit"
  }
]

export const discussionStep =  [
  {
    label: "Titre",
    element: "title"
  },
  {
    label: "Catégorie",
    element: "category_id"
  },
  {
    label: "Contenu",
    element: "content"
  }
]

export const hasNotificationNotReaded = (notifications) => {
  return notifications?.some(notification => !notification.read_at)
}

export const getMyGeoLocalisation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      // La géolocalisation est disponible
      navigator.geolocation.getCurrentPosition(
        function(position) {
          // Récupérer les coordonnées de latitude et longitude
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        function(error) {
          // En cas d'erreur
          console.error("Erreur de géolocalisation :", error);
          reject(error);
        }
      );
    } else {
      // La géolocalisation n'est pas disponible
      console.log("La géolocalisation n'est pas disponible sur cet appareil.");
      reject(new Error("La géolocalisation n'est pas disponible sur cet appareil."));
    }
  });
};

export const FORUM_DESCRIPTION = `Cet espace est un lieu d'échange et de partage où chacun peut contribuer à enrichir notre compréhension de la culture coréenne.`

export const MARKETPLACE_DESCRIPTION = `Cet espace est dédié à la vente d'objets du quotidien auprès des francophones résidant en Corée du Sud.`

export const EXPLORE_DESCRIPTION = `Cet espace est dédié au partage de vos coups de cœur en Corée du Sud que vous souhaitez faire découvrir à la communauté.`

export const TRAVELLOGUE_DESCRIPTION = `Cet espace vous invite à découvrir les lieux que vous avez sauvegardés.
Vous avez la possibilité de choisir une date de visite afin de planifier vos aventures
et de profiter pleinement de chaque expérience. `

export const RESUME_COREEGO = `
Bonjour, Je m'appelle Yoann, j'ai 28 ans.
En tant que développeur web de formation et passionné de la Corée du Sud, mon objectif premier avec Coreego est de créer une boîte à outils la plus complète possible pour les francophones intéressés par ce magnifique pays.
Je souhaite également y développer une communauté dynamique, permettant ainsi à l'application de croître et d'évoluer continuellement.
Mon ambition est de vous offrir une expérience immersive, vous permettant de plonger au cœur de la culture coréenne à travers la plateforme.
`
