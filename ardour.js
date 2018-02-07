loadedInterfaceName = "Ardour-controller";

interfaceOrientation = "landscape";

infoText = "ControlOSC template for Ardour 5";


/***** Variables ********/

button_step = 0.08;
button_w = 0.05;
button_h = 0.07;

strip_x_step = 0.125;
fader_y = 0.32;
fader_w = 0.042;
fader_h = 0.62;

vu_y = 0.32;
vu_w = 0.01;
vu_h = 0.62;

sel_y = 0.08;
sel_w = 0.115;
sel_h = 0.07;

unit_y = fader_y + ((1-0.781786739826) * fader_h);


/***************** Functions ***********************/
control.Refresh = function() {
    oscManager.sendOSC(["/refresh"]);
    //oscManager.sendOSC(["/jog/mode","i",0]);
}

connectArdour = function () {
    
    oscManager.sendOSC(["/set_surface/bank_size", "i",  6]);
    oscManager.sendOSC(["/set_surface/strip_types", "i", 31]);
    oscManager.sendOSC(["/set_surface/feedback", "i", 2455]);
    oscManager.sendOSC(["/set_surface/gainmode", "i", 1]);
    oscManager.sendOSC(["/set_surface/send_page_size", "i", 0]);
    oscManager.sendOSC(["/set_surface/plugin_page_size", "i", 0]);
}

showChild = function(name) {
    switch(name) {
        case "showStripsButton":
            showGlobalButton.setValue(0);
            showStripsButton.setValue(1);
            menuButton.setValue(0);
            control.hideToolbar();
            control.changePage(1);
            break;
        case "showGlobalButton":
            showStripsButton.setValue(0);
            showGlobalButton.setValue(1);
            menuButton.setValue(0);
            control.hideToolbar();
            control.changePage(2);
            break;
        case "menuButton":
            control.showToolbar();
            showStripsButton.setValue(0);
            showGlobalButton.setValue(0);
            control.changePage(3);
            break;
        default:
            break;
    }
}

oscManager.delegate = {
    processOSC : function(oscAddress, typetags, args) {
        switch(oscAddress) {
            case "/bank_up":
                page1Button.setValue(args[0]);
                if (
                    args[0] == 0 ) {page1Label.setValue('')
                } else {
                    if ( bankButton.value == 7) {
                        page1Label.setValue('Next >>>');
                    } else if ( bankButton.value == 6) {
                        page1Label.setValue('Next >');
                    };
                };
                break;
            case "/bank_down":
                page0Button.setValue(args[0]);
                if (args[0] == 0 ) {
                    page0Label.setValue('')
                } else {
                    if ( bankButton.value == 7) {
                        page0Label.setValue('<<< Prev');
                    } else if ( bankButton.value == 6) {
                        page0Label.setValue('< Prev ');
                    };
                };
                break;
            case "/access_action/Transport/ToggleAutoReturn":
                alert("return");
                break;
            case "/position/time":
                timePositionLabel.setValue(args[0]);
                break;
            case "/refresh":
                control.Refresh();
                showChild("showStripsButton");
                break;
            default:
                oscManager.processOSC(oscAddress, typetags, args);
                break;
        }
    }
}



changeBank = function(direction) {

    oscManager.sendOSC(["/jog","f",direction]);

}


choiceMoveBank = function() {
    
    if ( bankButton.value == 7) {
        bankLabel.setValue('Bank');
        page1Label.setValue('Next >>>');
        page0Label.setValue('<<< Prev ');
    }
    else if(bankButton.value == 6) {
        bankLabel.setValue('Track');
        page1Label.setValue('Next >');
        page0Label.setValue('< Prev ');
    }
}

changePan = function(widget,label) {
    pan =((widget.value-0.5)*2).toFixed(2);
    panPan = "C";
    if (pan < 0 ) { panPan = "L " + Math.abs(pan) }
    if ( pan > 0 ) { panPan = "R " + pan };
    label.setValue(panPan);
}

onTouchJog = function(mode) {
    oscManager.sendOSC(['/jog/mode','i',mode]);
}

onMoveJog = function (value) {
    oscManager.sendOSC(['/jog','f', value]); 
}




