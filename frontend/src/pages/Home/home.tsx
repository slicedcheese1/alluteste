import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product as ProductInterface } from "@interfaces/interfaces";
import { Typography } from "@mui/material";
import { Autocomplete, OptionType } from "../../components/Autocomplete";
import { Product } from "../../components/Product/Product";
import { AutocompleteWrapper, Container, Products, ProductWrapper } from "./styles";
import { useAllProducts } from "@services/api/products/products";

export default function Home() {
  const { data: products = [], isLoading, isError } = useAllProducts();
  const [visibleProducts, setVisibleProducts] = useState<ProductInterface[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      setVisibleProducts(products.slice(0, 7));
      setCurrentIndex(7);
    }
  }, [products]);

  const loadMoreProducts = () => {
    const newIndex = currentIndex + 3;
    const newProducts = products.slice(currentIndex, newIndex);

    setVisibleProducts(prevProducts => [
      ...prevProducts,
      ...newProducts.filter(product => !prevProducts.some(p => p.id === product.id)),
    ]);

    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 350) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIndex, products]);

  const fetchItems = async (input: string, page = 1) => {
    const startPageIndex = (page - 1) * 10;

    const filteredProducts = products
      .filter(product => product.name.toLowerCase().includes(input.toLowerCase()))
      .slice(startPageIndex, startPageIndex + 10)
      .map(product => ({
        ...product,
        id: product.id,
        label: `${product.name}`,
      }));

    return filteredProducts;
  };

  const handleAutocompleteChange = (selectedProduct: OptionType | null) => {
    if (selectedProduct) {
      const filteredProducts = products.filter(product => product.id === selectedProduct.id);
      setVisibleProducts(filteredProducts);
    } else {
      setVisibleProducts(products.slice(0, currentIndex));
    }
  };

  if (isLoading) {
    return (
      <Typography width="100%" variant="h2" textAlign="center" marginTop="3rem">
        Loading...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography width="100%" variant="h2" textAlign="center">
        Error loading products
      </Typography>
    );
  }

  return (
    <Container>
      <AutocompleteWrapper>
        <Autocomplete
          size="small"
          onCallback={fetchItems}
          label="Pesquise o produto do seu desejo"
          pageable={true}
          onChange={handleAutocompleteChange}
        />
      </AutocompleteWrapper>
      <Products>
        {visibleProducts.length > 0 ? (
          visibleProducts.map(product => (
            <ProductWrapper key={product.id} onClick={() => navigate(`/productDetails/${product.id}`)}>
              <Product
                id={product.id}
                name={product.name}
                technicalDetails={product.technicalDetails}
                photos={product.photos}
                annualValue={product.annualValue}
              />
            </ProductWrapper>
          ))
        ) : (
          <Typography width="100%" variant="h2" textAlign="center">
            No products found
          </Typography>
        )}
      </Products>
    </Container>
  );
}
