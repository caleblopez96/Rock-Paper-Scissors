const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]');
const SELECTIONS = [
{
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
},

{
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
},

{
    name: 'scissors',
    emoji: '✌️',
    beats: 'paper'
}
];

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
    const selectName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(selection => selection.name === selectName);
    makeSelection(selection);
    });
});

const makeSelection = (selection) => {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);
    addSelectionResults(computerSelection, computerWinner);
    addSelectionResults(selection, yourWinner);
    if (yourWinner) incrementScore(yourScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan)
};

const incrementScore = (scoreSpan) => {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

const addSelectionResults = (selection, winner) => {
    const div = document.createElement('div');
    div.innerText = selection.emoji;
    div.classList.add('resultSelection');
    if (winner) div.classList.add('.winner');
    finalColumn.after(div);
};

const isWinner = (selection, opponentSelection) => {
    return selection.beats === opponentSelection.name;
};

const randomSelection = () => {
const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex];
};