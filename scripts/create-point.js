function writeState() {
    const uf = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json()})
    .then((states) => {
        for(state of states) {
            uf.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

writeState();

document.querySelector("select[name=uf]").addEventListener("change", () => {
    const city = document.querySelector("select[name=city]");
    const uf = document.querySelector("select[name=uf]");
    const stateInput = document.querySelector("input[name=state]");
    const indexState = uf.selectedIndex;
    
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.value}/municipios`)
    .then((res) => {return res.json()})
    .then((cities) => {
        for(cidade of cities) {
            city.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`;
        }
        city.disabled = false;
        stateInput.value = uf.options[indexState].text;
    });
});