const teams = [
  {
    id: 1,
    time: 'Imperial Strikers',
    categoria: 'futebol',
    status: 'confirmado',
    capitão: 'Carlos Silva',
    contato: 'carlos@imperial7.com.br',
    telefone: '(11) 98765-4321',
    valor: 'R$ 450,00',
    inscrição: '2026-04-05',
  },
  {
    id: 2,
    time: 'Dragões do Vôlei',
    categoria: 'volei',
    status: 'aguardando-pagamento',
    capitão: 'Mariana Santos',
    contato: 'mariana.santos@email.com',
    telefone: '(21) 99876-1234',
    valor: 'R$ 380,00',
    inscrição: '2026-04-09',
  },
  {
    id: 3,
    time: 'Basquete Royals',
    categoria: 'basquete',
    status: 'pendente',
    capitão: 'Pedro Oliveira',
    contato: 'pedro@royals.com',
    telefone: '(31) 91234-5678',
    valor: 'R$ 420,00',
    inscrição: '2026-04-11',
  },
  {
    id: 4,
    time: 'Fúria Imperial',
    categoria: 'futebol',
    status: 'confirmado',
    capitão: 'Luana Ferreira',
    contato: 'luana@furiatim.com',
    telefone: '(41) 98712-3456',
    valor: 'R$ 450,00',
    inscrição: '2026-04-12',
  },
];

const statusLabels = {
  confirmado: 'Confirmado',
  pendente: 'Pendente',
  'aguardando-pagamento': 'Aguardando pagamento',
};

const totalTeamsEl = document.querySelector('#totalTeams');
const validatedTeamsEl = document.querySelector('#validatedTeams');
const pendingTeamsEl = document.querySelector('#pendingTeams');
const paidTeamsEl = document.querySelector('#paidTeams');
const teamsTableBody = document.querySelector('#teamsTableBody');
const competitionTableBody = document.querySelector('#competitionTableBody');
const topScorersTableBody = document.querySelector('#topScorersTableBody');
const tableCount = document.querySelector('#tableCount');
const searchInput = document.querySelector('#searchInput');
const statusFilter = document.querySelector('#statusFilter');
const categoryFilter = document.querySelector('#categoryFilter');
const exportCsvBtn = document.querySelector('#exportCsvBtn');
const resetFiltersBtn = document.querySelector('#resetFiltersBtn');
const tabButtons = document.querySelectorAll('.tab-button');
const managementTab = document.querySelector('#managementTab');
const competitionTab = document.querySelector('#competitionTab');
const statsTotalTeams = document.querySelector('#statsTotalTeams');
const statsTotalConfirmed = document.querySelector('#statsTotalConfirmed');
const statsTotalPending = document.querySelector('#statsTotalPending');
const statsEstimatedRevenue = document.querySelector('#statsEstimatedRevenue');
const statsFutebol = document.querySelector('#statsFutebol');
const statsBasquete = document.querySelector('#statsBasquete');
const statsVolei = document.querySelector('#statsVolei');
const statsConfirmed = document.querySelector('#statsConfirmed');
const statsPending = document.querySelector('#statsPending');
const statsWaitingPayment = document.querySelector('#statsWaitingPayment');

function formatStatus(status) {
  const label = statusLabels[status] || status;
  return `<span class="status-pill status-${status}">${label}</span>`;
}

function updateSummary(filteredTeams) {
  const total = filteredTeams.length;
  const confirmed = filteredTeams.filter((team) => team.status === 'confirmado').length;
  const pending = filteredTeams.filter((team) => team.status === 'pendente').length;
  const paid = filteredTeams.filter((team) => team.status === 'confirmado').length;

  totalTeamsEl.textContent = total;
  validatedTeamsEl.textContent = confirmed;
  pendingTeamsEl.textContent = pending;
  paidTeamsEl.textContent = paid;
}

