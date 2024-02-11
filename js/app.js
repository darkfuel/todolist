const input = document.querySelector('input')
const span = document.querySelector('span')
const btn = document.getElementById('addTask')
const lista = document.querySelector('table')
const total = document.getElementById('total')
const fin = document.getElementById('finalizado')
const pend = document.getElementById('pendientes')

const tareas = [
        {
        id: 23,
        descripcion: "Comprar jugo",
        check: false
    },
        {
        id: 45,
        descripcion: "Pagar cuentas",
        check: false
    },
        {
        id: 56,
        descripcion: "Subir archivo",
        check: false
    }
]

//agregar tarea
let error = ''
btn.addEventListener('click', () => {
    const tarea = input.value
    if (tarea) {
        error = ''
        tareas.push({
            id: Math.floor(Math.random() * 90),
            descripcion: tarea,
            check: false
        })
        input.value = ''
    } else {
        error = ' ↖ Este espacio no puede estar vacío'
    }
    agregar()
})

//función agregar
const agregar = () => {   
    //contadores finalizados y pendientes  
    const final = tareas.filter((tarea) => tarea.check === true).length
    const noFinal = tareas.filter((tarea) => tarea.check === false).length
    
    let template =
    `<tr>
        <th>ID</th>
        <th>Descripcion</th>
        <th>Estado</th>
        <th>Acción</th> 
    </tr>`
    for (const tarea of tareas) {
        const isCheckd = tarea.check === false ? `<th><input type="checkbox" onchange="finalizar(${tarea.id})"></th>` : `<th><input type="checkbox" checked onchange="finalizar(${tarea.id})"></th>`
        template +=
       `<tr>
            <th>${tarea.id}</th>
            <th>${tarea.descripcion}</th>
            ${isCheckd}
            <th><button onclick = "borrar(${tarea.id})">X</button></th>
        </tr>`
    }
    lista.innerHTML = template
    span.innerHTML = error
    total.innerHTML = tareas.length
    fin.innerHTML = final
    pend.innerHTML = noFinal
    span.innerHTML = error    
    }
agregar()

//función finalizar
const finalizar = (id) => {    
    const index = tareas.findIndex((item) => item.id === id)
    
    if (tareas[index].check === true) {
        tareas[index].check = false
    } else {
        tareas[index].check = true
    }
   agregar()
}

//función borrar
const borrar = (id) => {
    const index = tareas.findIndex((item) => item.id === id)
    tareas.splice(index, 1)
    agregar()
}