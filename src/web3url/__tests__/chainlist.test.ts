import { getDefaultChainlist, Chain } from '../chainlist';

describe('getDefaultChainlist', () => {
    it('returns a list of chains with correct properties', () => {
        const chainlist = getDefaultChainlist();
        expect(chainlist).toBeInstanceOf(Array);
        chainlist.forEach(chain => {
            expect(chain).toHaveProperty('id');
            expect(chain).toHaveProperty('name');
            expect(chain).toHaveProperty('rpcUrls');
            expect(chain).toHaveProperty('contracts');
        });
    });

    it('includes additional RPC URLs for Ethereum mainnet', () => {
        const chainlist = getDefaultChainlist();
        const ethereumChain = chainlist.find(chain => chain.id === 1);
        expect(ethereumChain?.rpcUrls).toEqual(['https://ethereum.publicnode.com', 'https://cloudflare-eth.com']);
    });

    it('includes additional RPC URLs for ETHStorage testnet', () => {
        const chainlist = getDefaultChainlist();
        const ethStorageChain = chainlist.find(chain => chain.id === 3333);
        expect(ethStorageChain?.rpcUrls).toEqual(['http://testnet.ethstorage.io:9540']);
    });
});
