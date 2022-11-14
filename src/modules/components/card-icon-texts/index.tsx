import { Icon } from "@iconify/react";
import { Grid } from "@mui/material";
import { Subtitle, Title } from "./style";

export interface ICardIconTextsElement {
  icon: string | JSX.Element;
  title: string;
  subtitle: string;
}

interface ICardIconTextsProps {
  cards: ICardIconTextsElement[];
}

const CardIconTexts = ({ cards }: ICardIconTextsProps) => {
  return (
    <Grid container spacing={3}>
      {cards.length &&
        cards.map((card: ICardIconTextsElement) => (
          <Grid
            item
            xs={12}
            md={4}
            pr="24px"
            key={Math.floor(Math.random() * 1000).toString()}
          >
            <Grid item>
              {card.icon instanceof String ? (
                <Icon icon={card.icon as string} />
              ) : (
                card.icon
              )}
            </Grid>
            <Title>{card.title}</Title>
            <Subtitle>{card.subtitle}</Subtitle>
          </Grid>
        ))}
    </Grid>
  );
};

export default CardIconTexts;
