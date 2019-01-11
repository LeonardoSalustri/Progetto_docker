
			function getCookie(cname) {
			  var name = cname + "=";
			  var decodedCookie = decodeURIComponent(document.cookie);
			  var ca = decodedCookie.split(';');
			  for(var i = 0; i <ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
				  c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
				  return c.substring(name.length, c.length);
				}
			  }
			  return "";
			}



function prova(){
	//variabili user
	var nome=document.getElementById('nome');
	var nome1=document.getElementById('nome1');
	var cognome=document.getElementById('cognome');
	var città=document.getElementById('mail');
	var error = 0;
	var stampante='';
	var testo='';
	var r='';
	var t=0;
	if(!error){
		var msg =getCookie("id");
		var ws = new WebSocket("wss://localhost:4443/ws_profilo");
		ws.onopen = function(){
			ws.send(msg);
			var c=0;
			ws.onmessage = function(event){
				if(t===0){
					t=1;
					var messaggio=event.data;
					var resto='';
					var utente = JSON.parse(messaggio);
					var arr1=utente.fullname.split(' ');
					for (c=0; c<arr1.length;c++){
						if (c!=0){
							resto=resto+arr1[c]+' ';
						}
					}
					document.getElementById('nome').innerHTML=arr1[0]+' '+resto;
					document.getElementById('nome1').innerHTML=arr1[0];
					if (resto===''){
						resto='---------------';
					}
					document.getElementById('cognome').innerHTML=resto;
					document.getElementById('mail').innerHTML=utente.mail;
					document.getElementById('telephone').innerHTML=utente.telephone;
				}
				else{
					t=t+1;
					num_stamp = t-1;
					var messaggio=event.data;
					var stampante=JSON.parse(messaggio);
					var tipo=stampante.stampantetipo.split('_');
					var q='';
					for (c=0; c<tipo.length; c++){
						q=q+' '+tipo[c];
					}
					var testo=
						"<div role='tabpanel' class='description'><div class='tab-pane active'><div class='col-xs-12'>"+
								  "<div id='nome_stampante'><h2>"+stampante.stampantenome+"</h2></div>"+
									  "<div id='indirizzo'>indirizzo: "+stampante.varindirizzo+"</div>"+
									  "<div id='citta'>città: "+stampante.varcitta+"</div>"+
									  "<div id='email'>email: "+stampante.varemail+"</div>"+
									  "<div id='telefono'>telefono: "+stampante.vartelefono+"</div>"+
									  "<div id='tipo'>tipo stampante: "+q+"</div>"+
									  "<div id='id_stampante_"+String(num_stamp)+"'>id stampante: "+stampante.stampanteid+"</div>"+
									  "<div id='prezzo'>prezzo stampante: "+stampante.stampanteprezzo+"</div>"+
							  "<div><img id='printer' style='-webkit-user-select: none;cursor: zoom-in;' src='../html/immagini/Smart 3D Printer(800x600).png'width='400' height='400'></div>"+
								"<div><button onClick = remove_stampante('id_stampante_"+String(num_stamp)+"')>rimuovi</button></div>"+
							  "</div></div></div>";
					document.getElementById("stampa1").innerHTML = document.getElementById("stampa1").innerHTML+testo;	
				}
			};
	};
}
}
