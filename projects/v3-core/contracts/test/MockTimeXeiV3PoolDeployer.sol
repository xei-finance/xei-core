// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;

import '../interfaces/IXeiV3PoolDeployer.sol';

import './MockTimeXeiV3Pool.sol';

contract MockTimeXeiV3PoolDeployer is IXeiV3PoolDeployer {
    struct Parameters {
        address factory;
        address token0;
        address token1;
        uint24 fee;
        int24 tickSpacing;
    }

    Parameters public override parameters;

    event PoolDeployed(address pool);

    function deploy(
        address factory,
        address token0,
        address token1,
        uint24 fee,
        int24 tickSpacing
    ) external returns (address pool) {
        parameters = Parameters({factory: factory, token0: token0, token1: token1, fee: fee, tickSpacing: tickSpacing});
        pool = address(new MockTimeXeiV3Pool{salt: keccak256(abi.encodePacked(token0, token1, fee, tickSpacing))}());
        emit PoolDeployed(pool);
        delete parameters;
    }
}
