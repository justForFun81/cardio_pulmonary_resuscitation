//CREATE THE PATIENT CLASS
var Patient = function () {
	// ======== THESE VARIABLES ARE PRIVATE
	var reanimationCycles = 0;
	var shock = 0;
	var amiodaroneAdministrations = 0;
	var adrenalineAdministrations = 0;

	//GETTERS
	this.getReaCycles = function(){return reanimationCycles;};
	this.getShock = function(){return shock;};
	this.getAmiodarone = function(){return amiodaroneAdministrations;};
	this.getAdrenaline = function(){return adrenalineAdministrations;};

	//SETTERS
	this.setReaCycles = function(n){reanimationCycles += n;};
	this.setShock = function(n){shock += n;};
	this.setAmiodarone = function(n){amiodaroneAdministrations += n;};
	this.setAdrenaline = function(n){adrenalineAdministrations += n;};

	// INCREMENTERS
    // Do we even need these? Why not call setShock within the code instead?
	this.incrementShock = function(){this.setShock(1);};
	this.incrementAmiodarone = function(){this.setAmiodarone(1);};
	this.incrementReaCycles = function(){this.setReaCycles(1);};
	this.incrementAdrenaline = function(){this.setAdrenaline(1);};
};

// END OF PATIENT CLASS ==============================================

// ============= CLASS METHOD FOR RHYTHM ANALYSIS===========

Patient.prototype.getRhythm = function (rhythm) {
	switch (rhythm) {
        case 'vf':
		case 'vt':
			this.defibAdult();
			//repeat function(?)
			break;
        
		case 'pea':
		case 'asys':
			this.reanimateAdult();
			//repeat function(?)
			break;
        
		case 'rosc':
			log('Great job! Start POST-ROSC care:',true);
            log('Perform 12-lead ECG, transport to clinic, discuss Pulm-CT or cardiac catheterization, and apply mild hypothermia!');
            butts();
			break;
	}
};

// Class method for Defibrillation
/*12.5.2013: ADD TO THIS CODE ::: perform 1 cycle of CPR AFTER EACH SCHOCK.. THEN PERFORM RHYTHM ANALYSIS AGAIN
*/

Patient.prototype.defibAdult = function () {
  switch(this.getShock()){
    case 0:
        log ("Load to 200J. KEEP DOING CPR TO MINIMIZE NO-FLOW!", true);
		//wait 10 seconds….	
        clockToggle(10000);
        log("Administer shock of 200J. STOP CPR ONLY BRIEFLY. IMMEDIATELY CONTINUE CPR for 2 MINUTES.", false, 10000);
        //start counter for 2 Minutes, counting down?
        break;
    case 1:
        log ("Load to 300J. KEEP DOING CPR TO MINIMIZE NO-FLOW!", true);
        clockToggle(10000);
        log("Administer shock of 300J. STOP CPR ONLY BRIEFLY. IMMEDIATELY CONTINUE CPR for 2 MINUTES.", false, 10000);
        break;
      
    case 2:
        log ("Load to 360J. KEEP DOING CPR TO MINIMIZE NO-FLOW!", true);
        clockToggle(10000);
        log("Administer shock of 360J. STOP CPR ONLY BRIEFLY. IMMEDIATELY CONTINUE CPR for 2 MINUTES.", false, 10000);
        break;
      
      
    default:
        //FIGURE OUT A WAY TO WORK IN THE AMIODARONE
        log ("Load to 360J. KEEP DOING CPR TO MINIMIZE NO-FLOW!", true);
		log ("Administer shock of 360J. STOP CPR ONLY BRIEFLY");
		log ("IMMEDIATELY CONTINUE CPR for 2 MINUTES.");
		this.incrementAmiodarone();
  }
  
  //flash screen red and green
  setTimeout(function(){blinkToggle('status');},10000);
  this.incrementShock();
};



