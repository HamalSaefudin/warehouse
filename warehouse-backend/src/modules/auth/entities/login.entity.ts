export class LoginEntity {
  login_user: {
    user: {
      username: string;
      email: string;
      phone: string;
      password: string;
      user_id: string;
      role_level: number;
      is_active: number;
    };
    permissions: string[];
    role_level: number;
  };
}
