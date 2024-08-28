import { Typography } from "@mui/material";
import { Product as ProductInterface } from "../../interfaces/interfaces";
import { CardImage, CardInfoWrapper, Container, PriceField, TruncatedText } from "./styles";

interface ProductProps extends ProductInterface {
  fullValue?: boolean;
}

export const Product = (props: ProductProps) => {
  const convertAnnualValue = (annualValue: string) => {
    return (Number(annualValue) / 12).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const fullValue = Number(props.annualValue).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Container>
      <CardImage src={`http://localhost:3000/products/images/${props.photos[0]}`} alt="" />
      <CardInfoWrapper>
        <TruncatedText variant="caption" fontWeight={800} fontSize={20}>
          {props.name}
        </TruncatedText>
        <TruncatedText variant="caption" fontWeight={400} sx={{ opacity: 0.6 }}>
          {props.technicalDetails}
        </TruncatedText>
        <PriceField>
          <Typography variant="caption" fontWeight={500}>
            {props.fullValue ? "Valor total:" : "Parcelas a partir de"}
          </Typography>
          <Typography variant="caption" fontWeight={800} fontSize={20} color="#157B3C">
            {props.fullValue ? fullValue : convertAnnualValue(props.annualValue)}
          </Typography>
          {!props.fullValue && (
            <Typography variant="caption" fontWeight={800} fontSize={10} sx={{ opacity: 0.8 }}>
              ou 1x de R${props.annualValue}
            </Typography>
          )}
        </PriceField>
      </CardInfoWrapper>
    </Container>
  );
};
