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
      .then((response) => response.json())
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
    } else {
      // insertList(inputId, inputMesa, inputResponsavel, inputPedido, inputObs, inputStatus, inputValor, inputData)
      postItem(inputMesa, inputResponsavel, inputPedido, inputObs, inputStatus, inputValor, inputData)
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
        cel.setAttribute('title', 'Editar Status');
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
            //data.menus.forEach(item => listaPedidos(item.cat_alimento, item.nome_alimento))
            
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

    // Crie um objeto para armazenar as categorias e os nomes dos alimentos
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
    Funções para carregar os itens no formulário de pedido à medida que vão sendo preenchidos
    --------------------------------------------------------------------------------------
 */

    // Seleção de mesa
    var selectMesa = document.getElementById('newMesa');
    // Adiciono um listener ao select
    selectMesa.addEventListener('change', function() {
      // Quando uma mesa é selecionada, removo o atributo disabled do select de responsável
      var selectResponsavel = document.getElementById('newResponsavel');
      selectResponsavel.removeAttribute("disabled");
    });

    // Seleção de responsável
    var selectResponsavel = document.getElementById('newResponsavel');
    // Adicione um ouvinte de evento ao select
    selectResponsavel.addEventListener('change', function() {
      // Quando um responsável é selecionado, removo o atributo disabled do select de categoria
      var selectCategoria = document.getElementById('newCatAlimento');
      selectCategoria.removeAttribute("disabled");
    });    

    // Seleção de categoria
    var selectCategoria = document.getElementById('newCatAlimento');
    // Adicione um ouvinte de evento ao select
    selectCategoria.addEventListener('change', function() {
      
        // Mapeamento de itens por categoria
        // Quando uma opção é selecionada, obtenho a lista correspondente de pedidos
        var pedidos = pedidosPorCategoria[this.value];

        // Obtenha uma referência ao elemento select do pedido
        var selectPedido = document.getElementById('newPedido');

        // Remova todas as opções existentes
        while (selectPedido.firstChild) {
          selectPedido.removeChild(selectPedido.firstChild);
        }

        var optionPadrao = document.createElement('option');
        selectPedido.appendChild(optionPadrao);
        optionPadrao.value = '';
        optionPadrao.textContent = 'Selecione o item';
        // Adicione uma opção para cada pedido
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
    // Adicione um ouvinte de evento ao select
    selectPedido.addEventListener('change', function() {
      
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
    // Adicione um ouvinte de evento ao select
    selectPedido.addEventListener('change', function() {
      // Quando uma opção é selecionada, preencho dinamicamente o campo de preço
      var inputValor = document.getElementById('newValor');

        // Altere o valor do input text
        inputValor.value = precosPorItem[this.value];
      });

  /*
    --------------------------------------------------------------------------------------
    Função para criar um select ao clicar sobre a coluna status
    --------------------------------------------------------------------------------------
  */

    // Obtenha uma referência à tabela
    var table2 = document.getElementById('myTable');

    // Adicione um ouvinte de evento click à tabela
    table2.addEventListener('click', function(event) {
      // Adiciono à célula a classe "em-edicao"
      event.target.classList.add('em-edicao');
      
      // Se o elemento clicado tem a classe 'editar-status', crie o select
      if (event.target.classList.contains('editar-status')) {
        // Crie um novo elemento select
        var select = document.createElement('select');
        // Defina as strings para as options
        var optionsText = ['', 'Aguardando', 'Em preparação', 'Concluído'];

        // Crie 3 options e adicione-os ao select
        for (var j = 0; j < optionsText.length; j++) {
          var option = document.createElement('option');
          option.value = optionsText[j];
          option.text = optionsText[j];
          select.appendChild(option);
        }

        // Adicione o select à célula td
        event.target.appendChild(select);
        
        // Crie um novo elemento button
        var button = document.createElement('button');
        // Defina o texto do botão
        button.textContent = 'Enviar';
        // Adicione a classe ao botão
        button.classList.add('btn-atualiza-status');
        // Obtenha o id do pedido
        var inputId = event.target.parentNode.cells[0].innerHTML;
        console.log(inputId)

        // Adicione um ouvinte de evento change ao select
        select.addEventListener('change', function() {
          // Obtenha o valor selecionado
          var novoStatus = this.value;
          console.log(novoStatus)
          // Chame a função para atualizar o status do pedido
          button.setAttribute('onclick', 'updateItemStatus(' + inputId + ', "' + novoStatus + '")');
        });

        event.target.appendChild(button);
      }

    });

  /*
  --------------------------------------------------------------------------------------
  Função para alterar o status de um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

    const updateItemStatus = (inputId, novoStatus) => {
      // Defina a URL e o corpo da requisição
      var url = 'http://127.0.0.1:5000/pedido?id=' + inputId;

      const formData = new FormData();
      formData.append('id', inputId);
      formData.append('status', novoStatus);

      // Envie a requisição PUT
      fetch(url, {
        method: 'put', 
        body: formData
      }).then(response => response.json())
        .then(data => console.log(data))
        .then(alert("Status atualizado!"))
        .then(location.reload())
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  /*
    --------------------------------------------------------------------------------------
    Função para controlar a visibilidade das abas no front end
    --------------------------------------------------------------------------------------
  */

    function openTab(event, item) {
      // Esconda todos os elementos com a classe "tabcontent"
      var tabcontent = document.getElementsByClassName("tabcontent");
      for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
    
      // Remova a classe "active" de todos os elementos com a classe "tablinks"
      var tablinks = document.getElementsByClassName("tablinks");
      for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
    
      // Mostre o elemento com o id igual ao item
      document.getElementById(item).style.display = "block";
    
      // Adicione a classe "active" ao botão que foi clicado
      event.currentTarget.className += " active";
    }