// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const KitalfaModule = buildModule('KitalfaModule', (m) => {
  const Kitalfa = m.contract('KitalfaToken');

  return { Kitalfa };
});

export default KitalfaModule;
