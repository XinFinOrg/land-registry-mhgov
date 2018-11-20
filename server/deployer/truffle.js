module.exports = {
   	networks: {
	   	development: {
		   	host: "localhost",
		   	//from : "0x0638e1574728b6d862dd5d3a3e0942c3be47d996",
		   	//from : "0x40aece087558d1585e1c4e92e68f20e88562345f",
			//port: 22001,
			port : 8545,
		    network_id: "*", // Match any network id
		 	gas: 4700000,
		 	gasPrice: 0
		}
 	}
};
