import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Image {
  @Field(() => ID)
  id: string;
  
  @Field()
  public_id: string;

  @Field()
  url: string;

  @Field()
  foodId: string;
}

@ObjectType()
export class Food {
  @Field()
  id?: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  estimatedPrice: number;

  @Field()
  category: string;

  @Field(() => [Image])
  images: Image[];

  @Field()
  restaurantId: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
