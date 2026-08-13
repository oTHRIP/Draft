/* =========================================
   DRAFTBR
   SISTEMA DE SALAS
========================================= */


/* =========================================
   ELEMENTOS
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
   GERAR CÓDIGO
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
   MENSAGEM
========================================= */

function showMessage(text, type = "") {

    if (!message) return;

    message.textContent = text;

    message.className = "message";

    if (type) {
        message.classList.add(type);
    }
}


/* =========================================
   CRIAR SALA
========================================= */

if (createRoomButton) {

    createRoomButton.addEventListener(
        "click",
        function () {

            /*
             * Gera um código novo.
             */

            let roomCode = generateRoomCode();

            /*
             * Evita gerar uma sala com código
             * que já exista neste navegador.
             */

            while (
                localStorage.getItem(
                    `draftbr_room_${roomCode}`
                )
            ) {
                roomCode = generateRoomCode();
            }


            /*
             * Guarda o código temporariamente.
             */

            localStorage.setItem(
                "draftbr_setup_room",
                roomCode
            );


            /*
             * Vai para a página de configuração.
             */

            window.location.href =
                `configuracao.html?codigo=${roomCode}`;

        }
    );

}


/* =========================================
   ENTRAR NA SALA
========================================= */

if (joinRoomButton) {

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
             * Verifica se a sala existe.
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


            /*
             * Guarda o código para a próxima página.
             */

            localStorage.setItem(
                "draftbr_join_room",
                code
            );


            /*
             * Vai para a tela onde o jogador
             * escolherá o nome.
             */

            window.location.href =
                `entrar.html?codigo=${code}`;

        }
    );

}


/* =========================================
   INPUT DO CÓDIGO
========================================= */

if (roomCodeInput) {

    roomCodeInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "");

        }
    );


    roomCodeInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                joinRoomButton.click();

            }

        }
    );

}
