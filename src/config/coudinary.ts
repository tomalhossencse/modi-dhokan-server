import { v2 as cloudinary } from "cloudinary";
import config from ".";
cloudinary.config({
    api_key: config.cloudinary_api_key,
    cloud_name: config.cloudinary_cloud_name,
    api_secret: config.cloudinary_api_secret,
});
export default cloudinary;
