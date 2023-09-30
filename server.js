const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

app.listen(port, () => {
    console.log(`Listening on ${port} port`)
});

app.get('/', (req, res) => {
    // res.send('Hello')
    const url = 'https://fbref.com/en/squads/206d90db/2023-2024/all_comps/Barcelona-Stats-All-Competitions'
    let htmlResponse = '<h1>Informações dos Jogadores</h1>';

    JSDOM.fromURL(url).then(dom => {
        const document = dom.window.document;
        const playerInfoRows = document.querySelectorAll('#stats_standard_combined > tbody > tr');
        const shotsOnGoalRows = document.querySelectorAll('#stats_shooting_combined > tbody > tr');
        
        playerInfoRows.forEach((row, index) => {
            const shotRow = shotsOnGoalRows[index];
            const playerNameElement = row.querySelector('th > a');
            const playerGoalsElement = row.querySelector('td:nth-child(9)'); 
            const playerMatchesElement = row.querySelector('td:nth-child(5)'); 
            const playerAssistsElement = row.querySelector('td:nth-child(10)'); 
            const playerYellowCardsElement = row.querySelector('td:nth-child(15)'); 
            const playerRedCards = row.querySelector('td:nth-child(16)'); 
            const playerExpectedGoals = row.querySelector('td:nth-child(29)');
            const shotsOnGoalElement = shotRow ? shotRow.querySelector('td:nth-child(8)') : null;
            const totalShotsElement = shotRow ? shotRow.querySelector('td:nth-child(7)') : null;
            const hitsShotsElement = shotRow ? shotRow.querySelector('td:nth-child(9)') : null;
       
            if (playerNameElement) { 
                const playerName = playerNameElement.textContent;
                const playerMatches = playerMatchesElement.textContent;
                const playerGoals = playerGoalsElement.textContent;
                const playerAssists = playerAssistsElement.textContent;
                const playerRCards = playerRedCards.textContent;
                const playerYCards = playerYellowCardsElement.textContent;
                const expectedGoals = playerExpectedGoals.textContent;
                const shotsOnGoal = shotsOnGoalElement ? shotsOnGoalElement.textContent : 'N/A';
                const totalShots = totalShotsElement ? totalShotsElement.textContent : 'N/A';
                const hitsShots = hitsShotsElement ? hitsShotsElement.textContent : 'N/A';

                
                if (
                    playerGoals !== '0' && playerGoals !== 'N/A' ||
                    playerAssists !== '0' && playerAssists !== 'N/A' ||
                    playerRCards !== '0' && playerRCards !== 'N/A' ||
                    playerYCards !== '0' && playerYCards !== 'N/A' ||
                    expectedGoals !== '0' && expectedGoals !== 'N/A' ||
                    shotsOnGoal !== '0' && shotsOnGoal !== 'N/A' ||
                    totalShots !== '0' && totalShots !== 'N/A' ||
                    hitsShots !== '0' && hitsShots !== 'N/A'
                ) {

                    htmlResponse += `
                    <h4>Nome do Jogador: ${playerName}</h4><br>
                    Partidas: ${playerMatches}<br>
                    
                    <h4>Gols/Assistências</h4><br>
                    Gols: ${playerGoals}<br>
                    Taxa de acerto ao gol: ${hitsShots}%<br>
                    Finalizações: ${totalShots}<br>
                    Chutes a gol: ${shotsOnGoal}<br>
                    Expectativa de gols: ${expectedGoals} por partida<br>
                    Assistências: ${playerAssists}<br>
                    
                    <h4>Cartões:</h4>
                    Cartões Amarelos: ${playerYCards}<br>
                    Cartões Vermelhos: ${playerRCards}<br>
                    <hr>
                    `;
                }
            }
        });

        res.send(htmlResponse);
    })
})