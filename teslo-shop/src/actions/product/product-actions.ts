"use server";

import prisma from "@/lib/prisma";
//import { sleep } from "@/utils";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el producto");
  }
};

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    //await sleep(3);
    const product = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
      select: {
        inStock: true,
      },
    });

    return product?.inStock ?? 0;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el stock");
  }
};
