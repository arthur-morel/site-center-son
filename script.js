/*Copyright Ano*/
document.getElementById("ano").textContent = new Date().getFullYear();

/*Faq Menu*/
document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
        item.addEventListener("click", function () {
            const answer = this.querySelector(".faq-resposta");
            item.classList.toggle("ativo");
        });
    });
});

/*Seção Contadores*/
document.addEventListener("DOMContentLoaded", function() {
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let numeros = document.querySelectorAll(".numero");
                numeros.forEach(numero => {
                    let valorFinal = parseInt(numero.getAttribute("data-valor"));
                    let incremento = Math.ceil(valorFinal / 100);
                    let contador = 0;
                    let atualizarNumero = setInterval(() => {
                        contador += incremento;
                        
                        if (contador >= valorFinal) {
                            numero.textContent = valorFinal.toLocaleString();
                            clearInterval(atualizarNumero);
                        } else {
                            numero.textContent = contador.toLocaleString();
                        }
                    }, 30);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    const contadorSection = document.querySelector(".contador");
    if (contadorSection) {
        observer.observe(contadorSection);
    }
});

/*Pop-up Política*/
const TRES_MESES_MS = 90 * 24 * 60 * 60 * 1000; 

window.onload = function() {
    const dataAceite = localStorage.getItem("politicaAceitaData");

    if (!dataAceite) {
        document.getElementById("politica-pop-up").style.display = "block";
        return;
    }

    const agora = Date.now();
    const tempoPassado = agora - Number(dataAceite);

    if (tempoPassado > TRES_MESES_MS) {
        document.getElementById("politica-pop-up").style.display = "block";
    }
};

function aceitarPolitica() {
    const agora = Date.now();
    localStorage.setItem("politicaAceitaData", agora);
    document.getElementById("politica-pop-up").style.display = "none";
}

/*Active Menu*/
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".cabecalho-item");
    const norm = (p) => {
        p = p.split(/[?#]/)[0].replace(/\.html$/, "");
        if (p.endsWith("/index") || p === "/index") return "/";
        return (p !== "/" && p.endsWith("/")) ? p.slice(0, -1) : p || "/";
    };
    const update = () => {
        const path = norm(location.pathname);
        const hash = location.hash;
        links.forEach(l => l.classList.remove("active"));
        if (hash) {
            document.querySelector(`.cabecalho-item[href="${hash}"]`)
                ?.classList.add("active");
            return;
        }
        links.forEach(link => {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("#")) return;

            const linkPath = norm(new URL(href, location.origin).pathname);
            if (linkPath === path) link.classList.add("active");
        });
    };
    update();
    window.addEventListener("hashchange", update);
});

/*Nossa História Ccarousel*/
let currentIndex = 0;
function moveSlide(direction) {
    const container = document.querySelector(".carousel-container");
    const slides = document.querySelectorAll(".carousel-container img");
    const total = slides.length;
    currentIndex = (currentIndex + direction + total) % total;
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
}

/*Header Menu Mobile*/
const BtnMenu = document.getElementById("btn-menu-mobile");
const MenuLista = document.getElementById("cabecalho-menu-lista");
const Icon = BtnMenu.querySelector("i");

BtnMenu.addEventListener("click", () => {
    MenuLista.classList.toggle("active");

    if (MenuLista.classList.contains("active")) {
        Icon.classList.remove("fa-bars");
        Icon.classList.add("fa-xmark");
    }

    else {
        Icon.classList.remove("fa-xmark");
        Icon.classList.add("fa-bars");
    }
});

/*Botão Voltar*/
const btn = document.getElementById("btn-voltar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        btn.classList.add ("show");
    } else {
        btn.classList.remove ("show");
    }
});

function subirTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth'});
}

/*Validação do Form*/
const form = document.getElementById("formulario");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let form = this;
        let formData = new FormData(form);

        fetch("enviar-email.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(data => {
            document.getElementById("form-retorno").innerHTML = data;
            form.reset();
        })
        .catch(() => {
            document.getElementById("form-retorno").innerHTML = "<p class='mensagem erro'>Erro de conexão. Tente novamente.</p>";
        });
    });
}

/*ScrollReveal*/
window.sr = ScrollReveal({ reset: false});

