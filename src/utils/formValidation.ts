export const noEmptyValidation = {
  required: "Cette valeur ne doit pas être vide",
  minLength: { value: 1, message: "Minimum 1 caratère" },
  pattern: {
    value: /\S/,
    message: "Cette valeur ne doit pas être vide",
  },
};

export const noEmtyFileValidation = (files: Array<any>) => {
  return files.length > 0 || "Minimum 1 image";
};
