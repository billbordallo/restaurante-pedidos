/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/pedidos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.pedidos.length != 0) {
        document.getElementById("nenhumPedido").style.display = "none";
      }
      data.pedidos.forEach(item => insertList(item.id, item.mesa, item.responsavel, item.pedido, item.obs, item.status, item.valor, item.data_insercao))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()

/*
--------------------------------------------------------------------------------------
Função para colocar um item na lista do servidor via requisição POST
--------------------------------------------------------------------------------------
*/
const postItem = async (inputMesa, inputResponsavel, inputPedido, inputObs, inputStatus, inputValor, inputData) => {
  const formData = new FormData();
  formData.append('mesa', inputMesa);
  formData.append('responsavel', inputResponsavel);
  formData.append('pedido', inputPedido);
  formData.append('obs', inputObs);
  formData.append('status', inputStatus);
  formData.append('valor', inputValor);
  formData.append('data_insercao', inputData);

  let url = 'http://127.0.0.1:5000/pedido';
  fetch(url, {
    method: 'post',
    body: formData
  })
    //.then((response) => response.json()
    .then((response) => {
      console.log(response)
        if (response.status === 200) {
          response.json()
        }
        if (!response.ok) {
            return response.json().then(errorData => {
                console.log(errorData)
                alert(errorData.mesage);
            });
        }
        if (response.status === 409) {
            return response.json().then(errorData => {
                console.log(errorData)
                alert('Error 409: ' + errorData.mesage);
            });
        }
        if (response.status === 422) {
          return response.json().then(errorData => {
              console.log(errorData)
              alert('Error 422: ' + errorData.mesage);
          });
      }
    }
    )
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  span.setAttribute('title', 'Remover pedido');
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
        // Atualizo a página para carregar os dados atualizados no banco de dados
        location.reload();
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/pedido?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo pedido na lista do restaurante 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputMesa = document.getElementById("newMesa").value;
  let inputResponsavel = document.getElementById("newResponsavel").value;
  let inputPedido = document.getElementById("newPedido").value;
  let inputObs = document.getElementById("newObs").value;
  let inputStatus = document.getElementById("newStatus").value;
  let inputValor = document.getElementById("newValor").value;
  let inputData = document.getElementById("newData").value;

  if (inputMesa === '') {
    alert("Selecione a mesa");
  } else if (inputResponsavel === '') {
    alert("Selecione o responsável");
  } else if (inputPedido === '') {
    alert("Selecione o item");
  } else {
    postItem(inputMesa, inputResponsavel, inputPedido, inputObs, inputStatus, inputValor, inputData)
    // Atualizo a página para carregar os dados atualizados no banco de dados
    location.reload();
    alert("Item adicionado!")
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (id, mesa, responsavel, pedido, obs, status, valor, dataInsercao) => {
  var item = [id, mesa, responsavel, pedido, obs, status, valor, dataInsercao]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
    // Na sexta coluna de cada linha, adiciono a indicação para editar o status do pedido
    if (i === 5) {
      cel.setAttribute('title', 'Clique para editar o status do pedido');
      cel.setAttribute('class', 'editar-status');
    }
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newMesa").value = "";
  document.getElementById("newResponsavel").value = "";
  document.getElementById("newPedido").value = "";
  document.getElementById("newObs").value = "";
  document.getElementById("newStatus").value = "";
  document.getElementById("newValor").value = "";
  document.getElementById("newData").value = "";

  removeElement()
}


// Funções para interagir com o cardápio (menu) do restaurante

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getMenuList = async () => {
  let url = 'http://127.0.0.1:5000/cardapio';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.menus.forEach(item => insertMenu(item.id, item.nome_alimento, item.cat_alimento, item.desc_alimento, item.preco))
      data.menus.forEach(item => insertNewCatAlimento(item.cat_alimento))

    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/

getMenuList()

/*
  --------------------------------------------------------------------------------------
  Função carregar o cardápio (menu) do restaurante
  --------------------------------------------------------------------------------------
*/
const insertMenu = (id, nome_alimento, cat_alimento, desc_alimento, preco) => {
  var itemMenu = [id, nome_alimento, cat_alimento, desc_alimento, preco]
  var tableMenu = document.getElementById('menuTable');
  var rowMenu = tableMenu.insertRow();

  for (var i = 0; i < itemMenu.length; i++) {
    var cel = rowMenu.insertCell(i);
    cel.textContent = itemMenu[i];
  }

  removeElement()
}

/*
  --------------------------------------------------------------------------------------
  Função carregar as categorias de alimentos na seleção de pedidos
  --------------------------------------------------------------------------------------
*/
const insertNewCatAlimento = (cat_alimento) => {
  var categoriaAlimento = document.getElementById('newCatAlimento');

  // Verifique se a opção já existe
  for (var i = 0; i < categoriaAlimento.options.length; i++) {
    if (categoriaAlimento.options[i].value === cat_alimento) {
      // A opção já existe, então retorne para sair da função
      return;
    }
  }

  // Se chegamos aqui, a opção não existe, então a criamos e a adicionamos
  var option = document.createElement('option');
  option.value = cat_alimento;
  option.textContent = cat_alimento;
  categoriaAlimento.appendChild(option);
}

/*
  --------------------------------------------------------------------------------------
  Função carregar dinamicamente os itens do cardápio (menu) e preços na seleção de pedidos
  --------------------------------------------------------------------------------------
*/

const getListPedidos = async () => {
  let url = 'http://127.0.0.1:5000/cardapio';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.menus.forEach(item => listaPedidos(item.nome_alimento, item.cat_alimento))
      data.menus.forEach(item => listaPrecos(item.nome_alimento, item.preco))

    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
getListPedidos();

// Crio um objeto para armazenar as categorias e os nomes dos alimentos
var pedidosPorCategoria = {};

const listaPedidos = (nome_alimento, cat_alimento) => {

  // Se a categoria ainda não existe no objeto, crie-a
  if (!pedidosPorCategoria[cat_alimento]) {
    pedidosPorCategoria[cat_alimento] = [];
  }

  // Adicione o nome do alimento à categoria correspondente
  pedidosPorCategoria[cat_alimento].push(nome_alimento);

}

// Crio um objeto para armazenar os preços dos alimentos
var precosPorItem = {};

const listaPrecos = (nome_alimento, preco_alimento) => {

  // Se a categoria ainda não existe no objeto, crie-a
  if (!precosPorItem[nome_alimento]) {
    precosPorItem[nome_alimento] = [];
  }

  // Adicione o nome do alimento à categoria correspondente
  precosPorItem[nome_alimento].push(preco_alimento);

}

/*
  --------------------------------------------------------------------------------------
  Funções para carregar os itens no formulário de pedidos à medida que vão sendo preenchidos
  --------------------------------------------------------------------------------------
*/

// Seleção de mesa
var selectMesa = document.getElementById('newMesa');
// Adiciono um listener ao select
selectMesa.addEventListener('change', function () {
  // Quando uma mesa é selecionada, removo o atributo disabled do select de responsável
  var selectResponsavel = document.getElementById('newResponsavel');
  selectResponsavel.removeAttribute("disabled");
});

// Seleção de responsável
var selectResponsavel = document.getElementById('newResponsavel');
// Adiciono um listener ao select
selectResponsavel.addEventListener('change', function () {
  // Quando um responsável é selecionado, removo o atributo disabled do select de categoria
  var selectCategoria = document.getElementById('newCatAlimento');
  selectCategoria.removeAttribute("disabled");
});

// Seleção de categoria
var selectCategoria = document.getElementById('newCatAlimento');
// Adiciono um listener ao select
selectCategoria.addEventListener('change', function () {

  // Mapeamento de itens por categoria
  // Quando uma opção é selecionada, obtenho a lista correspondente de pedidos
  var pedidos = pedidosPorCategoria[this.value];

  // Obtenho uma referência ao elemento select do pedido
  var selectPedido = document.getElementById('newPedido');

  // Removo todas as opções existentes
  while (selectPedido.firstChild) {
    selectPedido.removeChild(selectPedido.firstChild);
  }

  var optionPadrao = document.createElement('option');
  selectPedido.appendChild(optionPadrao);
  optionPadrao.value = '';
  optionPadrao.textContent = 'Selecione o item';
  // Adiciono uma opção para cada pedido
  for (var i = 0; i < pedidos.length; i++) {
    var option = document.createElement('option');
    option.value = pedidos[i];
    option.textContent = pedidos[i];
    selectPedido.appendChild(option);
  }

  // Quando uma categoria é selecionada, removo o atributo disabled do select de pedido
  var selectPedido = document.getElementById('newPedido');
  selectPedido.removeAttribute("disabled");
});

// Seleção de pedido
var selectPedido = document.getElementById('selectPedido');
// Adiciono um listener ao select
selectPedido.addEventListener('change', function () {

  // Quando um pedido é selecionado, removo o atributo disabled do input de observação
  var inputObs = document.getElementById('newObs');
  inputObs.removeAttribute("disabled");
  // O mesmo para os campos status e preço
  var inputStatus = document.getElementById('newStatus');
  inputStatus.removeAttribute("disabled");
  // Aqui, seleciono o status padrão de qualquer pedido que entra no sistema ("Aguardando")
  inputStatus.selectedIndex = 0;

  var inputValor = document.getElementById('newValor');
  inputValor.removeAttribute("disabled");
});


var selectPedido = document.getElementById('newPedido');
// Adiciono um listener ao select
selectPedido.addEventListener('change', function () {
  // Quando uma opção é selecionada, preencho dinamicamente o campo de preço
  var inputValor = document.getElementById('newValor');

  // Altero o valor do input text para exibir o preço do item selecionado
  inputValor.value = precosPorItem[this.value];
});

/*
  --------------------------------------------------------------------------------------
  Função para criar um select ao clicar sobre a coluna status
  --------------------------------------------------------------------------------------
*/

// Obtenho uma referência à tabela
var table2 = document.getElementById('myTable');

// Adiciono um listener de clique à tabela
table2.addEventListener('click', function (event) {

  // Se o elemento clicado é uma célula td
  if (event.target.nodeName === 'TD') {

    // Se a célula clicada é a sexta célula da linha (pois é a única coluna que pode ser editada)
    if (event.target.cellIndex === 5) {

      // Adiciono à célula a classe "em-edicao"
      event.target.classList.add('em-edicao');

      // Removo o conteúdo de texto da célula
      event.target.textContent = '';

      // Se o elemento clicado tem a classe 'editar-status' (inserida via css), crie o select
      if (event.target.classList.contains('editar-status')) {

        // Crio um novo elemento select
        var select = document.createElement('select');

        // Defino as options que serão usadas no select
        var optionsText = ['', 'Aguardando', 'Em preparação', 'Concluído'];

        // Crio 3 options e as adiciono ao select
        for (var j = 0; j < optionsText.length; j++) {
          var option = document.createElement('option');
          option.value = optionsText[j];
          option.text = optionsText[j];
          select.appendChild(option);
        }

        // Adiciono o select à célula td
        event.target.appendChild(select);

        // Crie um novo elemento button
        var button = document.createElement('button');

        // Defino o texto do botão
        button.textContent = 'Enviar';

        // Adiciono uma classe ao botão Enviar
        button.classList.add('btn-atualiza-status');

        // Obtenho o id do pedido (primeira célula da linha)
        var inputId = event.target.parentNode.cells[0].innerHTML;

        // Adiciono um listener ao select
        select.addEventListener('change', function () {

          // Obtenho o valor selecionado
          var novoStatus = this.value;

          // Insiro um atributo "onclick" para disparar a atualização de status do pedido após o envio, com os parâmetros necessários (id e novo status)
          button.setAttribute('onclick', 'updateItemStatus(' + inputId + ', "' + novoStatus + '")');
        });

        // Adiciono o botão à célula
        event.target.appendChild(button);
      }
    }
  }

});

/*
--------------------------------------------------------------------------------------
Função para alterar o status de um item na lista do servidor via requisição PUT
--------------------------------------------------------------------------------------
*/

const updateItemStatus = (inputId, novoStatus) => {

  if (novoStatus === '') {
    alert("Selecione o status");
  } else {

    // Defino a URL e o corpo da requisição
    var url = 'http://127.0.0.1:5000/pedido?id=' + inputId;

    const formData = new FormData();
    formData.append('id', inputId);
    formData.append('status', novoStatus);

    // Envio a requisição PUT
    fetch(url, {
      method: 'put',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .then(alert("Status atualizado!"))
      // Atualizo a página para carregar os dados atualizados no banco de dados
      .then(location.reload())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para controlar a visibilidade das abas no front end
  --------------------------------------------------------------------------------------
*/

function openTab(event, item) {
  // Escondo todos os elementos com a classe "tabcontent"
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Removo a classe "active" de todos os elementos com a classe "tablinks"
  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Exibo o elemento com o id igual ao item
  document.getElementById(item).style.display = "block";

  // Adiciono a classe "active" ao botão que foi clicado
  event.currentTarget.className += " active";
}