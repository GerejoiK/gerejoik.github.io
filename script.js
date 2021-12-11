function loadBasicSite(){
	fetch("data.json").then(data => {
		data.json().then(data => {
			data.forEach(item => {
				document.querySelector("#nav").innerHTML += `<div id="${item.normalized}" class="w3-bar-item w3-button nav">${item.name}</div>`;
			});
			document.querySelectorAll(".nav").forEach(anchor => {
				anchor.addEventListener("click", anchor => loadTournament(anchor.target))
			});
		});
	});
}

function loadTournament(turnier){
	document.querySelector("h1").innerHTML = turnier.innerHTML;
	fetch(`${turnier.id}/data.json`).then(data => {
		document.querySelector("#sidenav").innerHTML = null;
		data.json().then(data => {
			for (const [key, value] of Object.entries(data)) {
				document.querySelector("#sidenav").insertAdjacentHTML("beforeend",`<li id="${key}" class="sidenav">${key}`);
			}
			document.querySelectorAll(".sidenav").forEach(anchor => {
				anchor.addEventListener("click", anchor => {
					document.querySelector("#battles").innerHTML = `
						<tr class="w3-light-grey">
							<th colspan=3>${anchor.target.id}`;
					data[anchor.target.id].forEach(item => {
						const points = item.ergebnis.split(":");
						const color = loadColor({
							c : !!(item.hr1) + !!(item.rr2),
							p : parseInt(points[0],10)
						}, {
							c : !!(item.hr2) + !!(item.rr1),
							p : parseInt(points[1],10)
						});
						document.querySelector("#battles").insertAdjacentHTML("beforeend", `
							<tr>
								<td class="w3-text-${color[0]}">
									${item.tn1}
									${item.hr1 || item.rr2 ? "<br>" : ""}
									${item.hr1 ? `<a href="${item.hr1}">HR1</a>` : ""}
									${item.rr2 ? `<a href="${item.rr2}">RR2</a>` : ""}
								<td>vs.
									${item.ergebnis ? `<br>${item.ergebnis}` : ""}
								<td class="w3-text-${color[1]}">
									${item.tn2}
									${item.hr2 || item.rr1 ? "<br>" : ""}
									${item.hr2 ? `<a href="${item.hr2}">HR2</a>` : ""}
									${item.rr1 ? `<a href="${item.rr1}">RR1</a>` : ""}`
						);
					});
				});
			});
		});
	});
}

function loadColor(tn1, tn2){
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


