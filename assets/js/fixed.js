// Se escuchará el evento scroll. Cuando se llega al nivel de la barra de navegación, se añade una clase en el navbar para que comience a flotar. Cuando se va arriba nuevamente llegando a la misma posición del navbar, se remueve la clase.

// Problemas:
// Si se remueve el navbar de su posición, va a quedar un espacio vacío.
// Si se coloca 'position: fixed', el elemento se va a salir de ese espacio y ya no va a formar parte del flujo del documento. Entonces, la siguiente sección va a dar un salto para llenar el espacio ocupado anteriormente por el navbar. Por ello, se podría llenar ese espacio con un margen para evitar ver algún salto incómodo.

(function () {
    let navbar = document.querySelector('#navbar');
    let main = document.querySelector('main');

    // getBoundingClientRect() : Es un método de cualquier elemento del DOM que devuelve un objeto con las dimensiones y la posición del elemento respecto a la ventana del navegador (viewport). Ese objeto contiene propiedades como:
    // top, left
    // right, bottom
    // width, height

    // Con ello, se obtiene la altura real (en píxeles) del rectángulo que ocupa este elemento en pantalla.
    let navbarHeight = navbar.getBoundingClientRect().height;

    // main.offsetTop es siempre la distancia en píxeles desde la parte superior del documento hasta el inicio del main y se le resta la altura del navbar. Con ello, se obtiene el punto de scroll en el que el main queda completamente visible debajo del navbar.
    let breakpoint = main.offsetTop - navbarHeight;

    // Variable para almacenar la posición de la ventana. Cuando se hace scroll, la posición del documento va a cambiar relativo a la ventana
    let windowPos;

    let isFixed = false;

    // Función para actualizar posición de ventana. Mientras más se haga scroll hacia abajo, se obtendrá un número de posición más grande.
    function updatePos() {
        windowPos = window.scrollY;
    }

    // Crear función a llamar cuando se dispare el evento de scroll (cada vez que se mueve el contenido de la página).
    function onScroll() {
        updatePos();

        // console.log(windowPos, breakpoint);

        // Se verifica que la posición de ventana sea mayor o igual que el breakpoint.
        // Si is isFixed es false debido a que aún no se ha llegado al breakpoint, entonces se correrá este bloque de código.
        if (windowPos >= breakpoint && !isFixed) {

            // Se remueve la clase 'open' a navbar cuando se alcanza o supere el breakpoint. Esto evita que se siga mostrando el menú de navegación abierto luego de alcanzar o superar el breakpoint para una mejor experiencia de usuario.
            navbar.classList.remove('open');

            // Se añade la propiedad de fixed al navbar (ver nav.css). 
            navbar.classList.add('navbar-fixed');
            // Para evitar que el main salte, se le añadirá un margin-top igual a la altura del navbar
            main.style.cssText = "margin-top: " + navbarHeight + 'px';
            
            // Al actualizar isFixed a true dentro de este bloque de código, se asegura que este bloque no se ejecute repetidamente al realizar scroll de forma continua luego de haber alcanzado el breakpoint.
            isFixed = true;

        // Se verifica si se llega a la posición inversa (parte superior de la página).
        // Si is isFixed es true debido a ya haber alcanzado al breakpoint, entonces se correrá este bloque de código.
        } else if (windowPos < breakpoint && isFixed) {
            // Se remueve la propiedad de fixed del navbar (ver nav.css). 
            navbar.classList.remove('navbar-fixed');
            // Se reinicia el margin-top de main a 0.
            main.style.cssText = "margin-top: " + 0;

            // Al actualizar isFixed a false dentro de este bloque de código, se asegura que este bloque no se ejecute repetidamente al realizar scroll de forma continua antes de haber alcanzado el breakpoint.
            isFixed = false;
        }
    }
    // Se escucha al evento scroll y se llama a la función onScroll cuando dicho evento de dispara.
    document.addEventListener('scroll', onScroll);

})();

// Nota adicional:
// - En el diseño de interfaz de usuario, una ventana modal es un componente visual que deshabilita la ventana principal, pero la mantiene visible de manera secundaria.