import * as viemChains from 'viem/chains';

export type Chain = {
    id: number,
    name: string,
    rpcUrls: string[],
    contracts: {
        [key: string]: string
    }
}

export function getDefaultChainlist(): Chain[] {
    let chainlist: Chain[] = [];

    for (let ViemChain of Object.values(viemChains)) {
        let chain: Chain = {
            id: ViemChain.id,
            name: ViemChain.name,
            rpcUrls: [...(ViemChain.rpcUrls.default.http || [])],
            contracts: Object(ViemChain.contracts),
        };

        // Add additional RPC URLs for Ethereum mainnet as viem's url may have issues
        if (ViemChain.id.toString() === '1') {
            chain.rpcUrls = ['https://ethereum.publicnode.com', 'https://cloudflare-eth.com']
            chainlist.push(chain);
        } else if (ViemChain.id.toString() === "3333") {
        } else {
            chainlist.push(chain);
        }
    }

    // Ensure ETHStorage testnet is included
    chainlist.push({
        id: 3333,
        name: "ethStorage-testnet",
        rpcUrls: ["http://testnet.ethstorage.io:9540"],
        contracts: {},
    })

    return chainlist;
}