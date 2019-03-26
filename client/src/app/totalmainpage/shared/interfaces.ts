export interface LoginUser {
    email:string;
    password:string;

};

export interface RegistrationUser{
  name:string;
  flat:number;
  email:string;
  password:string;
}
export interface LoginManager{
  login:string;
  password:string;
}

export interface RegistrationMnager{
  name:string;
  position:string;
  login:string;
  password:string;
}

export interface News{
  title:string;
  body:string;
  imgSrc?:string;
  date:Date;
  _id?:number;
}
export interface Message{
  message:string;
}


