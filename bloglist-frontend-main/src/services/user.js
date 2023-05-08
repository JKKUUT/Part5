const getUser = () => {
  return JSON.stringify(localStorage.getItem("user"));
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  window.location.reload();
};

const logoutUser = () => {
  localStorage.removeItem("user");
  window.location.reload();
};

const userService = {
  getUser,
  setUser,
  logoutUser,
};

export default userService;
