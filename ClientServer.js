var wsClient = function() {
	var Model, View, Controller;

	Model = {
		socket: null,
		connect: function(callback) {
			if (typeof socket == 'undefined' || socket.readyState == 3) {
				socket = new WebSocket($('#wsEndpoint').val());
				socket.onmessage = function(event) {
					callback(event.data);
				};
			}
		},
		disconnect: function() {
			if (typeof socket != 'undefined' && socket.readyState == 1) {
				socket.close();
			}
		}
	};

	View = {
		display: function(data) {
			$('#randomNums').append(data + ' ');
		}
	};

	Controller = {
		socket: null,
		start: function() {
			Model.connect(View.display);
		},
		stop: function() {
			Model.disconnect();
		},
		init: function() {
			setTimeout(function() {
				$('#startButton').on('click', Controller.start);
				$('#stopButton').on('click', Controller.stop);
			}, 1000);
		}
	};

	return {
		init: Controller.init
	};
};
