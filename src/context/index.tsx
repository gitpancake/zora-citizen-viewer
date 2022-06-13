import { ReactElement } from "react";
import RainbowContext from "./RainbowContext";

export const ContextProvider = ({ children }: { children: ReactElement }): JSX.Element => {
  return <RainbowContext>{children}</RainbowContext>;
};
