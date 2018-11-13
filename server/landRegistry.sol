pragma solidity ^0.4.0;
contract LandRegistry {
    address admin;

    struct LandRecord {
        uint surveyNo;
        bytes32 landType;
        uint area;
        uint openParking;
        uint coveredParking;
        uint8 floorNo;
        address[] owners;
    }

    struct RegistryRecord {
        address owner;
        address buyer;

        address ownersFinancer;
        uint loanAmount;
        uint outstandingLoan;

        address buyersFinancer;
        uint buyerFinanceAmount;

        bytes32 status;

        uint sellPrie;
        uint tokenAmount;
        uint registartionCharges;
    }

    mapping(bytes32 => LandRecord) properties;
    modifier isAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier isNewLandrecord (bytes32 propertyId) {
        require(properties[propertyId] == false);
        _;
    }

    modifier isPropertyExists (bytes32 propertyId) {
        require(properties[propertyId] != false);
        _;
    }

    modifier isFundingEligibile(bytes32 _projectId) {
        require(financeProjects[_projectId].fundedAmt < projects[_projectId].amount);
        _;
    }

    modifier isPropertyOwner(bytes32 _projectId) {
        require(msg.sender == projects[_projectId].owner);
        _;
    }

    event CreateProperty (
        bytes32 _propertyId,
        uint _surveyNo,
        bytes32 _landType,
        uint _area,
        uint _openParking,
        uint _coveredParking,
        uint8 _floorNo,
        address _owner,
        uint _created
    );

    event AddRegistryRecord(
        bytes32 registryId,
        bytes32 propertyId,
        address owner,
        uint sellPrice,
        uint tokenAmount,
        uint created
    );

    event UpdateTokenAmount(
        bytes32 registryId,
        bytes32 propertyId,
        uint tokenAmount
    );

    event UpdateSellPrice(
        bytes32 registryId,
        bytes32 propertyId,
        uint sellPrice
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

    constructor() internal {
        admin = msg.sender;
    }

    function addProperty(
        bytes32 _propertyId,
        uint _surveyNo,
        bytes32 _landType,
        uint _area,
        uint _openParking,
        uint _coveredParking,
        uint8 _floorNo,
        address _owner,
        bytes32 _status,
        uint _created
    ) public isAdmin isNewProperty(_propertyId) {
        properties[_propertyId].surveyNo = _surveyNo;
        properties[_propertyId].landType = _landType;
        properties[_propertyId].area = _area;
        properties[_propertyId].openParking = _openParking;
        properties[_propertyId].coveredParking = _coveredParking;
        properties[_propertyId].floorNo = _floorNo;
        properties[_propertyId].owners = _owner;
        properties[_propertyId].created = _created;
        projects[_projectId].status = _status;
        /*if (_projectType == 1) {
            financeProjects[_projectId].id = id;
        }*/
        emit AddProperty(
            _propertyId,
            _surveyNo,
            _landType,
            _area,
            _openParking,
            _coveredParking,
            _floorNo,
            _owner,
            _created
        );
    }

    function addRegistryRecord(
        bytes32 _registryId,
        bytes32 _propertyId,
        address _owner,
        uint _sellPrice,
        uint _tokenAmount,
        uint _created
    ) public isAdmin {

        registry[_registryId].propertyId= _propertyId;
        registry[_registryId].owner= _owner;
        registry[_registryId].sellPrice= _sellPrice;
        registry[_registryId].tokenAmount= _tokenAmount;

        emit AddRegistryRecord(
            _registryId,
            _propertyId,
            _owner,
            _sellPrice,
            _tokenAmount,
            _created
        )
    }

    function updateTokenAmount(
        bytes32 _registryId,
        bytes32 _propertyId,
        uint _tokenAmount
    ) public isAdmin {

        registry[_registryId].propertyId= _propertyId;
        registry[_registryId].tokenAmount= _tokenAmount;

        emit UpdateTokenAmount(
            _registryId,
            _propertyId,
            _tokenAmount
        )
    }

    function updateSellPrice(
        bytes32 _registryId,
        bytes32 _propertyId,
        uint _sellPrice
    ) public isAdmin {

        registry[_registryId].propertyId= _propertyId;
        registry[_registryId].sellPrice= _sellPrice;

        emit UpdateSellPrice(
            _registryId,
            _propertyId,
            _sellPrice
        )
    }

    function addBuyer(
        bytes32 _registryId,
        bytes32 _propertyId,
        address _buyer,
        uint _created
    ) public isAdmin {
        registry[_registryId].propertyId= _propertyId;
        registry[_registryId].buyer= _buyer;

        emit AddBuyer(
            _registryId,
            _propertyId,
            _buyer,
            _created
        )
    }

    function addOwnerFinancer(
        bytes32 _registryId,
        bytes32 _propertyId,
        address _ownersFinancer,
        uint _loanAmount,
        uint _outstandingLoan,
        uint _created
    ) public isAdmin {

        registry[_registryId].propertyId= _propertyId;
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
        )
    }

    function addBuyerFinancer(
        bytes32 _registryId,
        bytes32 _propertyId,
        address _buyersFinancer,
        uint _buyerFinanceAmount,
        uint _created
    ) public isAdmin {

        registry[_registryId].propertyId= _propertyId;
        registry[_registryId].buyersFinancer= _buyersFinancer;
        registry[_registryId].buyerFinanceAmount= _buyerFinanceAmount;

        emit AddBuyerFinancer(
            _registryId,
            _propertyId,
            _buyersFinancer,
            _buyerFinanceAmount,
            _created
        )
    }

    function setRegistrationFees(
        bytes32 _registryId,
        bytes32 _propertyId,
        uint _registartionCharges,
        uint _created
    ) public isAdmin {

        registry[_registryId].propertyId= _propertyId;
        registry[_registryId].registartionCharges= _registartionCharges;

        emit SetRegistrationFees(
            _registryId,
            _propertyId,
            _registartionCharges,
            _created
        )
    }

    function setStatus(
        bytes32 _registryId,
        bytes32 _propertyId,
        bytes32 _status,
        uint _created
    ) public isAdmin {

        registry[_registryId].propertyId= _propertyId;
        registry[_registryId].status= _status;

        emit SetStatus(
            _registryId,
            _propertyId,
            _status,
            _created
        )
    }

    //fallback function
    function fallback() public payable {}

    //self destruct
    function close() public isAdmin {
        selfdestruct(admin);
    }
}