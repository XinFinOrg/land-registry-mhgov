pragma solidity ^0.4.0;
contract LandRecordContract {

    //Data Structures
    address admin;

    struct LandRecord {
        bytes32 surveyNo;
        bytes32 landType;
        uint area;
        uint openParking;
        uint coveredParking;
        uint8 floorNo;
        address[] owners;
        bytes32 status;
    }

    mapping(bytes32 => LandRecord) properties;
    mapping(bytes32 => bool) propertyMap;

    //Modifiers
    modifier isAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier isNewProperty(bytes32 _propertyId) {
        require(!propertyMap[_propertyId]);
        _;
    }

    modifier isPropertyExists(bytes32 _propertyId) {
        require(propertyMap[_propertyId]);
        _;
    }

    event AddProperty (
        bytes32 propertyId,
        bytes32 surveyNo,
        bytes32 landType,
        uint area,
        uint openParking,
        uint coveredParking,
        uint8 floorNo,
        address owner,
        uint created
    );

    event SetStatus(
        bytes32 propertyId,
        bytes32 status,
        uint created
    );

    //Functions
    constructor() public {
        admin = msg.sender;
    }

    function addProperty(
        bytes32 _propertyId,
        bytes32 _surveyNo,
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
        properties[_propertyId].owners.push(_owner);
        properties[_propertyId].status = _status;

        propertyMap[_propertyId] = true;

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

    function setStatus(
        bytes32 _propertyId,
        bytes32 _status,
        uint _created
    ) public isAdmin isPropertyExists(_propertyId) {

        properties[_propertyId].status = _status;

        emit SetStatus(
            _propertyId,
            _status,
            _created
        );
    }


    function getStatus(bytes32 _propertyId) public view isPropertyExists(_propertyId) returns (
        bytes32
    ) {
        return (
            properties[_propertyId].status
        );
    }

    //fallback function
    function fallback() public payable {}

    //self destruct
    //function close() public isAdmin {
    //    selfdestruct(admin);
    //}
}
