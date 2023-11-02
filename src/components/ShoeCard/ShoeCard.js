import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const priceTextDecoration = "none";
  const priceTextColor = COLORS.gray[900];
  const styles = {
    default: {
      backgroundColor: COLORS.gray[200],
    },
    "new-release": { backgroundColor: COLORS.primary },
    "on-sale": {
      backgroundColor: COLORS.tertiary,
      priceTextDecoration: "line-through",
      priceTextColor: COLORS.gray[700],
    },
  };

  let message = "";
  if (variant === "on-sale") {
    message = "Sale";
  } else if (variant === "new-release") {
    message = "Just Released!";
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <Flag variant={variant}>{message}</Flag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--price-text-color":
                styles[variant].priceTextColor ?? priceTextColor,
              "--price-text-decoration":
                styles[variant].priceTextDecoration ?? priceTextDecoration,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;

  flex: 1 1 340px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;

  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--price-text-color);
  text-decoration: var(--price-text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.div`
  position: absolute;
  display: ${(p) => p.variant === "default" && "none"};
  top: 12px;
  right: -4px;
  background-color: ${(p) =>
    p.variant === "on-sale" ? COLORS.primary : COLORS.secondary};
  color: ${COLORS.white};
  font-size: ${14 / 16}rem;
  border-radius: 2px;

  padding: 8px;
  padding-top: 6px; // visual centering
`;

export default ShoeCard;
