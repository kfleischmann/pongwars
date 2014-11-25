var availableActions = {};

//============================================================
// shrink the other paddle
//============================================================

var shrinkPaddleActions = new ActivityFactory("shrink-paddle", true );
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
	action.oldspeed=action.active_player.speed;

	console.log("player: "+action.options.player.side+" executes action on "+action.active_player.side);

	// apply
	action.active_player.setHeight(25);
	action.active_player.setSpeed( action.oldspeed*2 );
});

shrinkPaddleActions.on('stop', function(action){
    console.log("action stopped "+action.actionId  );
	// apply
	action.active_player.setSpeed( action.oldspeed );
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
availableActions[shrinkPaddleActions.name] = shrinkPaddleActions;

//============================================================
//let you controle the ball for some period of time
//============================================================

var ballControl = new ActivityFactory("ball-control", true );

ballControl.on('create', function(action){
	console.log("action created "+action.actionId  );
});

ballControl.on('start', function(action){
	console.log("action started "+action.actionId  );
	action.duration = 500;
	action.old_ball_color = action.options.pong.balls[0].color;
	action.ball_velocity = action.options.pong.balls[0].velocity;
	action.options.pong.setBallColor( '0xD7803B' );
	function VZ(number){if(number<0) return -1; else return 1;}

	action.keydownHandler = function(e) {
		if(e.which==87){ // push up
			velo=action.options.pong.balls[0].velocity;
			action.options.pong.balls[0].setVelocity([ 	VZ(velo.x)*Math.abs(velo.x) ,
														Math.abs(velo.y)]);
		}
		if(e.which==83){ // push down
			velo=action.options.pong.balls[0].velocity;
			action.options.pong.balls[0].setVelocity([ 	VZ(velo.x)*Math.abs(velo.x) ,
														-Math.abs(velo.y)]);
		}
		// left 37
		// left 39
	};
	// remove handler
	$(document).bind('keydown', action.keydownHandler);
});

ballControl.on('stop', function(action){
	console.log("action stopped "+action.actionId  );
	// set old color and velocity
	function VZ(number){if(number<0) return -1; else return 1;}
	action.options.pong.setBallColor(action.old_ball_color);
	velo=action.options.pong.balls[0].velocity;
	action.options.pong.balls[0].setVelocity([ VZ(velo.x)*Math.abs(action.ball_velocity.x) , VZ(velo.y)*Math.abs(action.ball_velocity.y)]);

	// remove handler
	$(document).unbind('keydown', action.keydownHandler);

	action.destroy();
});

ballControl.on('update', function(action){
	action.duration -= 1;

	if(action.duration<=0){
		action.stop();
	}
});

ballControl.on('destroy', function(action){
	console.log("action destroy "+action.actionId  );
});

availableActions[ballControl.name] = ballControl;


//============================================================
// invert-velocity
//============================================================
var invertVelocity = new ActivityFactory("invert-velocity", true );
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
availableActions[invertVelocity.name] = invertVelocity;


//============================================================
// accelerate-ball
//============================================================
var invertControls = new ActivityFactory("invert-controls", true );
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
availableActions[invertControls.name] = invertControls;


//============================================================
// accelerate-ball
//============================================================
var fastBall = new ActivityFactory("fast-ball", false );
fastBall.on('create', function(action){
	console.log("action created "+action.actionId  );
	action.start();
});
fastBall.on('start', function(action){
	console.log("action started "+action.actionId  );
	action.duration = 500;
	action.old_ball_color = action.options.pong.balls[0].color;
	action.ball_velocity = action.options.pong.balls[0].velocity;
	function VZ(number){if(number<0) return -1; else return 1;}

	velo=action.options.pong.balls[0].velocity;

	// accelerate
	action.options.pong.balls[0].setVelocity([ 	1.5*VZ(velo.x)*Math.abs(action.ball_velocity.x) ,
												1.5*VZ(velo.y)*Math.abs(action.ball_velocity.y)]);

});
fastBall.on('stop', function(action){
	console.log("action stopped "+action.actionId  );

	// normal-speed
	action.options.pong.balls[0].setVelocity([ 	VZ(velo.x)*Math.abs(action.ball_velocity.x) ,
												VZ(velo.y)*Math.abs(action.ball_velocity.y)]);

	action.destroy();
});

fastBall.on('destroy', function(action){
	console.log("action destroy "+action.actionId  );
});

fastBall.on('update', function(action){
	action.duration -= 1;

	if(action.duration<=0){
		action.stop();
	}
});
availableActions[fastBall.name] = fastBall;
