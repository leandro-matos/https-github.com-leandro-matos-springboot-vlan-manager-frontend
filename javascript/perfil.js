
// Variáveis para pegar as Informações do Usuário
var infoDescricao  = 
    '<h3> {{NOME}} </h3>'+
    '<p> '+
    '<strong>RACF:</strong> {{RACF}} <br>'+
    '<strong>FUNCIONAL:</strong> {{FUNCIONAL}} <br>'+
    '<strong>EMAIL:</strong> {{EMAIL}} <br>'+
    '</p><hr>'+
    '<strong>DEPARTAMENTO:</strong> {{DEPARTAMENTO}} <br>'+
    '<strong>UNIDADE:</strong> {{UNIDADE}} <br>'+
    '<strong>VLAN:</strong> {{VLAN}} <br>'+
    '</p><hr>'+
    '<p> <STRONG> MÁQUINA: </STRONG> <br>'+
    '<STRONG>NUM. SÉRIE:</STRONG> {{NUMSERIE}} <br>'+
    '<STRONG>DESCRIÇÃO: </STRONG> {{DESCRICAO}} <br>'+
    '<STRONG>CONECTOR REDE:</STRONG> {{CONECTOR}} </p>'+
    '</p><hr>';

// Variáveis para pegar a foto do Usuário
var infoFoto = '<img src="images/{{FOTO}}" width="90%" height="90%"> ';

// Variáveis para pegar as solicitações abertas pelo usuário;
var infoSolicitacao = 
    '<div class="row">'+
        '<div class="col-md-12">'+
            '<STRONG> Data da Solicitação: </STRONG> {{DATA}} ' +
            '<STRONG> Antigo Departamento: </STRONG> {{ORIGEM}} ' +
            '<STRONG> Novo Departamento: </STRONG> {{DESTINO}} <br>' + 
            '<STRONG> Justificativa: </STRONG> {{JUSTIFICATIVA}} <br><hr><br>'
        '</div>'+
    '</div>';

    			  
// Exibir os dados do Usuário
function mostrarPerfil(){
    var userTxt = localStorage.getItem("userVlan");
    if (!userTxt){
        window.location = "login.html";
    }

    var user = JSON.parse(userTxt); // Texto convertido para objeto Javascript

    // fotoPerfil
    var strFoto = infoFoto.replace("{{FOTO}}",user.linkFoto);
    document.getElementById("fotoUser").innerHTML = strFoto;

    // Descrição do Usuário
    var strDescricao = infoDescricao.replace("{{NOME}}", user.nome)
        .replace("{{RACF}}", user.racf)
        .replace("{{FUNCIONAL}}", user.funcional)
        .replace("{{EMAIL}}", user.email)
        .replace("{{DEPARTAMENTO}}",user.departamento.nome)
        .replace("{{UNIDADE}}",user.departamento.unidade)
        .replace("{{VLAN}}",user.departamento.vlan)
        .replace("{{NUMSERIE}}",user.numSerie)
        .replace("{{DESCRICAO}}",user.descricao)
        .replace("{{CONECTOR}}",user.conectorRede);

    document.getElementById("bioUser").innerHTML = strDescricao;


    // Lista de Solicitações
    var strSolicitacao = "";
    for (i=0; i<user.solicitacoes.length; i++){
        var solic = user.solicitacoes[i]; 
        strSolicitacao = strSolicitacao + infoSolicitacao
        .replace("{{NUMSOL}}",solic.numero)              
        .replace("{{DATA}}", solic.dataSolicitacao)
		.replace("{{JUSTIFICATIVA}}", solic.justificativa)
        .replace("{{ORIGEM}}",solic.origem.nome)
        .replace("{{DESTINO}}",solic.destino.nome);
    }

    
    document.getElementById("listaSolicitacoes").innerHTML = '<STRONG>Total De Solicitações Atendidas: '
    + i + '</STRONG> <br><br><hr>' + strSolicitacao;
}

// Deslogar do Sistema
function logout(){
    localStorage.removeItem("userVlan");
    window.location = "index.html";
}
