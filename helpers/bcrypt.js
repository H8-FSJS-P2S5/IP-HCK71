const bcrypt = require("bcryptjs");

const hashedPassword = (plainPassword) => {
  const salt = bcrypt.genSaltSync(8); // Use genSaltSync for synchronous call
  const hash = bcrypt.hashSync(plainPassword, salt); // Generate the hash synchronously

  return hash; // Directly return the hash
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword); // Compare the password with the hashed password
};

module.exports = { hashedPassword, comparePassword };
