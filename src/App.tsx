import { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { getUniqueCollectionHolders, getAttributesInCollection, getCollectionFloorPrice } from "./network/zora";
import Statistic from "./components/Statistic";
import CitizenAttributes from "./types/CitizenAttribute";
import AdvancedDataTable from "./components/DataGrid";
import styled from "@emotion/styled";

const FadeInGrid = styled(Grid)`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: fadeIn 1s;
`;

const App = (): JSX.Element => {
  const [berlinerCount, setBerlinerCount] = useState<number>(0);
  const [berlinerFloorPrice, setBerlinerFloorPrice] = useState<number | null>(null);
  const [citizenAttributes, setCitizenAttributes] = useState<CitizenAttributes[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const BERLINERS_COLLECTION = "0xbdde08bd57e5c9fd563ee7ac61618cb2ecdc0ce0";

  useEffect(() => {
    const getCitizenData = async () => {
      setLoading(true);
      const floorPrice = await getCollectionFloorPrice({ collectionAddresses: [BERLINERS_COLLECTION] });

      if (floorPrice.aggregateStat.floorPrice) {
        setBerlinerFloorPrice(floorPrice.aggregateStat.floorPrice);
      }

      const attributes = await getAttributesInCollection({ collectionAddresses: [BERLINERS_COLLECTION] });

      const berliners = attributes.aggregateAttributes.find((x) => x.traitType === "CryptoBerliner");

      if (berliners?.valueMetrics) {
        setCitizenAttributes(berliners.valueMetrics);
      }

      const berlinerCount = await getUniqueCollectionHolders({ collectionAddresses: [BERLINERS_COLLECTION] });

      setBerlinerCount(berlinerCount.aggregateStat.ownerCount);
      setLoading(false);
    };

    getCitizenData();
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh", padding: "20px" }} spacing={4}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <FadeInGrid item xs={12} md={4}>
            <Statistic image="https://crypto-citizens-mainnet.s3.amazonaws.com/3000026.png" title="Unique Berliner Holders" count={berlinerCount} />
          </FadeInGrid>
          <FadeInGrid item xs={12} md={4}>
            <Statistic image="https://zora.co/assets/og-image.png" title="Berliner Floor Price" count={berlinerFloorPrice} />
          </FadeInGrid>
          <FadeInGrid item xs={12} md={8}>
            <AdvancedDataTable data={citizenAttributes} />
          </FadeInGrid>
          <FadeInGrid item xs={10} sx={{ paddingBottom: "20px" }}>
            <Typography>Made with ♥ by Bright Moments </Typography>
          </FadeInGrid>
        </>
      )}
    </Grid>
  );
};

export default App;
