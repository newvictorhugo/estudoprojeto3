import express from 'express';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta){
    // extrair os dados do corpo da requisição, além de validar os dados
    const dados = requisicao.body;
    let conteudoResposta = '';
    //é necessário validar os dados enviados
    //a validação dos dados é de responsabilidade da aplicação do servidor
    if(!(dados.nome && dados.sobrenome && dados.nomeUsuario && dados.cidade && dados.UF && dados.cep)){
        // estão faltando dados do usuário!
        conteudoResposta = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <title>Document</title>
        </head>
        <body>
            
            <div class="container">
                <form action="/cadastrarUsuario" method="post" class="row g-3 needs-validation" novalidate>
                    <fieldset class="border p-2">
                        <legend class="mb-3">Cadastro de Usuário</legend>
                        <div class="col-md-4">
                        <label for="" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nome" name="nome" required>
                        </div>
        `;
        if(!dados.nome){
            conteudoResposta+=`
                <div>
                    <p class="text-danger">Por favor, informe o nome</p>
                </div>
            `
        }
        conteudoResposta+=`
        <div class="col-md-4">
            <label for="sobrenome" class="form-label">Sobrenome</label>
            <input type="text" class="form-control" id="sobrenome" name="sobrenome" required>
        </div>
        `;
        if(!dados.sobrenome){
            conteudoResposta+=`
                <div>
                    <p class="text-danger">Por favor, informe o sobrenome</p>
                </div>
            `
        }
        conteudoResposta+=`
        <div class="col-md-4">
            <label for="nomeUsuario" class="form-label">Nome Usuário</label>
            <input type="text" class="form-control" id="nomeUsuario" name="nomeUsuario" aria-describedby="inputGroupPrepend" required>
        </div>
        `;
        if(!dados.nomeUsuario){
            conteudoResposta+=`
                <div>
                    <p class="text-danger">Por favor, informe o nome de usuario</p>
                </div>
            `
        }
        conteudoResposta+=`
        <div class="col-md-6">
            <label for="cidade" class="form-label">Cidade</label>
            <input type="text" class="form-control" id="cidade" name="cidade" required>
        </div>
        `;
        if(!dados.cidade){
            conteudoResposta+=`
                <div>
                    <p class="text-danger">Por favor, informe o nome da cidade</p>
                </div>
            `
        }
        conteudoResposta+=`
        <div class="col-md-3">
            <label for="uf" class="form-label">UF</label>
            <select class="form-select" id="UF" name="UF" required>
                <option selected disabled value="">Escolha um estado...</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
            </select>
        </div>
        `;
        if(!dados.UF){
            conteudoResposta+=`
                <div>
                    <p class="text-danger">Por favor, informe o nome da UF</p>
                </div>
            `
        }
        conteudoResposta+=`
        <div class="col-md-3">
            <label for="cep" class="form-label">CEP</label>
            <input type="text" class="form-control" id="cep" name="cep" required>
        </div>
        `;
        if(!dados.cep){
            conteudoResposta+=`
                <div>
                    <p class="text-danger">Por favor, informe o nome</p>
                </div>
            `
        }
        conteudoResposta+=`
                <div class="col-12 mt-2">
                        <button class="btn btn-primary" type="submit">Cadastrar</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </body>
        </html>
        `;
        resposta.end(conteudoResposta);
    }else{
    const usuario = {
                        nome: dados.nome,
                        sobrenome: dados.sobrenome,
                        nomeUsuario: dados.nomeUsuario,
                        cidade: dados.cidade,
                        UF: dados.UF,
                        cep: dados.cep
                    }
    //Adiciona um novo usuário na lista de usuários já cadastrados
    listaUsuarios.push(usuario);
    // returnar a lista de usuários
    let conteudoResposta =`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <title>Document</title>
        </head>
        <body>
            <h1>Lista de usuários cadastrados</h1>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Nome Usuário</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>CEP</th>
                    </tr>
                </thead>
                <tbody>`;
                for(const usuario of listaUsuarios){
                    conteudoResposta += `
                        <tr>
                            <td>${usuario.nome}</td>
                            <td>${usuario.sobrenome}</td>
                            <td>${usuario.nomeUsuario}</td>
                            <td>${usuario.cidade}</td>
                            <td>${usuario.UF}</td>
                            <td>${usuario.cep}</td>
                            
                        </tr>
                    `
                }

                conteudoResposta+=`
                </tbody>
            </table>
            <a class="btn btn-primary" href="/" role="button">Voltar para o menu</a>
            <a class="btn btn-primary" href="/cadastrarUsuario.html" role="button">Cadastrar usuario</a>
        </tbody>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </html>
                `;
    resposta.end(conteudoResposta);
    }//fim do if/else
}
const app = express();

//Indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'
app.use(express.static('./paginas'));

app.get('/', (requisicao, resposta) =>{
    resposta.end(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Menu do sistema</title>
    </head>
    <body>
        <h1>Menu</h1>
        <ul>
            <li><a href="/cadastrarUsuario.html"><button type="button" class="btn btn-primary">Primary</button></a></li>
        </ul>
    </body>
    </html>
    `)
})

// rota para processar o cadastro de usuários endpoint = '/cadastrarUsuario'

app.post('/cadastrarUsuario', processarCadastroUsuario);

app.listen(porta, host, () =>{
    console.log(`Servidor executando na URL http://${host}:${porta}`);
})