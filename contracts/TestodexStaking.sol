// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function balanceOf(address owner) external view returns (uint256);
}

contract Ownable {
    address public owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    constructor() { owner = msg.sender; }
    modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

contract TestodexStaking is Ownable {
    struct Pool {
        address stakeToken;
        address rewardToken;
        uint256 apr; // annual percentage rate (e.g., 1000 = 10%)
        uint256 fee; // pool fee in basis points (e.g., 100 = 1%)
        bool active;
    }
    Pool[] public pools;
    address public treasury;

    struct UserInfo {
        uint256 amount;
        uint256 rewardDebt;
        uint256 lastUpdate;
    }
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;

    event PoolAdded(uint indexed pid, address stakeToken, address rewardToken, uint256 apr, uint256 fee);
    event PoolUpdated(uint indexed pid, uint256 apr, uint256 fee, bool active);
    event Staked(address indexed user, uint indexed pid, uint256 amount);
    event Withdrawn(address indexed user, uint indexed pid, uint256 amount);
    event RewardClaimed(address indexed user, uint indexed pid, uint256 amount);

    constructor(address _treasury) { treasury = _treasury; }

    // Add a new staking pool
    function addPool(address stakeToken, address rewardToken, uint256 apr, uint256 fee) external onlyOwner {
        pools.push(Pool({stakeToken: stakeToken, rewardToken: rewardToken, apr: apr, fee: fee, active: true}));
        emit PoolAdded(pools.length - 1, stakeToken, rewardToken, apr, fee);
    }

    // Update pool parameters
    function updatePool(uint pid, uint256 apr, uint256 fee, bool active) external onlyOwner {
        Pool storage pool = pools[pid];
        pool.apr = apr;
        pool.fee = fee;
        pool.active = active;
        emit PoolUpdated(pid, apr, fee, active);
    }

    // Stake tokens
    function stake(uint pid, uint256 amount) external {
        Pool storage pool = pools[pid];
        require(pool.active, "Inactive pool");
        UserInfo storage user = userInfo[pid][msg.sender];
        _updateRewards(pid, msg.sender);
        uint256 feeAmount = (amount * pool.fee) / 10000;
        uint256 stakeAmount = amount - feeAmount;
        IERC20(pool.stakeToken).transferFrom(msg.sender, address(this), stakeAmount);
        if (feeAmount > 0) {
            IERC20(pool.stakeToken).transferFrom(msg.sender, treasury, feeAmount);
        }
        user.amount += stakeAmount;
        emit Staked(msg.sender, pid, stakeAmount);
    }

    // Withdraw staked tokens
    function withdraw(uint pid, uint256 amount) external {
        UserInfo storage user = userInfo[pid][msg.sender];
        require(user.amount >= amount, "Insufficient staked");
        _updateRewards(pid, msg.sender);
        user.amount -= amount;
        IERC20(pools[pid].stakeToken).transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, pid, amount);
    }

    // Claim rewards
    function claim(uint pid) external {
        _updateRewards(pid, msg.sender);
    }

    // Internal: update and pay rewards
    function _updateRewards(uint pid, address userAddr) internal {
        UserInfo storage user = userInfo[pid][userAddr];
        Pool storage pool = pools[pid];
        if (user.amount > 0) {
            uint256 pending = _pendingReward(pid, userAddr);
            if (pending > 0) {
                IERC20(pool.rewardToken).transfer(userAddr, pending);
                emit RewardClaimed(userAddr, pid, pending);
            }
        }
        user.lastUpdate = block.timestamp;
    }

    // View: pending reward
    function _pendingReward(uint pid, address userAddr) internal view returns (uint256) {
        UserInfo storage user = userInfo[pid][userAddr];
        Pool storage pool = pools[pid];
        uint256 time = block.timestamp - user.lastUpdate;
        // Simple linear reward: amount * apr * time / (365 days * 10000)
        return (user.amount * pool.apr * time) / (365 days * 10000);
    }
} 