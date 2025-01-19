export type Login = {
  username: string;
  password: string;
};

export type Register = {
  username: string;
  password: string;
};

export type cred = {
  result: string
}

export type User = {
  userName: string,
  mouse: string,
  mousePad: string,
  keyBoard: string,
  headSet: string,
  monitor: string,
};

export type PaginatedUser = {
  username: string;
  firstName: string;
  lastName: string;
};

export type ProfileType = {
  id: string;
  userName: string;
  dpi: number
  mouse: string;
  mousePad: string;
  keyBoard: string;
  headSet: string;
  monitor: string;
};

export type Peripheral = {
  id: number;
  name: string;
  url: string;
  type: string;
};