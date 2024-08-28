import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const Container = styled.div`
  background-color: #fff;
  height: 100%;
  max-height: 60vh;
  border-radius: 16px;
  border: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
`;

export const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1.5rem;
  flex: 1;
`;

export const PriceField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardImage = styled.img`
  max-width: 80%;
  max-height: 45%;
  border-radius: 16px 16px 0 0;
  margin: 0 auto;
  padding-top: 2rem;
`;

export const TruncatedText = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
