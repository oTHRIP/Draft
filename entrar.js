/* =========================================
   ENTRAR NA SALA
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const playerNameInput =
    document.getElementById(
        "playerName"
    );

const joinButton =
    document.getElementById(
        "joinButton"
    );

const joinMessage =
    document.getElementById(
        "joinMessage"
    );


/* =========================================
   CÓDIGO DA SALA
========================================= */

const params =
    new URLSearchParams(
        window.location.search
    );

const roomCode =
    params.get("codigo");


/* =========================================
   NOME ANÔNIMO
========================================= */

function generateAnonymousName(players) {

    const baseName =
        "Anonimo";


    /*
     * Primeiro tenta "Anonimo".
     */

    const existsBase =
        players.some(
            player =>
                player.name.toLowerCase()
                ===
                baseName.toLowerCase()
        );


    if (!existsBase) {

        return baseName;

    }


    /*
     * Se já existe Anonimo,
     * começa pelo Anonimo2.
     */

    let number = 2;


    while (
        players.some(
            player =>
                player.name.toLowerCase()
                ===
                `${baseName}${number}`.toLowerCase()
        )
    ) {

        number++;

    }


    return `${baseName}${number}`;

}


/* =========================================
   ENTRAR
========================================= */

joinButton.addEventListener(
    "click",
    function () {

        /*
         * Verifica código.
         */

        if (!roomCode) {

            joinMessage.textContent =
                "Código da sala inválido.";

            joinMessage.className =
                "message error";

            return;

        }


        /*
         * Busca sala.
         */

        const roomData =
            localStorage.getItem(
                `draftbr_room_${roomCode}`
            );


        if (!roomData) {

            joinMessage.textContent =
                "Sala não encontrada.";

            joinMessage.className =
                "message error";

            return;

        }


        const room =
            JSON.parse(roomData);


        /*
         * Verifica limite.
         */

        if (
            room.players.length
            >=
            room.maxPlayers
        ) {

            joinMessage.textContent =
                "Essa sala já está cheia.";

            joinMessage.className =
                "message error";

            return;

        }


        /*
         * Pega nome.
         */

        let playerName =
            playerNameInput.value.trim();


        /*
         * Se vazio:
         *
         * Anonimo
         * Anonimo2
         * Anonimo3
         * etc.
         */

        if (!playerName) {

            playerName =
                generateAnonymousName(
                    room.players
                );

        }


        /*
         * Cria jogador.
         */

        const player = {

            id:
                crypto.randomUUID(),

            name:
                playerName,

            isHost:
                false

        };


        /*
         * Adiciona jogador.
         */

        room.players.push(
            player
        );


        /*
         * Salva sala atualizada.
         */

        localStorage.setItem(
            `draftbr_room_${roomCode}`,
            JSON.stringify(room)
        );


        /*
         * Guarda jogador atual.
         */

        localStorage.setItem(
            "draftbr_player_id",
            player.id
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


/* =========================================
   ENTER PARA ENTRAR
========================================= */

playerNameInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            joinButton.click();

        }

    }
);
