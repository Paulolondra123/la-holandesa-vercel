const User = require('../../domain/entities/User');
const UserRepositoryInterface = require('../../domain/repositories/UserRepositoryInterface');

class UserRepository extends UserRepositoryInterface {
  constructor() {
    super();
    this.users = new Map(); // Simulación de base de datos en memoria
  }

  findById(id) {
    return this.users.get(id);
  }

  save(user) {
    this.users.set(user.id, user);
    return user;
  }
}

module.exports = UserRepository;
