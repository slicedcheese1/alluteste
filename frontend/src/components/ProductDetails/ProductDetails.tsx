import { Typography } from "@mui/material";
import { useState } from "react";
import { Product as ProductInterface } from "../../interfaces/interfaces";
import {
  ArrowButton,
  CarouselContainer,
  Container,
  ImageWrapper,
  PriceField,
  ProductWrapper,
  StyledButton,
} from "./styles";
import { useShoppingCart } from "@context/ShoppingCart";
import { useSnackbar, VariantType } from "notistack";
import { useNavigate } from "react-router-dom";

export const ProductDetails = (props: ProductInterface) => {
  const { addProduct } = useShoppingCart();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const renderSnackbar = (message: string, variant: VariantType) => () => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      autoHideDuration: 1500,
    });
  };

  const convertAnnualValue = (annualValue: string) => {
    return (Number(annualValue) / 12).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? props.photos.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex === props.photos.length - 1 ? 0 : prevIndex + 1));
  };

  const handleAddToCart = () => {
    addProduct(props);
    renderSnackbar("Produto adicionado com sucesso", "success")();
    navigate("/");
  };

  return (
    <Container>
      <CarouselContainer>
        <ArrowButton onClick={prevImage}>&#8249;</ArrowButton>
        <ImageWrapper>
          <img
            src={`http://localhost:3000/products/images/${props.photos[currentIndex]}`}
            alt={`Product image ${currentIndex + 1}`}
            style={{ width: "70%", height: "auto", borderRadius: "16px 0 0 16px" }}
          />
        </ImageWrapper>
        <ArrowButton onClick={nextImage}>&#8250;</ArrowButton>
      </CarouselContainer>
      <ProductWrapper>
        <Typography variant="caption" fontWeight={800} fontSize={20}>
          {props.name}
        </Typography>
        <Typography variant="caption" fontWeight={400} sx={{ opacity: 0.6 }}>
          {props.technicalDetails}
        </Typography>
        <PriceField>
          <Typography variant="caption" fontWeight={500}>
            parcelas a partir de
          </Typography>
          <Typography variant="caption" fontWeight={800} fontSize={20} color="#157B3C">
            {convertAnnualValue(props.annualValue)}
          </Typography>
          <Typography variant="caption" fontWeight={800} fontSize={10} sx={{ opacity: 0.8 }}>
            ou 1x de {props.annualValue}
          </Typography>
          <StyledButton variant="contained" color="success" fullWidth onClick={handleAddToCart}>
            Adicionar ao carrinho
          </StyledButton>
        </PriceField>
      </ProductWrapper>
    </Container>
  );
};
