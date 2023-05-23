let Grafo = () => {
	let vertices = [];
	let inserirAresta = (pai, id, peso) => {
		if (vertices[pai]) {
			vertices[pai].push({ id, peso });
		} else {
			vertices[pai] = [{ id, peso }];
		}
	};
	let getVertices = () => {
		return vertices;
	};
	let getLength = () => {
		return vertices.length;
	};
	let getArestas = (id) => {
		return vertices[id];
	};
	return { inserirAresta, getVertices, getLength, getArestas };
};

let grafo = Grafo();

var input = require("fs").readFileSync("entrada.txt", "utf8");
var lines = input.split("\r").join("").split("\n");

let line = lines.shift();
while (line) {
	let [origem, destino, peso] = line.split(" ").map((x) => parseInt(x));
	grafo.inserirAresta(origem, destino, peso);
	line = lines.shift();
}

const dijkstra = (grafo, s) => {
	let pai = [];
	let distancia = [];
	let distanciaPlot = []; // apenas pra melhorar o plot da arvore
	let relax = [];
	let len = grafo.getLength();

	// Inicialização
	for (let v = 0; v < len; v++) {
		pai[v] = null;
		relax[v] = false;
		distancia[v] = Infinity;
		distanciaPlot[v] = Infinity;
	}
	pai[s] = s;
	distancia[s] = 0;
	distanciaPlot[s] = 0;
	let filaID = [];
	let filaDist = [];
	let filaDistPlot = [];
	for (let v = 0; v < len; v++) {
		filaID.push(v);
		filaDist.push(distancia[v]);
		filaDistPlot.push(distanciaPlot[v]);
	}

	// Algoritmo
	while (filaID.length !== 0 && filaDist.length !== 0) {
		let aux = 0;
		for (let i = 1; i < len; i++) {
			if (filaDist[i] < filaDist[aux]) {
				aux = i;
			}
		}
		let u = filaID.splice(aux, 1)[0];
		let uDist = filaDist.splice(aux, 1)[0];

		if (uDist === Infinity) break;
		const arestas = grafo.getArestas(u);
		if (arestas) {
			arestas.forEach((w) => {
				if (!relax[w.id]) {
					if (distancia[w.id] > uDist + w.peso) {
						distancia[w.id] = uDist + w.peso;
						distanciaPlot[w.id] = w.peso;

						let index = filaID.indexOf(w.id);
						if (index !== -1) {
							filaDist[index] = distancia[w.id];
						}
						pai[w.id] = u;
					}
				}
			});
		}
		relax[u] = true;
	}

	// Formatar o pai no formato desejado
	const l = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const formattedPai = {};
	for (let i = 0; i < pai.length; i++) {
		if (pai[l[i]] === null) {
			formattedPai[l[i]] = null;
		} else {
			formattedPai[l[i]] = pai[i];
		}
	}

	return { pai: formattedPai, distancia, distanciaPlot };
};

console.log(grafo.getVertices());
console.log(dijkstra(grafo, 0));
