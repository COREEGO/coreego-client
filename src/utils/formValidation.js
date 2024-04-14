import { create, test, enforce } from 'vest';

export const IS_REQUIRED_MESSAGE = "Ce champ est requis.";
const IS_NOT_REGEX_VALID_MESSAGE = "Le format du champ est invalide.";
const IS_NOT_SAME_VALUE_MESSAGE = "La confirmation du champ ne correspond pas.";
const PSEUDO_REGEX = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const WEBSITE_REGEX = /^(ftp|http|https):\/\/[^ "]+$/

export const maxLength = (length) => `Le champ ne doit pas dépasser ${length} caractères.`
export const minLength = (length) => `Le champ doit avoir au minimum ${length} caractères.`
export const minNumber = (number) => `Minimum ${number}`

export const validationRegister = create((data = {}) => {
  test('accept_conditions', IS_REQUIRED_MESSAGE, () => {enforce(data.accept_conditions).isNotEmpty()});
  test('pseudo', IS_REQUIRED_MESSAGE, () => {enforce(data.pseudo).isNotEmpty()});
  test('pseudo', IS_NOT_REGEX_VALID_MESSAGE, () => {enforce(data.pseudo).matches(PSEUDO_REGEX)});
  test('pseudo', maxLength(20), () => {enforce(data.pseudo).shorterThanOrEquals(20)});
  test('pseudo', minLength(3), () => {enforce(data.pseudo).longerThanOrEquals(3)});

  test('email', IS_REQUIRED_MESSAGE, () => {enforce(data.email).isNotEmpty()});
  test('email', IS_NOT_REGEX_VALID_MESSAGE, () => {enforce(data.email).matches(EMAIL_REGEX)});

  test('password', IS_REQUIRED_MESSAGE, () => {enforce(data.password).isNotEmpty()});
  test('password', minLength(6), () => {enforce(data.password).longerThanOrEquals(6)});

  test('password_confirmation', IS_REQUIRED_MESSAGE, () => {enforce(data.password_confirmation).isNotEmpty()});
  test('password_confirmation', IS_NOT_SAME_VALUE_MESSAGE, () => {
    enforce(data.password_confirmation).equals(data.password);
  });
});

export const validationUpdatePassword = create((data = {}) => {
  test('password', IS_REQUIRED_MESSAGE, () => {enforce(data.password).isNotEmpty()});
  test('password', minLength(6), () => {enforce(data.password).longerThanOrEquals(6)});

  test('password_confirmation', IS_REQUIRED_MESSAGE, () => {enforce(data.password_confirmation).isNotEmpty()});
  test('password_confirmation', IS_NOT_SAME_VALUE_MESSAGE, () => {
    enforce(data.password_confirmation).equals(data.password);
  });
});
export const validationUpdatePseudo = create((data = {}) => {
  test('pseudo', IS_REQUIRED_MESSAGE, () => {enforce(data.pseudo).isNotEmpty()});
  test('pseudo', IS_NOT_REGEX_VALID_MESSAGE, () => {enforce(data.pseudo).matches(PSEUDO_REGEX)});
  test('pseudo', maxLength(20), () => {enforce(data.pseudo).shorterThanOrEquals(20)});
  test('pseudo', minLength(3), () => {enforce(data.pseudo).longerThanOrEquals(3)});
});


export const validationLogin = create((data = {}) => {
  test('email', IS_REQUIRED_MESSAGE, () => {enforce(data.email).isNotEmpty()});
  test('email', IS_NOT_REGEX_VALID_MESSAGE, () => {enforce(data.email).matches(EMAIL_REGEX)});

  test('password', IS_REQUIRED_MESSAGE, () => {enforce(data.password).isNotEmpty()});
})

export const validationForgotPassword = create((data = {}) => {
  test('email', IS_REQUIRED_MESSAGE, () => {enforce(data.email).isNotEmpty()});
  test('email', IS_NOT_REGEX_VALID_MESSAGE, () => {enforce(data.email).matches(EMAIL_REGEX)});
})

export const validationChangePassword = create((data = {}) => {
  test('email', IS_REQUIRED_MESSAGE, () => {enforce(data.email).isNotEmpty()});
  test('email', IS_NOT_REGEX_VALID_MESSAGE, () => {enforce(data.email).matches(EMAIL_REGEX)});

  test('password', IS_REQUIRED_MESSAGE, () => {enforce(data.password).isNotEmpty()});
  test('password', minLength(6), () => {enforce(data.password).longerThanOrEquals(6)});

  test('confirmPassword', IS_REQUIRED_MESSAGE, () => {enforce(data.confirmPassword).isNotEmpty()});
  test('confirmPassword', IS_NOT_SAME_VALUE_MESSAGE, () => {
    enforce(data.confirmPassword).equals(data.password);
  });

})

export const validationReview = create((data = {}) => {
  test('content', IS_REQUIRED_MESSAGE, () => {enforce(data.content).isNotEmpty()});
  test('stars', IS_REQUIRED_MESSAGE, () => {enforce(data.stars).isNotEmpty()});
  test('stars', minNumber(1), () => {enforce(data.stars).longerThan(0)});
})

export const validationComment = create((data = {}) => {
  test('content', IS_REQUIRED_MESSAGE, () => {enforce(data.content).isNotEmpty()});
})


export const validationDiscussion = create((data = {}) => {
  test('title', IS_REQUIRED_MESSAGE, () => {enforce(data.title).isNotEmpty()});
  test('title', maxLength(100), () => {enforce(data.title).shorterThanOrEquals(100)});
  test('category_id', IS_REQUIRED_MESSAGE, () => {enforce(data.category_id).isNotEmpty()});
  test('content', IS_REQUIRED_MESSAGE, () => {enforce(data.content).isNotEmpty()});
})

export const validationCreateProduct = create((data = {}) => {
  test('title', IS_REQUIRED_MESSAGE, () => {enforce(data.title).isNotEmpty()});
  test('title', maxLength(100), () => {enforce(data.title).shorterThanOrEquals(100)});
  test('description', IS_REQUIRED_MESSAGE, () => {enforce(data.description).isNotEmpty()});
  test('description', maxLength(500), () => {enforce(data.description).shorterThanOrEquals(500)});
  test('price', IS_REQUIRED_MESSAGE, () => {enforce(data.price).isNotEmpty()});
  test('city_id', IS_REQUIRED_MESSAGE, () => {enforce(data.city_id).isNotEmpty()});
  test('district_id', IS_REQUIRED_MESSAGE, () => {enforce(data.district_id).isNotEmpty()});
  test('images',IS_REQUIRED_MESSAGE, () => {enforce(data.images).longerThan(0)})
})
export const validationUpdateProduct = create((data = {}) => {
  test('title', IS_REQUIRED_MESSAGE, () => {enforce(data.title).isNotEmpty()});
  test('title', maxLength(100), () => {enforce(data.title).shorterThanOrEquals(100)});
  test('description', IS_REQUIRED_MESSAGE, () => {enforce(data.description).isNotEmpty()});
  test('description', maxLength(500), () => {enforce(data.description).shorterThanOrEquals(500)});
  test('price', IS_REQUIRED_MESSAGE, () => {enforce(data.price).isNotEmpty()});
  test('city_id', IS_REQUIRED_MESSAGE, () => {enforce(data.city_id).isNotEmpty()});
  test('district_id', IS_REQUIRED_MESSAGE, () => {enforce(data.district_id).isNotEmpty()});
})

export const validationCreatePlace = create((data = {}) => {
  test('title', IS_REQUIRED_MESSAGE, () => {enforce(data.title).isNotEmpty()});
  test('title', maxLength(100), () => {enforce(data.title).shorterThanOrEquals(100)});
  test('category_id', IS_REQUIRED_MESSAGE, () => {enforce(data.category_id).isNotEmpty()});
  test('city_id', IS_REQUIRED_MESSAGE, () => {enforce(data.city_id).isNotEmpty()});
  test('district_id', IS_REQUIRED_MESSAGE, () => {enforce(data.district_id).isNotEmpty()});
  test('address', IS_REQUIRED_MESSAGE, () => {enforce(data.address).isNotEmpty()});
  test('images',IS_REQUIRED_MESSAGE, () => {enforce(data.images).longerThan(0)})
  test('reasons_to_visit', IS_REQUIRED_MESSAGE, () => {
    enforce(data.reasons_to_visit).isNotEmpty()
    enforce(data.reasons_to_visit.at(0)).isNotEmpty();
  });
})
export const validationUpdatePlace = create((data = {}) => {
  test('title', IS_REQUIRED_MESSAGE, () => {enforce(data.title).isNotEmpty()});
  test('title', maxLength(100), () => {enforce(data.title).shorterThanOrEquals(100)});
  test('category_id', IS_REQUIRED_MESSAGE, () => {enforce(data.category_id).isNotEmpty()});
  test('city_id', IS_REQUIRED_MESSAGE, () => {enforce(data.city_id).isNotEmpty()});
  test('district_id', IS_REQUIRED_MESSAGE, () => {enforce(data.district_id).isNotEmpty()});
  test('address', IS_REQUIRED_MESSAGE, () => {enforce(data.address).isNotEmpty()});
  test('reasons_to_visit', IS_REQUIRED_MESSAGE, () => {
    enforce(data.reasons_to_visit).isNotEmpty()
    enforce(data.reasons_to_visit.at(0)).isNotEmpty();
  });
})

export const validationProfil = create((data = {}) => {
  test('introduction', maxLength(250), () => {enforce(data.introduction).shorterThanOrEquals(250)});
  test('hobby', maxLength(50), () => {enforce(data.hobby).shorterThanOrEquals(50)});
  test('occupation', maxLength(50), () => {enforce(data.occupation).shorterThanOrEquals(50)});
  test('facebook', maxLength(20), () => {enforce(data.facebook).shorterThanOrEquals(20)});
  test('youtube', maxLength(20), () => {enforce(data.youtube).shorterThanOrEquals(20)});
  test('instagram', maxLength(20), () => {enforce(data.instagram).shorterThanOrEquals(20)});
  test('tiktok', maxLength(20), () => {enforce(data.tiktok).shorterThanOrEquals(20)});
  test('kakao', maxLength(20), () => {enforce(data.kakao).shorterThanOrEquals(20)});
  test('kakao', maxLength(20), () => {enforce(data.kakao).shorterThanOrEquals(20)});
  if(data.city_id){
    test('district_id', IS_REQUIRED_MESSAGE, () => {enforce(data.district_id).isNotEmpty()});
  }
  if(data.website.length > 0){
    test('website', IS_NOT_REGEX_VALID_MESSAGE, () => {
      enforce(data.website).nullable().matches(WEBSITE_REGEX);
    });
  }
})


export const validationReport = create((data = {}) => {
  test('content',  IS_REQUIRED_MESSAGE, () => {enforce(data.content).isNotEmpty()});
  test('content', minLength(3), () => {enforce(data.content).longerThanOrEquals(3)});
  test('content', maxLength(100), () => {enforce(data.content).shorterThanOrEquals(100)});
})

export const errorField = (error) => {
  return {
      error: Boolean(error),
      helperText: error?.message || "",
  };
};
