function HomeViewModel(data) {
	var self = this;

	// Get latest fakeItems
	self.latestItems = ko.computed(function() {
		return vm.availableItems().reverse().slice(0, 5);
	});

	self.filteredItems = ko.computed(function() {
		var filter = vm.filter().toLowerCase();
		if (!filter) {
			return [];
		} else {
			return ko.utils.arrayFilter(vm.availableItems(), function(item) {
				// Filter if name starts with filter
				// helpers.stringStartsWith(item.name.toLowerCase(), filter);
				// Filter if name contains filter
				return  item.name.indexOf(filter) !== -1;
			});
		}
	});

	$('#lastestItems').on('click', function(event) {
		var element = $(event.target),
		context = ko.contextFor(event.target);
		if(element.is('a') && context) {
			vm.addItemToCheckout(context.$data);
		}
	});
}