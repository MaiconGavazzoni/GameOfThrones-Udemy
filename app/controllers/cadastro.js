module.exports.cadastro = function(application, req, res){
	res.render('cadastro', {validacao : {}, dadosForm : {}});
}

module.exports.cadastrar = function(application, req, res){
	//res.send('teste - vamos cadastrar');
	var dadosForm = req.body;
	// var dadosForm = {
	// 	nome: req.body.nome,
	// 	usuario: req.body.usuario,
	// 	senha: req.body.senha,
	// 	casa: req.body.casa
	// }

	req.assert('nome', 'Nome não pode ser vazio').notEmpty();
	req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
	req.assert('senha', 'Senha não pode ser vazio').notEmpty();
	req.assert('casa', 'Casa não pode ser vazio').notEmpty();

	var erros = req.validationErrors();
	if(erros){
		res.render('cadastro', {validacao : erros, dadosForm : dadosForm});
		return;
	}

	var connection = application.config.dbConnection;/*chamada da conexão para a variavel connection  */
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);/*passa a conexão como referência para o objeto  */
	var JogoDAO = new application.app.models.JogoDAO(connection);/*passa a conexão como referência para o objeto  */

	UsuariosDAO.inserirUsuario(dadosForm);
	JogoDAO.gerarParamentros(dadosForm.usuario);

	res.send('podemos cadastrar');
}