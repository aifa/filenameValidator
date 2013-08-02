var NUMBER_OF_FILENAME_PARTS_IN_CAPS = 6;
var NUMBER_OF_FILENAME_PARTS_IN_NAPS = 8;
var NUMBER_OF_FILENAME_PARTS_IN_CAPSNAPS = 10;

var WHITESPACE = /^.*\s.*$/;
var EXTENSION = ".zip";
var DELIMETER = "_";

var BASIC_FORMAT_UPPER_CASE_HUNDRED_CHARS = /^[A-Z0-9-]{1,100}$/;
var BASIC_FORMAT_UPPER_CASE = /^[A-Z0-9-]+$/;
var BASIC_FORMAT_UPPER_LOWER_CASE = /^[A-Za-z0-9-]+$/;
var BASIC_FORMAT_UPPER_LOWER_CASE_THIRTY_CHARS = /^[A-Za-z0-9-]{1,30}$/;
var PSUR_TYPE = /^psusa$/;

var SEQUENCE_NUMBER_REG_EXP = /^[0-9][0-9]{3}$/;
var SIX_DIGIT_DATE = /^\\d{6}$/;
var EURDID_REG_EXP = /^[0-9]{8}$/;

var capsFormat = [
                BASIC_FORMAT_UPPER_CASE_HUNDRED_CHARS,
                BASIC_FORMAT_UPPER_CASE_HUNDRED_CHARS,
                BASIC_FORMAT_UPPER_CASE, 
                BASIC_FORMAT_UPPER_LOWER_CASE_THIRTY_CHARS,
                BASIC_FORMAT_UPPER_LOWER_CASE,
                SEQUENCE_NUMBER_REG_EXP
              ];

var napsFormat = [
                  BASIC_FORMAT_UPPER_CASE_HUNDRED_CHARS,
                  BASIC_FORMAT_UPPER_CASE_HUNDRED_CHARS,
                  EURDID_REG_EXP,
                  BASIC_FORMAT_UPPER_LOWER_CASE_THIRTY_CHARS,
                  BASIC_FORMAT_UPPER_LOWER_CASE,
                  SIX_DIGIT_DATE,
                  PSUR_TYPE,
                  SEQUENCE_NUMBER_REG_EXP
             ];

var capsnapsFormat = [
                  BASIC_FORMAT_UPPER_CASE_HUNDRED_CHARS,
                  BASIC_FORMAT_UPPER_CASE_HUNDRED_CHARS,
                  BASIC_FORMAT_UPPER_CASE,
                  BASIC_FORMAT_UPPER_LOWER_CASE_THIRTY_CHARS,
                  EURDID_REG_EXP,
                  BASIC_FORMAT_UPPER_LOWER_CASE_THIRTY_CHARS,
                  BASIC_FORMAT_UPPER_LOWER_CASE,
                  SIX_DIGIT_DATE,
                  PSUR_TYPE,
                  SEQUENCE_NUMBER_REG_EXP
             ];

var composeName= function(type,data){
	var filename="";
	switch(type){
		case "caps":
			filename = data.inputSender+'_'+data.receipient+'_'+data.inputPNumber+'_'+data.inputPName+'_'+data.inputSubType+'_'+data.inputSeqnumber;
			break;
		case "caps_naps":
			filename = data.inputSender+'_'+data.receipient+'_'+data.inputPNumber+'_'+data.inputPName+'_'+data.inputEurd+'_'+data.inputSub+
			'_'+data.inputMAH+'_'+data.inputEurDate+'_'+data.inputSubType+'_'+data.inputSeqNumber;
			break;
		case "naps":
			 filename = data.inputSender+'_'+data.receipient+'_'+data.inputEurd+'_'+data.inputSub+
			'_'+data.inputMAH+'_'+data.inputEurDate+'_'+data.inputSubType+'_'+data.inputSeqNumber;
			 break;
		 default:
			 return 'Unrecognised submission type';
		  break;
	}
	filename += EXTENSION;
	
	return validateFileName(filename);
};

/**
 * Validate filename and return an error message or 
 * the filename if it is valid.
 */
var validateFileName = function(filename){
	//check null or empty
	if (filename==null || filename==''){
		return 'No filename given';
	}
	//check max length
	if (filename.length>255){
		return filename + ' exceeds 255 characters';
	}
	
	if (WHITESPACE.test(filename)){
		return filename+" should not contain any whitespace";
	}
	
	//check for whitespace
	if (endsWith(filename, EXTENSION) == false){
		return filename+": Should end in "+ EXTENSION;
	}
	
	var filenameParts = filename.replace(EXTENSION, "").split("_");
	

	var regExpArray=null;
	
	switch (filenameParts.length){
		case NUMBER_OF_FILENAME_PARTS_IN_CAPS:
			regExpArray=capsFormat;
			break;
		case NUMBER_OF_FILENAME_PARTS_IN_NAPS:
			regExpArray=napsFormat;
			break;
		case NUMBER_OF_FILENAME_PARTS_IN_CAPSNAPS:
			regExpArray=capsnapsFormat;
			break;
		default:
			return 'Wrong number of filename parts...Unrecognised submission type';
	}
	
	if  (regExpArray==null){
		return "Oops...Internal System error";
	}
	
	var foundError=false;
	var result="<ul>";
	
	for (var i=0;i<filenameParts.length;i++){
		if (!regExpArray[i].test(filenameParts[i])){
			result += "<li>"+filenameParts[i]+" has an invalid format</li>";
			if (foundError==false){
				foundError=true;
			}
		}
	}
	
	if (foundError == false){
		result += "<li>"+filename+"</li>" ;
	}
	
	result+="</ul>";
	return result;
};

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


exports.composeName = composeName;
exports.validateFileName = validateFileName;