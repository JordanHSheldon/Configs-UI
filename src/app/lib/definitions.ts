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
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
};

export type PaginatedUser = {
  username: string;
  firstName: string;
  lastName: string;
};

export type Profile = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  mouse: string;
  mousePad: string;
  keyBoard: string;
  headSet: string;
  monitor: string;
}

