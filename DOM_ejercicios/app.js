//General
const $document = document;
//Hamburguesa menu
let hamburgerMenuState = false;
const $hamburgerMenu = document.getElementById("hamburger-menu");
let $navbar = document.getElementById("navbar");
//Clock and alarm
let audio = new Audio("los_palmeras.mp3");
let intervalo;
const $btnIniciarReloj = document.getElementById("iniciarReloj");
//KeyBoard Events
const $playgroundImg = document.getElementById("playground-img");
const $playground = document.getElementById("playground");
const $playgroundImgHolder = document.getElementById("playgroud-img-holder");
let y = 1;
let x = 1;
const imgLimites = $playgroundImg.getBoundingClientRect();
const playgroundLimites = $playground.getBoundingClientRect();


//countdown
const $countdown = document.getElementById("countdown");
let actualDate = new Date();

//ScrollBackTop
$seccion1 = document.getElementById("seccion1");
$seccion2 = document.getElementById("seccion2");
$upBtn = document.getElementById("up-div");

//dark mode
const btnDark = document.getElementById("dark-btn");
const darkTipe = document.querySelectorAll("[data-dark]");

//mediaMatches
const bp = window.matchMedia("(min-width:700px)");
const $mediaSeccion = document.getElementById("seccion4");
const $yt = document.getElementById("youtube");
const $tw = document.getElementById("twitter");

//responsive tester
const $form = document.getElementById("form");
const $url = document.getElementById("url-input");
const $alto = document.getElementById("alto-input");
const $ancho = document.getElementById("ancho-input");
const $submit = document.getElementById("submit-btn");
const $cerrar = document.getElementById("cerrar-btn");
let newTab;


//online and offline verification
const $main = document.getElementById("main");
const $notification = document.createElement("div");
$notification.style.width = "100%";
$notification.style.height = "20%";
$notification.style.position = "fixed";
$notification.style.top = "0px";
$notification.style.left = "0px";
$notification.style.display = "flex";
$notification.style.justifyContent = "center";
$notification.style.alignItems = "center";
$notification.style.fontSize = "20px";
let textoNotificacion = document.createTextNode("");

//webcam usage
const $vid = document.getElementById("videoWebCam");

//Geolocalization
const lat = document.getElementById("pLat");
const lon = document.getElementById("pLon");
const pre = document.getElementById("pPre");
const mapsD = document.getElementById("mapsDireccion");
mapsD.style.pointerEvents = "none";

//Filtro de busqueda
const $searchB = document.getElementById("searchBar");
const $cardsContainer = document.getElementById("cards-container");
const $cards = document.getElementsByClassName("card");
const $nombre = document.getElementsByClassName("nombre");

//Sorteo
const $listaSorteo = document.getElementById("participantes");
const $newPlayer =  document.getElementById("nombreNuevo");

//carrousel
const $leftBtn = document.getElementById("left-btn");
const $rightBtn = document.getElementById("right-btn");
let contadorCarrousel = 0;
let carrousel = document.getElementsByClassName("carrousel");
let maxCarrousel = carrousel.length -1;

//Intersection observer
const $titles = document.getElementsByTagName("h2");
const $seccionesTitles = document.querySelectorAll("#hamburger-menu ul li a");
const $titlesToString = [...$titles];
const opt = {
    threshold:1,
    rootMargin:"0px",
    root: null
}
const highlight = e =>{
    if(e[0].isIntersecting == true){
        $seccionesTitles[$titlesToString.indexOf(e[0].target)].style.backgroundColor = "yellow";
    }
    else{
        $seccionesTitles[$titlesToString.indexOf(e[0].target)].style.backgroundColor = "lightgoldenrodyellow";
    }
}
const scrollObserver = new IntersectionObserver(highlight,opt);
$titlesToString.forEach(e => scrollObserver.observe(e));


//STOP VIDEO
const optVid = {
    threshold:0.5,
    rootMargin:"0px",
    root: null
}
const $video = document.querySelector("#videoOb");
const videoObserver = new IntersectionObserver((e)=>{
    if(!e[0].isIntersecting){
        e[0].target.pause();
    }
    else{
        e[0].target.play();
    }
},optVid);
videoObserver.observe($video);

//VALIDACION DE FORMULARIOS
const $formVal = document.getElementById("form-val");
const $inputs = document.querySelectorAll("#form-val [required]");
const arrInputs = [...$inputs];
arrInputs.forEach((e)=>{
    console.log(e);
    let span = document.createElement("span");
    let texto = e.getAttribute("title");
    span.innerText = texto;
    span.classList.add("spanStyle");
    span.id = e.getAttribute("name");
    e.insertAdjacentElement("afterend",span);
})


