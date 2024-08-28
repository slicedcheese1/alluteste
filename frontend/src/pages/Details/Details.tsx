import React from "react";
import { useParams } from "react-router-dom";
import { ProductDetails } from "../../components/ProductDetails/ProductDetails";
import { Container } from "./styles";
import { useProductById } from "@services/api/products/products";

export const Details = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProductById(id || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading product</div>;
  }

  return (
    <Container>
      {product && (
        <ProductDetails
          name={product.name}
          id={product.id}
          annualValue={product.annualValue}
          technicalDetails={product.technicalDetails}
          photos={product.photos}
        />
      )}
    </Container>
  );
};
