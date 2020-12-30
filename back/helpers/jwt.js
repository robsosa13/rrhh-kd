var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'system32';

exports.createToken = function(usuario){
    var payload =  {
        // sub: user._id,
        // nombres: user.nombres,
        // apellidos: user.apellidos,
        // email: user.email,
        // role:user.role,
        // iat: moment().unix(),
        // exp: moment().add(30,'days').unix(),

        sub: usuario._id,
		email: usuario.email,
		password: usuario.password,
		numeroCel: usuario.numeroCel,
		estado: usuario.estado,
		id_tipoUsuario: usuario.id_tipoUsuario,
		nombre_tipo: usuario.nombre_tipo,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
    }
    return jwt.encode(payload,secret);
}
