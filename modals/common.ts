// import "reflect-metadata";
import { Expose } from "class-transformer";

export  class Common {
    @Expose() id?: string;
    @Expose({ name: "ja" }) ja?: string;
    @Expose({ name: "vi" }) vi?: string;
    @Expose() desc?: string;
}
