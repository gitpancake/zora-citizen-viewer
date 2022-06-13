import Box from "@mui/material/Box";

interface Props {
  count: number | null;
  image: string;
  title: string;
}

const Statistic = ({ count, title, image }: Props): JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        bgcolor: "background.paper",
        overflow: "hidden",
        borderRadius: "12px",
        fontWeight: "bold",
        boxShadow: "0px 10px 50px 0px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Box
        sx={{
          height: 233,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
      >
        <img style={{ objectFit: "contain", height: "100%", width: "100%" }} alt="Placeholder Statistic for CryptoCitizen Zora API" src={image} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          m: 3,
          minWidth: { md: 350 },
        }}
      >
        <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
          {title}
        </Box>
        <Box component="span" sx={{ color: "primary.main", fontSize: 22 }}>
          {count || "Inactive"}
        </Box>
      </Box>
    </Box>
  );
};

export default Statistic;
