(function(doc){
	var Oculus = {};

	Oculus = function(config)
	{
		if(!config)
		{
			console.log("Oculus: no configuration file was provided");
			return;
		}

		var elementName = config.elementName;
		var element = document.getElementById(elementName);

		element.innerHTML="someContent";
	};

	this.Oculus = Oculus;
}(document)) 