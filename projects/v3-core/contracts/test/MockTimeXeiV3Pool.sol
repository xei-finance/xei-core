// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;

import '../XeiV3Pool.sol';

// used for testing time dependent behavior
contract MockTimeXeiV3Pool is XeiV3Pool {
    // Monday, October 5, 2020 9:00:00 AM GMT-05:00
    uint256 public time = 1601906400;

    function setFeeGrowthGlobal0X128(uint256 _feeGrowthGlobal0X128) external {
        feeGrowthGlobal0X128 = _feeGrowthGlobal0X128;
    }

    function setFeeGrowthGlobal1X128(uint256 _feeGrowthGlobal1X128) external {
        feeGrowthGlobal1X128 = _feeGrowthGlobal1X128;
    }

    function advanceTime(uint256 by) external {
        time += by;
    }

    function _blockTimestamp() internal view override returns (uint32) {
        return uint32(time);
    }
}
