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

	self.applySectionToDOM = function(data) {
		if(data) {
			// TODO: Cache the sections nodes
			var oldElement = document.getElementById('section');
			var element = oldElement.cloneNode(false);
			element.innerHTML = data;
			oldElement.parentNode.replaceChild(element, oldElement);
			// Apply section VM to section node
			applySectionVmToNode(element);
		}
	}

	self.applySectionDataToVM = function(data) {
		if(data) {
			vm.chosenSectionData(data);
		}
	}

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

	function applySectionVmToNode(node) {
		var sectionVM
		  , sectionName = vm.chosenSectionName();
		// TODO: Cache VMs
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
		}
	}

	return self;
}());