// FUNCTION FOR REANIMATION ================================
Patient.prototype.reanimateAdult = function () {
	if (this.getReaCycles()%2 === 0) {
		log ('INJECT 1mg of ADRENALINE i.v. NOW', true);
		this.incrementAdrenaline();
		log ("PERFORM CPR for 2 MINUTES");
		//flash screen red and green 100BPM && COUNT DOWN 2 MINUTES...
		log ('REMEMBER : 100BPM');
		log ('REMEMBER : 1/3 THORAX COMPRESSION');
		log ('REMEMBER : 30:2 if you\'re doing BLS');
		//MAKE A COUNTDOWN 2 MINUTES AND A METRONOME....
		this.incrementReaCycles();

	/*
	 * 12.5.2013: ADD TO THIS CODE ::: perform 1 cycle of CPR AFTER EACH SCHOCK.. THEN PERFORM RHYTHM ANALYSIS AGAIN
	 */
	} else {
		log ("PERFORM CPR for 2 MINUTES", true);
		//flash screen red and green 100BPM && COUNT DOWN 2 MINUTES...
		log ('REMEMBER : 100BPM');
		log ('REMEMBER : 1/3 THORAX COMPRESSION');
		log ('REMEMBER : 30:2 if you\'re doing BLS');
		this.incrementReaCycles();
	}

};

// DOM manipulation functions
function gid(id){
    return document.getElementById(id);
}

function butts(){
  gid('vt').disabled = !gid('vt').disabled; 
  gid('vf').disabled = !gid('vf').disabled; 
  gid('asys').disabled = !gid('asys').disabled; 
  gid('pea').disabled = !gid('pea').disabled; 
  gid('rosc').disabled = !gid('rosc').disabled; 
}


function log(message, overwrite, delay){
    // Write a message within the 'info' div.
    // Note: If you provide a truthy overwrite parameter,
    // the div will be reset before writing the message. 
    // The delay, in ms, is the time before the message is displayed
    var target = gid('info');
    var tnode = document.createTextNode(message);
    var p = document.createElement('p');
  p.setAttribute('style','margin-left:'+10+'px'+';margin-top:'+10+'px');
    if(overwrite) {
      target.innerHTML = '';
    }
  
  if(!delay){
    p.appendChild(tnode);
    target.appendChild(p);
  } else {
    butts();
    setTimeout(function(){
        p.appendChild(tnode);
        target.appendChild(p);
        butts();
    }, delay);
  }
}

function blinkToggle(id){
  var target = gid(id);
  if (!target.className.match(/(?:^|\s)blink(?!\S)/)){
      target.className += " blink";
      setTimeout(function(){blinkToggle(id);},5000);    
  } else {
      target.className = target.className.replace(/(?:^|\s)blink(?!\S)/, '');
  }
}

function clockToggle(duration){
  // Duration in ms
   var x = gid('x');
   var y = gid('y');
   var z = gid('z');
  if(!x.className.match(/(?:^|\s)spinner pie(?!\S)/)){
    x.className += " spinner pie";
    y.className += " filler pie";
    z.className += " mask";
    var dur = duration/1000;
    x.style.animationDuration = dur +"s";
    y.style.animationDuration = dur +"s";
    z.style.animationDuration = dur +"s";
    setTimeout(function(){clockToggle(1000);}, duration);
  } else {
    x.className = x.className.replace(/(?:^|\s)spinner pie(?!\S)/, '');    
    y.className = x.className.replace(/(?:^|\s)filler pie(?!\S)/, '');
    z.className = x.className.replace(/(?:^|\s)mask(?!\S)/, '');
  }
}
// End of DOM manipulation functions

// Execute first

function init(){
  function n(e){
    if(e.target.id!== 'rhythmStates')
    current.getRhythm(e.target.id);
  }
  
  gid('rhythmStates').addEventListener('click',n,false);
  mark = new Patient();
  current = mark;
}

window.onload = init;
