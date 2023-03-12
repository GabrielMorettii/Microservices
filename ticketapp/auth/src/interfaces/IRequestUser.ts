import { Request } from "express";

export interface IRequestUser extends Request{
  currentUser?: any;
}