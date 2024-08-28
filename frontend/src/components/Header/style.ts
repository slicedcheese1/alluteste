import styled from "@emotion/styled";
import { CiShoppingCart } from "react-icons/ci";

export const Container = styled.div`
  background-color: #fff;
  min-height: 4.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0 8px 8px -2px rgba(0, 0, 0, 0.2);
`;

export const HeaderWrapper = styled.div`
  width: 90%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

export const StyledCartIcon = styled(CiShoppingCart)`
  cursor: pointer;
  border-radius: 100%;
  transition: box-shadow 0.3s ease;
  padding: 0.35rem;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 100%;
  }
`;

export const HeaderImage = styled.img`
  width: 7rem;
  margin-left: 1rem;
  cursor: pointer;
`;

export const HeaderFields = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;
