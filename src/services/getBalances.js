import { ApiPromise } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";

export const getBalances = async () => {
    // Construct the keyring after the API (crypto has an async init)
    const keyring = new Keyring({ type: "sr25519" });

    // Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
    const alice = keyring.addFromUri("//Alice");
    const bob = keyring.addFromUri("//Bob");

    const api = await ApiPromise.create();
    const aliceBalance = await api.query.tictactoe.gameIndex();
    const bobBalance = await api.query.tictactoe.gameIndex();
    return { aliceBalance, bobBalance };
};