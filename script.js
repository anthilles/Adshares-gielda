//bid - s | ask - k

var adstAskBtc;
var adstBidBtc;
var adstLastBTc;
var btcUsdAktualnyKurs;
var dolar;
var pln;
var adstTokenPrice;
var myObj;

// CRYPTOPIA //
function naStart(){
    $.getJSON("https://www.cryptopia.co.nz/api/GetMarket/ADST_BTC", function(result){
    adstAskBtc = (result.Data.AskPrice).toFixed(7);
    adstBidBtc = (result.Data.BidPrice).toFixed(7);
    adstLastBTc = (result.Data.LastPrice).toFixed(7);
    const kursCryptPLN = document.getElementById("kursCryptopiaPLN").innerHTML = adstAskBtc + ' BTC';
    const kursCryptUSD = document.getElementById("kursCryptopiaUSD").innerHTML = adstBidBtc + ' BTC';
    setTimeout(naStart, 5000);
    spread();
    sredniacena();
});
};
naStart();

function spread(){
    const spread = ((adstAskBtc - adstBidBtc)*100).toFixed(5) + ' %';
    const SpreadAdst = document.getElementById("spreadBtc").innerHTML = spread;
    
}

// TOKEN ETHPLORER //

function naStartToken(){
    $.getJSON("https://api.ethplorer.io/getTokenInfo/0x422866a8F0b032c5cf1DfBDEf31A20F4509562b0?apiKey=freekey", function(resultToken){
    adstTokenPrice = (resultToken.price.rate/btcUsdAktualnyKurs).toFixed(7);
    const kursToken = document.getElementById("kursToken").innerHTML = adstTokenPrice + ' BTC';
    setTimeout(naStartToken, 5000);
});
// BTC/USD //
    function btcUsdJson(){
        $.getJSON("https://api.coinmarketcap.com/v1/ticker/bitcoin/", function(btcUsdJsonDane){
            btcUsdAktualnyKurs = btcUsdJsonDane[0].price_usd;
            const kursBtcUsd = document.getElementById("kursBtcUsd").innerHTML = btcUsdAktualnyKurs + ' usd';
            setTimeout(btcUsdJson, 5000);
        });
        const dolar = adstTokenPrice * btcUsdAktualnyKurs;
    };
    btcUsdJson();
};
naStartToken();

// BTC/PLN //

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        document.getElementById("kursBtcPln").innerHTML = myObj.last + ' zł'    ;
    }
};
xmlhttp.open("GET", "https://bitbay.net/API/Public/BTCPLN/ticker.json", true);
xmlhttp.send();

// NBP //    

$.getJSON('http://api.nbp.pl/api/exchangerates/rates/c/usd/?format=json',
    function(data){
        JsonKursDolara = ((data.rates[0].bid - data.rates[0].ask)/2)+data.rates[0].bid;
        document.getElementById("kursUsdPln").innerHTML = JsonKursDolara.toFixed(2) + ' pln';
    },function(error){
        console.log(error);
}); 



function sredniacena(){
    var cenabtc = adstLastBTc;
    var cenadolar = cenabtc*btcUsdAktualnyKurs;
    var cenapln = cenadolar*JsonKursDolara;
    document.getElementById("cenadolar").innerHTML = cenadolar.toFixed(2) + ' usd';
    document.getElementById("cenapln").innerHTML = cenapln.toFixed(2) + ' zł';
    document.getElementById("cenabtc").innerHTML = cenabtc + ' BTC';
        // document.getElementById("cenaeth").innerHTML = 'eth' + ' ETH';
}


// new Chartist.Pie('.ct-chart', {
//   series: [99.81, 0.19]
// }, {
//   donut: true,
//   donutWidth: 60,
//   donutSolid: true,
//   startAngle: 270,
//   showLabel: true
// });

window.onload = function () {
	var chart = new CanvasJS.Chart("chartContainer",
	{
		title:{
			fontFamily: "Impact",
			fontWeight: "normal"
		},

		legend:{
			verticalAlign: "bottom",
			horizontalAlign: "center"
		},
		data: [
		{
			//startAngle: 45,
			indexLabelFontSize: 20,
			indexLabelFontFamily: "Garamond",
			indexLabelFontColor: "darkgrey",
			indexLabelLineColor: "darkgrey",
			indexLabelPlacement: "outside",
			type: "doughnut",
			showInLegend: true,
			dataPoints: [
				{  y: 100, legendText:"Cryptopia" },
			]
		}
		]
	});

	chart.render();
}