//KEYUP
document.addEventListener("keyup",(e)=>{
    if(e.target.matches ("#form-val [required]")){
        let input = e.target;
        let pattern = input.pattern || input.dataset.pattern;
        if(pattern){
            let regex = new RegExp(pattern);
            return !regex.exec(input.value) 
            ? document.getElementById(input.name).classList.add("spanShow") 
            : document.getElementById(input.name).classList.remove("spanShow"); 
        }
        else if(!pattern){
            return input.value === ""
            ? document.getElementById(input.name).classList.add("spanShow") 
            : document.getElementById(input.name).classList.remove("spanShow"); 
        }
    }
})

window.addEventListener("online",()=>{
    clearTimeout(offlineTimeOut);
    $notification.style.backgroundColor = "green";
    textoNotificacion.nodeValue = "To coneccion ha vuelto!";
    $notification.appendChild(textoNotificacion);
    document.body.appendChild($notification);
    setTimeout(()=>{
        if (window.navigator.online == true){
            window.onlineTimeOut = setTimeout(()=>{
                $notification.remove();
            },1000);
        }
    })
    
})
//OFFLINE
window.addEventListener("offline",()=>{
    $notification.style.backgroundColor = "red";
    textoNotificacion.nodeValue = "Has perdido tu conexion a internet";
    $notification.appendChild(textoNotificacion);
    document.body.appendChild($notification);
    setTimeout(()=>{
        if (window.navigator.online == false){
            window.onlineTimeOut = setTimeout(()=>{
                $notification.remove();
            },1000);
        }
    })
})
//SUBMIT
$document.addEventListener("submit",(e)=>{
    if (e.target === $form){
        e.preventDefault();
        if($url !== ""){
            newTab = window.open($url.value,"newTab",
            `innerWidth=${$ancho.value}, innerHeight=${$alto.value}`);
        }
    }
   
})
//LOADED
$document.addEventListener("DOMContentLoaded",()=>{
    if(localStorage.modo == undefined){
        localStorage.setItem("modo","blanco");
    }
    else{
        if (localStorage.modo == "negro"){
            btnDark.innerText = "🌞";
            darkTipe.forEach((el) =>{
                el.classList.add("dark");
            }) 
        }
    }

})
//CLICK
$document.addEventListener("click",(e)=>{


    if (e.target.matches("nav i img")){
        if (hamburgerMenuState == false){
            $hamburgerMenu.classList.add("left-zero");
            $hamburgerMenu.classList.remove("left-away");
            hamburgerMenuState = true;
        }
        else{
            $hamburgerMenu.classList.remove("left-zero");
            $hamburgerMenu.classList.add("left-away");
            hamburgerMenuState = false;
        }        
    }
    else if(e.target.matches("#hamburger-menu ul li a")){
        $hamburgerMenu.classList.remove("left-zero");
        $hamburgerMenu.classList.add("left-away");
        hamburgerMenuState = false;
    }
    else if(e.target.matches("#seccion1 #iniciarReloj")){
        $btnIniciarReloj.disabled = true;
        intervalo = setInterval(()=>{
            let fecha = new Date();
            $document.getElementById("reloj").textContent = fecha.toLocaleTimeString();
        },1000)
    }
    else if(e.target.matches("#seccion1 #detenerReloj")){
        $btnIniciarReloj.disabled = false;
        clearInterval(intervalo);
        $document.getElementById("reloj").textContent = "";
    }
    else if(e.target.matches("#seccion1 #iniciarAlarma")){
        audio.play();
    }
    else if(e.target.matches("#seccion1 #detenerAlarma")){
        audio.pause();
        audio.currentTime = 0;
    }
    else if(e.target.matches("#seccion3 #countdown-btn")){
        let countdownInputDate = new Date(document.getElementById("countdown-input").value);
        let sigofresh = setInterval(()=>{
            let diff = countdownInputDate.getTime() - new Date().getTime();
            let dias = Math.floor(diff / (1000 * 60 * 60 * 24));
            let horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60 * 60));
            let segundos = Math.floor((diff % (1000 * 60)) / (1000))
            $countdown.innerText = `${dias} : ${horas} : ${minutos} : ${segundos}`;
            if (dias == 0 && horas == 0 && minutos == 0 && segundos <=1){
                clearInterval(sigofresh);
                $countdown.innerText = `nashe`;
            }
        },1000)

    }
    else if (e.target.matches("#up-div #up-img")){
        scroll({
            top:0,
            behavior:"smooth"
        })
    }
    else if (e.target.matches("#dark-btn")){
        if(localStorage.modo == "blanco"){
            btnDark.innerText = "🌙";
            localStorage.modo = "negro";
            darkTipe.forEach((el) =>{
                el.classList.add("dark");
            })
        }
        else if(localStorage.modo == "negro"){
            localStorage.modo = "blanco";
            btnDark.innerText = "🌞";
            darkTipe.forEach((el) =>{
                el.classList.remove("dark");
            })
        }
    }
    else if(e.target === $cerrar){
        newTab.close();
    }
    else if(e.target.matches("#iniciarwc")){
        navigator.mediaDevices.getUserMedia({video:true, audio:true})
        .then((mediaStream)=>{
            $vid.srcObject = mediaStream;
            $vid.play();

        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else if (e.target.matches("#finalizarwc")){
        $vid.pause();
    }
    else if(e.target.matches("#btn-geo")){
        navigator.geolocation.getCurrentPosition(
            (pos)=>{
                let crd = pos.coords;
                lat.textContent = `Latitud: ${crd.latitude}`;
                lon.textContent = `Longitud: ${crd.longitude}`;
                pre.textContent = `Precisión: ${crd.accuracy}`;
                mapsD.style.pointerEvents = "auto";
                mapsD.setAttribute("href",`https://www.google.com.ar/maps/@${lat.textContent},${lon.textContent},17z`)
            },
            (err)=>{
                console.log(`ERROR: ${err}`);
            }
        )
    }
    else if(e.target.matches("#agregar")){
        let aux = document.createElement("li");
        aux.innerText = $newPlayer.value;
        $listaSorteo.insertAdjacentElement("beforeend",aux);
        $newPlayer.value = "";
    }
    else if(e.target.matches("#iniciar")){
        let cuantos = 0;
        for(let i = 0; i < $listaSorteo.childNodes.length; i++){
                cuantos++;
        }   
        cuantos --;
        let random = Math.ceil(Math.random()*cuantos);
        alert(`El ganador del sorteo fue ${$listaSorteo.childNodes[random].innerText}`);
    }
    else if (e.target === $rightBtn){
        carrousel[contadorCarrousel].classList.remove("active");
        

        contadorCarrousel++;
        if(contadorCarrousel > maxCarrousel){
            contadorCarrousel = 0;
        }

        carrousel[contadorCarrousel].classList.add("active");
    }
    else if (e.target === $leftBtn){
        carrousel[contadorCarrousel].classList.remove("active");

        contadorCarrousel--;
        if(contadorCarrousel < 0){
            contadorCarrousel = maxCarrousel;
        }

        carrousel[contadorCarrousel].classList.add("active");
    }
    else if(e.target.matches("#submit-val")){
        console.log("ñannifruli");
    }
    })

//KEYPRESS
$document.addEventListener("keydown",(e)=>{
    $navbar.style.zindex = "0";
    if (e.key == "ArrowUp"){
        e.preventDefault();
        y--;
        $playgroundImg.style.transform = `translate(${x*10}px,${y*10}px)`
    }
    else if (e.key == "ArrowDown"){
        e.preventDefault();
        y++;
        $playgroundImg.style.transform = `translate(${x*10}px,${y*10}px)`
    }
    else if (e.key == "ArrowLeft"){
        x--;
        $playgroundImg.style.transform = `translate(${x*10}px,${y*10}px)`
    }   
    else if (e.key == "ArrowRight"){
        e.preventDefault();
        x++;
        $playgroundImg.style.transform = `translate(${x*10}px,${y*10}px)`
    }
    else if (document.activeElement == $searchB){
        setTimeout(()=>{
            let newArr = [];
            for (let i = 0; i < $nombre.length; i++){
                newArr.push($nombre[i].innerText);
            }
            let regex = new RegExp($searchB.value, "i");
            let resultados = newArr
            .map((e)=>{
                return regex.test(e);
            })
            for(let i = 0; i < resultados.length; i++){
                if (resultados[i] != true){
                    $cards[i].style.display = "none";
                }
                else{
                    $cards[i].style.display = "flex";
                }
            }
        }, 500);
    }
    
})
//SCROLL
$document.addEventListener("scroll", ()=>{
    if ((window.innerHeight + window.scrollY) >= $seccion1.offsetHeight + $seccion2.offsetHeight) {
        $upBtn.style.display = "block";
    }
    else if ((window.innerHeight + window.scrollY) <= $seccion1.offsetHeight + $seccion2.offsetHeight) {
        $upBtn.style.display = "none";
    }
})
//SIZE
const responsive = (el,dMedia,mMedia,texto) =>{
    if (bp.matches){
        el.innerHTML = dMedia;
    }
    else{
        el.innerHTML = `<p>${texto} <a href="${mMedia}">aqui</a></p>`;
    }
}




responsive($yt,'<iframe width="560" height="315" src="https://www.youtube.com/embed/x6_7AmbgYsg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>','https://www.youtube.com/watch?v=x6_7AmbgYsg','Disfruta de este video');
responsive($tw,'<blockquote class="twitter-tweet" data-theme="dark"><p lang="es" dir="ltr">Sabias palabras, señor desconocido <a href="https://twitter.com/JSharau/status/1294741341277233152/photo/1">pic.twitter.com/3Wn8UZJYHO</a></p>&mdash; JulianSharau (@JSharau) <a href="https://twitter.com/JSharau/status/1294741341277233152?ref_src=twsrc%5Etfw">August 15, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>','https://twitter.com/JSharau/status/1294741341277233152','Hola! te dejo un tweet curioso aquí ')