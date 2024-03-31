//variables

let soundBoard = document.querySelector(".sound_boards"), //puzzleBoard
    seaSound = document.querySelectorAll('#sounds img'), //puzzlePieces
    slotContainer = document.querySelectorAll(".slot_cont"),    
    soundContainer = document.querySelector(".sound_cont"), //pieceContainer
    slotZone = document.querySelectorAll('.sand_box'), //dropZone
    audioElements = [], // Array to store references to audio elements


    draggedSound; //draggedPiece


const
resetButton = document.querySelector('#reset'),
pauseButton = document.querySelector('#pause');

    
//functions


// drag n drop

function handleStartDrag() {
    console.log('started dragging this piece:', this);

    draggedSound = this; 
}

function handleDragOver(e) {
        e.preventDefault();
        console.log('dragged over me'); 
}

function handleDrop(e) {
    e.preventDefault(); 
    console.log('dropped something on me')
    if (this.firstElementChild) {
        return;
    }

    this.appendChild(draggedSound); 

    playAudio(draggedSound.dataset.trackref); // Play the audio when dropped


}
 let audio; 

function resetSounds() {
   
    // Iterate over each slot
    slotZone.forEach(zone => {
        let slotContent = zone.firstElementChild;
        if (slotContent) {
            // Remove the image from the slot

            zone.removeChild(slotContent);
        
            
            // Append the image back to the sound container
            soundContainer.appendChild(slotContent);

        }
    });
    pauseAudio();
    console.log("All slots cleared and images returned to the sound container");
}




function playAudio(trackRef) {
    let soundSrc = `audio/${trackRef}.wav`;
    console.log('Sound source:', soundSrc); // Log the source before creating the Audio object
    audio = new Audio(soundSrc); // Remove 'let' to use the outer 'audio' variable
    audioElements.push(audio); // Stores a Reference to the new audio tracks
    // Listen for the 'canplay' event before playing the audio
    audio.addEventListener('canplay', function() {
        audio.play(); // play audio 
        setTimeout(loopAudio);
        console.log("timeout");
    }); 

}

    function loopAudio() {
    console.log('looping audio'); 
        audioElements.forEach(audio => {
            if (!audio.paused && audio.currentTime > 0) {
                audio.currentTime = 0; //reset the currentTime to 0
                audio.play(); // play audio

            }
        });
    }

    setTimeout(() => {
        loopAudio(); //start loop immediatley
        setInterval(loopAudio, 8000); //loop after 8 seconds infitnitley 
    } );



function pauseAudio() {
    console.log('pause audio function called');
    audioElements.forEach(audio => {
        if (audio && typeof audio.pause === 'function') {
            audio.pause(); // Pause the audio if it's playing
        }
    });
}



//eventlisteners

seaSound.forEach(sound => sound.addEventListener ("dragstart", handleStartDrag)); 

slotZone.forEach(zone => zone.addEventListener("dragover", handleDragOver)); 

slotZone.forEach(zone => zone.addEventListener("drop", handleDrop)); 

pauseButton.addEventListener ('click', pauseAudio);

resetButton.addEventListener ('click', resetSounds);



