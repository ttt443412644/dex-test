export const emailRegExpString: string =
  '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

export const passwordRegExpString: string =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,100}$";

export const requeredErrorMsg: string = "Обязательно для заполнения";
export const passwordErrorMsg: string =
  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character";

export const priceRegExpString: string = "^[0-9]{1,7}$";
