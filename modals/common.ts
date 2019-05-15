// import "reflect-metadata";
import { Expose } from "class-transformer";

export  class Common {
    @Expose() id?: string;
    @Expose() name_ja?: string;
    @Expose() name_vi?: string;
    @Expose() desc?: string;
}
