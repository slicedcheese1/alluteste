import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

export const Container = styled.div`
  background-color: #fff;
  height: 100%;
  min-height: 60vh;
  border-radius: 16px;
  border: 1px solid #f1f1f1;
  display: flex;
  justify-content: center;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.3);
`;

export const ProductWrapper = styled.div`
  max-width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  flex: 1;
`;

export const StyledCarousel = styled(Carousel)`
  width: 100%;
`;

export const PriceField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardImage = styled.img`
  max-width: 35%;
  max-height: 50%;
  border-radius: 16px 16px 0 0;
  margin: 0 auto;
  padding-top: 2rem;
`;

export const StyledButton = styled(Button)`
  margin: 2rem auto;
  opacity: 0.8;
  color: #fff;
  font-weight: bold;
  border-radius: 24px;
`;

export const CarouselContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ArrowButton = styled.button`
  background: none;
  border: 2px solid #f1f1f1;
  border-radius: 50%;
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &:hover {
    background-color: #f1f1f1;
    border-color: #ccc;
    transition: background-color 0.3s, border-color 0.3s;
  }

  &:first-of-type {
    left: 10px;
  }

  &:last-of-type {
    right: 10px;
  }
`;