constants = [

/* Horizontal Space ------------------------*/
{
    "name": "sessionLabel",
    "type": "Label",
    "x": .0,
    "y": .0,
    "width": .09,
    "height": .07,
    "color": "#ffffff",
    "value": "Session:",
},
{
    "name": "sessionNameLabel",
    "type": "Label",
    "x": .1,
    "y": .0,
    "width": .3,
    "height": .07,
    "color": "#ffffff",
    "align": "left",
    "value": "",
    "address": "/session_name",
    "size": 18,
},

{
    "name": "showStripsButton",
    "type": "Button",
    "x": .5,
    "y": .0,
    "width": .09,
    "height": .07,
    "color": "#000088",
    "stroke": "#000088",
    "isLocal": true,
    "backgroundColor": "#004",
    "min":1, "max":1,
    "startingValue": 0,
    "ontouchstart": "showChild(this.name);",
},
{
    "name": "showStripsLabel",
    "type": "Label",
    "x": .5,
    "y": .0,
    "width": .09,
    "height": .07,
    "color": "#ffffff",
    "value": "Strips",
},
{
    "name": "showGlobalButton",
    "type": "Button",
    "x": .6,
    "y": .0,
    "width": .09,
    "height": .07,
    "color": "#000088",
    "stroke": "#000088",
    "isLocal": true,
    "backgroundColor": "#004",
    "min":1, "max":1,
    "startingValue": 0,
    "ontouchstart": "showChild(this.name);",
	
},
{
    "name": "showGlobalLabel",
    "type": "Label",
    "x": .6,
    "y": .0,
    "width": .09,
    "height": .07,
    "color": "#ffffff",
    "value": "Global",
},
{
    "name": "menuButton",
    "type": "Button",
    "x": .7,
    "y": .0,
    "width": .09,
    "height": .07,
    "color": "#333",
    "isLocal": true,
    "min":1, "max":1,
    "startingValue": 0,
	"ontouchstart": "showChild(this.name);",

	
},
{
    "name": "menuLabel",
    "type": "Label",
    "x": .7,
    "y": .0,
    "width": .09,
    "height": .07,
    "color": "#ffffff",
    "value": "ControlOSC",
},
{
	"name": "reloadButton",
	"type": "Button",
	"x": .8,
	"y": .0,
	"width": .09,
	"height": .07,
	"isLocal": true,
	"mode": "momentary",
	"color": "#000000",
	"stroke": "#aaaaaa",
	"ontouchstart": "interfaceManager.refreshInterface(); connectArdour();",
	"ontouchend":  "control.pushDestination('192.168.1.44:3819');",

	
},
{
    "name": "reloadLabel",
    "type": "Label",
    "x": .8,
    "y": .0,
    "width": .09,
    "height": .07,
    "color": "#ffffff",
    "value": "Reload",
},
{
	"name": "refreshButton",
	"type": "Button",
	"x": .9,
	"y": .0,
	"width": .09,
	"height": .07,
	"isLocal": true,
	"mode": "momentary",
	"color": "#000000",
	"stroke": "#aaaaaa",
	"ontouchstart": "showChild('showStripsButton');",
	"ontouchend": "control.Refresh(); showStripsButton.setValue(1);",
},
{
    "name": "refreshLabel",
    "type": "Label",
    "x": .9,
    "y": .0,
    "width": .09,
    "height": .07,
    "color": "#ffffff",
    "value": "Refresh",
},

/* Right Space ----------------------------------*/

{
    "name": "startButton",
    "type": "Button",
    "x": .88,
    "y": .24,
    "width": .055,
    "height": .07,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
    "mode": "momentary",
    "min":0, "max":1,
	"address": "/goto_start",

},
{
    "name": "startLabel",
    "type": "Label",
    "x": .88,
    "y": .24,
    "width": .055,
    "height": .07,
    "color": "#ffffff",
    "value": "Start",
},
{
    "name": "endButton",
    "type": "Button",
    "x": .94,
    "y": .24,
    "width": .055,
    "height": .07,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
    "mode": "momentary",
    "min":0, "max":1,
	"address": "/goto_end",
},
{
    "name": "endlabel",
    "type": "Label",
    "x": .94,
    "y": .24,
    "width": .055,
    "height": .07,
    "color": "#ffffff",
    "value": "End",
},
{
    "name": "playButton",
    "type": "Button",
    "x": .88,
    "y": .32,
    "width": .115,
    "height": .09,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
    "mode": "toggle",
    "min":1, "max":1,
    "startingValue": 0,
	"address": "/transport_play",
	"ontouchstart": "stopButton.setValue(0); if(this.value == this.max) { this.setValue( 1 ); }",
},
{
    "name": "playLabel",
    "type": "Label",
    "x": .88,
    "y": .32,
    "width": .115,
    "height": .09,
    "color": "#ffffff",
    "value": "Play   &#9654",
},
{
    "name": "stopButton",
    "type": "Button",
    "x": .88,
    "y": .42,
    "width": .115,
    "height": .09,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
    "mode": "toggle",
    "min":1, "max":1,
	"address": "/transport_stop",
	"ontouchstart": "playButton.setValue(0);  ",
},
{
    "name": "stopLabel",
    "type": "Label",
    "x": .88,
    "y": .42,
    "width": .115,
    "height": .09,
    "color": "#ffffff",
    "value": "Stop   &#9632",
},
{
    "name": "toggleLoopButton",
    "type": "Button",
    "x": .88,
    "y": .52,
    "width": .115,
    "height": .07,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
    "min":1, "max":1,
	"address": "/loop_toggle",
	"ontouchstart": " stopButton.setValue(0);",
	
	
},
{
    "name": "toggleLoopLabel",
    "type": "Label",
    "x": .88,
    "y": .52,
    "width": .115,
    "height": .07,
    "color": "#ffffff",
    "value": "Loop &#9675",
},

{
    "name": "bankButton",
    "type": "Button",
    "x": strip_x_step * 6 + .083,
    "y": button_step * 1,
    "width": .078,
    "height": .07,
    "color": "#aa3333",
    "backgroundColor": "#33aa33",
    "min": 6, "max": 7,
    "startingValue": 7,
    "ontouchstart": "choiceMoveBank()",
},
{
    "name": "bankLabel",
    "type": "Label",
    "x": strip_x_step * 6 + .083,
    "y": button_step * 1,
    "width": .078,
    "height": .07,
    "color": "#ffffff",
    "value": "Bank",
   
},
{
    "name": "page0Button",
    "type": "Button",
    "x": strip_x_step * 6,
    "y": button_step * 1,
    "width": .078,
    "height": .07,
    "color": "#666666",
    "min": 1, "max": 1,
    "ontouchstart": "onTouchJog(bankButton.value);",
    "ontouchend": "onMoveJog(-1);",
},
{
    "name": "page0Label",
    "type": "Label",
    "x": strip_x_step * 6,
    "y": button_step * 1,
    "width": .078,
    "height": .07,
    "color": "#ffffff",
    "value": "Prev",
   
},
{
    "name": "page1Button",
    "type": "Button",
    "x": strip_x_step * 6 + .166,
    "y": button_step * 1,
    "width": .078,
    "height": .07,
    "color": "#666666",
    "min": 1, "max": 1,
    "ontouchstart": "onTouchJog(bankButton.value)",
    "ontouchend": "onMoveJog(1);",
},
{
    "name": "page1Label",
    "type": "Label",
    "x": strip_x_step * 6 + .166,
    "y": button_step * 1,
    "width": .078,
    "height": .07,
    "color": "#ffffff",
    "value": "Next",
    
},

/* Master Section ----------------------------*/

{
    "name": "soloCancelButton",
    "type": "Button",
    "x": strip_x_step * 6 + .065,
    "y": button_step * 4,
    "width": button_w,
    "height": button_h,
    "color": "#ff0000",
    "stroke": "#ff0000",
    "backgroundColor": "#040",
    "mode": "momentary",
	"address": "/cancel_all_solos",
	
},
{
    "name": "soloCancelLabel",
    "type": "Label",
    "x": strip_x_step * 6 + .065,
    "y": button_step * 4,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "Solos",
},
{
    "name": "muteMasterButton",
    "type": "Button",
    "x": strip_x_step * 6 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#aaaa00",
    "backgroundColor": "#330",
    "address": "/master/mute",
},
{
    "name": "muteMasterLabel",
    "type": "Label",
    "x": strip_x_step * 6 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "M",
},
{
    "name": "recEnabletButton",
    "type": "Button",
    "x": strip_x_step * 6 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ff0000",
    "stroke": "#ff0000",
    "backgroundColor": "#400",
    "min": 1, "max": 1,
    "startingValue": 0,
	"address": "/rec_enable_toggle",
},
{
    "name": "recEnableLabel",
    "type": "Label",
    "x": strip_x_step * 6 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "Rec  &#9673",
},
{
    "name": "masterSlider",
    "type": "Slider",
    "x": strip_x_step*6,
    "y": fader_y,
    "width": fader_w,
    "height": fader_h,
    "startingValue": .0,
    "color": "#aa4444",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "isInverted": false,
    "isVertical": true,
    "protocol": "OSC",
    "address": "/master/fader",
    "oninit": "control.Refresh()",
},
{
    "name": "vuMaster",
    "type": "Slider",
    "isVertical" : true,
    "x": strip_x_step*6+.048,
    "y": vu_y,
    "width": vu_w,
    "height": vu_h,
    "color": "#ff0",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/master/meter",
    "ontouchstart": "this.setValue(0)",
    "ontouchend": "this.setValue(0)",
},

{
    "name": "unitMasterLabel",
    "type": "Label",
    "x": strip_x_step*6,
    "y": unit_y,
    "width": fader_w,
    "height": .001,
    "backgroundColor": "#888888",

},
/*{
    "name": "masterLabel",
    "type": "Label",
    "x": .75,
    "y": .7,
    "width": .055,
    "height": .03,
    "color": "#ffffff",
    "value": "Master",
},*/

];

