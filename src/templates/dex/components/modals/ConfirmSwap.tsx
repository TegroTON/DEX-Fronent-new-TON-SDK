import TonWeb from 'tonweb';

import {Router, ROUTER_REVISION, ROUTER_REVISION_ADDRESS} from '@ston-fi/sdk';

export function ConfirmSwapModal(wallet: any, LeftTokenAddress: string, RightTokenAddress: string, units: any) {
    console.log('====================')
    const WALLET_ADDRESS = wallet;
    const PROXY_TON = 'EQCM3B12QK1e4yZSf8GtBRT0aLMNyEsBc_DhVfRRtOEffLez';
    const JETTON = RightTokenAddress;

    const provider = new TonWeb.HttpProvider();

    console.log(provider)

    const router = new Router(provider, {
        revision: ROUTER_REVISION.V1,
        address: ROUTER_REVISION_ADDRESS.V1,
    });
    console.log('====================')
    const ROUTER = router.buildSwapProxyTonTxParams({
        userWalletAddress: WALLET_ADDRESS,
        proxyTonAddress: PROXY_TON,
        offerAmount: new TonWeb.utils.BN(units),

        askJettonAddress: JETTON,
        minAskAmount: 1,
    });
    console.log('complite')
    console.log(ROUTER)
    console.log('====================')
    return
    <div>
        1213131
    </div>
}
