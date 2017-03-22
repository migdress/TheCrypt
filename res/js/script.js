/*** START Constants ***/
var base64Alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];
/*** END Contants ***/

/*** START GLOBAL VARIABLES ***/
var congruenceRowsNumber = 2;
/*** END GLOBAL VARIABLES ***/

function loadLeftPanel(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("leftPanel").innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", "res/html/leftPanel.html", true);
	xhttp.send();
}


function loadTheoryContent(){
	if(document.getElementById("theoryContent").innerHTML === ""){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("theoryContent").innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", "res/html/theoryContent.html", true);
	xhttp.send();
	}
	else {
		document.getElementById("theoryContent").innerHTML = "";
	}
}

function loadPracticeContent(){
	if(document.getElementById("practiceContent").innerHTML === ""){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("practiceContent").innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", "res/html/practiceContent.html", true);
	xhttp.send();
	}
	else {
		document.getElementById("practiceContent").innerHTML = "";
	}
}

function loadTableBase64(){
	console.log("Called method loadTableBase64()");
	var tableHTML = "<table style='border: 1px solid black;'>";
	for(i=0;i<Math.floor(base64Alphabet.length/4);i++){
		tableHTML = tableHTML +"<tr><th>"+[convertToBinary(i)]+":</th><td>"+base64Alphabet[i]+"</td></tr>";
	}
	tableHTML = tableHTML +"</table>";
	document.getElementById("tableBase64").innerHTML = tableHTML;
}

function render(page){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("rightPanel").innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", page, true);
	xhttp.send();
}

/*** BASE 64 ENCODING AND DECODING ***/

function encodeBase64(){	
	var input = document.getElementById("input").value;
	console.log(input);
	var encoded = window.btoa(input);
	document.getElementById("output").innerHTML = encoded;
}

function encodeBase64Extended(){
	console.log("Called method 'encondeBase64Extended'");
	var input = document.getElementById("input").value;
	var charCodeArray = convertStringToCharCodeArray(input);
	document.getElementById("output1").innerHTML = charCodeArray.toString();
	var binary8bitArray = convertCharCodeArrayTo8BinaryArray(charCodeArray);
	document.getElementById("output2").innerHTML = binary8bitArray;
	var binary6bitArray = convertBinary8StringToBinary6Array((binary8bitArray.toString()).replace(/,/g,""));
	document.getElementById("output3").innerHTML = binary6bitArray;
	var base64Array = 	convertBinary6StringToBase64Array(binary6bitArray.toString().replace(/,/g,""));
	document.getElementById("output4").innerHTML = base64Array.toString().replace(/,/g,"");
}

function decodeBase64Extended(){
	console.log("Called method 'decodeBase64Extended'");
	var input = document.getElementById("input").value;
	var base64CharArray = input.split("");
	var binary6Array = covertBase64CharArraytoBinary6Array(base64CharArray);
	document.getElementById("output1").innerHTML = binary6Array;
	var binary8Array = convertBinary6StringToBinary8Array(binary6Array.toString().replace(/,/g,""));
	document.getElementById("output2").innerHTML = binary8Array; 
	var asciiValuesArray = convertBinary8ArrayToAsciiArray(binary8Array);
	document.getElementById("output3").innerHTML = asciiValuesArray;
	var plainText = convertAsciiValuesArrayToCharArray(asciiValuesArray);
	document.getElementById("output4").innerHTML = plainText.toString().replace(/,/g,"");

	
}

function covertBase64CharArraytoBinary6Array(base64CharArray){
	console.log("Called method 'convertBase64CharArrayToBinary6Array'");
	console.log("base64CharArray length is: "+base64CharArray.length);
	console.log("converting...");
	result = [];
	for(var i=0; i<base64CharArray.length;i++){
		for(var j=0;j<base64Alphabet.length;j++){
			if(base64CharArray[i] == base64Alphabet[j]){
				result[i] = convertToBinaryNBits(j, 6);
				break;
			}
			else if(base64CharArray[i] == "="){
				result[i] = "000000";
				break;
			}
		}
	}
	console.log("success, returning vaue...");
	return result;
}

function convertBinary6StringToBinary8Array(binary6String){
	console.log("Called method 'convertBinary6StringToBinary8Array'");
	start = 0;
	end = 8;
	result = [];
	console.log("binary6String length is: "+binary6String.length);
	console.log("converting...");
	for(i=0;i<Math.floor(binary6String.length/8);i++){
		result[i]=binary6String.slice(start,end);
		start = start +8;
		end = end +8;
	}
	console.log("success, returning value");
	return result;
}

function convertBinary8ArrayToAsciiArray(binary8Array){
	console.log("Called method 'convertBinary8ArrayToAsciiArray'");
	console.log("binary8Array length: "+binary8Array.length);
	result = [];
	console.log("converting...");
	for(var i=0;i<binary8Array.length;i++){
		result[i] = convertBinaryToDecimal(binary8Array[i]);
	}
	console.log("success, returning value...");
	return result;
}

