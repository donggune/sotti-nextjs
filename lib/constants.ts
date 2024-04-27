export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^\&*\)\(+=._-])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{10,}$/
);

export const PASSWORD_REGEX_ERROR = "비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함하여야 하고. 10자 이상이어야 해요";

export const SMS_TOKEN_ERROR = "올바른 인증번호를 입력해주세요";
export const SMS_PHONE_ERROR = "올바른 핸드폰 번호를 입력해주세요";
