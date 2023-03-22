

var interval;
var intervalId;

var _numbers;             

var _isPause;
var _state; 
var _status;
var _engine;
var _onlyOnce;
var _oO;   

var _tail;
var _targetNum;
var _five;  

var _topY;
var _hold;
var _counter;             


var _pathWay;
var _xpos;               
var _o;    
var _xy;
var _ar;



// OTHER STUFF HERE, OUT OF THE BOX
document.getElementById("tempo").addEventListener("change", speedUp);
var sliderTempo = document.getElementById("tempo");      

function speedUp(){    
    interval = sliderTempo.value;
}

function resetTempo(){
    sliderTempo.value = 3;
}

// ####################################
window.onload=function(){
    thisCanvas = document.getElementById("myCanvas");
    thisContext = thisCanvas.getContext("2d");                     
    rebootVar();
    startInterval(interval);
}


function rebootVar(){
    interval =3;
    _numbers= [
        [0,0,1], [1,0,2],  [2,0,3], [3,0,4],
        [0,1,5], [1,1,6],  [2,1,7], [3,1,8],
        [0,2,9], [1,2,10], [2,2,11],[3,2,12],
        [0,3,13],[1,3,14], [2,3,15],[3,3,0]
        ];             
     _isPause = false;
     _state = "NONE";
     _status = "LOOKUP";
     _engine = "IGNITE";
     _onlyOnce = true;
     _oO = true;        
     _tail = 1;
     _targetNum = 1;
     _five = 5;             
     _topY = 0;        
     _hold = 0;    
     _counter = 0;                        
     _pathWay=[];
     _xpos =[0,1,6,7]  ;              
     _o = [0,1]; 
     _xy=[0,1,2,3];
     _ar=[0,1,2,3,1,2,3,4];                       
}
   
function startInterval(_interval) {                   
    intervalId = setInterval(NumberPuzzle,1000/_interval);
}

function _getLocation(num,a,b){
    let _sl = _numbers.filter(x=>x[2]==num);
        _xy[a]=_sl[0][0];
        _xy[b]=_sl[0][1];
}

//Shuffle the numbers. not RANDOM if we generate random number there is a possibility the puzzle is impossible to solve
function _shuffle(){
let _decision =  (max) => {
    return Math.floor(Math.random() * max);
    }                    

    for(let i=0;i<=55;i++){
        let _tN = _decision(16);
        _getLocation(0,0,1);
        _getLocation(_tN,2,3);
        createPathWay(..._xy,0,0);

        let c = 0;
        while(c<_pathWay.length-2){                
            _swap(_pathWay[c],_pathWay[c+1]);   
            c+=1;           
        }
    } 
}
    

// Main Function 
function NumberPuzzle(){ 
    if(_isPause==true){return;}
    let x = 40;
    let y = 40;
    let grid = 3;
    let ten = 22;

    clearInterval(intervalId);
    startInterval(interval);     

    thisContext.fillStyle="#28292d";
    thisContext.fillRect(0,0,thisCanvas.width,thisCanvas.height);

    _onlyOnce && _shuffle();
    _onlyOnce=false;
                
    for(let i=0;i<=15;i++){ 
        _getLocation(0,0,1);
        _getLocation(_targetNum,2,3);
                      
        if(_numbers[i][2]>=10){  // text centering 10 plus
            ten=28;
        }

        thisContext.beginPath();
        if(_numbers[i][2]!=0){  
            thisContext.fillStyle = 'slateblue';                          
        }else{
            thisContext.fillStyle="#28292d";
        }
            thisContext.arc(x, y, 35, 0, 2 * Math.PI); //35 size of the circle                  
            thisContext.fill();
            
        if(_numbers[i][2]!=0){  
            thisContext.fillStyle = 'white';
        }
        thisContext.font = "49px Trebuchet MS";
        thisContext.fillText(_numbers[i][2],x-ten,y+17);  
                                
        ten=12;
        if(i==grid){
            x=-40;
            y+=80;
            grid+=4;                        
        }
        x+=80;
    }

if(_engine=="IGNITE"){
    _workOut(..._xy)                                       
}

                                  
}  


       //Unique Random Array
        // var numbersXYTemp=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
                                
        // function shuffleNumbers(){
        //     let myMax = numbersXYTemp.length;        
        //     let myRadom;
        //     let j=0;

           
        //     for(let i = 0;i <= myMax;i ++){
        //         myRandom = Math.floor(Math.random()*myMax)
        //         numbersXYTemp.push(numbersXYTemp[myRandom]);
        //         numbersXYTemp.splice(myRandom,1); // 2nd parameter means remove one item only                     
        //         myMax-=1;
        //         i=0;                
        //     }
        //     for(let i=0;i<=15;i++){
        //         _shuffle[i][2]=numbersXYTemp[i];
        //     }                    
        // }   

