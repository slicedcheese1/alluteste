import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";

export const Container = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  margin: 2rem auto;
`;

export const ProductWrapper = styled.div`
  width: calc(33.3% - 1rem);
  border-radius: 24px;
  position: relative;
`;

export const CartWrapper = styled.div`
  width: 20%;
  padding: 1.5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 16px;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.3);
  height: 30%;
`;

export const NoProductsContainer = styled.div`
  width: 80%;
  padding: 1.5rem;
  background-color: #fff;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
`;

export const StyledButton = styled(Button)`
  border-radius: 24px;
`;

export const StyledDeleteIcon = styled(MdDelete)`
  color: #fff;
  cursor: pointer;
  size: 35px;
  background-color: red;
  border-radius: 100%;
  padding: 0.3rem;
  transition: background-color 0.3s ease;
  position: absolute;
  bottom: 10px;
  right: 10px;

  &:hover {
    background-color: darkred;
  }
`;
