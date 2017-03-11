function renderLeftPanel(){
	console.log("invoked");
	document.getElementById("leftPanel").innerHTML = 
		'<div class="lpHeaderContainer">'+
		'<a class="linkInvisible" href="index.html">'+
		'<div class="lpHeaderText">The Crypt</div>'+
		'</a>'+
		'<div class="lpHeaderSubtext" >'+
		'&copy; 2017, Miguel Morcillo<br>'+
		'miguelmorcillo@unicauca.edu.co<br>'+
		'<a class="linkContainer" href="http://linkedin.com/in/migdress" target="_blank">'+
		'<span class="spanLINKEDin">Linked</span><span class="spanLinkedIN">in</span>'+
		'</a>'+
		'</div>				'+
		'</div><br>'+
		'<a class="linkInvisible" href="index.html">'+
		'<div class="lpButton">'+
		'HOME'+
		'</div>'+
		'</a>'+
		'<a class="linkInvisible" href="index.html">'+
		'<div class="lpButton">'+
		'ABOUT'+
		'</div>'+
		'</a>	'+
		'<a class="linkInvisible" href="index.html">'+
		'<div class="lpButton">'+
		'THE THEORY'+
		'</div>'+
		'</a>'+
		'<a class="linkInvisible" href="index.html">'+
		'<div class="lpButton">'+
		'THE PRACTICE'+
		'</div>'+
		'</a>';

}
