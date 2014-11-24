var allowedActions = {};

//============================================================
// shrink the other paddle
//============================================================

var shrinkPaddleActions = new ActivityFactory("shrink-paddle");
shrinkPaddleActions.on('create', function(action){
    console.log("action created "+action.actionId  );
});
shrinkPaddleActions.on('start', function(action){
    console.log("action started "+action.actionId  );
    action.duration = 1000;

	// find the correct player to apply
	action.active_player = action.options.player.side=="left"? action.options.pong.players.b : action.options.pong.players.a;

	// remember the last paddle state
	action.oldHeight=action.active_player.getHeight();

	console.log("player: "+action.options.player.side+" executes action on "+action.active_player.side);

	// apply
	action.active_player.setHeight(10);
});

shrinkPaddleActions.on('stop', function(action){
    console.log("action stopped "+action.actionId  );
    action.active_player.setHeight( action.oldHeight );
    action.destroy();
});
shrinkPaddleActions.on('destroy', function(action){
    console.log("action destroy "+action.actionId  );
});
shrinkPaddleActions.on('update', function(action){
    action.duration -= 1;
    if(action.duration<=0){
        action.stop();
    }
});
allowedActions[shrinkPaddleActions.name] = shrinkPaddleActions;

//============================================================
//let you controle the ball for some period of time
//============================================================

var ballControl = new ActivityFactory("ball-control");

ballControl.on('create', function(action){
	console.log("action created "+action.actionId  );
});

ballControl.on('start', function(action){
	console.log("action started "+action.actionId  );

});

ballControl.on('stop', function(action){
	console.log("action stopped "+action.actionId  );
	action.destroy();
});

ballControl.on('destroy', function(action){
	console.log("action destroy "+action.actionId  );
});

ballControl.on('update', function(action){
});


allowedActions[allowedActions.name] = ballControl;



//============================================================
// invert the controls of you opponent
//============================================================

var revertControls = new ActivityFactory("revert-controls");

revertControls.on('create', function(action){
	console.log("action created "+action.actionId  );
});

revertControls.on('start', function(action){
	console.log("action started "+action.actionId  );

});

revertControls.on('stop', function(action){
	console.log("action stopped "+action.actionId  );
	action.destroy();
});

revertControls.on('destroy', function(action){
	console.log("action destroy "+action.actionId  );
});

revertControls.on('update', function(action){
});


allowedActions[revertControls.name] = revertControls;

