// import "reflect-metadata";
import { Expose } from "class-transformer";

export class Account {
  @Expose() username?: string;
  @Expose() password?: string;
  @Expose() email?: string;
  @Expose() id?: number;
  @Expose() scope?: string[];
  @Expose() token?: string;
  @Expose() token_type?: string;
}
