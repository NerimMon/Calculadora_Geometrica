let tipoTrianguloSeleccionado = 1; 
const PI = Math.PI;

function init() {
    let calcularButton = document.getElementById("btnCalcular");
    calcularButton.addEventListener("click", manejarCalculo);

   let figuraSelector = document.getElementById("figuraGeometrica");
    figuraSelector.addEventListener("change", mostrarCamposFigura);

    let operaciones = document.getElementsByName("operacion");
    operaciones.forEach(op => {
        op.addEventListener("click", mostrarCamposFigura);
    });

   mostrarCamposFigura();
}


function getFigureDimension(figure) {
    const figures3D = ["cubo", "prisma-rectangular", "cilindro", "cono", "esfera"];
    return figures3D.includes(figure) ? '3D' : '2D';
}


function mostrarCamposFigura() {
    const selector = document.getElementById("figuraGeometrica");
    const selectedFigure = selector.value;
    const selectedOperation = document.querySelector('input[name="operacion"]:checked') ? 
                              document.querySelector('input[name="operacion"]:checked').value : 'area'; // Default si no hay check
    const figureDimension = getFigureDimension(selectedFigure);
    
 
    const opPerimetroContainer = document.getElementById("opPerimetro").parentNode; 
    const opVolumenContainer = document.getElementById("volumenContainer");     
    const opArea = document.getElementById("opArea");
    
  
    if (figureDimension === '3D') {
        opPerimetroContainer.classList.add("hide");
        opVolumenContainer.classList.remove("hide");
     
        if (document.getElementById("opPerimetro").checked) {
            opArea.checked = true;
        }
    } else { 
        opPerimetroContainer.classList.remove("hide");
        opVolumenContainer.classList.add("hide");
    
        if (document.getElementById("opVolumen").checked) {
            document.getElementById("opPerimetro").checked = true;
        }
    }

 
    const allFigures = [
        "divCubo", "divPrismaRectangular", "divCilindro", "divCono", "divEsfera",
        "divCuadrado", "divRectangulo", "divRombo", "divParalelogramo", "divTrapecio",
        "divTrianguloBaseAltura", "divTrianguloEscaleno", "divTrianguloIsosceles", "divTrianguloEquilatero",
        "divCirculo", "divElipse", "divPoligonoRegular"
    ];

    allFigures.forEach(id => {
        const div = document.getElementById(id);
        if (div) div.classList.add("hide");
    });
    
  
    const numLadosInput = document.getElementById("numLados");
    if (numLadosInput) numLadosInput.value = 0;

    let targetDivId = '';


    switch (selectedFigure) {

        case "cubo": targetDivId = "divCubo"; break;
        case "prisma-rectangular": targetDivId = "divPrismaRectangular"; break;
        case "cilindro": targetDivId = "divCilindro"; break;
        
        case "cono": 
            targetDivId = "divCono";
           
            const inputAlturaCono = document.getElementById("inputAlturaCono");
            const inputGeneratrizCono = document.getElementById("inputGeneratrizCono");
            
            if (selectedOperation === "volumen") {
                inputAlturaCono.classList.remove("hide");
                inputGeneratrizCono.classList.add("hide");
            } else if (selectedOperation === "area") {
                inputAlturaCono.classList.add("hide");
                inputGeneratrizCono.classList.remove("hide");
            } else {
               
                inputAlturaCono.classList.add("hide"); 
                inputGeneratrizCono.classList.add("hide");
            }
            break;
            
        case "esfera": targetDivId = "divEsfera"; break;
        
   
        case "cuadrado": targetDivId = "divCuadrado"; break;
        case "rectangulo": targetDivId = "divRectangulo"; break;
        case "rombo": targetDivId = "divRombo"; break;
        case "paralelogramo": targetDivId = "divParalelogramo"; break;
        case "trapecio": targetDivId = "divTrapecio"; break;
        case "circulo": targetDivId = "divCirculo"; break;
        case "elipse": targetDivId = "divElipse"; break;
        case "triangulo-base-altura": targetDivId = "divTrianguloBaseAltura"; break;
        case "triangulo-equilatero": targetDivId = "divTrianguloEquilatero"; break;
        case "triangulo-isosceles": targetDivId = "divTrianguloIsosceles"; break;
        case "triangulo-escaleno": targetDivId = "divTrianguloEscaleno"; break;
        case "pentagono-regular":
        case "hexagono-regular":
            targetDivId = "divPoligonoRegular";
            const num = selectedFigure === "pentagono-regular" ? 5 : 6;
            if (numLadosInput) numLadosInput.value = num;
            break;
            
        default:
            return;
    }

    if (targetDivId) {
        document.getElementById(targetDivId).classList.remove("hide");
    }
}


