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
	var binaryString = convertCharCodeArrayToBinaryString(charCodeArray);
	document.getElementById("output2").innerHTML = binaryString;
	var base64String = convertBinaryStringToBase64String(binaryString.replace(/,/g,""));
	document.getElementById("output3").innerHTML = base64String;
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

function convertCharCodeArrayToBinaryString(array){
	var binArray = [];
	for(var i=0;i<array.length;i++){
		binArray[i] = complete8bits(convertToBinary(array[i]));
		console.log("converted index="+i+" "+binArray[i]);
	}
	return binArray.toString();	
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

function convertBinaryStringToBase64String(binaryString){
	var base64Alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];
	console.log("alphabet length: "+base64Alphabet.length);
	var start = 0;
	var end = 6;
	var binary6bits="";
	var result = "";
	var decimal = 0;
	var rest = binaryString.length % 6;
	console.log("initial length of string: "+binaryString.length);
	console.log("rest: "+rest);
	for(var i=0;i<rest;i++){
		binaryString = binaryString +"0";
	}
	console.log("posterior length of string: "+binaryString.length);
	for(var i=0; i<(binaryString.length/6);i++){
		binary6bits = binaryString.slice(start,end);
		console.log("from "+start+" to "+end+" group "+i+" :"+binary6bits+" length: "+binary6bits.length);
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