pages = [
/* Page 0 "Strips" *******************************************/
[

],

/* Page 1 "Strips" ******************************************/
[
/* Solo strip ------------------------------------------*/
{
    "name": "soloButton1",
    "type": "Button",
    "x": strip_x_step * 0 + .065,
    "y": button_step * 4,
    "width": button_w,
    "height": button_h,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
	"address": "/strip/solo/1",
},
{
    "name": "soloLabel1",
    "type": "Label",
    "x": strip_x_step * 0 + .065,
    "y": button_step *4,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "S",
},
{
    "name": "soloButton2",
    "type": "Button",
    "x": strip_x_step * 1 + .065,
    "y": button_step * 4,
    "width": button_w,
    "height": button_h,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
	"address": "/strip/solo/2",
	
},
{
    "name": "soloLabel2",
    "type": "Label",
    "x": strip_x_step * 1 + .065,
    "y": button_step *4,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "S",
},
{
    "name": "soloButton3",
    "type": "Button",
    "x": strip_x_step * 2 + .065,
    "y": button_step *4,
    "width": button_w,
    "height": button_h,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
	"address": "/strip/solo/3",
	
},
{
    "name": "soloLabel3",
    "type": "Label",
    "x": strip_x_step * 2 + .065,
    "y": button_step *4,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "S",
},
{
    "name": "soloButton4",
    "type": "Button",
    "x": strip_x_step * 3 + .065,
    "y": button_step *4,
    "width": button_w,
    "height": button_h,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
	"address": "/strip/solo/4",
	
},
{
    "name": "soloLabel4",
    "type": "Label",
    "x": strip_x_step * 3 + .065,
    "y": button_step *4,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "S",
},
{
    "name": "soloButton5",
    "type": "Button",
    "x": strip_x_step * 4 + .065,
    "y": button_step *4,
    "width": button_w,
    "height": button_h,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
	"address": "/strip/solo/5",
	
},
{
    "name": "soloLabel5",
    "type": "Label",
    "x": strip_x_step * 4 + .065,
    "y": button_step *4,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "S",
},
{
    "name": "soloButton6",
    "type": "Button",
    "x": strip_x_step * 5 + .065,
    "y": button_step *4,
    "width": button_w,
    "height": button_h,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
	"address": "/strip/solo/6",
	
},
{
    "name": "soloLabel6",
    "type": "Label",
    "x": strip_x_step * 5 + .065,
    "y": button_step *4,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "S",
},

/* Mute strip ---------------------------------*/
{
    "name": "muteButton1",
    "type": "Button",
    "x": strip_x_step * 0 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#aaaa00",
    "backgroundColor": "#330",
    "address": "/strip/mute/1",
},
{
    "name": "muteLabel1",
    "type": "Label",
    "x": strip_x_step * 0 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "M",
},
{
    "name": "muteButton2",
    "type": "Button",
    "x": strip_x_step * 1 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#aaaa00",
    "backgroundColor": "#330",
    "address": "/strip/mute/2",
},
{
    "name": "muteLabel2",
    "type": "Label",
    "x": strip_x_step * 1 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "M",
},
{
    "name": "muteButton3",
    "type": "Button",
    "x": strip_x_step * 2 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#aaaa00",
    "backgroundColor": "#330",
    "address": "/strip/mute/3",
},
{
    "name": "muteLabel3",
    "type": "Label",
    "x": strip_x_step * 2 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "M",
},
{
    "name": "muteButton4",
    "type": "Button",
    "x": strip_x_step * 3 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#aaaa00",
    "backgroundColor": "#330",
    "address": "/strip/mute/4",
},
{
    "name": "muteLabel4",
    "type": "Label",
    "x": strip_x_step * 3 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "M",
},
{
    "name": "muteButton5",
    "type": "Button",
    "x": strip_x_step * 4 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#aaaa00",
    "backgroundColor": "#330",
    "address": "/strip/mute/5",
},
{
    "name": "muteLabel5",
    "type": "Label",
    "x": strip_x_step * 4 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "M",
},
{
    "name": "muteButton6",
    "type": "Button",
    "x": strip_x_step * 5 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#aaaa00",
    "backgroundColor": "#330",
    "address": "/strip/mute/6",
},
{
    "name": "muteLabel6",
    "type": "Label",
    "x": strip_x_step * 5 + .065,
    "y": button_step * 5,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "M",
},

/* Rec strip -----------------------------------------*/
{
    "name": "recButton1",
    "type": "Button",
    "x": strip_x_step * 0 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ff0000",
    "stroke": "#ff0000",
    "backgroundColor": "#400",
	"address": "/strip/recenable/1",
	
},
{
    "name": "recLabel1",
    "type": "Label",
    "x": strip_x_step * 0 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "R",
},
{
    "name": "recButton2",
    "type": "Button",
    "x": strip_x_step * 1 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ff0000", 
    "stroke": "#ff0000",
    "backgroundColor": "#400",
	"address": "/strip/recenable/2",
	
},
{
    "name": "recLabel2",
    "type": "Label",
    "x": strip_x_step * 1 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h, 
    "color": "#ffffff",
    "value": "R",
},
{
    "name": "recButton3",
    "type": "Button",
    "x": strip_x_step * 2 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ff0000",
    "stroke": "#ff0000",
    "backgroundColor": "#400",
	"address": "/strip/recenable/3",
	
},
{
    "name": "recLabel3",
    "type": "Label",
    "x": strip_x_step * 2 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "R",
},
{
    "name": "recButton4",
    "type": "Button",
    "x": strip_x_step * 3 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ff0000",
    "stroke": "#ff0000",
    "backgroundColor": "#400",
	"address": "/strip/recenable/4",
	
},
{
    "name": "recLabel4",
    "type": "Label",
    "x": strip_x_step * 3 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "R",
},
{
    "name": "recButton5",
    "type": "Button",
    "x": strip_x_step * 4 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ff0000",
    "stroke": "#ff0000",
    "backgroundColor": "#400",
	"address": "/strip/recenable/5",
	
},
{
    "name": "recLabel5",
    "type": "Label",
    "x": strip_x_step * 4 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "R",
},
{
    "name": "recButton6",
    "type": "Button",
    "x": strip_x_step * 5 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ff0000",
    "stroke": "#ff0000",
    "backgroundColor": "#400",
	"address": "/strip/recenable/6",
	
},
{
    "name": "recLabel6",
    "type": "Label",
    "x": strip_x_step * 5 + .065,
    "y": button_step * 6,
    "width": button_w,
    "height": button_h,
    "color": "#ffffff",
    "value": "R",
},


/* Select strip -------------------------------------*/
{
    "name": "selectButton1",
    "type": "Button",
    "x": strip_x_step * 0,
    "y": sel_y,
    "width": sel_w,
    "height": sel_h,
    "min": 1, "max": 1,
    "color": "#aaaa00",
    "address": "/strip/select/1",
},

{
    "name": "selectButton2",
    "type": "Button",
    "x": strip_x_step * 1,
    "y": sel_y,
    "width": sel_w,
    "height": sel_h,
    "min": 1, "max": 1,
    "color": "#aaaa00",
    "address": "/strip/select/2",
},

{
    "name": "selectButton3",
    "type": "Button",
    "x": strip_x_step * 2,
    "y": sel_y,
    "width": sel_w,
    "height": sel_h,
    "min": 1, "max": 1,
    "color": "#aaaa00",
    "address": "/strip/select/3",
},

{
    "name": "selectButton4",
    "type": "Button",
    "x": strip_x_step * 3,
    "y": sel_y,
    "width": sel_w,
    "height": sel_h,
    "min": 1, "max": 1,
    "color": "#aaaa00",
    "address": "/strip/select/4",
},

{
    "name": "selectButton5",
    "type": "Button",
    "x": strip_x_step * 4,
    "y": sel_y,
    "width": sel_w,
    "height": sel_h,
    "min": 1, "max": 1,
    "color": "#aaaa00",
    "address": "/strip/select/5",
},

{
    "name": "selectButton6",
    "type": "Button",
    "x": strip_x_step * 5,
    "y": sel_y,
    "width": sel_w,
    "height": sel_h,
    "min": 1, "max": 1,
    "color": "#aaaa00",
    "address": "/strip/select/6",
},



/* Pan strip --------------------------------------------*/
{
    "name": "panLabel1",
    "type": "Label",
    "x": strip_x_step * 0,
    "y": button_step * 1 + .06,
    "width": .115,
    "height": .07,
    "color": "#ffffff",
    "value": "-",
},
{
    "name": "centerButton1",
    "type": "Button",
    "mode": "momentary",
    "x": strip_x_step * 0,
    "y": button_step * 1 + .12,
    "width": .115,
    "height": .035,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
	"ontouchstart": "panSlide1.setValue(.5)",
},
{
    "name": "panButton1",
    "type": "Button",
    "mode": "momentary",
    "x": strip_x_step * 0 + .115/2,
    "y": button_step * 1 + .12,
    "width": .002,
    "height": .07,
    "color": "#ffffff",
},
{
    "name": "panSlide1",
    "type": "Slider",
    "x": strip_x_step * 0,
    "y": button_step * 3,
    "width": .115,
    "height": .07,
    "startingValue": .5,
    "isXFader": false,
    "color": "#000000",
    "backgroundColor": "#000000",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/strip/pan_stereo_position/1", 
    "onvaluechange": "changePan(this, panLabel1);panButton1.setBounds([strip_x_step * 0 + (.115*this.value),button_step * 1 + .12, .002,.07]);",  
},


{
    "name": "panLabel2",
    "type": "Label",
    "x": strip_x_step * 1,
    "y": button_step * 1 + .06,
    "width": .115,
    "height": .07,
    "color": "#ffffff",
    "value": "-",
},
{
    "name": "centerButton2",
    "type": "Button",
    "mode": "momentary",
    "x": strip_x_step * 1,
    "y": button_step * 1 + .12,
    "width": .115,
    "height": .035,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
	"ontouchstart": "panSlide2.setValue(.5)",
	
},
{
    "name": "panButton2",
    "type": "Button",
    "mode": "momentary",
    "x": strip_x_step * 1 + .115/2,
    "y": button_step * 1 + .12,
    "width": .002,
    "height": .07,
    "color": "#ffffff",
},
{
    "name": "panSlide2",
    "type": "Slider",
    "x": strip_x_step * 1,
    "y": button_step * 3,
    "width": .115,
    "height": .07,
    "startingValue": .5,
    "isXFader": false,
    "color": "#000000",
    "backgroundColor": "#000000",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/strip/pan_stereo_position/2", 
    "onvaluechange": "changePan(this, panLabel2);panButton2.setBounds([strip_x_step * 1 + (.115*this.value), button_step * 1 + .12, .002,.07]);",  
},
{
    "name": "panLabel3",
    "type": "Label",
    "x": strip_x_step * 2,
    "y": button_step * 1 + .06,
    "width": .115,
    "height": .07,
    "color": "#ffffff",
    "value": "-",
},
{
    "name": "centerButton3",
    "type": "Button",
    "mode": "momentary",
    "x": strip_x_step * 2,
    "y": button_step * 1 + .12,
    "width": .115,
    "height": .035,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
	"ontouchstart": "panSlide3.setValue(.5)",
},
{
    "name": "panButton3",
    "type": "Button",
    "mode": "momentary",
    "x": strip_x_step * 2 + .115/2,
    "y": button_step * 1 + .12,
    "width": .002,
    "height": .07,
    "color": "#ffffff",
},
{
    "name": "panSlide3",
    "type": "Slider",
    "x": strip_x_step * 2,
    "y": button_step * 3,
    "width": .115,
    "height": .07,
    "startingValue": .5,
    "isXFader": false,
    "color": "#000000",
    "backgroundColor": "#000000",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/strip/pan_stereo_position/3", 
    "onvaluechange": "changePan(this, panLabel3);panButton3.setBounds([strip_x_step * 2 + (.115*this.value), button_step * 1 + .12, .002,.07]);",  
},
{
    "name": "panLabel4",
    "type": "Label",
    "x": strip_x_step * 3,
    "y": button_step * 1 + .06,
    "width": .115,
    "height": .07,
    "color": "#ffffff",
    "value": "-",
},
{
    "name": "centerButton4",
    "type": "Button",
    "mode": "momentary",
    "x": strip_x_step * 3,
    "y": button_step * 1 + .12,
    "width": .115,
    "height": .035,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
	"ontouchstart": "panSlide4.setValue(.5)",
},
{
    "name": "panButton4",
    "type": "Button",
    "mode": "momentary",
    "x": strip_x_step * 3 + .115/2,
    "y": button_step * 1 + .12,
    "width": .002,
    "height": .07,
    "color": "#ffffff",
},
{
    "name": "panSlide4",
    "type": "Slider",
    "x": strip_x_step * 3,
    "y": button_step * 3,
    "width": .115,
    "height": .07,
    "startingValue": .5,
    "isXFader": false,
    "color": "#000000",
    "backgroundColor": "#000000",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/strip/pan_stereo_position/4", 
    "onvaluechange": "changePan(this, panLabel4);panButton4.setBounds([strip_x_step * 3 + (.115*this.value), button_step * 1 + .12, .002,.07]);",  
},
{
    "name": "panLabel5",
    "type": "Label",
    "x": strip_x_step * 4,
    "y": button_step * 1 + .06,
    "width": .115,
    "height": .07,
    "color": "#ffffff",
    "value": "-",
},
{
    "name": "centerButton5",
    "type": "Button",
    "mode": "momentary",
    "x": strip_x_step * 4,
    "y": button_step * 1 + .12,
    "width": .115,
    "height": .035,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
	"ontouchstart": "panSlide5.setValue(.5)",
},
{
    "name": "panButton5",
    "type": "Button",
    "mode": "momentary",
    "x": strip_x_step * 4 + .115/2,
    "y": button_step * 1 + .12,
    "width": .002,
    "height": .07,
    "color": "#ffffff",
},
{
    "name": "panSlide5",
    "type": "Slider",
    "x": strip_x_step * 4,
    "y": button_step * 3,
    "width": .115,
    "height": .07,
    "startingValue": .5,
    "isXFader": false,
    "color": "#000000",
    "backgroundColor": "#000000",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/strip/pan_stereo_position/5", 
    "onvaluechange": "changePan(this, panLabel5);panButton5.setBounds([strip_x_step * 4 + (.115*this.value), button_step * 1 + .12, .002,.07]);",  
},
{
    "name": "panLabel6",
    "type": "Label",
    "x": strip_x_step * 5,
    "y": button_step * 1 + .06,
    "width": .115,
    "height": .07,
    "color": "#ffffff",
    "value": "-",
},
{
    "name": "centerButton6",
    "type": "Button",
    "mode": "momentary",
    "x": strip_x_step * 5,
    "y": button_step * 1 + .12,
    "width": .115,
    "height": .035,
    "color": "#008800",
    "stroke": "#008800",
    "backgroundColor": "#040",
	"ontouchstart": "panSlide6.setValue(.5)",
},
{
    "name": "panButton6",
    "type": "Button",
    "mode": "momentary",
    "x": strip_x_step * 5 + .115/2,
    "y": button_step * 1 + .12,
    "width": .002,
    "height": .07,
    "color": "#ffffff",
},
{
    "name": "panSlide6",
    "type": "Slider",
    "x": strip_x_step * 5,
    "y": button_step * 3,
    "width": .115,
    "height": .07,
    "startingValue": .5,
    "isXFader": false,
    "color": "#000000",
    "backgroundColor": "#000000",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/strip/pan_stereo_position/6", 
    "onvaluechange": "changePan(this, panLabel6);panButton6.setBounds([strip_x_step * 5 + (.115*this.value),  button_step * 1 + .12, .002,.07]);",
},

/* Fader strip ------------------------------------------*/
{
    "name": "volSlider1",
    "type": "Slider",
    "x": strip_x_step * 0,
    "y": fader_y,
    "width": fader_w,
    "height": fader_h,
    "startingValue": .0,
    "color": "#008800",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "label": "ddddddd",
    "isInverted": false,
    "isVertical": true,
    "protocol": "OSC",
    "address": "/strip/fader/1",
    
},
{
    "name": "volSlider2",
    "type": "Slider",
    "x": strip_x_step * 1,
    "y": fader_y,
    "width": fader_w,
    "height": fader_h,
    "startingValue": .0,
    "color": "#008800",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "isInverted": false,
    "isVertical": true,
    "protocol": "OSC",
    "address": "/strip/fader/2",
},
{
    "name": "volSlider3",
    "type": "Slider",
    "x": strip_x_step * 2,
    "y": fader_y,
    "width": fader_w,
    "height": fader_h,
    "startingValue": .0,
    "color": "#008800",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "isInverted": false,
    "isVertical": true,
    "protocol": "OSC",
    "address": "/strip/fader/3",
},
{
    "name": "volSlider4",
    "type": "Slider",
    "x": strip_x_step * 3,
    "y": fader_y,
    "width": fader_w,
    "height": fader_h,
    "startingValue": .0,
    "color": "#008800",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "isInverted": false,
    "isVertical": true,
    "protocol": "OSC",
    "address": "/strip/fader/4",
},
{
    "name": "volSlider5",
    "type": "Slider",
    "x": strip_x_step * 4,
    "y": fader_y,
    "width": fader_w,
    "height": fader_h,
    "startingValue": .0,
    "color": "#008800",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "isInverted": false,
    "isVertical": true,
    "protocol": "OSC",
    "address": "/strip/fader/5",
},
{
    "name": "volSlider6",
    "type": "Slider",
    "x": strip_x_step * 5,
    "y": fader_y,
    "width": fader_w,
    "height": fader_h,
    "startingValue": .0,
    "color": "#008800",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "isInverted": false,
    "isVertical": true,
    "protocol": "OSC",
    "address": "/strip/fader/6",
},

/* Unit strip --------------------------------------*/
{
    "name": "unit1",
    "type": "Button",
    "x": strip_x_step * 0,
    "y": unit_y,
    "width": fader_w,
    "height": .001,
    "stroke": "#888888",
},
{
    "name": "unit2",
    "type": "Button",
    "x": strip_x_step * 1,
    "y": unit_y,
    "width": fader_w,
    "height":.001,
    "color": "#888888",
    
},
{
    "name": "unit3",
    "type": "Button",
    "x": strip_x_step * 2,
    "y": unit_y,
    "width": fader_w,
    "height": .001,
    "color": "#888888",
    
},
{
    "name": "unit4",
    "type": "Button",
    "x": strip_x_step * 3,
    "y": unit_y,
    "width": fader_w,
    "height": .001,
    "color": "#888888",
    
},
{
    "name": "unit5",
    "type": "Button",
    "x": strip_x_step * 4,
    "y": unit_y,
    "width": fader_w,
    "height": .001,
    "color": "#888888",
    
},
{
    "name": "unit6",
    "type": "Button",
    "x": strip_x_step * 5,
    "y": unit_y,
    "width": fader_w,
    "height": .001,
    "color": "#888888",
    
},

/* Label strip ---------------------------------------*/
{
    "name": "volLabel1",
    "type": "Label",
    "x": strip_x_step * 0,
    "y": sel_y+0.01,
    "width": sel_w,
    "height": .03,
    "color": "#ffffff",
    "value": "1",
    "address": "/strip/name/1",
},
{
    "name": "volLabel2",
    "type": "Label",
    "x": strip_x_step * 1,
    "y": sel_y+0.01,
    "width": sel_w,
    "height": .03,
    "color": "#ffffff",
    "value": "2",
    "address": "/strip/name/2",
},
{
    "name": "volLabel3",
    "type": "Label",
    "x": strip_x_step * 2,
    "y": sel_y+0.01,
    "width": sel_w,
    "height": .03,
    "color": "#ffffff",
    "value": "3",
    "address": "/strip/name/3",
},
{
    "name": "volLabel4",
    "type": "Label",
    "x": strip_x_step * 3,
    "y": sel_y+0.01,
    "width": sel_w,
    "height": .03,
    "color": "#ffffff",
    "value": "4",
    "address": "/strip/name/4",
},
{
    "name": "volLabel5",
    "type": "Label",
    "x": strip_x_step * 4,
    "y": sel_y+0.01,
    "width": sel_w,
    "height": .03,
    "color": "#ffffff",
    "value": "5",
    "address": "/strip/name/5",
},
{
    "name": "volLabel6",
    "type": "Label",
    "x": strip_x_step * 5,
    "y": sel_y+0.01,
    "width": sel_w,
    "height": .03,
    "color": "#ffffff",
    "value": "6",
    "address": "/strip/name/6",
}, 

/* Vu strip ----------------------------------*/
{
    "name": "vu1Meter",
    "type": "Slider",
    "isVertical" : true,
    "x": strip_x_step * 0 +.048,
    "y": vu_y,
    "width": vu_w,
    "height": vu_h,
    "color": "#ff0",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/strip/meter/1",
    "ontouchstart": "this.setValue(0)",
    "ontouchend": "this.setValue(0)",
},
{
    "name": "vu2Meter",
    "type": "Slider",
    "isVertical" : true,
    "x": strip_x_step * 1 +.048,
    "y": vu_y,
    "width": vu_w,
    "height": vu_h,
    "color": "#ff0",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/strip/meter/2",
    "ontouchstart": "this.setValue(0)",
    "ontouchend": "this.setValue(0)",
},
{
    "name": "vu3Meter",
    "type": "Slider",
    "isVertical" : true,
    "x": strip_x_step * 2 +.048,
    "y": vu_y,
    "width": vu_w,
    "height": vu_h,
    "color": "#ff0",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/strip/meter/3",
    "ontouchstart": "this.setValue(0)",
    "ontouchend": "this.setValue(0)",
},
{
    "name": "vu4Meter",
    "type": "Slider",
    "isVertical" : true,
    "x": strip_x_step * 3 +.048,
    "y": vu_y,
    "width": vu_w,
    "height": vu_h,
    "color": "#ff0",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/strip/meter/4",
    "ontouchstart": "this.setValue(0)",
    "ontouchend": "this.setValue(0)",
},
{
    "name": "vu5Meter",
    "type": "Slider",
    "isVertical" : true,
    "x": strip_x_step * 4 +.048,
    "y": vu_y,
    "width": vu_w,
    "height": vu_h,
    "color": "#ff0",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/strip/meter/5",
    "ontouchstart": "this.setValue(0)",
    "ontouchend": "this.setValue(0)",
},
{
    "name": "vu6Meter",
    "type": "Slider",
    "isVertical" : true,
    "x": strip_x_step * 5 +.048,
    "y": vu_y,
    "width": vu_w,
    "height": vu_h,
    "color": "#ff0",
    "stroke": "#888888",
    "min": 0,
    "max": 1,
    "address": "/strip/meter/6",
    "ontouchstart": "this.setValue(0)",
    "ontouchend": "this.setValue(0)",
},



],

/* Page 1 "Global" ***********************************/
[
{
    "name": "speedSlider",
    "type": "Slider",
    "x": .5,
    "y": .85,
    "width": .235,
    "height": .07,
    "startingValue": .0,
    "color": "#008800",
    "stroke": "#888888",
    "min": -7,
    "max": 7,
    "isXFader" : true,
    "isVertical" : false,
    "protocol": "OSC",
    //"address": "/jog",
    //"ontouchend": "this.setValue(0);",
    "ontouchstart": "onTouchJog(0)",
    "onvaluechange": "onMoveJog(this.value)",
    "ontouchend": "this.setValue(0)",
},
{
    "name": "timePositionLabel",
    "type": "Label",
    "x": .5,
    "y": .8,
    "width": .235,
    "height": .05,
    "color": "#ffffff",
    "value": "-----------",
    "address": "/position/time",
    
},
],

/* Page 2 "ControlOSC" *******************************/
[

],
];

