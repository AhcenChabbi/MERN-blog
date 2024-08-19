import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../constants/env";
import { IImage } from "../constants/Image";
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (file: string): Promise<IImage> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { overwrite: true, invalidate: true, resource_type: "auto" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result && result.secure_url && result.public_id) {
          return resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
        return reject(new Error("Upload failed with no result"));
      }
    );
  });
};

export const deleteFromCloudinary = (publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};
