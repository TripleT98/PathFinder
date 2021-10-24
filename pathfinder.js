function pathFinder(area){
  area = area.split(" ").join("")
  var start = [0,0]; var end = [area.length - 1,area.length - 1];var obj = {};
  var arr = area.split("");
 var pathArr = [];
 var step = Math.sqrt(area.length);
for (var i = 0; i < area.length; i += step){
  pathArr.push(arr.slice(0,step));
  arr.splice(0,step);
  }
  var pikes = [];
  for(var i = 0; i < area.length; i++){
    pikes[i] = [];
    for(var j = 0; j < area.length; j++){
      if( (i == j + 1 || i == j - 1 || j == i + step || j == i - step) && !(i%step == 0 && i == j+1) && !((i+1)%step == 0 && i == j-1) && (j != i)) {pikes[i][j] = Math.abs(area[i] - area[j])}else{pikes[i][j] = "I"}
    }
  }console.log(pikes);for(var i = 0; i < pikes.length; i++){
    obj[i] = {};
    obj[i].connects = [];
    obj[i].pike = i;
    for(var j = 0; j < pikes.length; j++){
      if(typeof pikes[i][j] == "number"){
        obj[i].connects.push({index: j, value: pikes[i][j]});
      }
    }
  }var algo = [];
  var currentNum = 0;
  var currentNode = 0;
  var passed = [];
   for(var i = 0; i < area.length; i++){
     algo[i] = [];
     for(var j = 0; j < area.length; j++){
       if(i == 0){
       var value = obj[i].connects.filter((e)=>{if(e.index == j){algo[i][j] = e.value;return true}return false});
       if(algo[i][j] == undefined){algo[i][j] = Infinity};
       continue;
     }else{
         var value = obj[currentNode].connects.filter((e)=>{if(e.index == j && passed.indexOf(j) == -1){if(e.value + currentNum<algo[i-1][j]){algo[i][j] = e.value + currentNum}else{algo[i][j] == algo[i-1][j]};return true}return false});
         if(algo[i-1][j] != Infinity && algo[i][j] == undefined){algo[i][j] = algo[i-1][j]}else if (algo[i-1][j] == Infinity && algo[i][j] == undefined){algo[i][j] = Infinity};
         if(passed.indexOf(j) != -1){algo[i][j] = Infinity}
     }
    }
    currentNum = Math.min(...algo[i]);
    currentNode = algo[i].indexOf(currentNum);
    if(currentNode == area.length - 1){console.log(algo);console.log(obj);return currentNum}
    passed.push(currentNode);
  }
}
function findLess(arr,i=0,j=0,endI,endJ,curNum=0,infMass=[],origin,elseVars=[],variantsEnd=[],infMassEnd=[],curNumEnd=0){
  if(typeof arr == "string"){arr = toArr(arr);console.log(arr);endI = arr.length - 1;endJ = arr.length - 1;};
  count++;
  //if(i == endI && endJ == j){return arr[i][j]};
  //if(endVal != arr[arr.length - 1][arr.length - 1]){return arr[arr.length - 1][arr.length - 1]}
  if(i == 0 && j == 0){for(var z = 0; z<arr.length;z++){for(var x = 0; x<arr.length;x++){infMass.push(`${z}|${x}`);infMassEnd.push(`${z}|${x}`)}};origin = arr.map((e)=>{return e.map((el)=>{return el})})}
  //endI = arr.length - 1;endJ = arr.length - 1;
  //if(i == endI && j == endJ){return arr[endI][endJ]}
  var newArr = arr.map((e)=>{return e.map((el)=>{return el})});
  var k = i,n = j,v = i - 1, c = j - 1, variants = elseVars, conds = [];
  for(let i = v; i <= k + 1; i++){
    for(let j = c; j <= n + 1; j++){
      if(i < 0 || i >= arr.length || j < 0 || j >= arr.length){continue}
      if((i == k - 1 || i == k + 1) && (j == n - 1 || j == n + 1)){
        continue;
      }
      if(arr[i][j] == "P"){continue}
      if(j == n && i == k){arr[i][j] = "P";continue}
      if(typeof arr[i][j] == "string" && infMassEnd.indexOf(`${i}|${j}`) == -1){arr[i][j] = +arr[i][j] + Math.abs(origin[k][n] - origin[i][j]) + curNum;conds.push(arr[i][j]);continue}
      arr[i][j] = Math.abs(origin[k][n] - origin[i][j]) + curNum <= newArr[i][j]?Math.abs(origin[k][n] - origin[i][j]) + curNum:newArr[i][j];
      if(infMass.indexOf(`${i}|${j}`) != -1){arr[i][j] = Math.abs(origin[k][n] - origin[i][j]) + curNum}
      if(variants.indexOf(`${i}|${j}`) == -1){variants.push(`${i}|${j}`);}
      if(infMass.indexOf(i +"|"+ j) != -1){infMass.splice(infMass.indexOf(i +"|"+ j),1)}
    }
  }if(conds.length != 0){return conds.reduce((acc,el,ind,arr)=>{if(el < acc){acc = el};return acc},Infinity)}
  //variants = variants.reduce((acc,el,ind)=>{if(acc.indexOf(el))},[])

  var less = variants.reduce((acc,el,ind)=>{[i,j] = el.split("|");if((arr[+i][+j] < acc.val)&&(arr[+i][+j] != "P")){acc = {i:+i,j:+j,val:arr[+i][+j]}}return acc},{val:Infinity});
  i = less.i;
  j = less.j;
  curNum = less.val;
  variants.splice(variants.indexOf(`${i}|${j}`),1);

  var p = endI, l = endJ, variantsEnd = variantsEnd,condsEnd = [];
  for(let i = p-1; i <= p + 1; i++){
    for(let j = l-1; j <= l + 1; j++){
      if(i < 0 || i >= arr.length || j < 0 || j >= arr.length){continue}
      if((i == p - 1 || i == p + 1) && (j == l - 1 || j == l + 1)){continue;}
      if(arr[i][j] == "P"){continue}
      if(j == l && i == p){arr[i][j] = "P";continue}
      if(typeof arr[i][j] == "number" && infMass.indexOf(`${i}|${j}`) == -1){arr[i][j] = arr[i][j] + Math.abs(origin[p][l] - origin[i][j]) + curNumEnd;condsEnd.push(arr[i][j]);continue}
      arr[i][j] = Math.abs(origin[p][l] - origin[i][j]) + curNumEnd <= newArr[i][j]?String(Math.abs(origin[p][l] - origin[i][j]) + curNumEnd):String(newArr[i][j]);
      if(infMassEnd.indexOf(`${i}|${j}`) != -1){arr[i][j] = String(Math.abs(origin[p][l] - origin[i][j]) + curNumEnd)}
      if(variantsEnd.indexOf(`${i}|${j}`) == -1){variantsEnd.push(`${i}|${j}`);}
      if(infMassEnd.indexOf(i +"|"+ j) != -1){infMassEnd.splice(infMassEnd.indexOf(i +"|"+ j),1)}
    }
  }//if(condsEnd.length != 0){return condsEnd.reduce((acc,el,ind,arr)=>{if(el < acc){acc = el};return acc},Infinity)}
  //variants = variants.reduce((acc,el,ind)=>{if(acc.indexOf(el))},[])
  var lessEnd = variantsEnd.reduce((acc,el,ind)=>{[endI,endJ] = el.split("|");if((arr[+endI][+endJ] < acc.val)&&(arr[+endI][+endJ] != "P")){acc = {i:endI,j:endJ,val:arr[+endI][+endJ]}}return acc},{val:Infinity});
  endI = lessEnd.i;
  endJ = lessEnd.j;
  curNumEnd = lessEnd.val;
  variantsEnd.splice(variantsEnd.indexOf(`${i}|${j}`),1);
  //if(i == arr.length - 1 && j == arr.length - 1 && checker(arr)){elemCounter = 0};
  //if(elemCounter == 0){for(var g = 0; g<arr.length;g++){for(var h = 0; h < arr.length; h++){if(typeof arr[g][h] == "number"){curNum = arr[g][h];return findLess(arr,g,h,endI,endJ,curNum,infMass,origin,endVal)}}}}
  return findLess(arr,Number(i),Number(j),Number(endI),Number(endJ),curNum,infMass,origin,variants,variantsEnd,infMassEnd,Number(curNumEnd))
}
function toArr(area){
  var arr = area.split("");
  var step = Math.sqrt(area.length);
  var path = [];
  for(var i = 0; i < area.length; i+=step){
    path.push(arr.splice(0,step));
  }
  path = path.map((el)=>{return el.map((e)=>{return Number(e)})})
  return path;
}
function shortestPath(arr,s=0,j=0,endI,endJ, variants = [], variantsEnd = []){
  if(typeof arr != "object"){var arr = toArray(arr);arr = arr.map((el)=>{return el.map((e)=>{return e == "."?1:e})});endI = arr.length - 1; endJ = arr.length - 1;arr[i][j] = 0;}
  var k = i, n = j, c = endI, v = endJ;
  var num = arr[i][j];
  for(let i = k - 1; i <= k + 1; i++){
    for(let j = n - 1; j <= n + 1; j++){
      if(i < 0 || j < 0 || i > arr.length - 1 || j > arr.length - 1 || (i == k && j == n) || ( i != k && j != n)){continue};
      if(arr[i][j] == "W" || arr[i][j] == "P"){continue};
      if(typeof arr[i][j] == "string"){return +arr[i][j] + num}
      if(1 + num < arr[i][j]){arr[i][j] = 1 + num}else if(arr[i][j] == 1){arr[i][j] = num + 1}
      if(variants.indexOf(`${i}|${j}`) == -1) variants.push(`${i}|${j}`)
    }
  }arr[i][j] = "P";
  if(variants.length == 0){return false}
  [i,j] = variants.splice(0,1)[0].split("|")
  num = arr[endI][endJ];
  for(let i = c - 1; i <= c + 1; i++){
    for(let j = v - 1; j <= v + 1; j++){
      if(i < 0 || j < 0 || i > arr.length - 1 || j > arr.length - 1 || (i == c && j == v) || ( i != c && j != v)){continue};
      if(arr[i][j] == "W" || arr[i][j] == "V"){continue};
      if(typeof arr[i][j] == "number" && arr[i][j] != 1){return +num + arr[i][j]}
      if(+num + 1 < Number(arr[i][j])){arr[i][j] = String(+num +1)}else if(arr[i][j] == 1){arr[i][j] = String(+num+1)}
      if(variantsEnd.indexOf(`${i}|${j}`) == -1) variantsEnd.push(`${i}|${j}`)
    }
  }arr[endI][endJ] = "V";
  if(variantsEnd.length == 0){return false}
  [endI,endJ] = variantsEnd.splice(0,1)[0].split("|")
  return shortestPath(arr, Number(i), Number(j), Number(endI),Number(endJ),variants,variantsEnd)
}
function finder(arr,sI=0,sJ=0,eI,eJ,variants = [], origin){
  if(typeof arr == "string"){arr = toArr(arr);eI = arr.length - 1, eJ = arr.length - 1;origin = arr.map((e)=>{return e.map((el)=>{return el})})};
  do{
  const currS = (sI == 0 && sJ == 0)?0:arr[sI][sJ];
  if(sI == eI && sJ == eJ){console.log(arr);return currS}
  for(let i = sI - 1; i <= sI + 1; i++){
    for(let j = sJ - 1; j <= sJ + 1; j++){
      if(arr[i] == undefined || arr[i][j] == undefined || arr[i][j] == "P" || ( i != sI && j != sJ) || (i == sI && j == sJ)){continue}
      //if(variantsEnd.indexOf(`${i}|${j}`) != -1 && variants.indexOf(`${i}|${j}`) == -1){return currS + arr[i][j] + Math.abs(origin[sI][sJ] - origin[i][j])}
      arr[i][j] = arr[i][j] == origin[i][j]?Math.abs(origin[sI][sJ] - origin[i][j]) + currS:arr[i][j] < Math.abs(origin[sI][sJ] - origin[i][j]) + currS?arr[i][j]:Math.abs(origin[sI][sJ]-origin[i][j]) + currS;
      if(variants.indexOf(`${i}|${j}`) == -1){variants.push(`${i}|${j}`)}
    }
  };
  arr[sI][sJ] = "P";
  let lessS = variants.reduce((acc,el)=>{[i,j] = el.split("|");if(arr[i][j] < acc.val){acc = {i:i,j:j,val:arr[i][j]}};return acc},{val:Infinity});
  sI = Number(lessS.i);
  sJ = Number(lessS.j);
  let indS = variants.indexOf(`${sI}|${sJ}`);
  if(indS != -1){variants.splice(indS,1)}}while(true)}

  function calculate(recs){
    let arr = recs.flat();
    let height,length;
    height = arr.reduce((acc,e,i)=>{if(i%2!=0 && e > acc){acc = e}return acc},0);
    length = arr.reduce((acc,e,i)=>{if(i%2==0 && e > acc){acc = e}return acc},0);
    var board = Array(height+1);
    for(let i = 0; i < board.length;i++){
      board[i]=Array(length+1).fill(0)
    };let summ = 0;
    for(let i = 0; i < recs.length; i++){
        let x1 = recs[i][0],y1 = recs[i][1], x2 = recs[i][2], y2 = recs[i][3];
        for(let j = y1; j <= y2-1; j++){
          for(let t = x1; t <x2; t++){
           if(board[j][t] != 1){
             board[j][t] = 1;summ++;
           }
          }
          //let unos = Array(x2-x1).fill(1)
          //board[i].splice(x1,x2-x1,...unos)
        }
    }
    //console.log(board)
    return summ;
  }

