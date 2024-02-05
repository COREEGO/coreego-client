import { cleanHtmlText } from ".";

export const noEmptyValidator = {
  required: "Cette valeur ne doit pas être vide",
  minLength: { value: 1, message: "Minimum 1 caratère" },
  pattern: {
    value: /\S/,
    message: "Cette valeur ne doit pas être vide",
  },
};

export const minLengthValidatior = (lenth: number) => {
  return {
    minLength: { value: lenth, message: `Minimum ${lenth} caratères` },
  };
};

export const notEmptyQuillEditor = (htmlString: string) => {

  if(!htmlString || cleanHtmlText(htmlString).length == 0){
    return "Cette valeur ne doit pas être vide"
  }
  return
}

export const minNumber = (value: number) => {
  return {
    min: {value: value, message: `Minimum de ${value} ` }
  }
}

export const maxLengthValidator = (lenth: number) => {
  return {
    maxLength: { value: lenth, message: `Maximum ${lenth} caratères` },
  };
};

export const emailValidator = {
  pattern: {
    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: "Adresse email invalide",
  },
};

export const noEmptyLocalisationValidator = (city:string | number, district: string | number) => {
  if(city === '' || district === ''){
    return "La ville et le district ne doivent pas être vide"
  }
  return
}

export const noEmtyFileValidator = (files: Array<any>) => {
  return files.length > 0 || "Une image au minimum est attendu";
};

export const passwordMatchValidator = (password:string, confirmPassword:string) => {
    return password === confirmPassword || 'Les mots de passe ne correspondent pas.'
}
