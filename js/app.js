// Variables
const year = document.querySelector('#year');
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


const resultado = document.querySelector('#resultado');

const yearMax = new Date().getFullYear();
const yearMin = yearMax - 10;

// generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // muestra los automoviles al cargar

    // Llena los años
    llenarSelect();
});

// Event listener para los select de busqueda
marca.addEventListener('change', (e) => {
    datosBusqueda[e.target.id] = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', (e) => {
    datosBusqueda[e.target.id] = Number(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', (e) => {
    datosBusqueda[e.target.id] = e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', (e) => {
    datosBusqueda[e.target.id] = e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', (e) => {
    datosBusqueda[e.target.id] = Number(e.target.value);
    filtrarAuto();
});

transmision.addEventListener('change', (e) => {
    datosBusqueda[e.target.id] = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', (e) => {
    datosBusqueda[e.target.id] = e.target.value;
    filtrarAuto();
});
// Funciones
function mostrarAutos(autos) {
    limpiarHTML();
    autos.forEach(auto => {
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        const autoHTML = document.createElement('P');
        
        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} - TRANSMISIÓN: ${transmision} - PRECIO: ${precio} - COLOR: ${color}`;
        
        resultado.appendChild(autoHTML);
    });
}

// limpiar HTML
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for(let i = yearMax; i >= yearMin; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // agrega las obciones del año
    }
}

function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter(filtrarMinimo).filter(fitrarMaximo).filter(fitrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    if (resultado.length > 1) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }

}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    } else {
        return auto;
    }
}

function filtrarYear(auto) {
    const {year} = datosBusqueda;
    if (year) {
        return auto.year === year;
    } else {
        return auto;
    }
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;

    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function fitrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }

    return auto;
}

function fitrarMaximo(auto) {
    const {maximo} = datosBusqueda;

    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;

    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;

    if (color) {
        return auto.color === color;
    }
    return auto;
}

function noResultado() {
    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados';

    limpiarHTML();
    resultado.appendChild(noResultado);
}