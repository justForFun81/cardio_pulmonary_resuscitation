//CREATE THE PATIENT CLASS
var Patient = function () {
    // ======== PRIVATE VARIABLES
    	var reaCycles = 0;
	var shock = 0;
	var amiodaroneAdministrations = 0;
	var adrenalineAdministrations = 0;

//GETTERS
this.getReaCycles = function(){ return reaCycles; };
this.getShock = function(){ return shock; };
this.getAmiodarone = function(){ return amiodaroneAdministrations; };
this.getAdrenaline = function(){ return adrenalineAdministrations; };

//SETTERS
this.setReaCycles = function(n){ reaCycles += n; };
this.setShock = function(n){ shock += n; };
this.setAmiodarone = function(n){ amiodaroneAdministrations += n; };
this.setAdrenaline = function(n){ adrenalineAdministrations += n; };

// INCREMENTERS
this.incrementShock = function(){ this.setShock (1); };
this.incrementAmiodarone = function(){ this.setAmiodarone (1); };
this.incrementReaCycles = function(){ this.setReaCycles (1); };
this.incrementAdrenaline = function(){ this.setAdrenaline (1); };
};

// END OF PATIENT CLASS ==============================================

// ============= CLASS METHOD FOR RHYTHM ANALYSIS===========

Patient.prototype.getRhythm = function () {
	var rhythm = prompt('What is the current rhythm of the patient:: is it	pulseless VT (enter: VT), ventricular Fibrillation (enter: VF) , PEA (enter PEA) or Asystole (enter ASYS) or ROSC (enter ROSC)?').toUpperCase();
	switch (rhythm) {
		case 'VT' || ‘VF’:
			this.defibAdult();
			this.getRhythm();
			break;

		case 'PEA' || ‘ASYS’:
			this.reanimateAdult();
			this.getRhythm();
			break;

		case 'ROSC':
			console.log('Great Job!! Start POST-ROSC care: perform 12-lead ECG, Transport to clinic, discuss Pulm-CT or cardiac catheterization, and apply mild hypothermia!');
			break;
		default:
			console.log('did not understand, again please.');
			this.getRhythm ();
		//find way to iterate the function to repeat the question..;; RECURSION?
	}
};

// CLASS METHOD FOR DEFIBRILLATION =======================
/*12.5.2013: ADD TO THIS CODE ::: perform 1 cycle of CPR AFTER EACH SCHOCK.. THEN PERFORM RHYTHM ANALYSIS AGAIN
*/

Patient.prototype.defibAdult = function () {
	if (this.getShock () === 0){
		console.log("Load to 200J. KEEP DOING CPR TO MINIMIZE NO-FLOW!!");
		//wait 10 secondsâ€¦.
		console.log("Administer shock of 200J. STOP CPR ONLY BRIEFLY");
		//flash screen red and green
		console.log("IMMEDITALY CONTINUE CPR for 2 MINUTES");
		console.log('===========================================================');
		this.incrementShock();
		//start counter for 2 Minutes, counting down?
	}

	else if (this.getShock() === 1){
		console.log("Load to 300J. KEEP DOING CPR TO MINIMIZE NO-FLOW!!");
		console.log("Administer shock of 300J. STOP CPR ONLY BRIEFLY");
		console.log("IMMEDITALY CONTINUE CPR for 2 MINUTES");
		console.log('===========================================================');
		this.incrementShock();

	}

	else if (this.getShock() === 2){
		console.log("Load to 360J. KEEP DOING CPR TO MINIMIZE NO-FLOW!!");
		console.log("Administer shock of 360J. STOP CPR ONLY BRIEFLY");
		console.log("IMMEDITALY CONTINUE CPR for 2 MINUTES");
		console.log('===========================================================');
		this.incrementShock();

	}

	//FIGURE OUT A WAY TO WORK IN THE AMIODARONE
	else {
		console.log("Load to 360J. KEEP DOING CPR TO MINIMIZE NO-FLOW!!");
		console.log("Administer shock of 360J. STOP CPR ONLY BRIEFLY");
		console.log("IMMEDITALY CONTINUE CPR for 2 MINUTES");
		console.log('===========================================================');
		this.incrementShock();
		this.incrementAmiodarone();

	}
};

// FUNCTION FOR CARDIOVERSION ==THIS IS NOT NEEDED=================++++++++++
Patient.prototype.cardiovertAdult = function () {
	console.log("PREP THE PATIENT : use self-sticking pads a-p and administer anesthesia");
	console.log("Load to 200J and SYNCHRONIZE!!");
	//wait 10 secondsâ€¦.
	console.log("Cardiovert using 200J.");
	//flash screen red and green
	this.incrementShock();
};

// FUNCTION FOR REANIMATION ================================
Patient.prototype.reanimateAdult = function () {
	if (this.getReaCycles()%2 === 0) {
		console.log('INJECT 1mg of ADRENALINE i.v. NOW');
		this.incrementAdrenaline();
		console.log ("PERFORM CPR for 2 MINUTES");
		//flash screen red and green 100BPM && COUNT DOWN 2 MINUTES...
		console.log('REMEMBER : 100BPM');
		console.log('REMEMBER : 1/3 THORAX COMPRESSION');
		console.log('REMEMBER : 30:2 if youâ€™re doing BLS');
		console.log('===========================================================');
		//MAKE A COUNTDOWN 2 MINUTES AND A METRONOME....
		this.incrementReaCycles();

	/*12.5.2013: ADD TO THIS CODE ::: perform 1 cycle of CPR AFTER EACH SCHOCK.. THEN PERFORM RHYTHM ANALYSIS AGAIN
	*/
	} else {
		console.log("PERFORM CPR for 2 MINUTES");
		//flash screen red and green 100BPM && COUNT DOWN 2 MINUTES...
		console.log('REMEMBER : 100BPM');
		console.log('REMEMBER : 1/3 THORAX COMPRESSION');
		console.log('REMEMBER : 30:2 if youâ€™re doing BLS');
		console.log('===========================================================');
		this.incrementReaCycles();
	}

};
