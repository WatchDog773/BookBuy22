import axios from "axios";
import Swal from "sweetalert2";

const btnEliminar = document.querySelector("#eliminar-libro");

btnEliminar.addEventListener("click", (e) =>{
console.log("click en eliminar");

    // Capturar la URL del proyecto que se encuentra en na propiedad HTML5
    const urlLibro = e.target.dataset.libroUrl;

    console.log(urlLibro);
    
 Swal.fire({
        title:"¿Estás seguro que deseas comprar este libro?",
        text:"Si compras este libro ¡No hay vuelta atrás!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
        confirmButtonColor: " #008f39",
        cancelButtonColor: "#d33",
    }).then((result) => {
        // Si el usuario confirma la eliminacion del proyecto al hacer click en el botón elimimanr
        // Nos vamos a conectar mediante axios utilizado ajax
        if (result.value) {
            // Obrtener la URL del sitio
            const url = `${location.origin}/libro/${urlLibro}` ;
            console.log(url);
            // console.log(url);

            // Implementar axios para la peticion
            axios
               .delete(url, { params: { url :urlLibro } })
               .then(function(response){
                Swal.fire( "¡Genial !",response.data, "success" );
                // console.log("Libro comprado");
            }).catch(() =>{
                Swal.fire( "Error");
             });
        }
    });
});

export default btnEliminar;
