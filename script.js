const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const dropDown = document.querySelector('select[name="animations-states"]');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerIMG = new Image();
playerIMG.src = 'images/dog_sprite.png';

const SPRITE_WIDTH = 575; // width of each sprite
const SPRITE_HEIGHT = 523; // height of each sprtie

let gameFrame = 0;
const staggerFrames = 4; // changing this will change the speed of sprite

const sprtieAnimations = [];

const animationStates = [ // animations names/state with number of each frames
    {
        name: 'idle',
        framesCnt: 7
    },
    {
        name: 'jump',
        framesCnt: 7
    },
    {
        name: 'fall',
        framesCnt: 7
    },
    {
        name: 'run',
        framesCnt: 9
    },
    {
        name: 'dizzy',
        framesCnt: 11
    },
    {
        name: 'sit',
        framesCnt: 5
    },
    {
        name: 'roll',
        framesCnt: 7
    },
    {
        name: 'bite',
        framesCnt: 7
    },
    {
        name: 'ko',
        framesCnt: 12
    },
    {
        name: 'getHite',
        framesCnt: 4
    },

];

let playerState = 'idle'; //by default for first time


animationStates.forEach((AnimState, index) => {
    let frames = {
        loc: []
    }


    // caluclating each frame position for x and y 
    for (let i = 0; i < AnimState.framesCnt; i++) {
        let positionX = i * SPRITE_WIDTH;
        let positionY = index * SPRITE_HEIGHT;
        frames.loc.push({ x: positionX, y: positionY });
    }

    // animations array with key(name) and values
    sprtieAnimations[AnimState.name] = frames;

    // creating OPTIONS and append it to SELECT element (to change state)
    const option = document.createElement('option');
    option.value = AnimState.name;
    option.innerHTML = AnimState.name;
    dropDown.appendChild(option);
});


// to check positions values
//console.log(sprtieAnimations)

// changing player state by selecting it
dropDown.addEventListener('change', (e) => {
    playerState = e.target.value;
});

// Chaning some dog states by keys
document.addEventListener('keydown', e => {
  switch (e.code) {
        case 'ArrowRight':
            playerState = 'run';
            break;
        case 'ArrowUp':
            playerState = 'jump';
            break;
        case 'ArrowDown':
            playerState = 'sit';
            break;
        case 'Space':
            playerState = 'roll';
            break;

        default:
            playerState = 'idle';
            break;
    }
});

// reset 'idle' state to dog when key is up
document.addEventListener('keyup', e => {

    if (playerState == 'jump') {
        playerState = 'fall';
        setTimeout(() => {
            playerState = 'idle';
        }, 200);
    } else {
        playerState = 'idle';
    }
});


// animation loop
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // get position of each state frame
    let position = Math.floor(gameFrame / staggerFrames) % sprtieAnimations[playerState].loc.length;

    let frameX = position * SPRITE_WIDTH;
    let frameY = sprtieAnimations[playerState].loc[position].y;

    // drawing the img by changing each frame 
    ctx.drawImage(playerIMG, frameX, frameY, SPRITE_WIDTH, SPRITE_HEIGHT, 0, 0, SPRITE_WIDTH, SPRITE_HEIGHT);

    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
