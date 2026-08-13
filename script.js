/* =========================================
   DRAFTBR
   Sistema inicial de salas
========================================= */


const createRoomButton =
    document.getElementById("createRoomButton");

const joinRoomButton =
    document.getElementById("joinRoomButton");

const roomCodeInput =
    document.getElementById("roomCode");

const message =
    document.getElementById("message");


/* =========================================
   GERAR CÓDIGO DA SALA
========================================= */

function generateRoomCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        code += characters[randomIndex];
    }

    return code;
}


/* =========================================
   MOSTRAR MENSAGEM
========================================= */

function showMessage(text, type = "") {

    message.textContent = text;

    message.className = "message";

    if (type) {
        message.classList.add(type);
    }
}


/* =========================================
   CRIAR SALA
========================================= */

createRoomButton.addEventListener(
    "click",
    function () {

        const roomCode =
            generateRoomCode();


        /*
         * Neste primeiro protótipo,
         * salvamos a sala no navegador.
         *
         * Depois isso será substituído
         * por uma API/backend.
         */

        const room = {
            code: roomCode,
            createdAt: Date.now(),
            players: []
        };


        localStorage.setItem(
            `draftbr_room_${roomCode}`,
            JSON.stringify(room)
        );


        /*
         * Guardamos também a sala atual.
         */

        localStorage.setItem(
            "draftbr_current_room",
            roomCode
        );


        showMessage(
            `Sala criada! Código: ${roomCode}`,
            "success"
        );


        /*
         * Por enquanto apenas mostra
         * o código.
         *
         * Na próxima etapa podemos levar
         * o jogador para:
         *
         * /sala.html?codigo=XXXXXX
         */

        setTimeout(() => {

            alert(
                `Sala criada!\n\nCódigo: ${roomCode}\n\nCompartilhe este código com os jogadores.`
            );

        }, 100);

    }
);


/* =========================================
   ENTRAR NA SALA
========================================= */

joinRoomButton.addEventListener(
    "click",
    function () {

        const code =
            roomCodeInput.value
                .trim()
                .toUpperCase();


        if (!code) {

            showMessage(
                "Digite o código da sala.",
                "error"
            );

            return;
        }


        if (code.length !== 6) {

            showMessage(
                "O código deve possuir 6 caracteres.",
                "error"
            );

            return;
        }


        /*
         * Verifica se a sala existe
         * neste navegador.
         */

        const roomData =
            localStorage.getItem(
                `draftbr_room_${code}`
            );


        if (!roomData) {

            showMessage(
                "Sala não encontrada.",
                "error"
            );

            return;
        }


        const room =
            JSON.parse(roomData);


        /*
         * Guarda a sala atual.
         */

        localStorage.setItem(
            "draftbr_current_room",
            room.code
        );


        showMessage(
            `Entrando na sala ${room.code}...`,
            "success"
        );


        /*
         * Futuramente:
         *
         * window.location.href =
         * `sala.html?codigo=${room.code}`;
         */

        setTimeout(() => {

            alert(
                `Você entrou na sala ${room.code}!`
            );

        }, 300);

    }
);


/* =========================================
   INPUT
========================================= */

roomCodeInput.addEventListener(
    "input",
    function () {

        this.value =
            this.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "");

    }
);


/* =========================================
   ENTER PARA ENTRAR
========================================= */

roomCodeInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            joinRoomButton.click();

        }

    }
);
