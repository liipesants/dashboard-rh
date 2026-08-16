const links = document.querySelectorAll(".links a");
const abrirModal = document.querySelector("#abrir-modal");
const modal = document.querySelector("#modal");
const fecharModal = document.querySelector("#fechar-modal");
const formulario = document.querySelector("#formulario");
const modo = document.querySelector("#mode");
const body = document.querySelector("#body");
const sidebar = document.querySelector("#sidebar");
const header = document.querySelector("#header");
const pesquisar = document.querySelector("#pesquisar");
const cancelar = document.querySelector("#cancelar");
const maisMes = document.querySelector("#maisMes");

const tabelaFuncionarios = document.querySelector("#tabelaFuncionarios");
const pai = document.querySelector("#pai");
const cadastro = document.querySelector("#cadastro");
const sol = document.querySelector("#sol");
const lua = document.querySelector("#lua");

const alertaForm = document.querySelector("#alerta");

const iconeAtivo = document.querySelectorAll(".iconeAtivo");
const iconeFerias = document.querySelectorAll(".iconeFerias");

const elementos6 = document.querySelectorAll(".elementos6");
const elementos5 = document.querySelectorAll(".elementos5");
const elementos4 = document.querySelectorAll(".elementos4");
const elementos3 = document.querySelectorAll(".elementos3");
const elementos2 = document.querySelectorAll(".elementos2");
const elementos1 = document.querySelectorAll(".elementos1");

const salarioMedio = document.querySelector("#salarioMedio");
const colaboradoresFerias = document.querySelector("#colaboradoresFerias");
const colaboradoresAtivos = document.querySelector("#colaboradoresAtivos");
const totalFuncionarios = document.querySelector("#totalFuncionario");

const temaSalvo = localStorage.getItem("tema");
const user = document.querySelector("#user svg");

let funcionarioEditando = null;

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
totalFuncionarios.textContent = usuarios.length;

const calculaSalarioMedio = (users) => {
    if (!users || users.length === 0) {
        return 0;
    }

    const salarioSoma = users.reduce((total, user) => total + user.salario, 0);
    const media = salarioSoma / users.length;

    return Math.round(media);
};

const atualizaDashboard = () => {
    salarioMedio.textContent = calculaSalarioMedio(usuarios).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    totalFuncionarios.textContent = usuarios.length;
    maisMes.textContent = `+${usuarios.length} ESTE MÊS`;
    colaboradoresAtivos.textContent = atualizaAtivos(usuarios);
}

const atualizaAtivos = (users) => {
    let contAtivo = 0;

    users.forEach(user => {
        if (user.status === "ATIVO") contAtivo++;
    });
    return contAtivo;
}

atualizaDashboard();

const criaFuncionario = (users) => {

    tabelaFuncionarios.innerHTML = "";

    const trocaBorda = body.classList.contains("dark") ? "border-slate-300" : "border-slate-800";
    const trocaTexto = body.classList.contains("dark") ? "text-slate-600" : "text-slate-100/50";

    users.forEach(user => {
        const tr1 = document.createElement("tr");


        tr1.className = `linhaTabela px-6 py-4 text-slate-100/50 items-center font-medium border-r border-t border-b
         ${trocaBorda} ${trocaTexto} py-3`;

        tr1.innerHTML = `
        <td class="py-4 px-6 w-[8%] text-center">${user.id}</td>
        <td class="py-4 px-6 w-[27%] text-left">${user.nome}</td>
        <td class="py-4 px-6 w-[20%] text-left">${user.cargo}</td>
        <td class="py-4 px-6 w-[20%] text-left">${user.departamento}</td>
        <td class="py-4 px-6 w-[15%] text-left">${user.salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
        <td class="py-4 px-6 w-[10%] text-center text-green-600">${user.status}</td>
        <td class="text-center">
        <button data-id="${user.id}" class="edicao"><i class="text-yellow-400" data-lucide="pencil"></i></button>
        </td>`;

        tabelaFuncionarios.append(tr1);
        lucide.createIcons();
    });

}

