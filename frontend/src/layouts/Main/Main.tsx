import { PropsWithChildren } from "react";
import { Header } from "../../components/Header/Header";
import { Container, Content } from "./style";

export default function Main(props: PropsWithChildren) {
  return (
    <Container>
      <Header />
      <Content>{props.children}</Content>
    </Container>
  );
}
