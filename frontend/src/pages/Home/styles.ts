import styled from "@emotion/styled";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
`;

export const Products = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  border-radius: 16px;
  margin: 0 auto;
`;

export const ProductWrapper = styled.div`
  width: calc(33.3% - 1rem);
  background-color: #fff;
  border-radius: 24px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const AutocompleteWrapper = styled.div`
  width: 50%;
  margin: 2rem auto;
`;
