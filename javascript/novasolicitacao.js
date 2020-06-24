
// Deslogar do Sistema
function logout(){
    localStorage.removeItem("userVlan");
    window.location = "index.html";
}

// Voltar a página anterior
function voltarPerfil(){
    window.location.replace("perfil.html");
}


function preencherDepartamentos(){
    fetch("https://api-vlan-manager.herokuapp.com/departamentos")
       .then(res => res.json())
       .then(res => criaOptions(res));
}


function criaOptions(res){
    var strOption = "";
    for (i=0;i<res.length; i++){
        strOption = strOption + 
              '<option value="'+res[i].id+'">'+res[i].nome+'/'+res[i].unidade+'</option>';
    }
    document.getElementById("txtNovoDepto").innerHTML = strOption;
}   

function enviarSolicitacao(){
    var txtData = document.getElementById("txtData").value;
    var txtJustificativa = document.getElementById("txtJustificativa").value;
    var txtNovoDepto = document.getElementById("txtNovoDepto").selectedOptions[0].value;
    var user = JSON.parse(localStorage.getItem("userVlan"));

    var mensagemSolicitacao = {
    dataSolicitacao : txtData,
    justificativa : txtJustificativa,
    comandoRoteador : "",
    solicitante : {
            id : user.id
        },
    origem : {
            id : user.departamento.id
        },
    destino : {
            id: parseInt(txtNovoDepto)
        }
    }

    var cabecalho = {
        method : 'POST',
        body : JSON.stringify(mensagemSolicitacao),
        headers : {
            'Content-type':'application/json'
        }
    }

    var valJustificativa = document.getElementById('txtJustificativa').value;
    
    if (/^\s*$/g.test(valJustificativa)) {
        alert('Por favor preencha a Justificativa!');

    } else {
        fetch("https://api-vlan-manager.herokuapp.com/solicitacoes/new", cabecalho)
            .then(res => res.json())
            .then(res => atualizaUser(res))
            .catch(err => alert("Por favor preencher corretamente todos os campos!"));
    }

}

// Atualiza e retorna a página de Perfil apenas com as informações do Login do Usuário logado
function atualizaUser(res){
    fetch("https://api-vlan-manager.herokuapp.com/usuario/"+res.solicitante.id)
       .then(resposta => resposta.json())
       .then(resposta => localStorage.setItem("userVlan",JSON.stringify(resposta)))
       .then(resposta => window.location="perfil.html")
       .catch(err => alert("Erro ao atualizar usuario"));
}