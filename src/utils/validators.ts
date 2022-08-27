const NICKNAME_REGEX = /[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,10}/;
const SPECIAL_CHAR_REGEX = /[ !@\\#$%^&*(),.?":{}|<>]/;

const validators = {
  nickname: (value: string) => NICKNAME_REGEX.exec(value) && !SPECIAL_CHAR_REGEX.exec(value),
  password: (value: string) => value && value.length >= 7
};

export default validators;