function manejarCalculo() {
    const selectedOperation = document.querySelector('input[name="operacion"]:checked').value; 
    const selectedFigure = document.getElementById("figuraGeometrica").value;
    let resultado = null;

    document.getElementById("errorMessage").classList.add("hide");
    document.getElementById("successMessage").classList.add("hide");

    try {
        switch (selectedFigure) {
            case "cubo":
                const ladoCubo = obtenerValorNumerico("lado-cubo");
                if (selectedOperation === "area") { // Área de Superficie Total: A = 6a^2
                    resultado = 6 * ladoCubo * ladoCubo;
                } else if (selectedOperation === "volumen") { // Volumen: V = a^3
                    resultado = ladoCubo * ladoCubo * ladoCubo;
                } 
                break;
            case "prisma-rectangular":
                const largoPR = obtenerValorNumerico("largo-pr");
                const anchoPR = obtenerValorNumerico("ancho-pr");
                const alturaPR = obtenerValorNumerico("altura-pr");
                if (selectedOperation === "area") { // Área de Superficie Total: A = 2(LW + LH + WH)
                    resultado = 2 * (largoPR * anchoPR + largoPR * alturaPR + anchoPR * alturaPR);
                } else if (selectedOperation === "volumen") { // Volumen: V = LWH
                    resultado = largoPR * anchoPR * alturaPR;
                } 
                break;
            case "cilindro":
                const radioCil = obtenerValorNumerico("radio-cil");
                const alturaCil = obtenerValorNumerico("altura-cil");
                if (selectedOperation === "area") { // Área de Superficie Total: A = 2πr(h + r)
                    resultado = 2 * PI * radioCil * (radioCil + alturaCil);
                } else if (selectedOperation === "volumen") { // Volumen: V = πr^2h
                    resultado = PI * radioCil * radioCil * alturaCil;
                }
                break;
            case "cono":
                const radioCono = obtenerValorNumerico("radio-cono");
                if (selectedOperation === "area") { // Área de Superficie Total: A = πr(r + g)
                    const generatrizCono = obtenerValorNumerico("generatriz-cono");
                    resultado = PI * radioCono * (radioCono + generatrizCono);
                } else if (selectedOperation === "volumen") { // Volumen: V = 1/3 * πr^2h
                    const alturaCono = obtenerValorNumerico("altura-cono");
                    resultado = (1 / 3) * PI * radioCono * radioCono * alturaCono;
                } 
                break;
            case "esfera":
                const radioEsf = obtenerValorNumerico("radio-esf");
                if (selectedOperation === "area") { // Área de Superficie: A = 4πr^2
                    resultado = 4 * PI * radioEsf * radioEsf;
                } else if (selectedOperation === "volumen") { // Volumen: V = 4/3 * πr^3
                    resultado = (4 / 3) * PI * Math.pow(radioEsf, 3);
                } 
                break;

            case "cuadrado":
                const ladoC = obtenerValorNumerico("lado-c");
                resultado = selectedOperation === "perimetro" ? (ladoC * 4) : (ladoC * ladoC);
                break;
            case "rectangulo":
                const baseR = obtenerValorNumerico("base-r");
                const alturaR = obtenerValorNumerico("altura-r");
                resultado = selectedOperation === "perimetro" ? (2 * (baseR + alturaR)) : (baseR * alturaR);
                break;
            case "rombo":
                if (selectedOperation === "perimetro") {
                    const ladoRo = obtenerValorNumerico("lado-ro");
                    resultado = ladoRo * 4;
                } else { 
                    const dMayor = obtenerValorNumerico("diag-mayor-ro");
                    const dMenor = obtenerValorNumerico("diag-menor-ro");
                    resultado = (dMayor * dMenor) / 2;
                }
                break;
            case "paralelogramo":
                const baseP = obtenerValorNumerico("base-p");
                if (selectedOperation === "perimetro") {
                    const ladoP = obtenerValorNumerico("lado-p");
                    resultado = 2 * (baseP + ladoP);
                } else { 
                    const alturaP = obtenerValorNumerico("altura-p");
                    resultado = baseP * alturaP;
                }
                break;
            case "trapecio":
                const baseMayorT = obtenerValorNumerico("base-mayor-t");
                const baseMenorT = obtenerValorNumerico("base-menor-t");
                if (selectedOperation === "perimetro") {
                    const lado3T = obtenerValorNumerico("lado-3-t");
                    const lado4T = obtenerValorNumerico("lado-4-t");
                    resultado = baseMayorT + baseMenorT + lado3T + lado4T;
                } else { 
                    const alturaT = obtenerValorNumerico("altura-t");
                    resultado = ((baseMayorT + baseMenorT) / 2) * alturaT;
                }
                break;
            case "circulo":
                const radioCirc = obtenerValorNumerico("radio-circ");
                resultado = selectedOperation === "perimetro" ? (2 * PI * radioCirc) : (PI * radioCirc * radioCirc);
                break;
            case "elipse":
                const semiejeA = obtenerValorNumerico("semieje-a-e");
                const semiejeB = obtenerValorNumerico("semieje-b-e");
                if (selectedOperation === "perimetro") {
                    // Aproximación de Ramanujan
                    const h = Math.pow((semiejeA - semiejeB) / (semiejeA + semiejeB), 2);
                    resultado = PI * (semiejeA + semiejeB) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
                } else { 
                    resultado = PI * semiejeA * semiejeB;
                }
                break;

            case "triangulo-base-altura": 
                if (selectedOperation === "perimetro") throw new Error("Se requieren los 3 lados para el perímetro.");
                const baseTA = obtenerValorNumerico("base-ta");
                const alturaTA = obtenerValorNumerico("altura-ta");
                resultado = (baseTA * alturaTA) / 2;
                break;
            case "triangulo-equilatero":
                const ladoTQ = obtenerValorNumerico("lado-tq");
                resultado = selectedOperation === "perimetro" ? (ladoTQ * 3) : (Math.sqrt(3) / 4 * ladoTQ * ladoTQ);
                break;
            case "triangulo-isosceles":
                const ladoIgualTI = obtenerValorNumerico("lado-igual-ti");
                const ladoDesigualTI = obtenerValorNumerico("lado-desigual-ti");
                if (selectedOperation === "perimetro") {
                    resultado = (2 * ladoIgualTI) + ladoDesigualTI;
                } else { 
                    const alturaTI = obtenerValorNumerico("altura-ti", false);
                    if (alturaTI) {
                        resultado = (ladoDesigualTI * alturaTI) / 2;
                    } else {
                        if (ladoIgualTI <= (ladoDesigualTI / 2)) throw new Error("Lados inválidos. No forman un triángulo.");
                        const h = Math.sqrt(ladoIgualTI * ladoIgualTI - Math.pow(ladoDesigualTI / 2, 2));
                        resultado = (ladoDesigualTI * h) / 2;
                    }
                }
                break;
            case "triangulo-escaleno":
                const l1TE = obtenerValorNumerico("lado-1-te");
                const l2TE = obtenerValorNumerico("lado-2-te");
                const l3TE = obtenerValorNumerico("lado-3-te");
                 if (l1TE + l2TE <= l3TE || l1TE + l3TE <= l2TE || l2TE + l3TE <= l1TE) throw new Error("Lados no forman un triángulo válido.");
                
                if (selectedOperation === "perimetro") {
                    resultado = l1TE + l2TE + l3TE;
                } else { 
                    const s = (l1TE + l2TE + l3TE) / 2; // Semi-perímetro
                    resultado = Math.sqrt(s * (s - l1TE) * (s - l2TE) * (s - l3TE));
                }
                break;

           case "pentagono-regular":
            case "hexagono-regular":
                const numLados = parseInt(document.getElementById("numLados").value);
                const ladoPol = obtenerValorNumerico("lado-pol");
                if (selectedOperation === "perimetro") {
                    resultado = ladoPol * numLados;
                } else { 
                    const apotemaPol = obtenerValorNumerico("apotema-pol");
                    resultado = (numLados * ladoPol * apotemaPol) / 2;
                }
                break;

            default:
                throw new Error("Figura no soportada.");
        }

        mostrarResultado(resultado);

    } catch (e) {
        console.error("Error en el cálculo: " + e.message);
        document.getElementById("errorMessage").classList.remove("hide");
        document.getElementById("successMessage").classList.add("hide");
    }
}

