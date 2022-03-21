import { Grid } from "@mui/material";
import images from "../../../assets/img";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "./../../../styles/colors";

const Section1 = ({ children }: any) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <img
          src={images.sectionTop1}
          style={{
            width: "100%",
            height: "auto",
            transform: "translateY(6px)",
          }}
          alt="Section top"
        />
      </Grid>
      <Grid
        item
        style={{
          position: "relative",
          background: `linear-gradient(180deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%)`,
        }}
        alignItems="center"
        justifyContent="center"
      >
        <div style={{ padding: "16px", height: "100%", display: "flex" }}>
          {children}
        </div>
      </Grid>
      <Grid item>
        <img
          src={images.sectionBottom1}
          style={{
            width: "100%",
            height: "auto",
            transform: "translateY(-2px)",
          }}
          alt="Section top"
        />
      </Grid>
    </Grid>
  );
};

export default Section1;
