// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./figo.sol";
import "./IERC20FIGO.sol";
import "./ERC1155TICKET.sol";

contract Fillgood is Ownable {
    using Counters for Counters.Counter;
    enum OfferType {
        none,
        gold,
        silver,
        bronze
    }
    struct Pack {
        uint32 nbMaxExperiences;
        string name;
        uint256 price;
        uint256 fees;
    }
    struct Partner {
        bool isRegister;
        uint256 partnerId;
        string name;
        OfferType offer;
        uint256[] experiencesIds;
    }
    struct Experience {
        uint256 experienceId;
        uint256 partnerId;
        uint32 nbTickets;
        uint32 nbTicketsSold;
        uint256 price;
        uint256 reward;
        uint256 date;
        string name;
        string experienceType;
        string meetingPlace;
    }
    struct Ticket {
        bool isRegistered;
        bool proofScanned;
    }
    struct Participant {
        uint256 participantId;
        // experience id to registration ticket
        mapping(uint256 => Ticket) tickets;
        uint256[] ticketsIds;
    }

    event offerSold(address partnerAddress, string offerName);
    event ExperienceAdded(address partnerAddress, string experienceName);
    event ParticipantRegistered(
        address participantAddress,
        string experienceName
    );

    IERC20FIGO public figo;
    ERC1155TICKET public experienceTicketing;
    Pack[] public packs;

    mapping(uint256 => Experience) public experiences;
    mapping(address => Partner) partners;
    mapping(address => Participant) private participants;
    mapping(uint256 => address) private partnersAddresses;

    Counters.Counter public partnerIds;
    Counters.Counter public experienceIds;
    Counters.Counter public participantsIds;

    constructor(address _figoaddress, address _ticketAddress) {
        figo = IERC20FIGO(_figoaddress);
        experienceTicketing = ERC1155TICKET(_ticketAddress);

        packs.push(Pack(0, "None", 0, 500));
        packs.push(Pack(0, "Gold", 2500 ether, 0));
        packs.push(Pack(5, "Silver", 1500 ether, 100));
        packs.push(Pack(2, "Bronze", 500 ether, 300));
    }

    /**
     * @notice Get self as partner
     * @dev Getter on partners mapping
     * @return Partner object
     */
    function getSelfAsPartner() external view returns (Partner memory) {
        return partners[msg.sender];
    }

    /**
     * @notice Get partner by id
     * use to get a partner detail in experience
     * @dev Getter on partnersAddress mapping
     * @return address address
     */
    function getPartnerAddressById(
        uint256 _id
    ) external view returns (address) {
        return partnersAddresses[_id];
    }

    /**
     * @notice Get an Experience by id
     * @dev Getter on experiences mapping
     * @return Experience object
     */
    function getExperience(
        uint256 idExperience
    ) external view returns (Experience memory) {
        return experiences[idExperience];
    }

    /**
     * @notice Get experience id list registered by participant
     * @dev Getter on experiences mapping
     * @return uint256[] ids
     */
    function getParticipationsIds() external view returns (uint256[] memory) {
        uint256[] memory ticketsIds = participants[msg.sender].ticketsIds;

        return ticketsIds;
    }

    /**
     * @notice Get ticket of participant for an experience id
     * @dev Getter on Participants => Ticket mapping
     * @return Ticket object
     */
    function getParticipation(
        uint256 experienceId
    ) external view returns (Ticket memory) {
        return participants[msg.sender].tickets[experienceId];
    }

    /**
     * @notice Partner buy FillGood Offer
     * @notice Figo Token need allowance to tranfert partners funds
     * emit offerSold
     * @dev OfferType is an enum betwee 0 and 3
     */
    function buyPack(uint8 _offerType) external {
        require(
            partners[msg.sender].offer != OfferType(_offerType),
            "you already have this offer"
        );

        uint256 amount = packs[_offerType].price;
        bool success = figo.transferFrom(msg.sender, address(this), amount);
        require(success, "transfertFrom failed");

        _registerPartner(msg.sender);

        partners[msg.sender].offer = OfferType(_offerType);
        emit offerSold(msg.sender, packs[_offerType].name);
    }

    /**
     * @notice Register a partner in partner lists
     * add entry partnerId to address
     */
    function _registerPartner(address _sender) internal {
        if (!partners[_sender].isRegister) {
            partnerIds.increment();
            partners[_sender].partnerId = partnerIds.current();
            partners[_sender].isRegister = true;
            partnersAddresses[partnerIds.current()] = _sender;
        }
    }

    /**
     * @notice Partner add an experience
     * @notice experienceTicketing Token will be added
     * emit ExperienceAdded
     */
    function addExperience(
        uint8 _nbTickets,
        uint256 _price,
        uint256 _reward,
        uint256 _date,
        string memory _name,
        string memory _experienceType,
        string memory _meetingPlace
    ) external returns (bool) {
        _registerPartner(msg.sender);
        experienceIds.increment();

        experiences[experienceIds.current()] = Experience(
            experienceIds.current(),
            partners[msg.sender].partnerId,
            _nbTickets,
            0,
            _price,
            _reward,
            _date,
            _name,
            _experienceType,
            _meetingPlace
        );
        experienceTicketing.createTicket(
            experienceIds.current(),
            _nbTickets,
            _date,
            _name
        );
        partners[msg.sender].experiencesIds.push(experienceIds.current());
        emit ExperienceAdded(msg.sender, _name);
        return true;
    }

    /**
     * @notice Participants registering to an experience
     * @notice experienceTicketing Token will be minted for an experience
     * @notice Figo Token need allowance to tranfert participants funds
     * emit ParticipantRegistered
     * Requirements:
     *
     * - before minting verify tickets are available
     * - `_experienceId`  must no exists in participant list
     */
    function registerParticipant(uint256 _experienceId) external {
        Experience memory experience = experiences[_experienceId];
        require(
            experience.nbTicketsSold < experience.nbTickets,
            "not enougth tickets"
        );

        require(
            !participants[msg.sender].tickets[_experienceId].isRegistered,
            "You are already registered"
        );

        // pay for registering an experience
        bool success = figo.transferFrom(
            msg.sender,
            partnersAddresses[experience.partnerId],
            experience.price
        );
        require(success, "transfertFrom failed");

        // if partcipant has no account
        if (participants[msg.sender].participantId == 0) {
            participants[msg.sender].participantId = participantsIds.current();
        }

        participants[msg.sender].tickets[_experienceId] = Ticket(true, false);
        participants[msg.sender].ticketsIds.push(_experienceId);

        // mint ticket
        experienceTicketing.mint(
            msg.sender, //    address _athlete,
            _experienceId, //  uint256 _experienceId,
            "json_uri", // string memory _tokenURI
            1, // _quantity
            "0x" // _data
        );
        experience.nbTicketsSold++;
        emit ParticipantRegistered(msg.sender, experience.name);
    }

    /**
     * QRCODe returns an experience ID
     * mssgsender has scan qrcorde proof of participate
     */
    // function getReward(uint8 experienceId) external {
    //     Registration storage registering = participants[msg.sender].experiences[
    //         experienceId
    //     ];
    //     require(
    //         !registering.isRegistered && !registering.hasAlreadyScan,
    //         "You're not allowed to valid this proof of participate"
    //     );
    //     // get approval to make this transfert before
    //     Experience storage experience = experiences[experienceId];
    //     figo.transfertFrom(experience.partner, msg.sender, experience.reward);
    // }
}
