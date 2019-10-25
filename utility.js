/*jshint esversion: 6 */

function selectCard(card) {
  $(card).addClass("pressed");
}

function unselectCard(card) {
  $(card).removeClass("pressed");
}

/*start the game*/
function gameStart(deck, board, selection) {
  deck = generateCards();
  board = [];
  selection = [];
  resetBoard(board, deck);
}

/*create a deck*/
function generateCards() {
  var cards = [];
  let numbers = ['1', '2', '3'];
  let colors = ['red', 'purple', 'green'];
  let fills = ['solid', 'striped', 'open'];
  let shapes = ['diamond', 'oval', 'squiggle'];

  numbers.forEach(function(number) {
    colors.forEach(function(color) {
      fills.forEach(function(fill) {
        shapes.forEach(function(shape) {
          cards.push({number: number, shape: shape, fill: fill, color: color});
        });
      });
    });
  });
  return  _.shuffle(cards);
}

/*fill the board with 12 cards*/
function fillBoard(board, deck) {
    for(var i = 1; i <= 12; i++) {
      let card = deck.shift();
      let number = card.number;
      let shape = card.shape;
      let fill = card.fill;
      let color = card.color;
      $('#btn' + i).prepend('<img class = "card" src="images/' + number + '_' + shape + '_' + fill + '_' + color + '.png"/>');
      board.push(card);
    }
}

function resetBoard(board, deck) {
  for(var i = 1; i <= 12; i++) {
    let card = deck.shift();
    let number = card.number;
    let shape = card.shape;
    let fill = card.fill;
    let color = card.color;
    $('#btn' + i).find("img").attr("src", 'images/' + number + '_' + shape + '_' + fill + '_' + color + '.png');
    board.push(card);
  }
}

function compare_value(card1_attr, card2_attr, card3_attr){
  var check = false;
  if ((card1_attr===card2_attr && card2_attr === card3_attr) || 
  ( card1_attr !== card2_attr && card2_attr !== card3_attr && card1_attr !== card3_attr)){
    check = true;
  }
  return check;
}

/*validate if the three cards form a set*/
function isSet(selection) {
  var check = true;
  //console.log(check);
  //console.log(selection);
  if (!compare_value(selection[0].number,selection[1].number,selection[2].number)){
    check = false;
  }
  if (!compare_value(selection[0].color,selection[1].color,selection[2].color)){
    
    check = false;
  }
  if (!compare_value(selection[0].fill,selection[1].fill,selection[2].fill)){
    
    check = false;
  }
  if (!compare_value(selection[0].shape,selection[1].shape,selection[2].shape)){
    
    check = false;
  }
  //console.log(selection);
  //console.log(check);
  return check;
}


//hint for player 
function hint(board){
  var hint_arr = [];
  for(var i = 0; i < board.length-2; i++){
    for(var j = i +1; i < board.length -1; j++){
      for (var k = j +1; k < board.length; k++){
       
          hint_arr.push(board[i],board[j],board[k]);
          if(isSet(hint_arr)){
            //console.log(isSet(hint_arr));
            console.log(hint_arr);
            //$("#"+i).effect( "shake", {times:4}, 1000 );

            set = true;
            hint_arr = [];
            return 0;
          }else{
            console.log(false);
          }
        
      }
    }
  }

}


