import { useShoppingCart } from "@context/ShoppingCart";
import { Typography } from "@mui/material";
import { Products } from "@pages/Home/styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../components/Product/Product";
import { CartWrapper, Container, NoProductsContainer, ProductWrapper, StyledButton, StyledDeleteIcon } from "./styles";

export const ShoppingCart = () => {
  const navigate = useNavigate();
  const { products: productsFromStorage, calculateTotal, loadProducts, removeProduct } = useShoppingCart();

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
      <Products>
        {productsFromStorage.length > 0 ? (
          productsFromStorage.map(product => (
            <ProductWrapper key={product.id}>
              <Product
                id={product.id}
                name={product.name}
                technicalDetails={product.technicalDetails}
                photos={product.photos}
                annualValue={product.annualValue}
                fullValue
              />
              <StyledDeleteIcon onClick={() => removeProduct(product.id)} color="#FFF" size={35} />
            </ProductWrapper>
          ))
        ) : (
          <NoProductsContainer>
            <Typography variant="h4">Não há produtos no seu carrinho</Typography>
            <StyledButton onClick={() => navigate("/")} variant="contained" color="success">
              Voltar para a página inicial
            </StyledButton>
          </NoProductsContainer>
        )}
      </Products>
      {productsFromStorage.length > 0 && (
        <CartWrapper>
          <Typography variant="overline" fontWeight="bold" fontSize={20}>
            Total de itens: {productsFromStorage.length}
          </Typography>
          <Typography variant="caption" fontWeight={500} fontSize={15}>
            Valor total
          </Typography>
          <Typography variant="overline" fontWeight={800} fontSize={25} color="#157B3C" marginTop="-1rem">
            R$ {calculateTotal()}
          </Typography>
          <StyledButton variant="contained" color="success">
            Ir para pagamento
          </StyledButton>
        </CartWrapper>
      )}
    </Container>
  );
};
