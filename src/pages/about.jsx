import React, { useEffect, useState, useRef } from 'react';
//Importación de la libreria.reat, useEffect-para el manejo de efectos secundarios.
//useState-para el manejo de los stados, useRef-para el manejo de referencias a elementos del DOM.

function About() {
  const [nombre, setNombre] = useState('');
  const [producto, setProducto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [itens, setItens] = useState([]);
  const [id, setId] = useState();
  //Definmos estados para el manejo de nombre, categoria y precio; e id para identificar elementos en edición.
  const modalRef = useRef(null);
  const tbodyRef = useRef(null);
  //Definimos referencias para el modal y el tbody.

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) ?? [];
    const usuarioActual = usuarios[usuarios.length - 1];
    if (usuarioActual) {
      setNombre(usuarioActual.nombre);
    }
  }, []);
  //Recuperamos el usuario actual de localStorage y actualiza el estado de nombre.

  useEffect(() => {
    loadItens();
  }, []);
  //carga los items(productos) desde localStorage

  const openModal = (edit = false, index = 0) => {
    modalRef.current.classList.add('active');
    modalRef.current.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modalRef.current.classList.remove('active');
      }
    };
    //Abre el modal para agregar o editar un producto.

    if (edit) {
      setProducto(itens[index].producto);
      setCategoria(itens[index].categoria);
      setPrecio(itens[index].precio);
      setId(index);
    } else {
      setProducto('');
      setCategoria('');
      setPrecio('');
    }
    //si se trata de una edición, la edición deve de ser verdadera par que pueda cargar los datos del producto.
  };

  const editItem = index => {
    openModal(true, index);
  };
  //Abre el modal para editar el producto en la posición index.

  const deleteItem = index => {
    const newItens = itens.slice();
    newItens.splice(index, 1);
    setItens(newItens);
    setItensBD(newItens);
    loadItens();
  };
  //Elimina el producto en la posición index de la lista y actuliza localStorage

  const insertItem = (item, index) => {
    return (
      <tr key={index}>
        <td>{item.producto}</td> 
        <td>{item.categoria}</td>
        <td>{item.precio}</td>
        <td className="acao">
          <button onClick={() => editItem(index)}><i className='bx bx-edit'></i></button>
        </td>
        <td className="acao">
          <button onClick={() => deleteItem(index)}><i className='bx bx-trash'></i></button>
        </td>
      </tr>
    );
    //crea una fila para cada producto con botones para editar y eliminar.
  };

  const handleSave = e => {
    e.preventDefault();
    if (producto === '' || categoria === '' || precio === '') { 
      return;
    }

    const newItens = [...itens];

    if (id !== undefined) {
      newItens[id] = { producto, categoria, precio };
    } else {
      newItens.push({ producto, categoria, precio });
    }
    //Comprueba que los diferentes enunciados esten completos, para poder guardar el producto.

    setItens(newItens);
    setItensBD(newItens);

    modalRef.current.classList.remove('active');
    loadItens();
    setId(undefined);
  };
  //Guarda un nuevo producto o actualiza uno ya existente, Luego cierra el modal y recarga los items.

  const loadItens = () => {
    const storedItens = getItensBD();
    setItens(storedItens);
  };
  //Carga los tems desde localStorage y actualiza el estado.

  const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
  //Obtiene los items desde localStorage o devuelve un array vacío ni no hay.
  const setItensBD = itens => localStorage.setItem('dbfunc', JSON.stringify(itens));
  //Guarda los items en localStorage

  return (
    <div className="l2-form">
      <h1 className="form__title2">Bienvenido</h1>
      <p id="bienvenida">Hola {nombre}</p>

      <div className="container2">
        <div className="header">
          <span>Productos</span>
          <button onClick={() => openModal()} id="btn-add">+</button>
        </div>

        <div className="divTable">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th className="acao">Editar</th>
                <th className="acao">Eliminar</th>
              </tr>
            </thead>
            <tbody ref={tbodyRef}>
              {itens.map((item, index) => insertItem(item, index))}
            </tbody>
          </table>
        </div>

        <div className="modal-container" ref={modalRef}>
          <div className="modal">
            <form onSubmit={handleSave}>
              <label htmlFor="m-producto">Producto</label>
              <input id="m-producto" type="text" value={producto} onChange={e => setProducto(e.target.value)} required />

              <label htmlFor="m-categoria">Categoria</label>
              <input id="m-categoria" type="text" value={categoria} onChange={e => setCategoria(e.target.value)} required />

              <label htmlFor="m-precio">Precio</label>
              <input id="m-precio" type="number" value={precio} onChange={e => setPrecio(e.target.value)} required />
              <button id="btnGuardar">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  //Muestra la bienbenida junto al nombre de la persona
  //Muestra los componentes por los que los productos estaran compuestos.
  //Crea los botones de forma visible.
}

export default About;
//Exportamos la función para que pueda ser utilizado en otras ocasiones.
