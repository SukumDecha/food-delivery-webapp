"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { foodCategoryItems } from "../../../app/configs/constants";
import { ChangeEvent, DragEvent, useState } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { CREATE_FOOD } from "../../../graphql/actions/create.food";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  estimatedPrice: z.number(),
  category: z.string(),
  images: z.array(z.string()),
});

type createFoodSchema = z.infer<typeof formSchema>;

const CreateFood = () => {
  const [createFoodMutation] = useMutation(CREATE_FOOD);
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createFoodSchema>({
    resolver: zodResolver(formSchema),
  });

  const [dragging, setDragging] = useState(false);
  const onSubmit = async (data: createFoodSchema) => {
    await createFoodMutation({
      variables: {
        createFoodDto: {
          name: data.name,
          description: data.description,
          price: data.price,
          estimatedPrice: data.estimatedPrice,
          category: data.category,
          images: data.images,
        },
      },
    }).then((res) => {
      console.log(res);
      toast.success("Food Created Successfully");
      reset();
      redirect("/foods");
    });

    console.log(data);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageArray = Array.from(files).map((file) => {
        const reader = new FileReader();

        return new Promise<string>((resolve, _reject) => {
          reader.onload = () => {
            if (reader.readyState === 2) {
              resolve(reader.result as string);
            }
          };

          reader.readAsDataURL(file);
        });
      });

      Promise.all(imageArray).then((images) => {
        setValue("images", images);
      });
    }
  };

  const handleImageDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      const imageArray = Array.from(files).map((file) => {
        const reader = new FileReader();

        return new Promise<string>((resolve, _reject) => {
          reader.onload = () => {
            if (reader.readyState === 2) {
              resolve(reader.result as string);
            }
          };

          reader.readAsDataURL(file);
        });
      });

      Promise.all(imageArray).then((images) => {
        setValue("images", images);
      });
    }
  };

  return (
    <div className="w-full pb-10">
      <div className="md:w-[70%] w-full m-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <div>
            <label className="label" htmlFor="name">
              Enter Food Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Chicken Curry"
              className="input"
            />
            {errors.name && (
              <span className="text-red-500 block mt-1">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label className="label" htmlFor="description">
              Enter Food Description
            </label>
            <textarea
              {...register("description")}
              rows={8}
              cols={25}
              placeholder="This is a delicious chicken curry"
              className="input !h-[unset] !p-2"
            />
            {errors.description && (
              <span className="text-red-500 block mt-1">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-[48%]">
              <label className="label mt-2" htmlFor="price">
                Enter Food Price
              </label>
              <input
                {...register("price", {
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="12"
                className="input"
              />
              {errors.price && (
                <span className="text-red-500 block mt-1">
                  {errors.price.message}
                </span>
              )}
            </div>
            <div className="w-1/2">
              <label className="label mt-2" htmlFor="estimatedPrice">
                Enter Estimated Food Price
              </label>
              <input
                {...register("estimatedPrice", {
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="25"
                className="input"
              />
              {errors.estimatedPrice && (
                <span className="text-red-500 block mt-1">
                  {errors.estimatedPrice.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="category" className="label mt-2">
              Select Food Category
            </label>
            <select
              {...register("category")}
              className="input"
              onChange={(e) => setValue("category", e.target.value)}
            >
              {foodCategoryItems.map((item: IFoodCategory) => (
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="images" className="label mt-3">
              Upload Food Images
            </label>
            <div className="w-full">
              <input
                type="file"
                required
                accept="image/*"
                multiple
                id="file"
                className="hidden"
                onChange={handleImageFileChange}
              />
              <label
                htmlFor="file"
                className={`w-full mt-2 rounded-md min-h-[15vh] border-white p-3 border flex items-center justify-center cursor-pointer ${dragging ? "bg-blue-500" : "bg-transparent"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleImageDrop}
              >
                {watch("images") ? (
                  <>
                    {watch("images").map((image: string) => (
                      <Image
                        key={image}
                        src={image}
                        alt="food"
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                    ))}
                  </>
                ) : (
                  <span className="text-white">Drag and Drop Images Here</span>
                )}
              </label>
            </div>
          </div>
          <input
            type="submit"
            value="Create"
            disabled={isSubmitting}
            className="button !w-[200px] mt-5 !p-0 !text-2xl"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
