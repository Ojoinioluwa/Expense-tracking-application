export const getUserInfoFromStorage = () => {
  const token = JSON.parse(localStorage.getItem("userInfo")) || null;
  return token;
};
