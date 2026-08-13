/* =========================================
   CONFIGURAÇÃO DA SALA
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const creatorNameInput =
    document.getElementById("creatorName");

const confirmRoomButton =
    document.getElementById(
        "confirmRoomButton"
    );

const setupMessage =
    document.getElementById(
        "setupMessage"
    );

const playerLimit =
    document.getElementById(
        "playerLimit"
    );


/* =========================================
   CÓDIGO DA URL
========================================= */

const params =
    new URLSearchParams(
        window.location.search
    );

const roomCode =
    params.get("codigo");


/* =========================================
   LIMITE PADRÃO
========================================= */

let selectedLimit = 4;


/* =========================================
   SELEÇÃO DE JOGADORES
========================================= */

const playerButtons =
    playerLimit.querySelectorAll("button");


playerButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            playerButtons.forEach(
                btn => {
                    btn.classList.remove(
                        "selected"
                    );
                }
            );


            this.classList.add("selected");


            selectedLimit =
                Number(
                    this.dataset.value
                );

        }
    );

});


/* =========================================
   CRIAR SALA
========================================= */

confirmRoomButton.addEventListener(
    "click",
    function () {

        let creatorName =
            creatorNameInput.value.trim();


        /*
         * Se não colocar nome,
         * vira Anonimo.
         */

        if (!creatorName) {

            creatorName = "Anonimo";

        }


        /*
         * Verifica o mínimo.
         */

        if (selectedLimit < 2) {

            setupMessage.textContent =
                "A sala precisa permitir pelo menos 2 jogadores.";

            setupMessage.className =
                "message error";

            return;

        }


        /*
         * Cria o jogador criador.
         */

        const creator = {

            id:
                crypto.randomUUID(),

            name:
                creatorName,

            isHost:
                true

        };


        /*
         * Cria a sala.
         */

        const room = {

            code:
                roomCode,

            maxPlayers:
                selectedLimit,

            players:
                [creator],

            createdAt:
                Date.now()

        };


        /*
         * Salva a sala.
         */

        localStorage.setItem(
            `draftbr_room_${roomCode}`,
            JSON.stringify(room)
        );


        /*
         * Guarda o jogador atual.
         */

        localStorage.setItem(
            "draftbr_player_id",
            creator.id
        );


        localStorage.setItem(
            "draftbr_current_room",
            roomCode
        );


        /*
         * Vai para o lobby.
         */

        window.location.href =
            `sala.html?codigo=${roomCode}`;

    }
);
