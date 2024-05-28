document.addEventListener('DOMContentLoaded', (event) => {
    const tableBody = document.getElementById('tableBody');
  
    // Adicionar algumas linhas de exemplo
    const exemploDados = [
        // { status: 'Ativo', id: 1, cliente: 'Cliente A', vencimento: '15' },
        // { status: 'Inativo', id: 2, cliente: 'Cliente B', vencimento: '10' },
        // { status: 'Ativo', id: 3, cliente: 'Cliente C', vencimento: '20' },
        // { status: 'Ativo', id: 4, cliente: 'Cliente D', vencimento: '25' },
    ];
  
    exemploDados.forEach(dado => {
        adicionarLinha(dado.status, dado.id, dado.cliente, dado.vencimento);
    });
  });
  
  function adicionarLinha(status, id, cliente, vencimento) {
    const tableBody = document.getElementById('tableBody');
    const newRow = tableBody.insertRow();
  
    newRow.insertCell(0).innerText = status;
    newRow.insertCell(1).innerText = id;
    newRow.insertCell(2).innerText = cliente;
    newRow.insertCell(3).innerText = vencimento;
  }
  
  function adicionarLinhaFiltrada(status, id, cliente, vencimento) {
    const filteredTableBody = document.getElementById('filteredTableBody');
    const newRow = filteredTableBody.insertRow();
  
    newRow.insertCell(0).innerText = status;
    newRow.insertCell(1).innerText = id;
    newRow.insertCell(2).innerText = cliente;
    newRow.insertCell(3).innerText = vencimento;
  }
  
  function adicionarMultiplasLinhas() {
    const statusAcesso = document.getElementById('statusAcesso').value.trim().split('\n');
    const ids = document.getElementById('ids').value.trim().split('\n');
    const clientes = document.getElementById('clientes').value.trim().split('\n');
    const diasVencimento = document.getElementById('diasVencimento').value.trim().split('\n');
  
    const maxLength = Math.max(statusAcesso.length, ids.length, clientes.length, diasVencimento.length);
  
    for (let i = 0; i < maxLength; i++) {
        const status = statusAcesso[i] || '';
        const id = ids[i] || '';
        const cliente = clientes[i] || '';
        const vencimento = diasVencimento[i] || '';
        adicionarLinha(status, id, cliente, vencimento);
    }
  
    // Limpar os campos após adicionar as linhas
    document.getElementById('statusAcesso').value = '';
    document.getElementById('ids').value = '';
    document.getElementById('clientes').value = '';
    document.getElementById('diasVencimento').value = '';
  }
  
  function filtrarClientes() {
    const filtro = document.getElementById('filtroClientes').value.toLowerCase();
    const nomesClientes = filtro.split('\n').map(nome => nome.trim());
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.getElementsByTagName('tr');
  
    const filteredTableBody = document.getElementById('filteredTableBody');
    filteredTableBody.innerHTML = ''; // Limpar a tabela filtrada antes de adicionar novas linhas
  
    const mensagem = document.getElementById('mensagem');
    mensagem.innerHTML = ''; // Limpar a mensagem anterior
  
    let foundAny = false;
  
    for (let i = 0; i < nomesClientes.length; i++) {
        const nomeCliente = nomesClientes[i];
        let found = false;
  
        for (let j = 0; j < rows.length; j++) {
            const clienteCell = rows[j].getElementsByTagName('td')[2];
            const clienteNome = clienteCell ? clienteCell.innerText.toLowerCase() : '';
  
            if (clienteNome.includes(nomeCliente)) {
                // Adicionar linha à tabela filtrada
                const cells = rows[j].getElementsByTagName('td');
                adicionarLinhaFiltrada(cells[0].innerText, cells[1].innerText, cells[2].innerText, cells[3].innerText);
                found = true;
                foundAny = true;
            }
        }
  
        if (!found) {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-warning';
            alertDiv.innerText = `Cliente '${nomeCliente}' não encontrado.`;
            mensagem.appendChild(alertDiv);
        }
    }
  
    if (!foundAny) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-info';
        alertDiv.innerText = 'Nenhum cliente encontrado.';
        mensagem.appendChild(alertDiv);
    }
  }
  
  function filtrarClientes() {
    const filtro = document.getElementById('filtroClientes').value.trim().toLowerCase(); // Corrigir a conversão para minúsculas
    const nomesClientes = filtro.split('\n').map(nome => nome.trim());
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.getElementsByTagName('tr');

    const filteredTableBody = document.getElementById('filteredTableBody');
    filteredTableBody.innerHTML = ''; // Limpar a tabela filtrada antes de adicionar novas linhas

    const mensagem = document.getElementById('mensagem');
    mensagem.innerHTML = ''; // Limpar a mensagem anterior

    let foundAny = false;

    for (let j = 0; j < rows.length; j++) { // Remover o loop externo, apenas percorrer as linhas uma vez é suficiente
        const clienteCell = rows[j].getElementsByTagName('td')[2];
        const clienteNome = clienteCell ? clienteCell.innerText.toLowerCase() : '';

        if (nomesClientes.includes(clienteNome)) { // Verificar se o nome do cliente está na lista de filtros
            // Adicionar linha à tabela filtrada
            const cells = rows[j].getElementsByTagName('td');
            adicionarLinhaFiltrada(cells[0].innerText, cells[1].innerText, cells[2].innerText, cells[3].innerText);
            foundAny = true;
        }
    }

    if (!foundAny) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-info';
        alertDiv.innerText = 'Nenhum cliente encontrado.';
        mensagem.appendChild(alertDiv);
    }
}

// copiar separadamente as planilha de clientes filtrados 
function copiarTabelaFiltradaParaClipboard() {
  const filteredTableBody = document.getElementById('filteredTableBody');
  const rows = filteredTableBody.getElementsByTagName('tr');
  const dadosTabela = [];

  // Iterar sobre as linhas da tabela filtrada
  for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      const dadosLinha = [];
      
      // Iterar sobre as células da linha atual
      for (let j = 0; j < cells.length; j++) {
          dadosLinha.push(cells[j].innerText);
      }

      // Juntar os dados da linha em uma string, separados por tabulação
      dadosTabela.push(dadosLinha.join('\t'));
  }

  // Juntar todas as linhas da tabela em uma única string, separadas por quebra de linha
  const dadosTabelaTexto = dadosTabela.join('\n');

  // Copiar os dados da tabela para a área de transferência
  navigator.clipboard.writeText(dadosTabelaTexto).then(function() {
      alert('Dados da tabela copiados para a área de transferência.');
  }, function(err) {
      console.error('Falha ao copiar: ', err);
  });
}

function copiarTabelaFiltradaParaClipboard() {
  const filteredTableBody = document.getElementById('filteredTableBody');
  const rows = filteredTableBody.getElementsByTagName('tr');
  let dadosTabela = '';

  // Iterar sobre as linhas da tabela filtrada
  for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      
      // Iterar sobre as células da linha atual
      for (let j = 0; j < cells.length; j++) {
          // Adicionar o texto da célula à string de dados da tabela
          dadosTabela += cells[j].innerText + '\t';
      }

      // Adicionar quebra de linha após cada linha da tabela
      dadosTabela += '\n';
  }

  // Copiar os dados da tabela para a área de transferência
  navigator.clipboard.writeText(dadosTabela).then(function() {
      alert('Dados da tabela copiados para a área de transferência.');
  }, function(err) {
      console.error('Falha ao copiar: ', err);
  });
}
