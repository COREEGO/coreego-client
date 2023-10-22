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

export const noEmtyFileValidator = (files: Array<any>) => {
  return files.length > 0 || "Minimum 1 image";
};

export const passwordMatchValidator = (password:string, confirmPassword:string) => {
    return password === confirmPassword || 'Les mots de passe ne correspondent pas.'
}
