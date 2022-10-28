window.onload = () => {
    update()
    hidePopup()
    objem=data.get("sklenicka_objem")||300
}
var objem
function addWater(ml, mlt=1) {
    if(ml=="cup") {
        ml=objem
    }
    let date = new Date()
    let dt = date.getUTCDate().toString() + date.getMonth().toString() + date.getUTCFullYear().toString()
    let vt = parseInt(data.get("vodated"+dt)) || 0
    data.save("vodated"+dt, parseInt((vt+ml*mlt)))
    update()
}
function setHtml(id,html) {
    try {
        document.getElementById(id).innerHTML=html
    } catch (error) {

    }
}
function update() {
    let date = new Date()
    let dt = date.getUTCDate().toString() + date.getMonth().toString() + date.getUTCFullYear().toString()
    let vt = parseInt(data.get("vodated"+dt)) || 0
    if(!data.get("vodagoal"))data.save("vodagoal",2)
    objem=data.get("sklenicka_objem")||300
    try {
        setHtml("voda-ted",(vt).toString())
        //setHtml("voda-goal", )
        setHtml("voda-goal", ((data.get("vodagoal") || 2)*1000).toString() + "ml")
        setHtml("INP-objem",objem+ ' <span class="jednotka">ml</span>')
        setHtml("INP-cil", ((data.get("vodagoal") || 2)*1000).toString() + ' <span class="jednotka">ml</span>')
        setHtml("voda-ted2",Math.round(vt/objem*2)/2)
        setHtml("voda-goal2",(Math.round(data.get("vodagoal")*100/(objem/10)*2)/2 || Math.round(2000/objem)).toString())
        setHtml("voda-ted3",(Math.round((vt/data.get("vodagoal"))/10)).toString()+"%"    )
        
    } catch (error) {

    }
    
    let txt = Math.round(((data.get("vodagoal")*1000)-vt)/objem*2)/2
    let end = "sklenic"
    if(txt==1) end="sklenička"
    if(txt==2 || txt==3 || txt==4) end="sklenice"
if(txt>0) {
    document.getElementById("voda-ted__").innerHTML = `
Zbývá ti ješte <span id="voda-ted_" class="zbyva_">${txt}</span> ${end} vody!
       
    `
} else {
document.getElementById("voda-ted__").innerHTML = `
Dnes už máš vypito<span class="zbyva_">.</span> 
       
    `
}
    
   
}
function setGoal() {

    update()
}

//sklenicka-input

function setObjem() {
    let gl = document.getElementById("sklenicka-input").value
    let gl2 = document.getElementById("voda-goal-input").value

    
    if(!gl) {
        gl = gl || 300
    } else {

        objem=gl
    data.save("sklenicka_objem", parseFloat(gl))
    }

    if(!gl2) {
        gl2 = 2000
    } else {
        data.save("vodagoal", parseFloat(gl2/1000))
    }


    if(!gl && !gl2) {
        openPopup("Musíš vyplnit obě dvě políčka pokud chceš přizspůsobit svůj plán.")
    
        return
    }

    update()
}

function hidePopup() {
    document.getElementById("popup").innerHTML=``
}

function openPopup(text="?") {
    document.getElementById("popup").innerHTML=`
    <div class="popup">
    <span class="material-symbols-outlined" onclick="hidePopup()">
        close
    </span>
    <span class="maintext">
        ${text}
    </span>
    </div>
`
}
