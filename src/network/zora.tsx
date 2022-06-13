import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import { AggregateAttributesQuery, FloorPriceQuery, OwnerCountQuery } from "@zoralabs/zdk/dist/queries/queries-sdk";

const networkInfo = {
  network: ZDKNetwork.Ethereum,
  chain: ZDKChain.Mainnet,
};

const API_ENDPOINT = "https://api.zora.co/graphql";
const args = {
  endPoint: API_ENDPOINT,
  networks: [networkInfo],
  apiKey: process.env.REACT_APP_ZORA_API_KEY,
};

const zdk = new ZDK(args); // All arguments are optional

export const getUniqueCollectionHolders = async ({ collectionAddresses }: { collectionAddresses: string[] }): Promise<OwnerCountQuery> => {
  const count = await zdk.ownerCount({ where: { collectionAddresses } });

  return count;
};

export const getAttributesInCollection = async ({ collectionAddresses }: { collectionAddresses: string[] }): Promise<AggregateAttributesQuery> => {
  const attributes = await zdk.aggregateAttributes({ where: { collectionAddresses } });

  return attributes;
};

export const getCollectionFloorPrice = async ({ collectionAddresses }: { collectionAddresses: string[] }): Promise<FloorPriceQuery> => {
  const floorPice = await zdk.floorPrice({ where: { collectionAddresses } });

  return floorPice;
};
