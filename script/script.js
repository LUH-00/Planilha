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

    const numero = tableBody.rows.length;
    newRow.insertCell(0).innerText = numero;
    newRow.insertCell(1).innerText = status;
    newRow.insertCell(2).innerText = id;
    newRow.insertCell(3).innerText = cliente;
    newRow.insertCell(4).innerText = vencimento;
}

function adicionarLinhaFiltrada(numero, status, id, cliente, vencimento) {
    const filteredTableBody = document.getElementById('filteredTableBody');
    const newRow = filteredTableBody.insertRow();

    newRow.insertCell(0).innerText = numero;
    newRow.insertCell(1).innerText = status;
    newRow.insertCell(2).innerText = id;
    newRow.insertCell(3).innerText = cliente;
    newRow.insertCell(4).innerText = vencimento;
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
    const filtro = document.getElementById('filtroClientes').value.trim().toLowerCase();
    const nomesClientes = filtro.split('\n').map(nome => nome.trim());
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.getElementsByTagName('tr');

    const filteredTableBody = document.getElementById('filteredTableBody');
    filteredTableBody.innerHTML = ''; // Limpar a tabela filtrada antes de adicionar novas linhas

    const mensagem = document.getElementById('mensagem');
    mensagem.innerHTML = ''; // Limpar a mensagem anterior

    const mensagemClientesNaoEncontrados = document.getElementById('mensagemClientesNaoEncontrados');
    mensagemClientesNaoEncontrados.innerHTML = ''; // Limpar a mensagem de clientes não encontrados anterior

    let foundAny = false;
    let numero = 1;
    let clientesNaoEncontrados = [];

    for (let nomeCliente of nomesClientes) {
        let found = false;
        for (let row of rows) {
            const cells = row.getElementsByTagName('td');
            const clienteNome = cells[3].innerText.toLowerCase(); // Ajustar índice para clienteNome

            if (clienteNome.includes(nomeCliente)) {
                adicionarLinhaFiltrada(numero++, cells[1].innerText, cells[2].innerText, cells[3].innerText, cells[4].innerText);
                found = true;
                foundAny = true;
                break;
            }
        }
        if (!found) {
            clientesNaoEncontrados.push(nomeCliente);
        }
    }

    if (!foundAny) {
        mensagem.innerHTML = '<div class="alert alert-warning">Nenhum cliente encontrado com os nomes fornecidos.</div>';
    }

    if (clientesNaoEncontrados.length > 0) {
        mensagemClientesNaoEncontrados.innerHTML = `<div class="alert alert-info">Os seguintes clientes não foram encontrados: ${clientesNaoEncontrados.join(', ')}</div>`;
    }
}

function copiarTabelaFiltradaParaClipboard() {
    const filteredTableBody = document.getElementById('filteredTableBody');
    const rows = filteredTableBody.getElementsByTagName('tr');
    let dadosTabela = '';

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        dadosTabela += `${cells[1].innerText}\t${cells[2].innerText}\t${cells[3].innerText}\t${cells[4].innerText}\n`;
    }

    navigator.clipboard.writeText(dadosTabela).then(function() {
        alert('Dados da tabela copiados para a área de transferência.');
    }, function(err) {
        console.error('Falha ao copiar: ', err);
    });
}

// ---------------------filtro clientess --------------------
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
        const clienteCell = rows[j].getElementsByTagName('td')[3]; // Ajustar o índice para a coluna de clientes
        const clienteNome = clienteCell ? clienteCell.innerText.toLowerCase() : '';

        if (nomesClientes.includes(clienteNome)) { // Verificar se o nome do cliente está na lista de filtros
            // Adicionar linha à tabela filtrada
            const cells = rows[j].getElementsByTagName('td');
            adicionarLinhaFiltrada(cells[0].innerText, cells[1].innerText, cells[2].innerText, cells[3].innerText, cells[4].innerText); // Adicionar todas as células
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
