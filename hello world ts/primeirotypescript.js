//nomeDaVariavel:tipoDaVariavel
function enviarEmail(_a) {
    var email = _a.email, nome = _a.nome, telefone = _a.telefone;
    console.log("Ol\u00E1 " + nome + " seu email \u00E9 " + email + " e seu telefone \u00E9 " + telefone);
}
enviarEmail({
    email: "wagner@zup.com.br",
    nome: "Wagner"
});
