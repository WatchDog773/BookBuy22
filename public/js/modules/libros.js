import axios from "axios";
import Swal from "sweetalert2";
import { locale } from "moment";




// Obtener el nombre del botón desde el DOM
const botonesEliminar = document.querySelectorAll(
    "button[name='eliminar-libro']"
  );
  

  
botonesEliminar.forEach((botonEliminar) => {
    // Agregar un evento al click del botón
    botonEliminar.addEventListener("click", (e) => {
      //  Capturar la URL del proyecto que se encuentra en una propiedad data HTML5
      const urlLibro = e.target.dataset.libroUrl;
  
      //sweetalert2.github.io/
      https: Swal.fire({
        title:"¿Estás seguro que deseas comprar este libro?",
        text:"Si compras este libro ¡No hay vuelta atrás!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
        confirmButtonColor: " #008f39",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.value) {
          // Obtener la URL del sitio
            // Obrtener la URL del sitio
            const url = `${location.origin}/libro/${urlLibro}` ;
            console.log(url);
          //   Implementar axios para la petición
          axios
            .delete(url, {
              params: {
                url: urlLibro,
              },
            })
            .then(function (response) {
                Swal.fire( "¡Genial !",response.data, "success" );
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "¡Error!",
                    text: "No se ha podido comprar el libro...",
              });
            });
  
          //   Redireccionar a /
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      });
    });
  });
  
  export default botonesEliminar;
  