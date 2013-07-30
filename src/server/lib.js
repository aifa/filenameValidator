var composeName= function(type,data){
	switch(type){
		case "caps":
			return data.inputSender+'_'+data.receipient+'_'+data.inputPNumber+'_'+data.inputPName+'_'+data.inputSubType+'_'+data.inputSeqnumber;		
		case "caps_naps":
			return data.inputSender+'_'+data.receipient+'_'+data.inputPNumber+'_'+data.inputPName+'_'+data.inputEurd+'_'+data.inputSub+
			'_'+data.inputMAH+'_'+data.inputEurDate+'_'+data.inputSubType+'_'+data.inputSeqNumber;
		case "naps":
			return data.inputSender+'_'+data.receipient+'_'+data.inputEurd+'_'+data.inputSub+
			'_'+data.inputMAH+'_'+data.inputEurDate+'_'+data.inputSubType+'_'+data.inputSeqNumber;
		 default:
			 return 'Unrecognised submission type';
		  break;
	}
}

var validateFileName = function(filename){
	
}

exports.composeName = composeName
exports.validateFileName = validateFileName