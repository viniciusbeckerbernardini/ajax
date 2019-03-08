var pageCounter = 1;
var button = document.querySelector("#btn");
var response = document.querySelector("#animal-info");


button.addEventListener("click",()=>{
	var request = new XMLHttpRequest();

	request.open('GET','https://learnwebcode.github.io/json-example/animals-'+pageCounter+'.json');

	request.onload = function(){
		//Metodo que busca tudo como string
		//$data = request.responseText;
		if(request.status >= 200 && request.status <400){
			//Busca interpretando como JSON
			var data = JSON.parse(request.responseText);
			renderHTML(data);
		}else{
			console.log('CONNECTED TO THE SERVER, BUT, GOT AN ERROR');
		}
	};
	
	request.onerror = () => {
		console.log('CONNECTION ERROR');
	};

	request.send();
	pageCounter++;
	if(pageCounter > 3){
		button.classList.add("hide-me");
	}
});

function renderHTML(data){
	var htmlData = "";
	for(i = 0; i < data.length; i++){
		htmlData += "<p>" + data[i].name + " is a " + data[i].species +" that likes to eat ";
		for(ii = 0; ii < data[i].foods.likes.length; ii++){
			if (ii === 0) {
				htmlData += data[i].foods.likes[ii];
			}else{
				htmlData += ' and ' + data[i].foods.likes[ii];
			}
		}

		htmlData += ' and dislikes ';

		for(ii = 0; ii < data[i].foods.dislikes.length; ii++){
			if (ii === 0) {
				htmlData += data[i].foods.dislikes[ii];
			}else{
				htmlData += ' and ' + data[i].foods.dislikes[ii];
			}
		}

		htmlData += '.</p>';
	}

	response.insertAdjacentHTML('beforeend',htmlData);
}