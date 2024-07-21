import { Args, Context, Mutation, Resolver, Query } from "@nestjs/graphql";
import { FoodsService } from "./foods.service";
import {
  CreateFoodResponse,
  DeleteFoodResponse,
  LoggedInRestaurantFoodResponse,
} from "./types/foods.types";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { CreateFoodDto, DeleteFoodDto } from "./dto/foods.dto";

@Resolver("Foods")
export class FoodsResolver {
  constructor(private readonly foodsService: FoodsService) {}

  @Mutation(() => CreateFoodResponse)
  @UseGuards(AuthGuard)
  async createFood(
    @Context() context: { req: Request; res: Response },
    @Args("createFoodDto") createFoodDto: CreateFoodDto
  ) {
    return await this.foodsService.createFood(createFoodDto, context.req);
  }

  @Query(() => LoggedInRestaurantFoodResponse)
  @UseGuards(AuthGuard)
  async getLoggedInRestaurantFoods(
    @Context() context: { req: Request; res: Response }
  ) {
    return await this.foodsService.getLoggedInRestaurantFood(context.req);
  }

  @Mutation(() => DeleteFoodResponse)
  @UseGuards(AuthGuard)
  async deleteFood(
    @Context() context: { req: Request },
    @Args("deleteFoodDto") deleteFoodDto: DeleteFoodDto
  ) {
    return await this.foodsService.deleteFood(deleteFoodDto, context.req);
  }
}
