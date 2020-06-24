
// Função para Pegar os textos digitados e fazer as validações
function autenticarUsuario(){
    var txtEmail = document.getElementById("txtEmail").value;
    var txtSenha = document.getElementById("txtSenha").value;

    var loginMensagem = {
        email : txtEmail,
        racf: txtEmail,
        senha: txtSenha
    }

    var cabecalho = {
        method : 'POST',
        body   : JSON.stringify(loginMensagem),
        headers : {
            'Content-type' : 'application/json'
        }
    }
    fetch("https://api-vlan-manager.herokuapp.com/login", cabecalho)
        .then(res => tratarResultado(res));     
}

// Função para Pegar os textos digitados e fazer as validações
function tratarResultado(res){
   if (res.status == 200) { // ok
       document.getElementById("erroMSG").innerHTML = "";
       res.json().then(res=>logarUsuario(res));
   }
   else if (res.status == 403){  // usuario valido, senha incorreta.
        alert("Insira os dados de acesso corretamente !");
        txtEmail.value = "";
        txtSenha.value = "";
   }
   else if (res.status == 404){  // usuario Inválido e zerar as caixas de texto
        alert("Login ou Senha incorretos, por favor tente novamente !!");
        txtEmail.value = "";
        txtSenha.value = "";
   }
}

// Função para Redirecionar a página
function logarUsuario(res){
    localStorage.setItem("userVlan",JSON.stringify(res));
    window.location="perfil.html";
}