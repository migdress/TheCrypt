/* START Constants */
var base64Alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];
/* END Contants */
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

function convertToBinary(number){
	/*bin = [];
	var i = 0;
	var rest = 0;
	while(number>0){
		rest = number%2;
		bin[i] = rest;
		number = Math.floor(number/2);
		i++;
	}
	return parseInt(bin.toString());*/
	return number.toString(2);
}

function convertBinaryToDecimal(binary){
	stringNumber = binary.toString();
	return parseInt(binary, 2);
}

function convertCharCodeArrayTo8BinaryArray(array){
	var binArray = [];
	for(var i=0;i<array.length;i++){
		binArray[i] = complete8bits(convertToBinary(array[i]));
		console.log("converted index="+i+" "+binArray[i]);
	}
	return binArray.toString();	
}
function convertBinary8StringToBinary6Array(binary8String){
	var start = 0;
	var end = 6;
	var binary6bits = "";
	var result = [];
	var rest = binary8String.length % 24;
	console.log("Converting 8bit string to 6 bit string...");
	console.log("initial length = "+binary8String.length);
	console.log("rest = "+rest);
	if(rest!=0){
		for(var i=0;i<(24-rest);i++){
			binary8String = binary8String +"0";
		}
	}
	console.log("posterior length = "+binary8String.length);
	for(var i=0; i<(binary8String.length/6);i++){
		binary6bits = binary8String.slice(start,end);
		console.log(binary6bits);
		result[i] = binary6bits;
		start = start +6;
		end = end + 6;
	}
	return result;
}

function convertStringToCharCodeArray(string){
	stringArray = string.split("");
	charCodeArray = [];
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
	console.log("alphabet length: "+base64Alphabet.length);
	var start = 0;
	var end = 6;
	var binary6bits="";
	var result = [];
	var decimal = 0;
	var last2bitsFromPrevious = "";
	console.log("length of string: "+binary6String.length);

	for(var i=0; i<(binary6String.length/6);i++){
		binary6bits = binary6String.slice(start,end);
		console.log("from "+start+" to "+end+" group "+i+" :"+binary6bits+" length: "+binary6bits.length);
		if(i>0){
			last2bitsFromPrevious = (binary6String.slice(start-6,end-6)).slice(4,6);
			if(binary6bits == "000000" && last2bitsFromPrevious == "00"){
				result = result +"=";
				continue;
			}
		}
		decimal = convertBinaryToDecimal(binary6bits);
		console.log("decimal: "+decimal);
		result = result + base64Alphabet[decimal];
		console.log("base64 character: "+base64Alphabet[decimal]);
		start = start +6;
		end = end + 6;
	}
	return result;
}

/*** END BASE 64 ENCODING AND DECODING ***/







