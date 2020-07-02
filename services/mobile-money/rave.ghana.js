const morx = require('morx');
const q = require('q');

var spec = morx.spec()
	.build('currency', 'required:true, eg:GHS')
	.build('network', 'required:false, eg:MTN')
	.build('amount', 'required:true, eg:10')
	.build('phone_number', 'required:false, eg:08030930236')
	.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
	.build('fullname', 'required:false, eg:lawal')
	.build('client_ip', 'required:false, eg:127.0.0.1')
	.build('tx_ref', 'required:true, eg:FLW_y-443342')
	.build('meta', 'required:false')
	.build('device_fingerprint', 'required:false')
	.build('redirect_url', 'required:false')
	.build('payment_plan','required:false')
	.end();

function service(data, _rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {


			// params.public_key = _rave.getPublicKey();

			return _rave.request('/v3/charges?type=mobile_money_ghana', params)
		})
		.then(response => {




			d.resolve(response.body);

		})
		.catch(err => {

			d.reject(err);

		})

	return d.promise;



}
service.morxspc = spec;
module.exports = service;