function printRect(board,x1,y1,x2,y2){
   for(let i = y1; i <= y2-1; i++){
     let unos = Array(x2-x1).fill(1)
     board[i].splice(x1,x2-x1,...unos)
   }return board;
}

function calc(recs){
    let set = new Set();
    for(let i = 0; i < recs.length; i++){console.time("s");
        let x1 = recs[i][0],y1 = recs[i][1], x2 = recs[i][2], y2 = recs[i][3];
        for(let j = y1; j <= y2-1; j++){
          for(let n = x1; n <x2;n++){
            if(!set.has(`${j}|${n}`)){set.add(`${j}|${n}`)}
          }
        }console.timeEnd("s");
    }
    return set.size;
  }



//console.log(calculate([[3,3,8,5], [6,3,8,9],[11,6,14,12]]));
function smaller(arr) {
  console.log(arr);
  console.time("Set")
  let map = new Map();
  for(let i = 0; i < arr.length; i++){
    if(!map.get(arr[i])){
      map.set(arr[i],1)
    }else{map.set(arr[i],map.get(arr[i])+1)}
  };
  let res = [];
  for(let i = 0; i < arr.length; i++){
    map.set(arr[i], map.get(arr[i])-1);
    let sum = 0;
    for(let [key,value] of map){
      if(key < arr[i]){
        sum += map.get(key);
      }
    }res.push(sum);
  }console.timeEnd("Set");return res;
}

