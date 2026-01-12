var tablehd=[]
var sptType
var sel_pref
var idokeidoArray=[]
var dataArray=[]


function makeTable(){

    // 表の作成開始
    
    var rowobj;
    var spt=[];
    dataArray=[];
    idokeido = {};
    layerNum = 0    
    dataArray=[]
    dspdata=[]
    layerNum = 0;
    
    tablehd = []

    tablehd[0] = "府県or旧国"
    tablehd[1] = "郡"
    tablehd[2] = "村"
    tablehd[3] = "領地"
//    tablehd[4] = "石高"
    
    rowCount = 0

    oldpref = ""
    oldcounty = ""
    oldvil = ""
            
    prefCount = 0
    countyCount = 0
    vilCount = 0
    
    for(ii=0;ii < territoryData.length ; ii++){
        //データを1行づつ読み込む

        dataArray[rowCount]=[]

        cityName=[]
        cityName = territoryData[ii][0].split(';')   

 //       dataArray[rowCount][0] = cityName[0]
 //       dataArray[rowCount][1] = cityName[1]
 //       dataArray[rowCount][2] = cityName[2]

        cityData=[]
        cityData = territoryData[ii][1].split('\t')

        for(j = 0; j < cityData.length;j++){
            dataArray[rowCount]=["","","",""]
            if (oldpref != cityName[0]) {
                dataArray[rowCount][0] = cityName[0]
                dataArray[rowCount][1] = cityName[1]
                dataArray[rowCount][2] = cityName[2]
                prefCount = prefCount + 1
                countyCount = countyCount +1
                vilCount = vilCount + 1
                oldpref = cityName[0]
                oldcounty = cityName[1]
                oldvil = cityName[2]
            } else {
                if (oldcounty != cityName[1]){
                    dataArray[rowCount][0] = cityName[0]
                    dataArray[rowCount][1] = cityName[1]
                    dataArray[rowCount][2] = cityName[2]
                    countyCount = countyCount +1
                    vilCount = vilCount + 1    
                    oldcounty = cityName[1]
                    oldvil = cityName[2]
                } else{
                    if (oldvil != cityName[2]){
                        dataArray[rowCount][2] = cityName[2]
                        vilCount = vilCount + 1    
                        oldvil = cityName[2]
                    }    
                }    
            }
            dataArray[rowCount][3]=  cityData[j]
            rowCount = rowCount + 1
        } 
    }

   document.getElementById("dispVilName").innerText = "全"
   document.getElementById("VilCount").innerText = String(prefCount) + "府県 " + String(countyCount)+"市郡" + String(vilCount)+ "町村"

   dspdata = dataArray.concat(); // tableinitはdspdataを表示する仕様に統一するためdspdata にdataArrayをコピー    

   tableinit(dspdata,"")

}
function tableinit(dspdata,HanName){

    var tableid = document.getElementById("table")
    var tableelm = tableid.getElementsByTagName("table")
    if(tableelm.length != 0){
        tableid.removeChild(tableelm[0]);
    }
    
    var table = document.createElement("table");
    table.setAttribute('class','territoryTable')
    table.setAttribute('id','territorytable')
    thead = table.createTHead();
    rowobj= thead.insertRow(); 
    //最初の列はNo.を表示する列にする
    //cell = document.createElement('th')
    //cell.appendChild(document.createTextNode("No."));
    //thead.appendChild(cell);
    //データの列のためのヘッダを作る
    for(j = 0; j < tablehd.length; j++){
        cell = document.createElement('th')
        cell.appendChild(document.createTextNode(tablehd[j]));
        thead.appendChild(cell);
    } 
    tbody = table.createTBody();
    for(i = 0; i < dspdata.length; i++){
        rowobj=  tbody.insertRow(-1)
        //No.を列を作成
        //cell=rowobj.insertCell(-1);
        //cell.appendChild(document.createTextNode(String(i+1)));
        styletext = ""
        for(j = 0; j < dspdata[i].length; j++){
            cell=rowobj.insertCell(-1);
            if (dspdata[i][j] != "" ){
                if(j<2){
                    //府県、郡の変わり目
                    styletext = "background-color: rgb(200, 243, 245);border-top: 1px solid black;"
                }else if(j <3){
                    styletext = "border-top: 1px solid black;"
                }
            }else {
                if (j==2 && styletext!=""){
                    //市で変わり目になったときは、村名が空欄のため、村名が入っているときと同じ処理にする
                    styletext = "border-top: 1px solid black;"
                }
            }
            if (HanName != "" && dspdata[i][j].indexOf(HanName) >= 0 ){
                styletext = styletext + ";color: red;"

            }
            if (styletext != "") {
                cell.setAttribute("style", styletext)

            }
            cell.appendChild(document.createTextNode(dspdata[i][j]));
            } 
    }     
    // 指定したdiv要素に表を加える

    document.getElementById("table").appendChild(table);
}
function makeHanTable(HanName){

    // 表の作成開始
    
    var rowobj;
    var spt=[];

    dataArray=[];
    var result  = territoryData.filter(function( data ) {
            
            return data[1].indexOf(HanName) != -1;
    })
//console.log(HanName+"result:" + result.length)

rowCount = 0

    oldpref = ""
    oldcounty = ""
    oldvil = ""
    prefCount = 0
    countyCount = 0
    vilCount = 0

    for(ii=0;ii < result.length ; ii++){
        //データを1行づつ読み込む

        dataArray[rowCount]=[]

        cityName=[]
        cityName = result[ii][0].split(';')   

 //       dataArray[rowCount][0] = cityName[0]
 //       dataArray[rowCount][1] = cityName[1]
 //       dataArray[rowCount][2] = cityName[2]

        cityData=[]
        cityData = result[ii][1].split('\t')


        for(j = 0; j < cityData.length;j++){
            dataArray[rowCount]=["","","",""]
            if (oldpref != cityName[0]) {
                dataArray[rowCount][0] = cityName[0]
                dataArray[rowCount][1] = cityName[1]
                dataArray[rowCount][2] = cityName[2]
                prefCount = prefCount + 1
                countyCount = countyCount +1
                vilCount = vilCount + 1
                oldpref = cityName[0]
                oldcounty = cityName[1]
                oldvil = cityName[2]
            } else {
                if (oldcounty != cityName[1]){
                    dataArray[rowCount][0] = cityName[0]
                    dataArray[rowCount][1] = cityName[1]
                    dataArray[rowCount][2] = cityName[2]
                    countyCount = countyCount +1
                    vilCount = vilCount + 1
                    oldcounty = cityName[1]
                    oldvil = cityName[2]
                } else{
                    if (oldvil != cityName[2]){
                        dataArray[rowCount][2] = cityName[2]
                        vilCount = vilCount + 1
                        oldvil = cityName[2]
                    }    
                }    
            }
            dataArray[rowCount][3]=  cityData[j]
            rowCount = rowCount + 1
        } 
    }
    dspdata = dataArray.concat(); // tableinitはdspdataを表示する仕様に統一するためdspdata にdataArrayをコピー    

    tableinit(dspdata,HanName)
   document.getElementById("dispVilName").innerText = HanName
   document.getElementById("VilCount").innerText = String(prefCount) + "府県 " + String(countyCount)+"市郡" + String(vilCount)+ "町村"

}

