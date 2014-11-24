var shrinkPaddleActions = new ActivityFactory("shrink-paddle");
//----------------------------------
//----------------------------------
shrinkPaddleActions.on('create', function(action){
    console.log("action created "+action.actionId  );
});
shrinkPaddleActions.on('start', function(action){
    console.log("action started "+action.actionId  );
    action.oldHeight=action.options.player.getHeight();
    action.duration = 1000;
    action.options.player.setHeight(10);
});
shrinkPaddleActions.on('stop', function(action){
    console.log("action stopped "+action.actionId  );
    action.options.player.setHeight( action.oldHeight );
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

var ballControl = new ActivityFactory("ball-control");