function convertToBinary(number){
	return number.toString(2);
}

function convertAsciiValuesArrayToCharArray(asciiValuesArray){
	console.log("Called method convertAsciiValuesArrayToCharArray'");
	result = [];
	console.log("asciiValuesArray length: "+asciiValuesArray.length);
	console.log("converting...");
	for(var i=0;i<asciiValuesArray.length;i++){
		result[i] = String.fromCharCode(asciiValuesArray[i]);
	}
	console.log("success, returning values...");
	return result;
}

function convertToBinaryNBits(number, numberOfBits){
	var binary = convertToBinary(number);
	while(binary.length<numberOfBits){
		binary = "0"+binary;
	}
	return binary;
}

function convertBinaryToDecimal(binary){
	stringNumber = binary.toString();
	return parseInt(binary, 2);
}

function convertCharCodeArrayTo8BinaryArray(array){
	console.log("Called method 'convertCharCodeArrayTo8BinaryArray'");
	var binArray = [];
	console.log("charCodeArray length is: "+array.length);
	console.log("converting...");
	for(var i=0;i<array.length;i++){
		binArray[i] = complete8bits(convertToBinary(array[i]));
	}
	console.log("convertion success, returning Value");
	return binArray;	
}
function convertBinary8StringToBinary6Array(binary8String){
	console.log("Called method 'convertBinary8StringToBinary6Array'");
	var start = 0;
	var end = 6;
	var binary6bits = "";
	var result = [];
	var rest = binary8String.length % 24;
	console.log("Checking exact multiple of 24...");
	console.log("initial length of string = "+binary8String.length);
	console.log("rest = "+rest);
	if(rest!=0){
		for(var i=0;i<(24-rest);i++){
			binary8String = binary8String +"0";
		}
	}
	console.log("posterior length of string= "+binary8String.length);
	console.log("Slicing...");
	for(var i=0; i<(binary8String.length/6);i++){
		binary6bits = binary8String.slice(start,end);
		result[i] = binary6bits;
		start = start +6;
		end = end + 6;
	}
	console.log("success, returning value...");
	return result;
}

function convertStringToCharCodeArray(string){
	console.log("Called method 'convertStringToCharCodeArray'");
	stringArray = string.split("");
	charCodeArray = [];
	console.log("charCodeArray length is: "+string.length);
	for(var i=0; i<stringArray.length; i++){
		charCodeArray[i] = stringArray[i].charCodeAt(0);
	}
	return charCodeArray;
}

function complete8bits(binary){
	while(binary.length<8){
		binary = "0"+binary;
	}
	return binary;
}

function convertBinary6StringToBase64Array(binary6String){
	console.log("Called method 'convertBinary6StringToBase64Array'");
	console.log("alphabet length: "+base64Alphabet.length);
	var start = 0;
	var end = 6;
	var binary6bits="";
	var result = [];
	var decimal = 0;
	var last2bitsFromPrevious = "";
	console.log("length of string: "+binary6String.length);
	console.log("converting...");
	for(var i=0; i<(binary6String.length/6);i++){
		binary6bits = binary6String.slice(start,end);
		if(i>0){
			last2bitsFromPrevious = (binary6String.slice(start-6,end-6)).slice(4,6);
			if(binary6bits == "000000" && last2bitsFromPrevious == "00"){
				result = result +"=";
				continue;
			}
		}
		decimal = convertBinaryToDecimal(binary6bits);
		result = result + base64Alphabet[decimal];
		start = start +6;
		end = end + 6;
	}
	console.log("success, returning value...");
	return result;
}

/*** END BASE 64 ENCODING AND DECODING ***/

/*** START CONGRUENCE RELATIONSHIP ***/
function checkCongruence(){
	var input1 =0;
	var input2 =0;
	input1 = document.getElementById("input1").value;
	input2 = document.getElementById("input2").value;
	var module = document.getElementById("module").value;
	var exactMultiple = Math.abs(input2 - input1)%module;
	restInputADividedModule = input1%module;
	document.getElementById("output1").innerHTML = input1+" module "+module+" is "+restInputADividedModule;
	restInputBDividedModule = input2%module;
	document.getElementById("output2").innerHTML = input2+" module "+module+" is "+restInputBDividedModule;
	if(exactMultiple == 0){
		document.getElementById("output3").innerHTML =" "+ (input2/1)+" - "+(input1/1)+" is multiple of "+module; 
	}else{
		document.getElementById("output3").innerHTML =" "+ (input2/1)+" - "+(input1/1)+" is NOT multiple of "+module; 
	}
	if(restInputADividedModule == restInputBDividedModule && exactMultiple == 0){
		document.getElementById("output4").innerHTML = "CONGRUENCE IS TRUE";
		document.getElementById("output4").className = "flagTRUE";
	}else{
		document.getElementById("output4").innerHTML = "CONGRUENCE IS FALSE";
		document.getElementById("output4").className = "flagFALSE";
	}
}

/*** END CONGRUENCE RELATIONSHIP ***/