function obtenerValorNumerico(idLado, requerido = true) {
    let lado = document.getElementById(idLado);
    if (!lado) {
        if (requerido) throw new Error(`El campo con ID ${idLado} no existe.`);
        return null;
    }
    
    let valorLado = parseFloat(lado.value);

    if (isNaN(valorLado) || (requerido && valorLado <= 0)) {
        if (requerido) {
            lado.classList.add("campo-requerido");
            throw new Error(`El valor del campo "${idLado}" no permite hacer el cálculo o es inválido.`);
        } else {
            lado.classList.remove("campo-requerido");
            return null; 
        }
    } else {
        lado.classList.remove("campo-requerido");
        return valorLado;
    }
}
function mostrarResultado(resultado) {
    const divSuccessMessage = document.getElementById("successMessage");
    const inputResultado = document.getElementById("resultado");

    const resultadoFormateado = (Math.round(resultado * 10000) / 10000).toLocaleString('es-MX', { maximumFractionDigits: 4 });

    inputResultado.value = resultadoFormateado;
    divSuccessMessage.classList.remove("hide");
    document.getElementById("errorMessage").classList.add("hide");
}



function calcularPerimetroTriangulo() {
    let divSuccessMessage = document.getElementById("successMessage");
    let divErrorMessage = document.getElementById("errorMessage");
    divErrorMessage.classList.add("hide");
    divSuccessMessage.classList.add("hide");
    
    try {
        let lado1 = obtenerValorLado("lado-1"); 
        let lado2 = obtenerValorLado("lado-2") || 0; 
        let lado3 = obtenerValorLado("lado-3") || 0; 

        let resultado = lado1 + lado2 + lado3;

        console.log("Perimetro del tríangulo (Original): " + resultado);
        let inputResultado = document.getElementById("resultado");
        let divResultado = document.getElementById("divResultado");
        inputResultado.value = resultado;
        divResultado.innerHTML = resultado;
        divSuccessMessage.classList.remove("hide");

    } catch (error) {
        console.log("Error (Original): " + error.message);
        divErrorMessage.classList.remove("hide");
    }
}

function obtenerValorLado(idLado) {
    let lado = document.getElementById(idLado);
    if (!lado) return NaN;
    
    let valorLado = parseInt(lado.value);
    
    if (isNaN(valorLado)) {
        console.log("El valor del lado " + idLado + " no permite hacer el calculo");
        lado.classList.add("campo-requerido"); 
        throw new Error("No se ha proporcionado un lado");
    } else {
        lado.classList.remove("campo-requerido");
        return valorLado;
    }
}