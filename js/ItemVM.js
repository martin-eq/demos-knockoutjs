function Item(data) {
	var self = this,
		data = data || {};

	if(!data.id)
		throw Error('Missing id property on Item creation');

	self.id = ko.observable(data.id);
	self.name = ko.observable(data.name || '');

	self.itemUrl = ko.computed(function() {
		return '/detail.html?id=' + self.id();
	});
}