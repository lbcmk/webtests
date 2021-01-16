var commands = []

var removalId = 1

function renderItem(type){
		let itemList = document.getElementById("item-list")
    let li = document.createElement('li');
    let name = document.createElement('span');
		let brline = document.createElement('br');
		let labelsX = document.createElement('span');
		let labelsY = document.createElement('span');
		let labelsDeg = document.createElement('span');
		let labelsCCW = document.createElement('span');
    
		let xInput = document.createElement('input');
		let yInput = document.createElement('input');

		let degrees = document.createElement('input');
		let counterclockwise = document.createElement('input');
		
		let labelsDia = document.createElement(`span`)
		let dilateval = document.createElement('input');
		
		let xAxis = document.createElement('input');
		let yAxis = document.createElement('input');
		let offset = document.createElement('input');
		let labelsOffset = document.createElement(`span`)
		
		let remove = document.createElement('button')

		remove.setAttribute(`onclick`, `remove(this)`)
		remove.setAttribute(`id`, `${removalId}`)

	  li.appendChild(name);
		li.appendChild(brline)

		name.setAttribute(`id`, `title`)
		
//	style="display:none;"

			labelsX.innerText = " X: "
			labelsY.innerText = " Y: "

			xInput.setAttribute( 'type', `number` );
			xInput.setAttribute( 'class', `xInputClassName` );
			yInput.setAttribute( 'type', `number` );
			yInput.setAttribute( 'class', `yInputClassName` );


		if(type == 1){
			name.innerText = "Translation"
			commands.push("tr")

			li.appendChild(labelsX)
			li.appendChild(xInput);
			li.appendChild(labelsY)
			li.appendChild(yInput);

		} else if(type == 2){
			name.innerText = "Rotation"
			commands.push("ro")			
			degrees.setAttribute( 'type', `number` );
			counterclockwise.setAttribute( 'type', `checkbox` );

			labelsDeg.innerText = " Degrees: "
			labelsCCW.innerText = " Counterclockwise: "
			degrees.setAttribute( 'class', `degreesClassName` );
			counterclockwise.setAttribute( 'id', `ccwClassName` );
			counterclockwise.setAttribute( `class`, `ccwClassName` );

			li.appendChild(labelsX)
			li.appendChild(xInput);
			li.appendChild(labelsY)
			li.appendChild(yInput);

			li.appendChild(labelsDeg)
			li.appendChild(degrees);
			li.appendChild(labelsCCW)
			li.appendChild(counterclockwise);
		}	else if(type == 3){
			name.innerText = "Dilation"
			commands.push("di")

			labelsDia.innerText = " Dilation value: "
			dilateval.setAttribute(`type`, `number`)
			dilateval.setAttribute(`class`, `dilationValue`)

			li.appendChild(labelsX)
			li.appendChild(xInput)
			li.appendChild(labelsY)
			li.appendChild(yInput)
			li.appendChild(labelsDia)
			li.appendChild(dilateval)


		} else if(type == 4){
			name.innerText = "Reflection"	
			commands.push("re")

			xAxis.setAttribute(`type`, `checkbox`)
			yAxis.setAttribute(`type`, `checkbox`)
			xAxis.setAttribute(`id`, `xAxis`)
			yAxis.setAttribute(`id`, `yAxis`)
			offset.setAttribute(`type`, `number`)
			labelsOffset.innerText = " Offset: "
			offset.setAttribute(`class`, `offset`)
			xAxis.setAttribute(`class`, `xInputClassName`)
			yAxis.setAttribute(`class`, `yInputClassName`)

			li.appendChild(labelsX)
			li.appendChild(xAxis)
			li.appendChild(labelsY)
			li.appendChild(yAxis)
			li.appendChild(labelsOffset)
			li.appendChild(offset)

		}

		remove.innerText = "X"

		li.appendChild(remove)
		li.setAttribute( 'class', `transformation` );
		li.setAttribute( 'id', `${removalId}` );
    itemList.appendChild(li);
		removalId++
}

function coords() {
	var x = parseFloat(document.querySelectorAll('#xcoord')[0].value)
  var y = parseFloat(document.querySelectorAll('#ycoord')[0].value)
	var transformations = document.getElementsByClassName("transformation")

	x = Math.round(x * 100) / 100
	y = Math.round(y * 100) / 100

for(i = 0; i <= commands.length - 1; i++){

var xInput = parseFloat(transformations[i].getElementsByClassName("xInputClassName")[0].value)
var yInput = parseFloat(transformations[i].getElementsByClassName("yInputClassName")[0].value)

if(commands[i] == "tr"){
	x = x + xInput
	y = y + yInput
}
if(commands[i] == "ro"){
	deg = parseFloat(transformations[i].getElementsByClassName("degreesClassName")[0].value)// + 45
	/*var deg = deg * Math.PI / 180
	x = x - xInput
	y = y - yInput
	c = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

	let ccwClass = document.getElementsByClassName('ccwClassName')

	if(ccwClass[i].checked) {
		circle = 360 * Math.PI / 180
		semicircle = 180 * Math.PI / 180
		quartcircle = 90 * Math.PI / 180
		deg = circle - deg + quartcircle
	}

	x = Math.round(c * Math.sin(deg) * 100) / 100
	y = Math.round(c * Math.cos(deg) * 100) / 100	
	
	x = x + xInput
	y = y + yInput*/

	let ccwClass = document.getElementsByClassName('ccwClassName')

	ccwBool = false

	if(ccwClass[i].checked) {
		ccwBool = true
	}

	rotate(xInput, yInput, x, y, deg, ccwBool)
	x = Math.round(answers[0] * 100) / 100
	y = Math.round(answers[1] * 100) / 100
}

if(commands[i] == "di"){

	dilVal = document.getElementsByClassName("dilationValue")
	x = x - xInput
	y = y - yInput
	x = x * parseFloat(dilVal[i].value)
	y = y * parseFloat(dilVal[i].value)
	x = x + xInput
	y = y + yInput
}

if(commands[i] == "re"){
	let offsetValue = parseFloat(document.getElementsByClassName("offset")[i].value)


	if(document.getElementById('xAxis').checked) {
		y = y - offsetValue
		y = y - y - y
		y = y + offsetValue
	}
	if(document.getElementById('yAxis').checked) {
		x = x - offsetValue
		x = x - x - x
		x = x + offsetValue
	}
}
}
	document.getElementById("demo").innerHTML = `(${x}, ${y})`;
}

function remove() {
commands[parseInt(window.event.target.parentNode.getAttribute("id"))-1] = "empty"
window.event.target.parentNode.setAttribute(`style`, `display:none`)
}

function rotate(cx, cy, x, y, angle,anticlock_wise = false) {
    if(angle == 0){
        return {x:parseInt(x), y:parseInt(y)};
    }if(anticlock_wise){
        var radians = (Math.PI / 180) * angle;
    }else{
        var radians = (Math.PI / -180) * angle;
    }
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    var nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    var ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
		answers = [nx, ny]
    return answers;
 }