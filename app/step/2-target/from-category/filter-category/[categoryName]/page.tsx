type Props = {
  params: {
    categoryName: string;
  };
};

export default function Page(props: Props) {
  const { categoryName } = props.params;
  const decodedCategoryName = decodeURIComponent(categoryName);

  return <div>{decodedCategoryName} Page</div>;
}
