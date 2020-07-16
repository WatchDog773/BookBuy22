import axios from "axios";
import Swal from "sweetalert2";
import { locale } from "moment";




// Obtener el nombre del botón desde el DOM
const botonesQuitar = document.querySelectorAll(
    "button[name='quitar-libro']"
  );
  

  
botonesQuitar.forEach((botonQuitar) => {
    // Agregar un evento al click del botón
    botonQuitar.addEventListener("click", (e) => {
      //  Capturar la URL del proyecto que se encuentra en una propiedad data HTML5
      const urlLibro = e.target.dataset.libroUrl;
  
      //sweetalert2.github.io/
      https: Swal.fire({
        title:"¿Estás seguro que deseas quitar este libro de tu estantería?",
        // text:"Si quitas este libro ¡No hay vuelta atrás!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3b83bd",
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
                Swal.fire( "¡Listo! el libro ya no esta disponible" ,response, "success" );
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "¡Error!",
                    text: "No se ha podido quitar el libro...",
              });
            });
  
          //   Redireccionar a /
          setTimeout(() => {
            window.location.href = "/mi_estanteria";
          }, 2300);
        }
      });
    });
  });
  
  export default botonesQuitar;
  