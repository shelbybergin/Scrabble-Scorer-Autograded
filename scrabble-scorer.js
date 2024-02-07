// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) { // oldScrabbleScorer function
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let word = input.question("Enter a word to score: ");
   let result = oldScrabbleScorer(word);
   // console.log(result);
   return word;
};


function simpleScorer(word) {  //simpleScorer function
   word = word.toUpperCase();
   return word.length
}

function vowelBonusScorer(word) {  //vowelBonusScorer function
   word = word.toUpperCase();
   let score = 0;
   const vowels = ['A', 'E', 'I', 'O', 'U'];

   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
}

// let simpleScorer;

// let vowelBonusScorer;

let scrabbleScorer;

const scoringAlgorithms = [
   {name: "Simple Score", description: "Each letter is worth 1 point.", scorerFunction: simpleScorer},
   {name: "Bonus Vowels", description: "Vowels are 3 pts, consonants are 1 pt.", scorerFunction: vowelBonusScorer},
   {name: "Scrabble", description: "The traditional scoring algorithm.", scorerFunction: oldScrabbleScorer}
 
];

function scorerPrompt(word) {
   console.log("Which scoring algorithm would you like to use?");

   for (let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }

   let selection = Number(input.question("Enter 0, 1, or 2: "));
 
   console.log(`Score for '${word}': ${scoringAlgorithms[selection].scorerFunction(word)}`);

   return scoringAlgorithms[selection];
}

function transform(oldPointStructure) {
   let newPointStructure = {};

   for (let pointValue in oldPointStructure) {
       let letters = oldPointStructure[pointValue];

       for (let i = 0; i < letters.length; i++) {
           let letter = letters[i].toLowerCase();
           newPointStructure[letter] = Number(pointValue);
       }
   }

   return newPointStructure;
}


let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   scorerPrompt(word);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
