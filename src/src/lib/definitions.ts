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

export type Profile = {
  id: string,
  userName: string,
  mouse: string,
  mousePad: string,
  keyBoard: string,
  headSet: string,
  monitor: string,
};

export type Profiles = {
  username: string;
  firstName: string;
  lastName: string;
};

export type Peripheral = {
  id: number;
  name: string;
  url: string;
  type: string;
};