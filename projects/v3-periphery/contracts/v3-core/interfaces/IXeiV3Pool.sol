// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/IXeiV3PoolImmutables.sol';
import './pool/IXeiV3PoolState.sol';
import './pool/IXeiV3PoolDerivedState.sol';
import './pool/IXeiV3PoolActions.sol';
import './pool/IXeiV3PoolOwnerActions.sol';
import './pool/IXeiV3PoolEvents.sol';

/// @title The interface for a Xei V3 Pool
/// @notice A Xei pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IXeiV3Pool is
    IXeiV3PoolImmutables,
    IXeiV3PoolState,
    IXeiV3PoolDerivedState,
    IXeiV3PoolActions,
    IXeiV3PoolOwnerActions,
    IXeiV3PoolEvents
{

}
