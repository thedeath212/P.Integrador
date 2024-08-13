
export default {
    isAuthenticated() {
      return !!localStorage.getItem('authToken');
    },
    logout() {
      localStorage.removeItem('authToken');
    }
  };
  