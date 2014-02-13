(function(doc){
	var Oculus, Markdown, Utils = {};
	var Variables = [];

	// Util.Shift taken from Pen: https://github.com/sofish/pen/
	Utils.shift = function(key, fn, time) {
		time = time || 50;
		var queue = this['_shift_fn' + key], timeout = 'shift_timeout' + key, current;
		if ( queue ) {
		  queue.concat([fn, time]);
		}
		else {
		  queue = [[fn, time]];
		}
		current = queue.pop();
		clearTimeout(this[timeout]);
		this[timeout] = setTimeout(function() {
		  current[0]();
		}, time);
	};

	Oculus = function(config)
	{
		if(!config)
		{
			console.log("Oculus: no configuration file was provided");
			return;
		}

		Markdown = new Showdown.converter({});

		Variables.elementName = config.elementName;
		Variables.element = doc.getElementById(Variables.elementName);

		var container = this.setupContainer(Variables.element);
		Variables.overlay = doc.getElementById(config.elementName + '-oculus-overlay'); 
		Variables.button = doc.getElementById(config.elementName + '-oculus-saveEdit'); 

		this.refreshOverlay(Variables.element, Variables.overlay);

		var that = this;
		Variables.button.addEventListener('mouseup', function(e) {
			that.toggleEditor(Variables.element, Variables.overlay, Variables.button);
		});

		Variables.element.addEventListener('keyup', function(e) {
			Utils.shift('refresh-overlay', function() { that.refreshOverlay(Variables.element, Variables.overlay)}, 200);
		});
	};

	Oculus.prototype.triggerRefresh = function() {
		this.refreshOverlay(Variables.element, Variables.overlay);
	};

	Oculus.prototype.setupContainer = function(element) {
		element.setAttribute('class', 'oculus-editor oculus-hidden');

		var container = doc.createElement('div');
		container.setAttribute('class', 'oculus-container');

		var parent = element.parentNode;
		parent.replaceChild(container, element);

		var saveEditButton = doc.createElement('div');
		saveEditButton.setAttribute('class', 'oculus-saveEdit');
		saveEditButton.setAttribute('id', config.elementName + '-oculus-saveEdit');
		saveEditButton.innerHTML = "Edit";

		container.appendChild(saveEditButton);
		container.appendChild(element);

		var overlay = doc.createElement('div');
		overlay.setAttribute('class', 'oculus-overlay full');
		overlay.setAttribute('id', config.elementName + '-oculus-overlay');
		container.appendChild(overlay);

		return container;
	};

	Oculus.prototype.refreshOverlay = function(element, overlay) {
		console.log("overlay has been refreshed");
		overlay.innerHTML = Markdown.makeHtml(element.value);
	};

	Oculus.prototype.toggleEditor = function(element, overlay, button)
	{
		console.log('toggling editor');
		if(element.classList.contains('oculus-hidden'))
		{
			element.setAttribute('class', 'oculus-editor');
			overlay.setAttribute('class', 'oculus-overlay');
			button.innerHTML = 'Save';
			
		} else {
			element.setAttribute('class', 'oculus-editor oculus-hidden');
			overlay.setAttribute('class', 'oculus-overlay full');
			button.innerHTML = 'Edit';
		}
	};

	this.Oculus = Oculus;
}(document)) 