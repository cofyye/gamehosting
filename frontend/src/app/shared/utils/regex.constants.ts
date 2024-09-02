export const UNSIGNED_INTEGER_REGEX = /^[0-9]+$/;
export const SIGNED_INTEGER_REGEX = /^-?\d*\.?\d*$/;
export const ALPHABETS_AND_SPACE_REGEX = /^[a-zA-Z ]+$/;
export const USERNAME_REGEX = /^[a-z0-9._]+([._]?[a-z0-9]+)*$/;
export const PASSWORD_LOWERCASE_REGEX = /[a-z]/;
export const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
export const PASSWORD_NUMBER_REGEX = /\d/;
export const PASSWORD_SPECIALCHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
export const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const UNSIGNED_NUMERIC_WITH_TWO_DECIMALS_REGEX =
  /^(0|[1-9]\d*)(\.\d{1,2})?$/;
export const IPV4_REGEX =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
export const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