function renderTeams(filteredTeams) {
  teamsTableBody.innerHTML = '';

  if (filteredTeams.length === 0) {
    teamsTableBody.innerHTML = '<tr><td colspan="8">Nenhuma inscrição encontrada.</td></tr>';
    tableCount.textContent = '0 resultados';
    return;
  }

  filteredTeams.forEach((team) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${team.time}</td>
      <td>${team.categoria}</td>
      <td>${formatStatus(team.status)}</td>
      <td>${team.capitão}</td>
      <td>${team.contato}<br><small>${team.telefone}</small></td>
      <td>${team.valor}</td>
      <td>${team.inscrição}</td>
      <td>
        <button class="action-btn" data-action="validate" data-id="${team.id}">Validar</button>
        <button class="action-btn" data-action="paid" data-id="${team.id}">Pagar</button>
      </td>
    `;
    teamsTableBody.appendChild(row);
  });

  tableCount.textContent = `${filteredTeams.length} resultados`;
}

function getFilteredTeams() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const statusValue = statusFilter.value;
  const categoryValue = categoryFilter.value;

  return teams.filter((team) => {
    const matchesSearch =
      team.time.toLowerCase().includes(searchValue) ||
      team.capitão.toLowerCase().includes(searchValue) ||
      team.contato.toLowerCase().includes(searchValue);

    const matchesStatus = statusValue === 'all' || team.status === statusValue;
    const matchesCategory = categoryValue === 'all' || team.categoria === categoryValue;

    return matchesSearch && matchesStatus && matchesCategory;
  });
}

const competitionData = [
  {
    posicao: 1,
    time: 'Imperial Strikers',
    jogos: 8,
    vitorias: 6,
    empates: 1,
    derrotas: 1,
    golsPro: 18,
    golsContra: 7,
    saldo: 11,
    pontos: 19,
  },
  {
    posicao: 2,
    time: 'Fúria Imperial',
    jogos: 8,
    vitorias: 5,
    empates: 2,
    derrotas: 1,
    golsPro: 16,
    golsContra: 9,
    saldo: 7,
    pontos: 17,
  },
  {
    posicao: 3,
    time: 'Basquete Royals',
    jogos: 8,
    vitorias: 4,
    empates: 1,
    derrotas: 3,
    golsPro: 14,
    golsContra: 12,
    saldo: 2,
    pontos: 13,
  },
  {
    posicao: 4,
    time: 'Dragões do Vôlei',
    jogos: 8,
    vitorias: 3,
    empates: 2,
    derrotas: 3,
    golsPro: 12,
    golsContra: 13,
    saldo: -1,
    pontos: 11,
  },
];

const topScorersData = [
  { posicao: 1, atleta: 'Carlos Silva', time: 'Imperial Strikers', gols: 10 },
  { posicao: 2, atleta: 'Mariana Santos', time: 'Dragões do Vôlei', gols: 8 },
  { posicao: 3, atleta: 'Luana Ferreira', time: 'Fúria Imperial', gols: 7 },
  { posicao: 4, atleta: 'Pedro Oliveira', time: 'Basquete Royals', gols: 6 },
];

function computeStatistics() {
  const total = teams.length;
  const confirmed = teams.filter((team) => team.status === 'confirmado').length;
  const pending = teams.filter((team) => team.status === 'pendente').length;
  const waiting = teams.filter((team) => team.status === 'aguardando-pagamento').length;
  const byCategory = {
    futebol: teams.filter((team) => team.categoria === 'futebol').length,
    basquete: teams.filter((team) => team.categoria === 'basquete').length,
    volei: teams.filter((team) => team.categoria === 'volei').length,
  };
  const revenue = teams.reduce((sum, team) => {
    const numeric = Number(team.valor.replace(/[^0-9]/g, '')) / 100;
    return sum + numeric;
  }, 0);

  return {
    total,
    confirmed,
    pending,
    waiting,
    byCategory,
    revenue,
  };
}

function renderStatistics() {
  const stats = computeStatistics();
  statsTotalTeams.textContent = stats.total;
  statsTotalConfirmed.textContent = stats.confirmed;
  statsTotalPending.textContent = stats.pending;
  statsEstimatedRevenue.textContent = `R$ ${stats.revenue.toFixed(2).replace('.', ',')}`;
  statsFutebol.textContent = stats.byCategory.futebol;
  statsBasquete.textContent = stats.byCategory.basquete;
  statsVolei.textContent = stats.byCategory.volei;
  statsConfirmed.textContent = stats.confirmed;
  statsPending.textContent = stats.pending;
  statsWaitingPayment.textContent = stats.waiting;
}

function renderTopScorers() {
  topScorersTableBody.innerHTML = '';

  topScorersData.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.posicao}</td>
      <td>${item.atleta}</td>
      <td>${item.time}</td>
      <td>${item.gols}</td>
    `;
    topScorersTableBody.appendChild(row);
  });
}

function renderCompetition() {
  competitionTableBody.innerHTML = '';

  competitionData.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.posicao}</td>
      <td>${item.time}</td>
      <td>${item.jogos}</td>
      <td>${item.vitorias}</td>
      <td>${item.empates}</td>
      <td>${item.derrotas}</td>
      <td>${item.golsPro}</td>
      <td>${item.golsContra}</td>
      <td>${item.saldo}</td>
      <td>${item.pontos}</td>
    `;
    competitionTableBody.appendChild(row);
  });
  renderTopScorers();
}

function switchTab(tab) {
  tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tab);
  });
  managementTab.classList.toggle('active', tab === 'management');
  competitionTab.classList.toggle('active', tab === 'competition');
}

function refreshDashboard() {
  const filteredTeams = getFilteredTeams();
  updateSummary(filteredTeams);
  renderTeams(filteredTeams);
  renderStatistics();
}

function setTeamStatus(id, status) {
  const team = teams.find((item) => item.id === Number(id));
  if (!team) return;
  team.status = status;
  refreshDashboard();
}

function exportCsv() {
  const header = ['Time', 'Categoria', 'Status', 'Capitão', 'Contato', 'Telefone', 'Valor', 'Inscrição'];
  const lines = [header.join(',')];
  getFilteredTeams().forEach((team) => {
    const row = [
      team.time,
      team.categoria,
      statusLabels[team.status] || team.status,
      team.capitão,
      team.contato,
      team.telefone,
      team.valor,
      team.inscrição,
    ];
    lines.push(row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','));
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'inscricoes-imperial7.csv';
  link.click();
}

teamsTableBody.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const { action, id } = button.dataset;
  if (action === 'validate') {
    setTeamStatus(id, 'confirmado');
  }
  if (action === 'paid') {
    setTeamStatus(id, 'confirmado');
  }
});

searchInput.addEventListener('input', refreshDashboard);
statusFilter.addEventListener('change', refreshDashboard);
categoryFilter.addEventListener('change', refreshDashboard);
exportCsvBtn.addEventListener('click', exportCsv);
resetFiltersBtn.addEventListener('click', () => {
  searchInput.value = '';
  statusFilter.value = 'all';
  categoryFilter.value = 'all';
  refreshDashboard();
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    switchTab(button.dataset.tab);
    if (button.dataset.tab === 'competition') {
      renderCompetition();
    }
  });
});

refreshDashboard();
renderCompetition();