function smal(arr){
  console.time("n2")
  let res = [];
  for(let i = 0; i < arr.length; i++){
    let counter = 0;
    for(let j = i; j < arr.length; j++){
      if(arr[i]>arr[j]){counter++}
    }res.push(counter)
  }console.timeEnd("n2");return res;
}
//console.log(smaller([5, 4, 7, 9, 2, 4, 4, 5, 6]));
//console.log(smal([5, 4, 7, 9, 2, 4, 4, 5, 6]))

function decompose(n,flag=0,e=0){
  if(flag != 0 && e ==0){e++};
  let n2 = n*n;
  let currN = n-1;
  let res = [];
  while(n2 > 0){
    if(e-1 == res.length){  let num = closest(currN, flag,e);
      res.push(Math.sqrt(num));
      n2 -= num;
      currN = Math.floor(Math.sqrt(n2));continue}
    let num = closest(currN);
    res.push(Math.sqrt(num));
    n2 -= num;
    currN = Math.floor(Math.sqrt(n2));
  }let set = new Set();
  for(let i = 0; i < res.length;i++){if(!set.has(res[i])){set.add(res[i])}};return set.size == res.length?res:flag>2?decompose(n,1,e+1):decompose(n,flag+1,e);
}
function closest(num, flag=0,e=0){
   return Math.pow((num - flag),2);
}
//console.log(decompose(50));

let v = 0;
function findPosition(num){
  let counter = -2;
  let checker = num.length;
  let fake = 0;
  let nextVal = "";
  let str = "";
  do{
    checker = num.length;
    if(v > 1000){return v};
   str = str + nextVal;
   fake++;
   nextVal = String(fake);
   counter += String(nextVal).length;
   let j = 0;
   for(let i = 0; i < num.length || i < str.length; i++){
     if(checker != num.length && num[j] != str[i] && str[i] != undefined){str = "";break};
     if(num[j] == str[i]){j++;checker--;if(checker==0){console.log(str);return counter - num.length - 1};continue}else if(checker != num.length && str[i] == undefined){break}else if(i == str.length - 1){str = "";};
   }
  }while(true)
}
//console.log(findPosition("123456798"))
function maximumClique(graph){
 let step = graph.length;
 let res = [];
  for(let i = 0; i < step; i++){
    let mass = [];
    //mass.push(i);
    graph[i].forEach(function(e,ind,arr){
      if(arr[ind] == 1){
        mass.push(ind);
      }
    });res.push(mass);
  }return res;
};
console.log(maximumClique([
    	[0,1,0,0],
      [1,0,1,1],
      [0,1,0,1],
      [0,1,1,0]
    ]));
let http =
