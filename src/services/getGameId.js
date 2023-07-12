import { ApiPromise } from "@polkadot/api";

export const getGameId = async () => {
  const api = await ApiPromise.create();
  const result = await api.query.tictactoe.gameIndex();
  return result.words[0];
};