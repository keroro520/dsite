// TODO Currently the nsProviderSuffix only supports the ENS namespace. This should be extended to support other namespaces as well.

// Define a type for the components that will be extracted from the ERC6860 URL.
type ERC6860URLComponents = {
    schema: string;           // 'w3' or 'web3'
    userInfo: string;         // Address of the user, defaults to a zero address if not specified
    contractName: string;     // Address or domain name of the contract
    chainId: number;          // Blockchain chain ID, defaults to 1 (Ethereum Mainnet) if not specified
    pathQuery?: string;       // Optional path and query component of the URL
};

// ERC6860Parser class to parse ERC6860 URLs.
class ERC6860Parser {
    private url: string;

    // Constructor takes a URL string.
    constructor(url: string) {
        this.url = url;
    }

    // Parses the URL and returns the components or null if the URL is invalid.
    parse(): ERC6860URLComponents | null {
        // Regular expression to parse the ERC6860 URL according to the specification.
        const pattern = /^(w3|web3):\/\/(?:([0-9a-fA-F]{40})@)?([^:@\/\?#]+)(?::(\d+))?(\/[^?#]*)?$/;
        const match = this.url.match(pattern);

        if (!match) {
            console.error("Invalid ERC6860 URL format.");
            return null;
        }

        const [, schema, userInfo, contractName, chainId, pathQuery] = match;

        if (!this.isValidSchema(schema)) {
            console.error("Invalid schema: must be 'w3' or 'web3'.");
            return null;
        }

        const validatedUserInfo = userInfo || "0x0000000000000000000000000000000000000000";
        if (!this.isValidEthereumAddress(validatedUserInfo)) {
            console.error("Invalid user info: must be a valid Ethereum address.");
            return null;
        }

        const validatedChainId = chainId ? parseInt(chainId, 10) : 1;
        if (!this.isValidChainId(validatedChainId.toString())) {
            console.error("Invalid chain ID: must be a valid number.");
            return null;
        }

        if (!this.isValidContractName(contractName)) {
            console.error("Invalid contract name: must be a valid Ethereum address or a valid ENS domain name.");
            return null;
        }

        if (pathQuery && !this.isValidPathQuery(pathQuery)) {
            console.error("Invalid path/query: must conform to specified format.");
            return null;
        }

        return {
            schema,
            userInfo: validatedUserInfo,
            contractName,
            chainId: validatedChainId,
            pathQuery
        };
    }

    private isValidContractName(name: string): boolean {
        // Validates both Ethereum address and ENS domain names
        return this.isValidEthereumAddress(name) || this.isValidENSDomain(name);
    }

    private isValidENSDomain(domain: string): boolean {
        // Basic ENS domain validation: at least one dot, with alphanumeric characters and dashes
        return /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(domain);
    }

    // Helper method to validate the schema.
    private isValidSchema(schema: string): boolean {
        return ['w3', 'web3'].includes(schema);
    }

    // Helper method to validate Ethereum addresses.
    private isValidEthereumAddress(address: string): boolean {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    }

    // Helper method to validate chain IDs.
    private isValidChainId(chainId: string): boolean {
        return /^\d+$/.test(chainId) && parseInt(chainId, 10) > 0;
    }

    // Helper method to validate the path and query component.
    private isValidPathQuery(pathQuery: string): boolean {
        return /^\/[^?]*\??[^#]*$/.test(pathQuery);
    }
}