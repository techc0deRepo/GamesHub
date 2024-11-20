export const sanitizeUser = (user) => {
  return {
    userId: sanitizeString(user.userId),
    firstName: sanitizeString(user.firstName),
    lastName: sanitizeString(user.lastName),
    username: sanitizeString(user.username),
    password: sanitizeString(user.password),
  };
};

const sanitizeString = (str) => {
  return str.trim().replace(/<[^>]*>?/gm, "");
};