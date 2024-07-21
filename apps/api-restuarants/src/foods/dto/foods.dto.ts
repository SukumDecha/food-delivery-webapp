import { Field, InputType } from "@nestjs/graphql";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateFoodDto {
  @Field()
  @IsNotEmpty({ message: "Food Name is required." })
  @IsString({ message: "Food Name must be a string." })
  name: string;

  @Field()
  @IsNotEmpty({ message: "Food Description is required." })
  @IsString({ message: "Food Description must be a string." })
  description: string;

  @Field()
  @IsNotEmpty({ message: "Food Price is required." })
  price: number;

  @Field()
  @IsNotEmpty({ message: "Food estimated price is required." })
  estimatedPrice: number;

  @Field()
  @IsNotEmpty({ message: "Food Category is required." })
  @IsString({ message: "Food Category must be a string." })
  category: string;

  @Field(() => [String])
  @IsArray({ message: "Food images must be an array." })
  @ArrayNotEmpty({ message: "Food images must not be empty." })
  images: string[];
}

@InputType()
export class DeleteFoodDto {
  @Field()
  @IsNotEmpty({ message: "Food ID is required." })
  id: string;
}