const fechaModal = () => {
    modal.classList.add("hidden"); alertaForm.innerHTML = "";
};

const cancelaCadastro = () => {
    formulario.reset(); modal.classList.add("hidden"); alertaForm.innerHTML = "";
}

const abreModal = () => modal.classList.remove("hidden");

const trocaClasse = (elemento, antiga, nova) => {
    elemento.classList.remove(antiga);
    elemento.classList.add(nova);
}

const trocaClasseGrupo = (elemento, antiga, nova) => {
    elemento.forEach(el => { trocaClasse(el, antiga, nova) })
}

const aplicaTemaClaro = () => {
    const linhaTabela = document.querySelectorAll(".linhaTabela");

    sol.classList.add("hidden");
    lua.classList.remove("hidden");
    trocaClasse(sidebar, "bg-[#0c1021]", "bg-white");
    trocaClasse(header, "bg-[#0C101C]", "bg-white");
    trocaClasse(pai, "bg-slate-950", "bg-slate-200");
    trocaClasse(cadastro, "bg-[#0c1021]", "bg-white");
    trocaClasse(cadastro, "border-slate-800", "border-slate-100");
    trocaClasse(cancelar, "hover:text-white", "hover:text-black");
    trocaClasse(cancelar, "hover:border-white", "hover:border-black");

    trocaClasseGrupo(elementos1, "text-slate-100/50", "text-slate-600");
    trocaClasseGrupo(elementos2, "text-white", "text-black");
    trocaClasseGrupo(elementos3, "border-slate-800", "border-slate-300")
    trocaClasseGrupo(elementos4, "bg-slate-950", "bg-slate-200");
    trocaClasseGrupo(elementos5, "bg-[#0c1021]", "bg-slate-100/50");
    trocaClasseGrupo(elementos6, "bg-slate-800", "bg-slate-300");
    trocaClasseGrupo(iconeAtivo, "bg-green-100/50", "bg-green-200");
    trocaClasseGrupo(iconeFerias, "bg-green-100/50", "bg-orange-100");
    trocaClasseGrupo(linhaTabela, "border-slate-800", "border-slate-300");
    trocaClasseGrupo(linhaTabela, "text-slate-100/50", "text-slate-600");

    links.forEach(link => {

        link.classList.remove("bg-slate-700", "bg-slate-200", "hover:bg-slate-200", "hover:bg-slate-700", "text-white", "text-slate-100/50");

        if (link.classList.contains("border-blue-700")) {
            link.classList.add("bg-slate-200")
        }
        else {
            link.classList.add("hover:bg-slate-700")
        }
        link.classList.replace("hover:bg-slate-700", "hover:bg-slate-200");
    })
};

const aplicaTemaEscuro = () => {
    const linhaTabela = document.querySelectorAll(".linhaTabela");

    sol.classList.remove("hidden");
    lua.classList.add("hidden");
    trocaClasse(header, "bg-white", "bg-[#0C101C]");
    trocaClasse(sidebar, "bg-white", "bg-[#0c1021]");
    trocaClasse(pai, "bg-slate-200", "bg-slate-950");
    trocaClasse(cadastro, "bg-white", "bg-[#0c1021]");
    trocaClasse(cadastro, "border-slate-100", "border-slate-800");
    trocaClasse(cancelar, "hover:text-black", "hover:text-white");
    trocaClasse(cancelar, "hover:border-black", "hover:border-white");

    trocaClasseGrupo(elementos1, "text-slate-600", "text-slate-100/50");
    trocaClasseGrupo(elementos2, "text-black", "text-white");
    trocaClasseGrupo(elementos3, "border-slate-300", "border-slate-800")
    trocaClasseGrupo(elementos4, "bg-slate-200", "bg-slate-950");
    trocaClasseGrupo(elementos5, "bg-slate-100/50", "bg-[#0c1021]");
    trocaClasseGrupo(elementos6, "bg-slate-300", "bg-slate-800");
    trocaClasseGrupo(iconeAtivo, "bg-green-200", "bg-green-100/50");
    trocaClasseGrupo(iconeFerias, "bg-orange-100", "bg-green-100/50");
    trocaClasseGrupo(links, "text-white", "text-slate-100/50");
    trocaClasseGrupo(linhaTabela, "border-slate-300", "border-slate-800");
    trocaClasseGrupo(linhaTabela, "text-slate-600", "text-slate-100/50");

    links.forEach(link => {
        link.classList.remove("bg-slate-700", "bg-slate-200", "hover:bg-slate-200", "hover:bg-slate-700", "text-white", "text-slate-100/50");

        if (link.classList.contains("border-blue-700")) {
            link.classList.add("bg-slate-700");
            link.classList.add("text-white");
        }
        else {
            link.classList.add("hover:bg-slate-200");
        }
        link.classList.add("text-slate-100/50");
        link.classList.replace("hover:bg-slate-200", "hover:bg-slate-700");
    })
}

