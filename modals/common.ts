// import "reflect-metadata";
import { Expose } from "class-transformer";

export  class Common {
    @Expose() id?: string;
    @Expose({ name: "name_ja" }) ja?: string;
    @Expose({ name: "name_vi" }) vi?: string;
    @Expose() desc?: string;
}
