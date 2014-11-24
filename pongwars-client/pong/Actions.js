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
	action.duration = 500;
	action.old_ball_color = action.options.pong.balls[0].color;
	action.ball_velocity = action.options.pong.balls[0].velocity;
	action.options.pong.setBallColor( '#D7803B' );
});

ballControl.on('stop', function(action){
	console.log("action stopped "+action.actionId  );
	// set old color and velocity
	action.options.pong.setBallColor(action.old_ball_color);
	action.options.pong.balls[0].setVelocity([action.ball_velocity.x, action.ball_velocity.y]);
	action.destroy();
});

ballControl.on('update', function(action){
	action.duration -= 1;

	$(document).keydown(function(e) {
		if(e.which==75){ // push up
			action.options.pong.balls[0].setVelocity([action.ball_velocity.x, 2*action.ball_velocity.y]);
		}
		if(e.which==77){ // push down
			action.options.pong.balls[0].setVelocity([action.ball_velocity.x, 0.5*action.ball_velocity.y]);
		}
	});
	$(document).keyup(function(e) {
		if(e.which==75){ // push up
			action.options.pong.balls[0].setVelocity([action.ball_velocity.x, action.ball_velocity.y]);
		}
		if(e.which==77){ // push down
			action.options.pong.balls[0].setVelocity([action.ball_velocity.x, action.ball_velocity.y]);
		}
	});

	if(action.duration<=0){
		action.stop();
	}
});

ballControl.on('destroy', function(action){
	console.log("action destroy "+action.actionId  );
});


allowedActions[allowedActions.name] = ballControl;



//============================================================
// invert-velocity
//============================================================

var invertVelocity = new ActivityFactory("invert-velocity");

invertVelocity.on('create', function(action){
	console.log("action created "+action.actionId  );
});

invertVelocity.on('start', function(action){
	console.log("action started "+action.actionId  );
	velo = action.options.pong.balls[0].velocity;
	action.options.pong.balls[0].setVelocity([velo.x, -velo.y]);
	action.stop();
});

invertVelocity.on('stop', function(action){
	console.log("action stopped "+action.actionId  );
	action.destroy();
});

invertVelocity.on('destroy', function(action){
	console.log("action destroy "+action.actionId  );
});

invertVelocity.on('update', function(action){
});


allowedActions[invertVelocity.name] = invertVelocity;




//============================================================
// invert controles the controls of you opponent
//============================================================

var invertControls = new ActivityFactory("invert-controls");

invertControls.on('create', function(action){
	console.log("action created "+action.actionId  );
});

invertControls.on('start', function(action){
	console.log("action started "+action.actionId  );

});

invertControls.on('stop', function(action){
	console.log("action stopped "+action.actionId  );
	action.destroy();
});

invertControls.on('destroy', function(action){
	console.log("action destroy "+action.actionId  );
});

invertControls.on('update', function(action){
});


allowedActions[invertControls.name] = invertControls;
