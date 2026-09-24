// Configuração do Canvas (Tela do Jogo)
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ajusta o tamanho da tela para funcionar bem em computadores e celulares
canvas.width = 800;
canvas.height = 400;

// Configuração dos Jogadores
const player1 = { x: 100, y: 180, size: 40, color: "blue", speed: 5 }; // Você (Notebook)
const player2 = { x: 660, y: 180, size: 40, color: "red", speed: 5 };  // Seu Primo (Celular)

// Teclas pressionadas (Para o seu Notebook)
const keys = {};

window.addEventListener("keydown", (e) => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", (e) => keys[e.key.toLowerCase()] = false);

// CONTROLE DO SEU PRIMO (MOBILE)
let mobileMove = { up: false, down: false, left: false, right: false };

function setupMobileControls() {
    const btnUp = document.getElementById("btnUp");
    const btnDown = document.getElementById("btnDown");
    const btnLeft = document.getElementById("btnLeft");
    const btnRight = document.getElementById("btnRight");

    if(!btnUp) return;

    btnUp.addEventListener("touchstart", () => mobileMove.up = true);
    btnUp.addEventListener("touchend", () => mobileMove.up = false);

    btnDown.addEventListener("touchstart", () => mobileMove.down = true);
    btnDown.addEventListener("touchend", () => mobileMove.down = false);

    btnLeft.addEventListener("touchstart", () => mobileMove.left = true);
    btnLeft.addEventListener("touchend", () => mobileMove.left = false);

    btnRight.addEventListener("touchstart", () => mobileMove.right = true);
    btnRight.addEventListener("touchend", () => mobileMove.right = false);
}

// Loop Principal do Jogo
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movimentação do Seu Personagem (Notebook - WASD)
    if (keys['w'] && player1.y > 0) player1.y -= player1.speed;
    if (keys['s'] && player1.y < canvas.height - player1.size) player1.y += player1.speed;
    if (keys['a'] && player1.x > 0) player1.x -= player1.speed;
    if (keys['d'] && player1.x < canvas.width - player1.size) player1.x += player1.speed;

    // Movimentação do Personagem do seu Primo (Celular - Botões)
    if (mobileMove.up && player2.y > 0) player2.y -= player2.speed;
    if (mobileMove.down && player2.y < canvas.height - player2.size) player2.y += player2.speed;
    if (mobileMove.left && player2.x > 0) player2.x -= player2.speed;
    if (mobileMove.right && player2.x < canvas.width - player2.size) player2.x += player2.speed;

    // Desenhar os Personagens
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.size, player1.size);

    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.size, player2.size);

    requestAnimationFrame(gameLoop);
}

setupMobileControls();
gameLoop();
