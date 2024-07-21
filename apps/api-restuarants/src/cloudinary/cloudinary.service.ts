import { Injectable } from "@nestjs/common";
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";

type CloudinaryRespose = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryService {
  async upload(data: string): Promise<CloudinaryRespose> {
    try {
      const result = await cloudinary.uploader.upload(data);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
