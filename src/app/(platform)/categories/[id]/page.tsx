import CategoryDetailsScreen from "@/features/categories/screens/categorydetailsscreen";

type CategoryDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function CategoryDetailsPage({ params }: CategoryDetailsProps) {
  const { id } = await params;
  return <CategoryDetailsScreen categoryId={id} />;
}
