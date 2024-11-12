import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

// Revalidación de la página cada 60 segundos
export const revalidate = 60; // 60 segundos

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function ShopHome({ searchParams }: Props) {
  // Resolución de los parámetros asíncronos
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // Obtener los productos paginados
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: currentPage,
  });

  // Redirigir si no hay productos
  if (!products.length) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
