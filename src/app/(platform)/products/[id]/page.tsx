import ProductDetailsScreen from "@/features/products/screens/productdetailsscreen";

type ProductDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({ params }: ProductDetailsProps) {
  const { id } = await params;
  return <ProductDetailsScreen productId={id} />;
}
