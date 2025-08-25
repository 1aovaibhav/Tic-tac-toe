let board = [[-1,-1,-1],
            [-1,-1,-1],
            [-1,-1,-1]]

// let filled =  0;
let chance = 1 //1 for X
let xarr = []
let oarr = []
let winScreen = document.querySelector('.win-screen')
const home = document.querySelector('.game')
const handleClick = (e) => {
    const boxClass = e.target.className.split(' ').at(-1)
    const boxIndex =  boxClass.split('-')[1]
    const i = boxIndex[0] - '0'
    const j = boxIndex[1] - '0'
    if(board[i][j] != -1) return;
    
    board[i][j] = chance;
    // filled++;
    if(chance == 1){
        xarr.push([i,j])
        document.querySelector(`.${boxClass}`).innerHTML = `
        <img src= "cross.png" height ="97%" width="97%">
        `
    }
   
    else{
        oarr.push([i,j])
        document.querySelector(`.${boxClass}`).innerHTML = `
        <img src= "circle.png" height ="97%" width="97%">
        `   
    }
    if(xarr.length == 3 || oarr.length == 3){
        let temp    
        if(xarr.length==3){
            temp = xarr[0];
            }
            else{
                temp = oarr[0];
            }
           
          document.querySelector(`.c-${temp[0]}${temp[1]}`).children[0].style.opacity = "0.5"
            
            
        
      }
      if(xarr.length == 4 || oarr.length ==4){
        let temp    
        if(xarr.length==4){
            temp = xarr.shift()
            }
            else{
                temp = oarr.shift()
            }
            board[temp[0]][temp[1]]=-1;
            document.querySelector(`.c-${temp[0]}${temp[1]}`).innerHTML = ``;
            
            
        
      }
    let win = false;
    let row = 0;
    let column = 0;
    let diagnol = 0;
    for(let k = 0; k<3;k++){
        if(board[i][k] == chance) row++;
        if(board[k][j] == chance) column++; 
    }
    if((board[1][1]!=-1)&&(board[0][0] == board[1][1]) &&( board[1][1] == board[2][2])) diagnol=3;
    if((board[1][1]!=-1)&&(board[0][2] == board[1][1]) &&( board[1][1] == board[2][0]) ) diagnol=3;
    console.log(row,column,diagnol)
    if(row==3 || column==3 ||diagnol ==3){
        win = true
     
    }
    let draw = false
    // if(filled==9) draw = true;
    if(win == true || draw ==true){
        winScreen.innerHTML=``;
        console.log("win")
       const heading =  document.createElement('h1')
       heading.className = "win-heading"
       if(win == true)
       heading.innerText = `Yay! ${chance==1?'X':'0'} won the game`
       else
     heading.innerText = `GG! The game tied`
       const button = document.createElement('button')
       button.className  = "win-but"
       button.addEventListener('click', tryAgain)
        button.innerText = 'Try again'
        winScreen.append(heading,button)
        home.style.display = "none"
        winScreen.style.display = "flex"

    } 
 




    chance = chance == 0 ? 1: 0;
}

const tryAgain = () => {
    for(let i = 0;i<3;i++){
        for(let j = 0; j<3;j++){
            board[i][j] = -1;
        }
    }
    document.querySelectorAll('.box').forEach((ele)=>{
        ele.innerHTML = ``
    })
    chance = 1;
    filled = 0;
    xarr = []
    oarr = []
    winScreen.style.display = "none";
    home.style.display = "grid"
}


document.querySelectorAll('.box').forEach((ele)=>{
    ele.addEventListener('click',handleClick);
})