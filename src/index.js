const Mario = {
    NOME: "MARIO",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const Peach = {
    NOME: "PEACH",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
};

const Yoshi = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
};

const Bowser = {
    NOME: "BOWSER",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};

const Luigi = {
    NOME: "LUIGI",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

const DonkeyKong = {
    NOME: "DONKEYKONG",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};

const corredores = [Mario, Peach, Yoshi, Bowser, Luigi, DonkeyKong];

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(
        `${characterName} 🎲 rolou um dado de  ${block} ${diceResult} + ${attribute} = ${
            diceResult + attribute
        }`
    );
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // Roll dice
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // ability test
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(
                character1.NOME,
                "velocidade",
                diceResult1,
                character1.VELOCIDADE
            );
            await logRollResult(
                character2.NOME,
                "velocidade",
                diceResult2,
                character2.VELOCIDADE
            );
        }
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(
                character1.NOME,
                "manobrabilidade",
                diceResult1,
                character1.MANOBRABILIDADE
            );
            await logRollResult(
                character2.NOME,
                "manobrabilidade",
                diceResult2,
                character2.MANOBRABILIDADE
            );
        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(
                `${character1.NOME} confrontou com ${character2.NOME}! 🥊`
            );

            await logRollResult(
                character1.NOME,
                "poder",
                diceResult1,
                character1.PODER
            );
            await logRollResult(
                character2.NOME,
                "poder",
                diceResult2,
                character2.PODER
            );

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(
                    `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`
                );
                character2.PONTOS--;
            }

            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(
                    `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`
                );
                character1.PONTOS--;
            }

            console.log(
                powerResult2 === powerResult1
                    ? "Confronto empatado! Nenhum ponto foi perdido"
                    : ""
            );
        }

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log(" ----------------------------- \n");
    }
}

async function winner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n ${character1.NOME} venceu a corrida! Parabéns 🏆`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n ${character2.NOME} venceu a corrida! Parabéns 🏆`);
    } else {
        console.log("A corrida terminou e empate");
    }
}

function SelectTwoRandomRacer() {
    let randomIndex1 = Math.floor(Math.random() * corredores.length);
    let corredor1 = corredores[randomIndex1];
    let corredor2;
    do {
        let randomIndex2 = Math.floor(Math.random() * corredores.length);
        corredor2 = corredores[randomIndex2];
    } while (corredor2 === corredor1);

    return [corredor1, corredor2];
}

(async function main() {
    const [corredor1, corredor2] = SelectTwoRandomRacer();
    console.log(
        `🏁🚨 Corrida entre ${corredor1.NOME} e ${corredor2.NOME} começando... \n`
    );

    await playRaceEngine(corredor1, corredor2);
    await winner(corredor1, corredor2);
})();
