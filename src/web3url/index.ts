import * as viemChains from 'viem/chains';

export type Chain = {
    id: number,
    name: string,
    rpcUrls: string[],
    contracts: {
        [key: string]: string
    }
}

function getDefaultChainlist() : Chain[] {
    let chainlist: Chain[]= [];

    for (let ViemChain of Object.values(viemChains)) {
        let chain: Chain = {
            id: ViemChain.id,
            name: ViemChain.name,
            rpcUrls: [...(ViemChain.rpcUrls.default.http || [])],
            contracts: Object(ViemChain.contracts),
        };

        // Add additional RPC URLs for Ethereum mainnet and ETHStorage testnet
        if (ViemChain.id.toString() === '1') {
            chain.rpcUrls = ['https://ethereum.publicnode.com', 'https://cloudflare-eth.com']
        } else if (ViemChain.id.toString() === '3333') {
            chain.rpcUrls = ['http://testnet.ethstorage.io:9540']
        }


        chainlist.push(chain);
    }

    return chainlist;
}