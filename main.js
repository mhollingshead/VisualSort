var base;
var best;
var worst;

function generateArray() {
  document.getElementById("runtime_info").classList.add('invisible');
  var len = document.getElementById("arr_length").value;
  var disp = document.getElementById("disp_area");
  disp.innerHTML = "";
  var bar_height;
  var bar_el;
  var rand_i = Math.floor((Math.random() * len - 0) + 0);
  for (var i = 0; i < len; i++) {
    bar_el = document.createElement("div");
    bar_el.classList.add("bar");
    bar_el.classList.add("unsorted");
    if (i === rand_i) {
      bar_height = 100
    }
    else {
      bar_height = Math.floor((Math.random() * 100 - 5) + 5);
    }
    bar_el.style.height = bar_height + "%";
    bar_el.style.width = (100 / len) * 0.8 + "%";
    bar_el.style.borderLeft = (100 / len) * 0.2 + "px solid #f8f8f8";
    bar_el.style.borderRight = (100 / len) * 0.2 + "px solid #f8f8f8";
    disp.appendChild(bar_el);
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function insertionSort(arr, len) {
  var i, key, j, key_num, j_num, k;
  var speed;
  var act_arr;
  var sel_arr = document.getElementsByClassName('sel');
  var whl_arr = document.getElementsByClassName('whl');
  //var debug = document.getElementById("debug");
  arr[0].classList.add('sorted');
  var count = 0;
  var startTime = new Date();
  for (i = 1; i < len; i++) {
    speed = document.getElementById("speed").value;
    arr = document.getElementById("disp_area").childNodes;
    key = arr[i];
    //debug.innerHTML += ("i: " + i + "</br>");
    key_num = arr[i].style.height;
    key_num = parseInt(key_num.substring(0, key_num.length - 1), 10);
    //debug.innerHTML += "key_num: " + key_num + "</br>";
    key.classList.remove('unsorted');
    key.classList.add('current');
    act_arr = document.getElementsByClassName('active');
    if (document.getElementsByClassName('active').length != 0) {
      for (k = 0; k < whl_arr.length; k++) {
        whl_arr[k].classList.remove('active');
      }
    }
    for (k = 0; k < sel_arr.length; k++) {
      sel_arr[k].classList.add('active');
    }
    count++;
    await sleep(speed);
    j = i - 1;
    //debug.innerHTML += "j: " + j + "</br>";
    j_num = arr[j].style.height;
    j_num = parseInt(j_num.substring(0, j_num.length - 1), 10);
    //debug.innerHTML += "j_num: " + j_num + "</br>";
    while (j >= 0 && j_num > key_num) {
      arr[j+1].parentNode.insertBefore(arr[j+1], arr[j]);
      arr[j].classList.add('current');
      j = j - 1;
      if (j >= 0) {
        j_num = arr[j].style.height;
        j_num = j_num.substring(0, j_num.length - 1);
      }
      for (k = 0; k < sel_arr.length; k++) {
        sel_arr[k].classList.remove('active');
      }
      for (k = 0; k < whl_arr.length; k++) {
        whl_arr[k].classList.add('active');
      }
      count++;
      await sleep(speed);
      //debug.innerHTML += "while j_num: " + j_num + "</br>";
    }
    arr[j+1].parentNode.replaceChild(arr[j+1], key);
    arr[j+1].classList.add('sorted');
    //debug.innerHTML += "</br>";
  }
  var endTime = new Date();
  for (k = 0; k < sel_arr.length; k++) {
    sel_arr[k].classList.remove('active');
  }
  for (k = 0; k < whl_arr.length; k++) {
    whl_arr[k].classList.remove('active');
  }
  var timeElapsed = endTime - startTime;
  timeElapsed /= 1000;
  document.getElementById("rt_len").innerHTML = len;
  document.getElementById("rt_time").innerHTML = timeElapsed;
  document.getElementById("rt_speed").innerHTML = speed;
  document.getElementById("rt_base").innerHTML = base;
  document.getElementById("rt_best").innerHTML = best;
  document.getElementById("rt_worst").innerHTML = worst;
  if (document.getElementById("runtime_info").classList.contains('invisible')){
    document.getElementById("runtime_info").classList.toggle('invisible');
  }
}
function testInsertion(arr) {
  var startTime = performance.now();
  var len = arr.length;
  for (var i = 1; i < len; i++) {
    var key = arr[i];
    var j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j+1] = arr[j];
      j = j - 1;
    }
    arr[j+1] = key;
  }
  var endTime = performance.now();
  return endTime - startTime;
}
async function selectionSort(arr, len) {
  var i, j, min_idx, speed, j_num, min_num;
  var startTime = new Date();
  for (i = 0; i < len-1; i++) {
    speed = document.getElementById("speed").value;
    min_idx = i;
    if (document.getElementsByClassName('active').length != 0) {
      document.getElementsByClassName('active')[0].classList.remove('active');
    }
    document.getElementsByClassName('sel')[0].classList.add('active');
    await sleep(speed);
    for (j = i+1; j < len; j++) {
      arr = document.getElementById("disp_area").childNodes;
      j_num = arr[j].style.height;
      j_num = parseInt(j_num.substring(0, j_num.length - 1), 10);
      min_num = arr[min_idx].style.height;
      min_num = parseInt(min_num.substring(0, min_num.length - 1), 10);
      arr[min_idx].classList.add('current');
      arr[j].classList.add('current');
      if (document.getElementsByClassName('active').length != 0) {
        document.getElementsByClassName('active')[0].classList.remove('active');
      }
      document.getElementsByClassName('loop')[0].classList.add('active');
      await sleep(speed);
      if (j_num < min_num) {
        arr[min_idx].classList.remove('current');
        min_idx = j;
        arr[min_idx].classList.add('current');
      }
      else {
        if (j != min_idx){

        }
      }
      arr[j].classList.remove('current');
    }
    var tmp = arr[min_idx].cloneNode(true);
    var clone = arr[i].cloneNode(true);
    arr[min_idx].parentNode.replaceChild(clone, arr[min_idx]);
    arr[i].parentNode.replaceChild(tmp, arr[i]);
    arr[min_idx].classList.remove('current');
    arr[min_idx].classList.add('unsorted');
    arr[i].classList.remove('unsorted');
    arr[i].classList.add('sorted');
    document.getElementsByClassName('active')[0].classList.remove('active');
    document.getElementsByClassName('swap')[0].classList.add('active');
    await sleep(speed);
  }
  var endTime = new Date();
  arr[len-1].classList.add('sorted');
  if (document.getElementsByClassName('active').length != 0) {
    document.getElementsByClassName('active')[0].classList.remove('active');
  }
  var timeElapsed = endTime - startTime;
  timeElapsed /= 1000;
  document.getElementById("rt_len").innerHTML = len;
  document.getElementById("rt_time").innerHTML = timeElapsed;
  document.getElementById("rt_speed").innerHTML = speed;
  document.getElementById("rt_base").innerHTML = base;
  document.getElementById("rt_best").innerHTML = best;
  document.getElementById("rt_worst").innerHTML = worst;
  if (document.getElementById("runtime_info").classList.contains('invisible')){
    document.getElementById("runtime_info").classList.toggle('invisible');
  }
}
function testSelection(arr) {
  var startTime = performance.now();
  var len = arr.length;
  for (var i = 0; i < len-1; i++) {
    var min_idx = i;
    for (var j = i+1; j < len; j++) {
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    var tmp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = tmp;
  }
  var endTime = performance.now();
  return endTime - startTime;
}
async function bubbleSort(arr, len) {
  /*
  var i, j;
  for (i = 0; i < len-1; i++) {
    for (j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        int tmp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = tmp;
      }
    }
  }
  */
  var i, j, speed, i_num, j_num;
  document.getElementsByClassName('check')[0].classList.add('active');
  var startTime = new Date();
  for (i = 0; i < len-1; i++) {
    for (j = 0; j < len-i-1; j++) {
      document.getElementsByClassName('check')[0].classList.add('active');
      if (document.getElementsByClassName('current').length > 1) {
        document.getElementsByClassName('current')[1].classList.remove('current');
      }
      speed = document.getElementById("speed").value;
      //arr[j] numerical value
      j_num = arr[j].style.height;
      j_num = parseInt(j_num.substring(0, j_num.length - 1), 10);
      //arr[j+1] numerical value
      n_num = arr[j+1].style.height;
      n_num = parseInt(n_num.substring(0, n_num.length - 1), 10);
      arr[j].classList.add('current');
      arr[j+1].classList.add('current');
      await sleep(speed);
      if (j_num > n_num) {
        //swap arr[j] and arr[j+1]
        var tmp = arr[j].cloneNode(true);
        var clone = arr[j+1].cloneNode(true);
        arr[j].parentNode.replaceChild(clone, arr[j]);
        arr[j+1].parentNode.replaceChild(tmp, arr[j+1]);
      }
    }
    arr[j].classList.add('sorted');
    arr[j].classList.remove('current');
    await sleep(speed);
  }
  var endTime = new Date();
  arr[0].classList.add('sorted');
  for (var k = 0; k < document.getElementsByClassName('active').length; k++) {
    document.getElementsByClassName('active')[k].classList.remove('active');
  }
  var timeElapsed = endTime - startTime;
  timeElapsed /= 1000;
  document.getElementById("rt_len").innerHTML = len;
  document.getElementById("rt_time").innerHTML = timeElapsed;
  document.getElementById("rt_speed").innerHTML = speed;
  document.getElementById("rt_base").innerHTML = base;
  document.getElementById("rt_best").innerHTML = best;
  document.getElementById("rt_worst").innerHTML = worst;
  if (document.getElementById("runtime_info").classList.contains('invisible')){
    document.getElementById("runtime_info").classList.toggle('invisible');
  }
}
function testBubble(arr){
  var startTime = performance.now();
  var len = arr.length;
  var i, j;
  for (i = 0; i < len-1; i++) {
    for (j = 0; j < len-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        var tmp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = tmp;
      }
    }
  }
  var endTime = performance.now();
  return endTime - startTime;
}
function generateWorstCase() {
  generateArray();
  var arr = document.getElementById("disp_area").childNodes;
  var len = arr.length;
  var i, j, speed, i_num, j_num;
  for (i = 0; i < len-1; i++) {
    for (j = 0; j < len-i-1; j++) {
      //arr[j] numerical value
      j_num = arr[j].style.height;
      j_num = parseInt(j_num.substring(0, j_num.length - 1), 10);
      //arr[j+1] numerical value
      n_num = arr[j+1].style.height;
      n_num = parseInt(n_num.substring(0, n_num.length - 1), 10);
      if (j_num < n_num) {
        //swap arr[j] and arr[j+1]
        var tmp = arr[j].cloneNode(true);
        var clone = arr[j+1].cloneNode(true);
        arr[j].parentNode.replaceChild(clone, arr[j]);
        arr[j+1].parentNode.replaceChild(tmp, arr[j+1]);
      }
    }
  }
}
function generateBestCase() {
  generateArray();
  var arr = document.getElementById("disp_area").childNodes;
  var len = arr.length;
  var i, j, speed, i_num, j_num;
  for (i = 0; i < len-1; i++) {
    for (j = 0; j < len-i-1; j++) {
      //arr[j] numerical value
      j_num = arr[j].style.height;
      j_num = parseInt(j_num.substring(0, j_num.length - 1), 10);
      //arr[j+1] numerical value
      n_num = arr[j+1].style.height;
      n_num = parseInt(n_num.substring(0, n_num.length - 1), 10);
      if (j_num > n_num) {
        //swap arr[j] and arr[j+1]
        var tmp = arr[j].cloneNode(true);
        var clone = arr[j+1].cloneNode(true);
        arr[j].parentNode.replaceChild(clone, arr[j]);
        arr[j+1].parentNode.replaceChild(tmp, arr[j+1]);
      }
    }
  }
}
function sort() {
  var arr = document.getElementById("disp_area").childNodes;
  var len = arr.length;
  var num_arr = new Array(len);
  var bestCase = new Array(len);
  var worstCase = new Array(len);
  var tmp;
  for (var i = 0; i < len; i++) {
    tmp = arr[i].style.height;
    tmp = parseInt(tmp.substring(0, tmp.length - 1), 10);
    num_arr[i] = tmp;
    bestCase[i] = tmp;
    worstCase[i] = tmp;
  }
  bestCase.sort(function(a, b){return a - b});
  worstCase.sort(function(a, b){return b - a});
  var alg = document.getElementById("algo").value;
  var val;
  if (alg === "insertion") {
    base = testInsertion(num_arr).toFixed(3);
    best = testInsertion(bestCase).toFixed(3);
    worst = testInsertion(worstCase).toFixed(3);
    val = (((base - best)) / (worst - best))*300;
    if (base == '0.000' || worst == '0.000'){
      document.getElementById("peg").style.marginLeft = "0px";
    }
    else {
      if (val < 0) {
        document.getElementById("peg").style.marginLeft = "0px";
      }
      else if (val > 300) {
        document.getElementById("peg").style.marginLeft = "300px";
      }
      else {
        document.getElementById("peg").style.marginLeft = val + "px";
      }
    }
    insertionSort(arr, len);
  }
  if (alg === "selection") {
    base = testSelection(num_arr).toFixed(3);
    best = testSelection(bestCase).toFixed(3);
    worst = testSelection(worstCase).toFixed(3);
    val = (((base - best)) / (worst - best))*300;
    if (base == '0.000' || worst == '0.000'){
      document.getElementById("peg").style.marginLeft = "0px";
    }
    else {
      if (val < 0) {
        document.getElementById("peg").style.marginLeft = "0px";
      }
      else if (val > 300) {
        document.getElementById("peg").style.marginLeft = "300px";
      }
      else {
        document.getElementById("peg").style.marginLeft = val + "px";
      }
    }
    selectionSort(arr, len);
  }
  if (alg === "bubble") {
    base = testBubble(num_arr).toFixed(3);
    best = testBubble(bestCase).toFixed(3);
    worst = testBubble(worstCase).toFixed(3);
    val = (((base - best)) / (worst - best))*300;
    if (base == '0.000' || worst == '0.000'){
      document.getElementById("peg").style.marginLeft = "0px";
    }
    else {
      if (val < 0) {
        document.getElementById("peg").style.marginLeft = "0px";
      }
      else if (val > 300) {
        document.getElementById("peg").style.marginLeft = "300px";
      }
      else {
        document.getElementById("peg").style.marginLeft = val + "px";
      }
    }
    bubbleSort(arr, len);
  }
}
function switchAlgo() {
  var alg = document.getElementById("algo").value;
  for (var i = 0; i < document.getElementsByClassName('selected').length; i++) {
    document.getElementsByClassName('selected')[i].classList.remove('selected');
  }
  document.getElementById(alg+"_code").firstChild.className = "selected";
  document.getElementsByClassName('visible')[0].className = "invisible";
  document.getElementById(alg+"_code").classList.remove('invisible');
  document.getElementById(alg+"_code").classList.add('visible');
  document.getElementById("codearea").innerHTML = window[alg+"c"];

  if (alg === 'insertion') {
    document.getElementById("specs").innerHTML = '<td align="center" class="black"><i>n</i></td><td align="center" class="black"><i>n</i><sup>2</sup></td><td align="center" class="black"><i>n</i><sup>2</sup></td><td align="center" class="black">1</td>';
    document.getElementById("title").innerHTML = "Insertion Sort";
  }
  if (alg === 'selection') {
    document.getElementById("specs").innerHTML = '<td align="center" class="black"><i>n</i><sup>2</sup></td><td align="center" class="black"><i>n</i><sup>2</sup></td><td align="center" class="black"><i>n</i><sup>2</sup></td><td align="center" class="black">1</td>';
    document.getElementById("title").innerHTML = "Selection Sort";
  }
  if (alg === 'bubble') {
    document.getElementById("specs").innerHTML = '<td align="center" class="black"><i>n</i></td><td align="center" class="black"><i>n</i><sup>2</sup></td><td align="center" class="black"><i>n</i><sup>2</sup></td><td align="center" class="black">1</td>';
    document.getElementById("title").innerHTML = "Bubble Sort";
  }
}
