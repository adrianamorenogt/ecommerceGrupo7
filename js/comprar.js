
const button = document.querySelector('#comprar');

button.addEventListener('click', () => {
  Swal.fire({
    title: 'Compra exitosa',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  })
});