function isAlign(_a,_b,_c,_d,_w,_x,_y,_z){  
    if((_numbers[_a][2]==_w) && (_numbers[_b][2]==_x) && (_numbers[_c][2]==_y) && (_numbers[_d][2]==_z)){
        return true;
    }else{
        return false;
    }
}

function obstacle(){           
    for(let nums of _pathWay){
        if(_numbers[nums][2]!=0){
            if(_targetNum>_numbers[nums][2]){
                return true;
            }
        }
    }
}

function createPathWay(_sX,_sY,_tX,_tY,_dX,_dY){
    let _LR = [_sX,_tX,_dX];
    let _TB = [_sY,_tY,_dY];
    _LR.sort(function(a,b){return a-b});
    _TB.sort(function(a,b){return a-b});

    if((_LR[0]==_LR[2])&&(_LR[0]<=2)){_LR[2]+=1}else{if((_LR[0]==3)&&(_LR[2]==3)){_LR[0]-=1}}
    if((_TB[0]==_TB[2])&&(_TB[0]<=2)){_TB[2]+=1}else{if((_TB[0]==3)&&(_TB[2]==3)){_TB[0]-=1}}
    
    _pathWay=[];
        
    let _p=0;            
    let _m=3;            
    let _tarr=[];
    let _rarr=[];
    let _barr=[];
    let _larr=[];

    while (_p<=3){
        if((_LR[0]<=_p)&&(_p<=_LR[2])){_tarr.push([_p,_TB[0]])}
        if((_TB[0]+1<=_p)&&(_p<=_TB[2])){_rarr.push([_LR[2],_p])}
        if((_LR[2]-1>=_m)&&(_m>=_LR[0])){_barr.push([_m,_TB[2]])}
        if((_TB[2]-1>=_m)&&(_m>=_TB[0]+1)){_larr.push([_LR[0],_m])}                
        _m--;
        _p++;
    }

    _tarr=_tarr.concat(_rarr,_barr,_larr);

    for(let i=0;i<=_tarr.length-1;i++){  
        for(let j=0;j<=_numbers.length-1;j++){
            if(_tarr[i][0]==_numbers[j][0] && _tarr[i][1]==_numbers[j][1]){
            _pathWay.push(j);                  
            }
        }
    }  
     
    let w=_pathWay.length;   
    for(let i=0;i<=w;i++){
        _pathWay.push(_pathWay[0]);
        _pathWay.shift();                    
        if(_numbers[_pathWay[0]][2]==0){  
            _pathWay.push(_pathWay[0]);                                                                                                  
            return;
        }           
    }                        
               
}

function _lookUp(_arg){
    let _option=[_arg+5,_arg+6,_arg+2];            
    if(_arg>=_xpos[2]){
        _option=[_arg-5,_arg-6,_arg-2];
    }

    for(i=0;i<=2;i++){
        if(_numbers[_option[i]][2]==_targetNum){
            return true;
        }
    }
    return false;
}

function _reset(){
    createPathWay(0,_o[0],3,_o[1],0,_o[0])
    _counter=0
    _status="SLIDE"            
}
  
function _swap(_a,_b){
    [_numbers[_a][2],_numbers[_b][2]]=[_numbers[_b][2],_numbers[_a][2]];                                                                  
}

function _lookUpLine(_arg){
    for(let i=_xpos[0];i<=_xpos[3];i++){
        if(_numbers[i][2]==_arg){   
            return true;
        }                    
    }
    return false;
}

