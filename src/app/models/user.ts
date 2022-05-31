export class User {
  private id;
  private username;
  private email;
  private password;

  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  get _id(): string {
    return this.id;
  }

  set _id(id) {
    this.id = id;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get _username(): string {
    return this.username;
  }

  set _username(value: string) {
    this.username = value;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get _email(): string {
    return this.email;
  }

  set _email(value: string) {
    this.email = value;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get _password(): string {
    return this.password;
  }

  set _password(value: string) {
    this.password = value;
  }
}
