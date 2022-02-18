const renderArrayToTemplate = async (array, template) => {
	const val = await Promise.all(array.map(async entry => template(entry)));
	return val.join("").replace(/\t|\n/g, "");
}

const templates = {
	nav: item => `<div id="${item.normalized}" class="w3-bar-item w3-button nav">${item.name}</div>`,
	github: `<div class="w3-bar-item w3-button nav w3-right"><a href="https://github.com/gerejoik/gerejoik.github.io/">GitHub</a></div>`,
	sidenav: key => `<li id="${key}" class="sidenav">${key}`,
	battlesTable: {
		head: name => `
			<tr>
				<th colspan=3>${name}`,
		row: item => `
			<tr>
				<td class="w3-text-${item.color[0]}">
					${item.tn1}
					${item.hr1 || item.rr2 ? "<br>" : ""}
					${item.hr1 ? `<a href="${item.hr1}">HR1</a>` : ""}
					${item.rr2 ? ` <a href="${item.rr2}">RR2</a>` : ""}
				<td class="battle" id="battle-${item.id}">vs.
					${item.ergebnis ? `<br>${item.ergebnis}` : ""}
				<td class="w3-text-${item.color[1]}">
					${item.tn2}
					${item.hr2 || item.rr1 ? "<br>" : ""}
					${item.hr2 ? `<a href="${item.hr2}">HR2</a>` : ""}
					${item.rr1 ? ` <a href="${item.rr1}">RR1</a>` : ""}`
	},
	battle: item => `
		<div style="display:grid">
			<div style="grid-column: 1; grid-row: 1; text-align:center;">
				${item.tn1}
			</div>
			<div style="grid-column: 2; grid-row: 1;">
				vs.
			</div>
			<div style="grid-column: 3; grid-row: 1; text-align:center;">
				${item.tn2}
			</div>
			<div style="grid-column: 1; grid-row: 2;">
				${item.hr1 ? `<iframe src="${item.hr1}"></iframe>` : ""}
			</div>
			<div style="grid-column: 3; grid-row: 2;">
				${item.hr2 ? `<iframe src="${item.hr2}"></iframe>` : ""}
			</div>
			<div style="grid-column: 1; grid-row: 3;">
				${item.rr2 ? `<iframe src="${item.rr2}"></iframe>` : ""}
			</div>
			<div style="grid-column: 3; grid-row: 3;">
				${item.rr1 ? `<iframe src="${item.rr1}"></iframe>` : ""}
			</div>
		</div>
	`
}

const loadBasicSite = async() => {
	let data = await fetch("data.json");
	data = await data.json();
	document.querySelector("#nav").innerHTML = await renderArrayToTemplate(data, templates.nav);
	document.querySelectorAll(".nav").forEach(async tournament => {
		tournament.addEventListener("click", async () => loadTournament(tournament))
	});
	document.querySelector("#nav").insertAdjacentHTML("beforeend", templates.github)
}

const loadTournament = async (turnier) => {
	let data = await fetch(`${turnier.id}/data.json`);
	data = await data.json()
	document.querySelector("#battles").innerHTML = null;
	document.querySelector("#battle").innerHTML = null;
	document.querySelector("#sidenav").innerHTML = await renderArrayToTemplate(Object.keys(data), templates.sidenav);
	document.querySelector("h1").innerHTML = turnier.innerHTML;
	document.querySelectorAll(".sidenav").forEach(async round => {
		round.addEventListener("click", async () => {
			await Promise.all(data[round.id].map(async (item, index) => {
				if (item.color) return;
				const points = item.ergebnis.split(":");
				const color = loadColor({
					c : !!(item.hr1) + !!(item.rr2),
					p : parseInt(points[0],10)
				}, {
					c : !!(item.hr2) + !!(item.rr1),
					p : parseInt(points[1],10)
				});
				item.color = color;
				item.id = index;
			}));
			document.querySelector("#battles").innerHTML =
				templates.battlesTable.head(round.id) +
				await renderArrayToTemplate(data[round.id], templates.battlesTable.row);
			document.querySelectorAll(".battle").forEach(async battle => {
				battle.addEventListener("click", async () => {
					console.log(data[round.id], battle)
					battleData = data[round.id][battle.id.match(/\d+/)[0]];
					document.querySelector("#battle").innerHTML = templates.battle(battleData);
				})
			})
		});
	});
}

const loadColor = (tn1, tn2) => {
	switch (true){
		case tn1.p > tn2.p || tn1.c > tn2.c:
			return ["green", "red"];
		case tn1.p < tn2.p || tn1.c < tn2.c:
			return ["red", "green"];
		default:
			return ["", ""];
	}
}

loadBasicSite();
