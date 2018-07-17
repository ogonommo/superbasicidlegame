(function(){

  //Main holders
  //Buttons
  var start = $('#start');
  var stop = $('#stop');
  var sellbutton = $('#buymoney');
  var buysalesman = $('#buysalesmen');

  //UI
  var money = $('#money');

  //Stats holders
  var s_sold = $('#sold');
  var s_moneygen = $('#moneygen');
  var s_managers = $('#managers');
  var s_salesmen = $('#salesmen');
  var s_timespent = $('#timespent');

  //Constats
  var salesman_base = 100;

  //Local vars
  var started = false;
  var timer = null;

  var print = console.log;

  //Game object
  var game = {
    money: 0,
    sold: 0,
    managers: 1,
    salesmen: 0,
    moneygenerated: 0,
    timespent: 0
  }

  var save = window.localStorage;

  function saveGame() {
    save.setItem('game', JSON.stringify(game));
  }

  gameSave = save.getItem('game');
  if (gameSave && gameSave.length) {
    game = JSON.parse(gameSave);
    print('Save restore');
    print(game);
    updateStats();
  } else {
    saveGame();
    print('Game saved');
  }

  function updateStats() {
    money.html('Money: ' + game.money.toFixed(0));
    s_sold.html('Sold: ' + game.sold);
    s_moneygen.html('Money generated: ' + game.moneygenerated);
    s_managers.html('Managers: ' + game.managers);
    s_salesmen.html('Salesmen: ' + game.salesmen);
    s_timespent.html('Time passes since game init: ' + game.timespent);
  }

  function sell() {
    game.money++;
    game.moneygenerated++;
    game.sold++
    updateStats();
  }

  function update() {
    // update code
    game.timespent++;

    //update money from salesmen
    game.money += game.salesmen;
    game.sold += game.salesmen;
    game.moneygenerated += game.salesmen;
    updateStats();
    updateUI();
    saveGame();
  }

  function updateUI(){
    //salesmen cost for next
    var cost = salesman_base * Math.pow(1.1, game.salesmen);
    if (cost > game.money) {
      buysalesman.addClass('disabled');
    } else {
      buysalesman.removeClass('disabled');
    }
    buysalesman.html('Hire 1 salesmen | Cost: ' + cost.toFixed(0));
  }

  buysalesman.click(function(){
    var cost = salesman_base * Math.pow(1.1, game.salesmen);
    if (cost > game.money) {
      //
    } else {
      game.salesmen++;
      game.money -= cost;
    }
  });

  start.click(function(){
    if (!started) {
      started = true;
      timer = setInterval(function(){
        update();
      }, 1000);
    }
  });

  stop.click(function(){
    if (started) {
      started = false;
      clearInterval(timer);
    }
  });

  sellbutton.click(function(){
    if (started) {
      sell();
    }
  });

  updateStats();
  updateUI();

}())
