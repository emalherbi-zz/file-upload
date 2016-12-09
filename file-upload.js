function fileUpload(_callback) {
	if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
		alert('Seu navegador não tem suporte a arquivos.');
		return;
	}    
	var input = document.getElementById('NOMEDOINPUT');	
	if (!input.files) {
		alert("Seu navegador não tem suporte a arquivos.");
	}
	else if (input.files.length == 0 && $('#NOMEDOINPUT').val().length == 0) {
		alert("Selecione um arquivo para enviar!");               
	} 	
	else {
		for (var i=0, il=input.files.length; i<il; i++) {
			file = input.files[i];
			
			var xhr = new XMLHttpRequest();
			if (xhr.upload) {
				
				var arquivo = file.name;
				var type = arquivo.split('.')[1];
				
				var types = 'txt';
				if (types.indexOf(type) === -1) {
					alert("Somente são aceito as extensões: " + types + "."); 
					return false;	
				}
				
				xhr.onreadystatechange = function(e) {  
					console.log('onreadystatechange');
					if (xhr.readyState === 4) {  
						if (xhr.status === 200) {  
							console.log(xhr.responseText);  
							_callback();
						} else {  
							console.log("Error", xhr.statusText);  
						}  
					}  
				};
				
				xhr.addEventListener("load", function(e) {
					console.log('load');
				}, false);							
				
				xhr.upload.addEventListener("progress", function(e) {
					console.log('progress');
				}, false);						
				
				xhr.open("POST", 'file-upload.php', true);
				xhr.setRequestHeader("X-FILENAME", file.name);
				xhr.send(file);
			}
		};               		
	}				

	return false;  
}