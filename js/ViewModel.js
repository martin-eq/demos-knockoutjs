function ViewModel(data) {
	var self = this;

	self.appName = 'Shopping Cart';

	// Convert fakeItem's properties to observable properties
	self.availableItems = ko.observableArray();
	self.checkoutItems = ko.observableArray();
	self.errorMessage = ko.observable('');
	self.filter = ko.observable('');


	self.checkoutCount = ko.computed(function() {
		return self.checkoutItems().length;
	});

	// Methods
	self.addItemToCheckout = function(newItem) {
		newItem = new Item(newItem);
		// Check if item exits
		var i 
		, item
		, found = false
		, length = self.checkoutItems().length;
		for(i = 0; i < length; i+=1) {
			item = self.checkoutItems()[i];
			if(newItem.id() === item.id()) {
				helpers.showAlert('The item "'+ item.name() +'" already exists on cart');
				found = true;
				break;
			}
		}
		if(!found)
			self.checkoutItems.push(newItem);
	};

	self.getAvailableItems = function() {
		$.getJSON('/availableItems').done(function(data) {
			if(data) {
				data = data || {};
				self.availableItems(data.availableItems);
			}
		});
	};

	// Get available items on page load
	self.getAvailableItems();

	self.chosenSectionName = ko.observable();
	self.chosenSectionData = ko.observable();
	self.chosenSectionVM = ko.observable();

	// Client-side routes    
    Sammy(function() {
        this.get('#/:section', function() {
        	var sectionName = this.params.section;
            self.chosenSectionName(sectionName);
            helpers.setSelectedSection(sectionName)
            $.get("/section", { name: sectionName }).done(helpers.applySectionToDOM);
            // TODO: Get data for every section
            //$.getJSON("/sectionData", { name: this.params.section }).done(helpers.applySectionDataToVM);
        });
    
        this.get('', function() { this.app.runRoute('get', '#/home') });
    }).run();
}