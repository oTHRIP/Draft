/* =========================================
   LOBBY DA SALA
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const roomCodeElement =
    document.getElementById(
        "roomCode"
    );

const playersList =
    document.getElementById(
        "playersList"
    );

const playerCount =
    document.getElementById(
        "playerCount"
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
   CARREGAR SALA
========================================= */

function loadRoom() {

    if (!roomCode) {

        window.location.href =
            "index.html";

        return;

    }


    const roomData =
        localStorage.getItem(
            `draftbr_room_${roomCode}`
        );


    if (!roomData) {

        window.location.href =
            "index.html";

        return;

    }


    const room =
        JSON.parse(roomData);


    /*
     * Mostra código.
     */

    roomCodeElement.textContent =
        room.code;


    /*
     * Mostra jogadores.
     */

    renderPlayers(room);


    /*
     * Atualiza quantidade.
     */

    playerCount.textContent =
        `${room.players.length} / ${room.maxPlayers}`;

}


/* =========================================
   MOSTRAR JOGADORES
========================================= */

function renderPlayers(room) {

    playersList.innerHTML = "";


    room.players.forEach(
        player => {

            const playerElement =
                document.createElement(
                    "div"
                );


            playerElement.className =
                "player";


            /*
             * Primeira letra do nome.
             */

            const firstLetter =
                player.name
                    .charAt(0)
                    .toUpperCase();


            playerElement.innerHTML = `

                <div class="player-avatar">
                    ${firstLetter}
                </div>

                <div class="player-name">
                    ${escapeHTML(player.name)}
                </div>

                ${
                    player.isHost
                    ?
                    `<div class="host">
                        DONO
                    </div>`
                    :
                    ""
                }

            `;


            playersList.appendChild(
                playerElement
            );

        }
    );

}


/* =========================================
   SEGURANÇA
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================================
   INICIAR
========================================= */

loadRoom();
