// Helpers & Handlers
var helpers = (function() {
	var self = {};

	self.showAlert = function(msg) {
		vm.errorMessage(msg);
		$('.alert').show();
	};
	self.hideAlert = function() {
		vm.errorMessage('');
		$('.alert').hide();
	};

	self.sectionCache = {};
	self.viewModelCache = {};

	self.applySectionToDOM = function(sectionName, data) {
		var oldElement = document.getElementById('section');
		var element;
		if(self.sectionCache[sectionName]) {
			// Restore node reference from cache
			element = self.sectionCache[sectionName];
			oldElement.parentNode.replaceChild(element, oldElement);
			applySectionVmToNode(sectionName, element);
			return;
		}

		if(data) {
			element = oldElement.cloneNode(false);
			element.innerHTML = data;
			oldElement.parentNode.replaceChild(element, oldElement);
			// Apply section VM to section node
			applySectionVmToNode(sectionName, element);
			// Save node reference in cache
			self.sectionCache[sectionName] = element;
		}
	};

	function applySectionVmToNode(sectionName, node) {
		var sectionVM;
		// Restore VM reference from cache
		if(self.viewModelCache[sectionName]) {
			vm.chosenSectionVM(self.viewModelCache[sectionName]);
			return;
		}
		switch(sectionName) {
			case 'home':
			sectionVM = new HomeViewModel();
			break;
			case 'catalog':
			sectionVM = new CatalogViewModel();
			break;
			case 'checkout':
			sectionVM = new CheckoutViewModel();
			break;
		}
		if(sectionVM) {
			vm.chosenSectionVM(sectionVM);
			ko.applyBindings(sectionVM, node);
			// Save VM reference in cache
			self.viewModelCache[sectionName] = sectionVM;
		}
	}

	self.applySectionDataToVM = function(data) {
		if(data) {
			vm.chosenSectionData(data);
		}
	};

	self.setSelectedSection = function(sectionName) {
		$('.active').removeClass('active');
		$('#'+sectionName).addClass('active');
	};

	self.stringStartsWith = function(string, startsWith) {
		string = string || "";
		if (startsWith.length > string.length)
			return false;
		return string.substring(0, startsWith.length) === startsWith;
	};

	return self;
}());