import { PrismaService } from "@/api-restuarants/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../email/email.service";
import { CreateFoodDto, DeleteFoodDto } from "./dto/foods.dto";
import { Response } from "express";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

type IImages = {
  public_id: string;
  url: string;
};

type IFood = {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  category: string;
  images: IImages[] | any;
};

@Injectable()
export class FoodsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // create food
  async createFood(createFoodDto: CreateFoodDto, req: any) {
    try {
      const { name, description, price, estimatedPrice, category, images } =
        createFoodDto as IFood;
      const restaurantId = req.restaurant?.id;

      let foodImages: IImages | any = [];

      for (const image of images) {
        if (typeof image === "string") {
          const data = await this.cloudinaryService.upload(image);
          foodImages.push({
            public_id: data.public_id,
            url: data.secure_url,
          });
        }
      }

      const foodData = {
        name,
        description,
        price,
        estimatedPrice,
        category,
        images: {
          create: foodImages.map(
            (image: { public_id: string; url: string }) => ({
              public_id: image.public_id,
              url: image.url,
            })
          ),
        },
        restaurantId,
      };

      await this.prisma.foods.create({
        data: foodData,
      });

      return { message: "Food Created Successfully!" };
    } catch (error) {
      return { message: error };
    }
  }

  // get all restaurant foods
  async getLoggedInRestaurantFood(req: any) {
    const restaurantId = req.restaurant?.id;

    const foods = await this.prisma.foods.findMany({
      where: {
        restaurantId,
      },
      include: {
        images: true,
        restaurant: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { foods };
  }

  // delete foods of restaurant
  async deleteFood(deleteFoodDto: DeleteFoodDto, req: any) {
    const restaurantId = req.restaurant?.id;

    const food = await this.prisma.foods.findUnique({
      where: {
        id: deleteFoodDto.id,
      },
      include: {
        restaurant: true,
        images: true,
      },
    });

    if (food.restaurant.id !== restaurantId) {
      throw Error("You are not authorized to delete this food.");
    }

    await this.prisma.images.deleteMany({
      where: {
        foodId: deleteFoodDto.id,
      },
    });
    
    await this.prisma.foods.delete({
      where: {
        id: deleteFoodDto.id,
      },
    });

    return { message: "Food Deleted Successfully!" };
  }
}
