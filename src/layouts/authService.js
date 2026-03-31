import userService from '../services/userService';

export const authService = {
  login: userService.login,
  logout: userService.logout,
  register: userService.register,
  refresh: userService.refresh,
  me: userService.getCurrentUser,
};

export default authService;
