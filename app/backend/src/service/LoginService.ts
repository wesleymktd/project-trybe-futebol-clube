import { compareSync } from 'bcryptjs';
import ValidateError401 from '../errors/ValidateError401';
import UsersModel from '../database/models/UsersModel';
import authJwt from '../utils/authJwt';

export default class LoginService {
  public static async login(email: string, password: string) {
    const user = await UsersModel.findOne({ where: { email } });
    if (!user) throw new ValidateError401('Invalid email or password');
    if (!compareSync(password, user.password)) {
      throw new ValidateError401('Invalid email or password');
    }

    const token = authJwt.generateToken({ email, password });
    return token;
  }
}
