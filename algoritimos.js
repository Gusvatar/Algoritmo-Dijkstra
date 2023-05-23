function BFS(grafo, s) {
	const status = {};
	const dist = {};
	const pai = {};
	const vertices = Object.keys(grafo);

	vertices.forEach((u) => {
		status[u] = "Nao Visitado";
		dist[u] = Infinity;
		pai[u] = null;
	});

	status[s] = "Descoberto";
	dist[s] = 0;
	const fila = [s];

	while (fila.length > 0) {
		const u = fila[0];

		grafo[u].forEach((v) => {
			if (status[v] === "Nao Visitado") {
				status[v] = "Descoberto";
				dist[v] = dist[u] + 1;
				pai[v] = u;
				fila.push(v);
			}
		});

		status[u] = "Visitado";
		fila.shift();
	}

	return { status, dist, pai };
}

function DFS(grafo, s) {
	const visitados = {};
	const pai = {};
	function _dfs(u, p) {
		visitados[u] = true;
		pai[u] = p;
		grafo[u].forEach((v) => {
			if (!visitados[v]) {
				_dfs(v, u);
			}
		});
	}
	Object.keys(grafo).forEach((v) => {
		visitados[v] = false;
		pai[v] = null;
	});
	_dfs(s, null);
	return pai;
}

function DFS_pilha(grafo, s) {
	//cria dicionario
	const visitados = {};
	const pai = {};
	//define os valores iniciais deles
	Object.keys(grafo).forEach((v) => {
		visitados[v] = false;
		pai[v] = null;
	});

	const pilha = [s];
	while (pilha.length > 0) {
		const u = pilha.pop();
		if (!visitados[u]) {
			visitados[u] = true;
			grafo[u].forEach((v) => {
				if (!visitados[v]) {
					pai[v] = u;
					pilha.push(v);
				}
			});
		}
	}
	return pai;
}

module.exports = {
	BFS,
	DFS,
	DFS_pilha,
};
