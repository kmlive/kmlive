var audio = new Audio("https://music.yiddish24.com:5001/1");
var list = {"1": "Live", "2": "Shabbos", "3": "Vocal", "4": "Chanukah", "5": "Chazunos", "6": "Motzie Shabbos", "7": "Yiddish Songs", "8": "Chassuna Freilech", "9": "Kumzits", "10": "Chassuna Second Dance", "11": "Relax Music", "12": "Purim", "13": "Pesach", "14": "Lag Be'omer", "16": "Yumim Noiruim", "17": "Sukkos", "19": "Shvues", "20": "MBD", "21": "Abraham Fried", "22": "Lipa", "23": "Michoel ", "24": "Moshe Goldman", "25": "Isaac Honig", "26": "Kids Choir", "27": "L'chaim", "28": "Belz", "29": "Viznitz", "30": "Skulen", "31": "Bobov", "32": "Benzion Shenker", "33": "Modzitz", "34": "Moti Ilowitz", "35": "Satmar"}
var select = document.createElement("select")
var cur = "1"
select.onchange = function () {
    cur = select.value
    var paused = audio.paused
    audio.src = "https://music.yiddish24.com:5001/" + cur
    loadInfo()
    if (!paused)
    audio.play()
}
select.onclick = function (ev) {
    ev.stopPropagation()
}
var options = {}
for ( k in list){
    var option = new Option(list[k], k)
    options[k] = option
    select.appendChild(option)
         //.cloneNode(true)
    };
document.getElementById("cont").appendChild(select)

var button = $("#play-pause-button")
document.onclick =function(){
    if(button.hasClass("fa-play"))
    {
        button.removeClass("fa-play");
     button.addClass("fa-pause");
     audio.play();
    }
    else
    {
        button.removeClass("fa-pause");
        button.addClass("fa-play");
        audio.pause();
    }
};

audio.onended = function() {
    $("#play-pause-button").removeClass("fa-pause");
    $("#play-pause-button").addClass("fa-play");
};

var info = document.getElementById("info")
var results ;
evtSource = new EventSource('https://music.yiddish24.com:5001/ev/my_channel_1');
   
      evtSource.onopen = function(){
        $.get("https://music.yiddish24.com:5001/playing.txt",function(data){
			
          var result = JSON.parse(data);
          processData(result);
        })
      };
      evtSource.onerror = function(){
      }; 
 evtSource.onmessage = function(e) {
        var result = JSON.parse(e.data);
        processData(result);

      }
  function processData(result){
    results = result
    loadInfo()
	
    
}
function loadInfo(){
    for (res in results)
        if (res)
            options[res].innerText = list[res] + ': ' + results[res].name
    // info.innerText = results[cur].name
    var image = "";
		//console.log( result);
		if(results[cur].albumart != undefined && results[cur].albumart.match(/\.(png|jpg|gif|jpeg)/i )) {
			image = "url(https://music.yiddish24.com:5001/albumarts/"+cur+"/"+results[cur].albumart + ")";
		} 
    console.log(image);
    document.body.style.backgroundImage = image || 'url(https://www.yiddish24.com/images/how-built-img.jpg)'
}