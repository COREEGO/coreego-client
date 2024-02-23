import { cleanHtmlText } from ".";

export const errorField = (error) => {
  return {
      error: Boolean(error),
      helperText: error?.message || "",
  };
};

export const noEmptyValidator = {
  required: {
    value: true,
    message: "Cette valeur ne doit pas être vide"
  }
};

export const requiredValidator = {
  required:{
    value: true,
    message: 'Cette valeur ne doit pas être vide'
  }
}

export const emailValidator = {
  pattern: {
    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: "Adresse email invalide",
  },
};

export const minLengthValidatior = (lenth) => {
  return {
    minLength: { value: lenth, message: `Minimum ${lenth} caratères` },
  };
};

export const notEmptyQuillEditor = (htmlString) => {

  if(!htmlString || cleanHtmlText(htmlString).length == 0){
    return "Cette valeur ne doit pas être vide"
  }
  return
}

export const minNumber = (value) => {
  return {
    min: {value: value, message: `Minimum de ${value} ` }
  }
}

export const maxLengthValidator = (length) => {
  return {
    maxLength: { value: length, message: `Le champ ne doit pas dépasser ${length} caractères` },
  };
};



export const noEmptyLocalisationValidator = (city, district) => {
  if(city === '' || district === ''){
    return "La ville et le district ne doivent pas être vide"
  }
  return
}

export const noEmtyFileValidator = (files) => {
  return files.length > 0 || "Une image au minimum est attendu";
};

export const passwordMatchValidator = (password, confirmPassword) => {
    return password === confirmPassword || 'Les mots de passe ne correspondent pas.'
}
