pragma solidity ^0.4.0;
import "./LandRecordContract.sol";
import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract LandRegistry is LandRecordContract, StandardToken {
    address admin;

    struct RegistryRecord {
        bytes32 propertyId;
        address owner;
        address buyer;

        address ownersFinancer;
        uint loanAmount;
        uint outstandingLoan;

        address buyersFinancer;
        uint buyerFinanceAmount;

        bytes32 status;

        uint sellPrice;
        uint tokenAmount;
        uint registartionCharges;
    }

    mapping(bytes32 => RegistryRecord) registry;
    mapping(bytes32 => bool) registryMap;

    modifier isAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier isNewRegistry(bytes32 registryId) {
        require(!registryMap[registryId]);
        _;
    }

    modifier isRegistryExists(bytes32 registryId) {
        require(registryMap[registryId]);
        _;
    }

    event AddRegistryRecord(
        bytes32 registryId,
        bytes32 propertyId,
        address owner,
        uint sellPrice,
        uint tokenAmount,
        uint created
    );

    event AddBuyer(
        bytes32 registryId,
        bytes32 propertyId,
        address buyer,
        uint created
    );

    event AddOwnerFinancer(
        bytes32 registryId,
        bytes32 propertyId,
        address ownersFinancer,
        uint loanAmount,
        uint outstandingLoan,
        uint created
    );

    event AddBuyerFinancer(
        bytes32 registryId,
        bytes32 propertyId,
        address buyersFinancer,
        uint buyerFinanceAmount,
        uint created
    );

    event SetRegistrationFees(
        bytes32 registryId,
        bytes32 propertyId,
        uint registartionCharges,
        uint created
    );

    event SetStatus(
        bytes32 registryId,
        bytes32 propertyId,
        bytes32 status,
        uint created
    );

    constructor() public {
        admin = msg.sender;
        totalSupply_ = 10000000;
        balances[msg.sender] = 10000000;
    }

    function getBalance(address _address) public view returns(uint) {
         return balances[_address];
    }

    function getTotalSupply() public view returns(uint) {
        return totalSupply_;
    }

    function addTokenSupply(uint _tokens) public isAdmin {
        totalSupply_ += _tokens;
        balances[msg.sender] += _tokens;
    }

    function addRegistryRecord(
        bytes32 _registryId,
        bytes32 _propertyId,
        address _owner,
        uint _sellPrice,
        uint _tokenAmount,
        uint _created
    ) public isAdmin isNewRegistry(_registryId) {

        registry[_registryId].propertyId= _propertyId;
        registry[_registryId].owner= _owner;
        registry[_registryId].sellPrice= _sellPrice;
        registry[_registryId].tokenAmount= _tokenAmount;

        registryMap[_registryId] = true;

        emit AddRegistryRecord(
            _registryId,
            _propertyId,
            _owner,
            _sellPrice,
            _tokenAmount,
            _created
        );
    }

    function addBuyer(
        bytes32 _registryId,
        bytes32 _propertyId,
        address _buyer,
        uint _created
    ) public isAdmin isRegistryExists(_registryId) {
        registry[_registryId].buyer= _buyer;

        emit AddBuyer(
            _registryId,
            _propertyId,
            _buyer,
            _created
        );
    }

    function addOwnerFinancer(
        bytes32 _registryId,
        bytes32 _propertyId,
        address _ownersFinancer,
        uint _loanAmount,
        uint _outstandingLoan,
        uint _created
    ) public isAdmin isRegistryExists(_registryId) {
        registry[_registryId].ownersFinancer= _ownersFinancer;
        registry[_registryId].loanAmount= _loanAmount;
        registry[_registryId].outstandingLoan= _outstandingLoan;

        emit AddOwnerFinancer(
            _registryId,
            _propertyId,
            _ownersFinancer,
            _loanAmount,
            _outstandingLoan,
            _created
        );
    }

    function addBuyerFinancer(
        bytes32 _registryId,
        bytes32 _propertyId,
        address _buyersFinancer,
        uint _buyerFinanceAmount,
        uint _created
    ) public isAdmin isRegistryExists(_registryId){
        registry[_registryId].buyersFinancer= _buyersFinancer;
        registry[_registryId].buyerFinanceAmount= _buyerFinanceAmount;

        emit AddBuyerFinancer(
            _registryId,
            _propertyId,
            _buyersFinancer,
            _buyerFinanceAmount,
            _created
        );
    }

    function setRegistrationFees(
        bytes32 _registryId,
        bytes32 _propertyId,
        uint _registartionCharges,
        uint _created
    ) public isAdmin isRegistryExists(_registryId) {
        registry[_registryId].registartionCharges= _registartionCharges;
        emit SetRegistrationFees(
            _registryId,
            _propertyId,
            _registartionCharges,
            _created
        );
    }

    function setStatus(
        bytes32 _registryId,
        bytes32 _propertyId,
        bytes32 _status,
        uint _created
    ) public isAdmin isRegistryExists(_registryId) {
        registry[_registryId].status= _status;
        emit SetStatus(
            _registryId,
            _propertyId,
            _status,
            _created
        );
    }

    //fallback function
    function fallback() public payable {}

    //self destruct
    function close() public isAdmin {
        selfdestruct(admin);
    }
}