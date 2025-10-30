// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SimpleMarketplace is ReentrancyGuard {
    struct Offer { address seller; address nft; uint256 tokenId; uint256 price; bool active; }
    mapping(uint256 => Offer) public offers;
    uint256 public offerCount;

    event Offered(uint256 offerId, address seller, address nft, uint256 tokenId, uint256 price);
    event Bought(uint256 offerId, address buyer);

    function createOffer(address nft, uint256 tokenId, uint256 price) external returns(uint256) {
        IERC721(nft).transferFrom(msg.sender, address(this), tokenId);
        offerCount++;
        offers[offerCount] = Offer(msg.sender, nft, tokenId, price, true);
        emit Offered(offerCount, msg.sender, nft, tokenId, price);
        return offerCount;
    }

    function buy(uint256 offerId) external payable nonReentrant {
        Offer storage o = offers[offerId];
        require(o.active, "inactive");
        require(msg.value == o.price, "wrong price");
        o.active = false;
        payable(o.seller).transfer(msg.value);
        IERC721(o.nft).transferFrom(address(this), msg.sender, o.tokenId);
        emit Bought(offerId, msg.sender);
    }

    function cancel(uint256 offerId) external {
        Offer storage o = offers[offerId];
        require(o.seller == msg.sender, "not seller");
        require(o.active, "inactive");
        o.active = false;
        IERC721(o.nft).transferFrom(address(this), msg.sender, o.tokenId);
    }
}
