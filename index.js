// Card objects taking a suit and rank of the card
class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
// Find value of card
    cardValue() {
        var cardValue = parseInt(this.rank);
        
        if(isNaN(cardValue)) {
            switch(this.rank) {
                case 'J':
                    cardValue = 11;
                    break;
                case 'Q':
                    cardValue = 12;
                    break;
                case 'K':
                    cardValue = 13;
                    break;
                case 'A':
                    cardValue = 14;
                    break;
            }
        }
        
        return cardValue;
    }
}
// create deck object with methods to fill the deck with cards and shuffle.
class Deck {
    constructor(){        
        
        this.deckOfCards = [];
        this.stackDeck();

    }
// fill deck array with card objects    
    stackDeck() {
        let suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        let ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        for(let i = 0; i < suits.length; i++) {
            for(let j = 0; j < ranks.length; j++) {
                this.deckOfCards.push(new Card(suits[i], ranks[j]));
            }
        }
    }
//randomize deck
    shuffle() {
        if(this.deckOfCards.length == 0){
            this.stackDeck();
        }

        let shuffledDeck = [];
        while(this.deckOfCards.length > 0) {
            
            let randomCardSlot = Math.floor(Math.random() * this.deckOfCards.length);
            let randomCard = this.deckOfCards.splice(randomCardSlot, 1);
            shuffledDeck.push(randomCard[0]);
        }
        
        this.deckOfCards = shuffledDeck;
    }

}
// player objects with name, hand and points total
class Player {
    constructor(name){
        this.name = name;
        this.hand = [];
        this.points = 0;
    }
// play card from hand
    playCard() {
        let cardPlayed;

        if(this.hand.length === 0) {
            return null;
        }
        cardPlayed = this.hand.splice(0,1);
        console.log(`${this.name} played the ${cardPlayed[0]['rank']} of ${cardPlayed[0]['suit']}`);
        return cardPlayed[0];

    }
}
// Game object with game initializaion and rounds featuring two player objects and deck object
class Game {
    constructor() {
        this.player1;
        this.player2;
        this.deck;
    }
// start round
    start() {
        this.player1 = new Player(prompt('Enter Player 1\'s name:'));
        this.player2 = new Player(prompt('Enter Player 2\'s name:'));
        this.deck = new Deck();
        this.deck.shuffle();
        this.dealCards();
        this.playRound();
    }
// deal card objects to players from deck object
    dealCards() {
        while(this.deck.deckOfCards.length > 0){
            let dealtCard1 = this.deck.deckOfCards.splice(0, 1);
            this.player1.hand.push(dealtCard1[0]);
            let dealtCard2 = this.deck.deckOfCards.splice(0, 1);
            this.player2.hand.push(dealtCard2[0]);
        }
    }
// play round with players playing card from hand until hand is empty
    playRound() {
        while(this.player1.hand.length > 0 && this.player2.hand.length > 0) {

            let player1Card = this.player1.playCard();            
            let player2Card = this.player2.playCard();            

            let player1CardValue = player1Card.cardValue();
            let player2CardValue = player2Card.cardValue();
// increment points for whoever played the card with higher value, no points awarded for tie
            if(player1CardValue > player2CardValue) {
                this.player1.points++;
                console.log(`${this.player1.name} gets 1 point.`);
            } else if (player2CardValue > player1CardValue) {
                this.player2.points++;
                console.log(`${this.player2.name} gets 1 point.`);
            } else {
                console.log(`It was a tie!`);
            }
        }
// log points and winner
        console.log(`${this.player1.name} points: ${this.player1.points}`);
        console.log(`${this.player2.name} points: ${this.player2.points}`);
        if(this.player1.points > this.player2.points) {
            console.log(`${this.player1.name} wins!`);
        } else if(this.player2.points > this.player1.points) {
            console.log(`${this.player2.name} wins!`);
        } else {
            console.log(`It was a tie!`);
        }

    }
}
// initialize game
var throwDown = new Game();
throwDown.start();