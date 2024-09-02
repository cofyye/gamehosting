export const UNSIGNED_INTEGER_REGEX = /^[0-9]+$/;
export const SIGNED_INTEGER_REGEX = /^-?\d*\.?\d*$/;
export const ALPHABETS_AND_SPACE_REGEX = /^[a-zA-Z ]+$/;
export const DOCKER_IMAGE_REGEX = /^[a-z0-9_-]+([_-]?[a-z0-9]+)*$/;
export const STARTUP_DOCKER_ENVIRONMENT_NAME_REGEX = /^[a-zA-Z_]+$/;
export const PASSWORD_LOWERCASE_REGEX = /[a-z]/;
export const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
export const PASSWORD_NUMBER_REGEX = /\d/;
export const PASSWORD_SPECIALCHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
export const USERNAME_REGEX = /^[a-z0-9._]+([._]?[a-z0-9]+)*$/;
export const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