/*Index*/
sr.reveal('.banner h2', { duration: 2500 });
sr.reveal('.primeiro-conteudo h1, .primeiro-conteudo p, .primeiro-conteudo img', { duration: 2500 });
sr.reveal('.diferenciais h2, .diferenciais-subtitulo, .cartao-de-servico', { duration: 2500 });
sr.reveal('.contador-geral, .contador-descricao', { duration: 2500 });
sr.reveal('.depoimentos h2, .depoimentos p, .depoimentos-secao', { duration: 2500 });
sr.reveal('.autorizada h2, .autorizada p', { duration: 2500 });
sr.reveal('.autorizada img', {
    distance: '1400px',
    origin: 'left',
    duration: 1500,
    opacity: 1,
    easing: 'ease-out'
});
sr.reveal('.autorizada button', { duration: 2500 });
sr.reveal('.autorizada h2, .autorizada p', { duration: 2500 });
sr.reveal('.faq h2, .faq-subtitulo', { duration: 2500 });
sr.reveal('.faq-lista', {
    distance: '1400px',
    origin: 'right',
    duration: 1500,
    easing: 'ease'
});
sr.reveal('.fale-conosco-conteudo', {
    distance: '1400px',
    origin: 'bottom',
    duration: 1500,
    easing: 'ease'
});
sr.reveal('.formulario', {
    distance: '1400px',
    origin: 'right',
    duration: 1500,
    easing: 'ease'
});

/*Parceiros*/
sr.reveal('.fabricantes-titulo, .fabricantes-subtitulo', { duration: 2500 });
sr.reveal('.cartao-marcas', {
    scale: 0.2,
    duration: 2500,
    opacity: 0,
    easing: "cubic-bezier(0.19, 1, 0.22, 1)",
});
sr.reveal('.garantia-estendida-titulo, .garantia-estendida-subtitulo', { duration: 2500 });
sr.reveal('.cartao-estendida', {
    scale: 0.2,
    duration: 2500,
    opacity: 0,
    easing: "cubic-bezier(0.19, 1, 0.22, 1)",
});
sr.reveal('.solucoes-multimarcas-titulo, .solucoes-multimarcas-subtitulo, .solucoes-multimarcas-btn, .solucoes-multimarcas-imagem', { duration: 2500 });

/*Nossa História*/
sr.reveal('.nossa-historia-titulo, .nossa-historia-subtitulo, .nossa-historia-descricao, .nossa-historia-fachada', { duration: 2500 });
sr.reveal('.nossos-principios-titulo', { duration: 2500 });
sr.reveal('.nossos-principios-container', {
    distance: '1400px',
    origin: 'left',
    duration: 1500,
    opacity: 1,
    easing: 'ease'
});
sr.reveal('.carousel-texto-titulo, .carousel-texto-subtitulo, .carousel-texto-btn', { duration: 2500 });
sr.reveal('.carousel', {
    distance: '1400px',
    origin: 'right',
    duration: 1500,
    opacity: 1,
    easing: 'ease'
});

/*Slider*/
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector('.slide-web');
    const slides = document.querySelectorAll('.slide');
    const buttons = document.querySelectorAll('.manual-btn');

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let autoPlayInterval;

    const totalSlides = slides.length;

    // Atualiza posição do slider
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Atualiza botões
        buttons.forEach(btn => btn.classList.remove('active'));
        if (buttons[currentIndex]) {
            buttons[currentIndex].classList.add('active');
        }
    }

    // Loop infinito
    function limitIndex() {
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        if (currentIndex >= totalSlides) currentIndex = 0;
    }

    // Autoplay
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex++;
            limitIndex();
            updateSlider();
        }, 6000); // Tempo de mudar o slide
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Botões
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            stopAutoPlay();
            currentIndex = index;
            updateSlider();
            startAutoPlay();
        });
    });

    // Mouse
    slider.addEventListener('mousedown', (e) => {
        stopAutoPlay();
        isDragging = true;
        startX = e.clientX;
    });

    slider.addEventListener('mouseup', (e) => {
        if (!isDragging) return;

        let diff = e.clientX - startX;

        if (diff > 50) currentIndex--;
        if (diff < -50) currentIndex++;

        limitIndex();
        updateSlider();

        isDragging = false;
        startAutoPlay();
    });

    slider.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // Touch (celular)
    slider.addEventListener('touchstart', (e) => {
        stopAutoPlay();
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
        let diff = e.changedTouches[0].clientX - startX;

        if (diff > 50) currentIndex--;
        if (diff < -50) currentIndex++;

        limitIndex();
        updateSlider();

        startAutoPlay();
    });

    updateSlider();
    startAutoPlay();
});