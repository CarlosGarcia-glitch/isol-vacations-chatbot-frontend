export type UserRole = 'USER' | 'ADMIN';

export class User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  enabled: boolean;
  userId: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;

  constructor(data: {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    enabled: boolean;
    user_id: string;
    account_non_expired: boolean;
    account_non_locked: boolean;
    credentials_non_expired: boolean;
    created_at: string;
    updated_at: string;
    last_login: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
  }) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.role = data.role;
    this.enabled = data.enabled;
    this.userId = data.user_id;
    this.accountNonExpired = data.account_non_expired;
    this.accountNonLocked = data.account_non_locked;
    this.credentialsNonExpired = data.credentials_non_expired;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
    this.lastLogin = new Date(data.last_login);
    this.name = data.name;
    this.picture = data.picture;
    this.given_name = data.given_name;
    this.family_name = data.family_name;
  }
}