function _workOut(_sX,_sY,_tX,_tY){  

    if((_status=="LOOKUP")){
        createPathWay(_sX,_sY,_tX,_tY,_sX,_sY);                             
        _status="LOOMUP";                
        return;
    }            
   
    let a = _pathWay[_counter];
    let b = _pathWay[_counter+1];
    
    //need rescue, 8 is trap in lower left
    if((_targetNum==8) && (_numbers[12][2]==8) && (_oO == true)) {                    
        _oO = false;           
        _topY += 1;
        _status = "LOOKUP";
        _counter = 0;
        return;
    }

    if((_targetNum==_five) && (_status!="REARRANGE")){
        _five += 4;
        createPathWay(0,_o[0],3,_o[1],0,_o[0]);                
        _status="ISALIGN";
        _counter = 0;
        return;
    }

    switch(_status) {
        case "ISALIGN":
            if(isAlign(..._ar)==true){
                _ar=_ar.map(x=>x+4);
                _xpos=_xpos.map(x=>x+4);
                _o=_o.map(x=>x+1);
                if(_oO==true){
                    _topY += 1;
                }                    
                _tail=_targetNum;
                
                if(_targetNum==9){                                      
                    createPathWay(_sX,_sY,_tX,_tY,_tX,_topY);                        
                    _status="TTOP";
                }else{
                    _status="LOOKUP";     
                }
                
                if(_targetNum==13){
                    if((_numbers[12][2]==13) && (_numbers[13][2]==14)){
                        // console.log("FINISH")
                        _engine="STOP";
                        return
                    }else{                          
                        _state = "A";
                        _status = "REARRANGE";
                        return;
                    }                        
                }
                _counter = 0;
                return;
            }                    

            break;

        case "REARRANGE":
            if((_numbers[9][2]==12) && (_state=="A")){
                createPathWay(_sX,_sY,3,3,3,3);    
                _state = "B";
                _counter = 0;
                return;
            }
            if(_state=="B"){
                if(_numbers[14][2]==13){
                    _state = "C";
                    createPathWay(0,2,3,3,3,3);
                    _counter = 0;
                    return;
                }
            }
            if(_state=="C"){
                if((_numbers[8][2]==9) && ((_numbers[15][2]==0))){                        
                    // console.log("FINISH")
                    _engine = "STOP";
                    return;
                }                    
            }
            break;

        case "LOOMUP":
            if(_numbers[b][2]==_targetNum){                                   
                createPathWay(_sX,_sY,_tX,_tY,3,_tY);                           
                if(obstacle()==true){
                    _targetNum = 5;
                    _tail = 5;
                    _status = "LOOKUP";
                    _counter = 0;
                    return;
                }                    
                _status="TRIGHT";
                _counter = 0;
                return;
            }                    
            break;                                                                                                                                           

        case "TRIGHT":
            if((_sX==3) && (_tX==3)){
                createPathWay(_sX,_sY,_tX,_tY,_tX,_topY);    //top should be adjust table                    
                _status = "TTOP";
                _counter = 0;
                return;
            }
            break;
        
        case "TTOP":
            if((_sY==_topY) && (_tY==_topY)){   //top should be adjust table                                            
                if(_targetNum==_tail){
                    _targetNum += 1;
                }                    
                _reset();
                return;
            }
            break;

        case "SLIDE":                    
            if((_numbers[_xpos[1]][2]==_tail) && (_numbers[_xpos[1]+1][2]==0)){                    
                if(_lookUpLine(_targetNum)==false){                           
                    _status = "LOOKUP";
                    _counter = 0;
                    return;
                }                
            }
            _slide();
            break;

        case "AHEAD":
            if(_numbers[_hold-1][2]==_targetNum){
                _reset();
            }
            break;

        case "CRESCENT":
            if(_counter==2){
                _reset();
                return;
            }
            break;

        case "PIVOT":
            if(obstacle()==true){
                _status = "CRESCENT";
            }
            if(_numbers[_hold][2]==_targetNum){
                _targetNum += 1;
                _tail += 1;
                _reset();
                return;
            }
            break;
        default:
    }

    function _slide(){                
        for(let i=0;i<=3;i++){        
            let _x = (xp)=>{
                if(xp>=6){
                    return xp -= 1;
                }else{
                    return xp += 1;
                }
            }
            _hold = _x(_xpos[i]);   
                                  
            if((_numbers[_xpos[1]+1][2]==_tail) && (_numbers[_xpos[1]][2]==_targetNum) && (_numbers[_xpos[1]+4][2]==0)){
                createPathWay(_sX-1,_sY,_tX,_tY,_tX,_tY);                          
                _status = "AHEAD";                                  
                _counter = 0;                  
            }
            
            if((_numbers[_xpos[i]][2]==_tail) && (_numbers[_hold][2]==0) ){                    
                if(_lookUp(_xpos[i])==true){
                    createPathWay(_sX,_sY,_tX,_tY,_tX,_tY);                              
                    _status = "PIVOT";  
                    _counter = 0;                            
                    if(obstacle()==true){
                        createPathWay(_sX-1,_sY,_tX,_tY,_tX,_tY);
                    }
                return;
                }                
            }
        }
    }
                        
    _swap(a,b);                                
    
    _counter += 1;                
    if(_counter == _pathWay.length-1){ 
        _counter = 0;
        return;
    }
}

function _pause(){
    _isPause?_isPause=false:_isPause=true;
}

function _tester(){
    rebootVar();
    resetTempo();
}

function _colorCode(){
    //document.body.classList.toggle("_grey_mode");
    alert("Under Construction...");
    
}