cancelar.addEventListener("click", event => { cancelaCadastro() });
abrirModal.addEventListener("click", event => { abreModal() });
fecharModal.addEventListener("click", event => { fechaModal() });

formulario.addEventListener("submit", event => {
    event.preventDefault();

    const nome = document.querySelector("#nome-completo").value.trim().toUpperCase();
    const cargo = document.querySelector("#cargo").value.trim().toUpperCase();
    const salario = Number(document.querySelector("#salario").value);
    const departamento = document.querySelector("#departamento").value.toUpperCase();

    if (!nome || !cargo || !salario || !departamento) {
        alertaForm.innerHTML = "<p class='border z-[9999] fixed p-3 font-semibold border-red-500 text-red-500 p2 rounded-lg text-center right-0 bottom-5 text-white'>Existem campos a serem preenchidos, preencha todos os campos para cadastrar o funcionário!</p>";

        setTimeout(() => {
            alertaForm.innerHTML = "";
        }, 3000)
        return;
    };

    localStorage.setItem("id", usuarios.length + 1)

    const usuario = {
        id: localStorage.getItem("id"),
        nome: nome,
        cargo: cargo,
        departamento: departamento,
        salario: salario,
        status: "ATIVO"
    };

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    console.log(calculaSalarioMedio(usuarios));
    atualizaDashboard();

    criaFuncionario(usuarios);

    fechaModal();
    formulario.reset();

    alertaForm.innerHTML = "<p class='border z-[9999] fixed p-3 bg-green-300 font-semibold border-green-500 text-green-500 p2 rounded-lg text-center top-7 left-[650px]'>Funcionário Cadastrado com Sucesso!</p>"

    setTimeout(() => {
        alertaForm.innerHTML = "";
    }, 3000)
});

links.forEach(link => {
    link.addEventListener("click", event => {
        links.forEach(l => {
            l.classList.remove("border-r-4", "border-blue-700", "bg-slate-700", "bg-slate-200", "text-white");
            l.querySelector("svg")?.classList.remove("text-blue-700");
        })
        if (body.classList.contains("dark")) {
            event.currentTarget.classList.add("border-r-4", "border-blue-700", "bg-slate-200");
            event.currentTarget.querySelector("svg")?.classList.add("text-blue-700");
        }
        else {
            event.currentTarget.classList.add("text-white", "border-r-4", "border-blue-700", "bg-slate-700");
            event.currentTarget.querySelector("svg")?.classList.add("text-blue-700");
        }
    })
})

modo.addEventListener("click", event => {
    event.preventDefault();
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        aplicaTemaClaro()

        localStorage.setItem("tema", "claro");
    }
    else {
        aplicaTemaEscuro()

        localStorage.setItem("tema", "escuro");
    }
});

if (temaSalvo === "claro") {
    body.classList.add("dark");
    aplicaTemaClaro();
}
else {
    body.classList.remove("dark");
    aplicaTemaEscuro()
}

criaFuncionario(usuarios);