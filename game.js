/*jshint esversion: 6 */

var deck = generateCards();
var board =[];
var selection = [];
var score = 0;
fillBoard(board, deck);
var remain = deck.length;
/* for debugging */
// console.log(deck);
// console.log(board);
// console.log(selection);

$("#restart-btn").click(function() {
  playSound("restart");
  $(".pressed").removeClass("pressed");
  score = 0;
  document.getElementById('score').innerHTML= score;
  deck = generateCards();
  board = [];
  selection = [];
  resetBoard(board, deck);
  remain = deck.length;
  document.getElementById('remain').innerHTML= remain;
  // clearStopwatch();
  // startStopwatch();
  /* for debugging */
  // console.log(score);
  // console.log(deck);
  // console.log(board);
  // console.log(selection);
});

$("#hint").click(function() {
  playSound("hint");
  let hint_arr = hint(board);
  /* for debugging */
  // console.log(hint_arr);

  if(hint_arr.length > 0) {

    let card1 = 'images/' + board[parseInt(hint_arr[0], 10)].number + '_' + board[parseInt(hint_arr[0], 10)].shape + '_' + board[parseInt(hint_arr[0], 10)].fill + '_' + board[parseInt(hint_arr[0], 10)].color + '.png';
    let card2 = 'images/' + board[parseInt(hint_arr[1], 10)].number + '_' + board[parseInt(hint_arr[1], 10)].shape + '_' + board[parseInt(hint_arr[1], 10)].fill + '_' + board[parseInt(hint_arr[1], 10)].color + '.png';
    let card3 = 'images/' + board[parseInt(hint_arr[2], 10)].number + '_' + board[parseInt(hint_arr[2], 10)].shape + '_' + board[parseInt(hint_arr[2], 10)].fill + '_' + board[parseInt(hint_arr[2], 10)].color + '.png';

    $("img[src='" + card1 + "']").parent().toggleClass("hint");
    $("img[src='" + card2 + "']").parent().toggleClass("hint");
    $("img[src='" + card3 + "']").parent().toggleClass("hint");
    setTimeout(function(){
      $("img[src='" + card1 + "']").parent().removeClass("hint");
    },200);
    setTimeout(function(){
      $("img[src='" + card2 + "']").parent().removeClass("hint");
    },200);
    setTimeout(function(){
      $("img[src='" + card3 + "']").parent().removeClass("hint");
    },200);

  }
  else {
    alert("No set exists. The board will be reset!");
    if(deck.length > 0) {
      deck = deck.concat(board);
      deck = _.shuffle(deck);
      board = [];
      resetBoard(board, deck);
    }
    else {
      alert("Game over!!");
      score = 0;
      document.getElementById('score').innerHTML= score;
      deck = generateCards();
      board = [];
      selection = [];
      resetBoard(board, deck);
      remain = deck.length;
      document.getElementById('remain').innerHTML= remain;
    }
  }
  /* for debugging */
  // console.log(deck);
  // console.log(board);
  // console.log(selection);
});

$(".btn").click(function() {
  //get the card attributes
  let selectedCard = $(this).find("img").attr("src");
  let id = $(this).attr("id");
  let pattern = selectedCard.substring(7, selectedCard.length - 4).split("_");
  let card = {number: pattern[0], shape: pattern[1], fill: pattern[2], color: pattern[3]};

  if($(this).hasClass("pressed")) {
    unselectCard(this);
    selection.splice(selection.indexOf(id), 1);
  }
  else {
    if(selection.length < 3) {
      selectCard(this);
      selection.push(id);
    }
    if(selection.length == 3) {
      let test = isSet(selection, board);
      if(test) {
        playSound("right");
        score++;
        document.getElementById('score').innerHTML= score;
        replaceThree(board, deck, selection);
        remain = deck.length;
        document.getElementById('remain').innerHTML= remain;
        console.log(deck);
        console.log(board);
        console.log(selection);

      }
      else {
        playSound("wrong");
      }
      selection = [];
      $(".pressed").removeClass("pressed");
    }
  }
  
});