function selectTable(objNum,seltext,detailCond){
    var tableid = document.getElementById("table")
    var tableelm = tableid.getElementsByTagName("table")
    if(tableelm != null){
    tableid.removeChild(tableelm[0]);
    }
    index = 0
    dcount = 50
    var outrow = 0
    if (objNum < 0){
    dspdata = Array.from(dataArray)
    } else {
    tmpArray = Array.from(dspdata)
    dspdata=[]
    if(objNum < tmpArray[0].length){
        index = objNum
    }else {
        index = 0
    }
//        console.log("objNum:"+objNum+"seltext"+seltext+"index:"+index)
    if (isNaN(seltext)){
        for(i = 0;i < tmpArray.length ;i++){
        if ( tmpArray[i][index].indexOf(seltext) != -1) {
            dspdata[outrow] = Array.from(tmpArray[i]);
            outrow = outrow + 1
        }
        }
    } else {
        //条件が数字の時は、以上、以下で絞り込む
        for(i = 0;i < tmpArray.length ;i++){
            console.log("tableData["+Number(tmpArray[i][index].replace(/,/, ''))+"]seltext"+seltext+"index:"+index)
            if(detailCond==1){
            //以上
            if ( Number(tmpArray[i][index].replace(/,/, '')) >= Number(seltext)) {
                dspdata[outrow] = Array.from(tmpArray[i]);
                outrow = outrow + 1
            }
            } else {
            if ( Number(tmpArray[i][index].replace(/,/, '')) <= Number(seltext)) {
                dspdata[outrow] = Array.from(tmpArray[i]);
                outrow = outrow + 1
            }
            }
        }
    }

    
    }
//      console.log(dspdata)
    tableinit(dspdata)
}
function dpsdataido(){
    dspmax = 10
    idoarray=[]
//      console.log("dspdata.length"+dspdata.length+"dataaray"+dataArray.length)
    for(let i=0;i<dspdata.length;i++){
    if (i >= dspmax){
        break
    }
    idoarray.push(idokeido[dspdata[0]])
//      console.log("ido"+idoarray[0]+idoarray[1])

    }
}

function addMarker(){
    //subdoc =     document.getElementById('dataframe').contentWindow
//      subdoc.dpsdataido()
//      console.log("aaa"+subdoc.dspdata)
    // 親ウィンドウ（データ表）の
    idokeidoArray=[]
    let dspmax = 50
    for(let i=0;i< dspdata.length;i++){
        if (i >= dspmax){
            break
        }
        idokeidoArray.push(idokeido[dspdata[i][0]])
    // console.log("idokeido"+subdoc.idokeido[subdoc.dspdata[i][0]])
    }
//        console.log("ttt"+idokeidoArray.length)
    window.opener.focus()
    oyawin =     window.opener.markdsp(idokeidoArray)
    var tbArray=["top50_visible","bottom50_visible"]
    for(let i=0;i<tbArray.length;i++){
        window.opener.document.getElementById(tbArray[i]+String(0)+":"+String(0)).checked = false  // MAPウィンドウの上位、下位マークの選択をクリア
    }
}
function removeMark(){
    oyawin =     window.opener.removeMark()
    idokeidoArray=[]
}
async function wait(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}