class UserDTO {
    constructor(user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
    }
  }
  
  module.exports = UserDTO;
  