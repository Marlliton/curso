import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import camisa01 from "../assets/shirt.png";
import camisa02 from "../assets/shirt-1.png";
import camisa03 from "../assets/shirt-2.png";
import { Carousel } from "../components/Carousel";

export default function Home() {
  return (
    <HomeContainer>
      <Carousel perPage={2}>
        <Product href="#">
          <Image src={camisa01} alt="Camisa 01" />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79.99</span>
          </footer>
        </Product>
        <Product href="#">
          <Image src={camisa02} alt="Camisa 01" />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79.99</span>
          </footer>
        </Product>
        <Product href="#">
          <Image src={camisa01} alt="Camisa 01" />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79.99</span>
          </footer>
        </Product>
        <Product href="#">
          <Image src={camisa03} alt="Camisa 01" />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79.99</span>
          </footer>
        </Product>
        <Product href="#">
          <Image src={camisa03} alt="Camisa 01" />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79.99</span>
          </footer>
        </Product>
        <Product href="#">
          <Image src={camisa03} alt="Camisa 01" />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79.99</span>
          </footer>
        </Product>
      </Carousel>
    </HomeContainer>
  );
}
