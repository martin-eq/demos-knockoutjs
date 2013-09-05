function ViewModel(data) {
	var self = this;

	self.appName = 'Shopping Cart';
	self.pageName = '';

	self.menuButtons = [
	{
		name: 'Home',
		url: 'index.html'
	},
	{ 
		name: 'Catalog',
		url: 'catalog.html'
	},
	{
		name: 'Checkout',
		url: 'checkout.html'
	}
	];

	// Convert fakeItem's properties to observable properties
	self.availableItems = ko.observable(fakeItems);
	self.checkoutItems = ko.observableArray();
	// Get latest fakeItems
	self.latestItems = ko.observableArray(fakeItems.reverse().slice(0, 5));
	self.errorMessage = ko.observable('');
	self.filter = ko.observable('');


	self.checkoutCount = ko.computed(function() {
		return self.checkoutItems().length;
	});

	// Methods
	self.addItemToCheckout = function(newItem) {
		newItem = new Item(newItem);
		// Check if item exits
		var i, 
		item,
		found = false, 
		length = self.checkoutItems().length;
		for(i = 0; i < length; i+=1) {
			item = self.checkoutItems()[i];
			if(newItem.id() === item.id()) {
				self.showAlert('The item "'+ item.name() +'" already exists on cart');
				found = true;
				break;
			}
		}
		if(!found)
			self.checkoutItems.push(newItem);
	};

	self.filteredItems = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		if (!filter) {
			return [];
		} else {
			return ko.utils.arrayFilter(self.availableItems(), function(item) {
				// Filter if name starts with filter
				//stringStartsWith(item.name.toLowerCase(), filter);
				// Filter if name contains filter
				return  item.name.indexOf(filter) !== -1;
			});
		}
	});

	self.showAlert = function(msg) {
		self.errorMessage(msg);
		$('.alert').show();
	};
	self.hideAlert = function() {
		self.errorMessage('');
		$('.alert').hide();
	};

	var stringStartsWith = function (string, startsWith) {          
		string = string || "";
		if (startsWith.length > string.length)
			return false;
		return string.substring(0, startsWith.length) === startsWith;
	};
}