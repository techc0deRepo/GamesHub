export const validateUser = (user) => {
    const errors = [];
  
    if (!user.userId || user.userId.trim() === "") {
      errors.push("User ID is required.");
    }
    if (!user.firstName || user.firstName.trim() === "") {
      errors.push("First Name is required.");
    }
    if (!user.lastName || user.lastName.trim() === "") {
      errors.push("Last Name is required.");
    }
    if (!user.username || user.username.trim() === "") {
      errors.push("Username is required.");
    } else if (user.username.length < 3) {
      errors.push("Username must be at least 3 characters long.");
    }
    if (!user.password || user.password.trim() === "") {
      errors.push("Password is required.");
    } else if (user.password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }
  
    return errors;
};