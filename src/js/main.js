/* 
    Dies ist die haupt Javascript Datei, die im HTML eingebunden ist.
    Hierin sollten alle Nutzer-Interaktionen geregelt werden.

    Hierin sollten möglichst keine Datenstrukturdaten gespeichert werden, 
    dafür sind die beiden Klassen 'Fridge' und 'Product' vorgesehen.
    Die nötigen Dateien für die Fridge- und Productklasse sind bereits eingebunden,
    so dass von hier aus von ihnen Gebrauch gemacht werden kann.

    Es empfiehlt sich das Befüllen bzw. Erzeugen der dynamischen GUI Elemente
    in einer größeren Methode zu definieren, die sich an den in der Datenstruktur hinterlegten Daten orientiert.
    So kann man diese Methode bei jeder Änderung der Daten immer wieder aufrufen 
    und muss sich nicht um das Hinzufügen, Ändern oder Entfernen einzelner HTML-Elemente kümmern.

    Die Datei enthält bereits eine Methode zum Erzeugen von Product-Cards.
    Sie liefert das fertige und mit Daten befüllte HTML-Element zurück.

    Außerdem hat Datei einige nötige Referenzen auf HTML-Elemente der GUI.
    Diese können bereits genutzt werden.
    Weitere nötige Referenzen auf HTML-Elemente der GUI können nach demselben Muster per ID-Zugriff gemacht werden.
*/

// Imports der Kühlschrank Klasse aus der externen Datei
import Fridge from "./fridge.js";
// Imports der Produkt Klasse aus der externen Datei
import Product from "./product.js";

/* ----------- HILFSVARIABLEN ----------- */
// Konstante für einen Tag in Millisekunden
const ONE_DAY = 1000 * 60 * 60 * 24;
/* -------------------------------------- */


//  globale Fridge instanz anlegen
let kuelschrank = new Fridge(300);



/* ----------- Example Daten ----------- */
let avocado = new Product('Avocado', new Date(2022, 10, 5), 15);
console.log(avocado);
let milk = new Product('Milk', new Date(2022, 10, 3), 10);
let beef = new Product('Beef', new Date(2022, 10, 5), 90);
let chicken = new Product('Chicken', new Date(2022, 10, 30), 80);
let juice = new Product('Juice', new Date(2022, 9, 30), 13);
let egg = new Product('Egg', new Date(2022, 9, 30), 10)

kuelschrank.addNewProducts(avocado);
kuelschrank.addNewProducts(milk);
kuelschrank.addNewProducts(beef);
kuelschrank.addNewProducts(chicken);
kuelschrank.addNewProducts(juice);
kuelschrank.addNewProducts(egg);




/* ----------- GUI REFERENZEN ----------- */

// Referenz auf Produkte-Container
const fridgeProductsContainer = document.querySelector('#fridge-products-container');


/* -------------------------------------- */


/* 
    Funktion zum Erstellen einer Produktcard für den Kühlschrank.
    Sie erhält als Parameter
    - Den Namen des Produkts (productName)
    - Das Volumen des Produkts (productVolume), also den Platz, den es innerhalb des Kühlschranks einnimmt
    - Das Ablaufdatum des Produkts (productExpDate)
    - Ein boole'scher Indikator dafür, ob das Produkt abgelaufen ist (isExpired)
    - Eine Callback-Funktion für Behandlung des Klicks auf den Löschknopf der jeweiligen Card (deleteCallback)
        Sollte dieses Callback keiner Funktion entsprechen (oder nicht mitgeliefert werden) erscheint eine Fehlermeldung in der Konsole.

    Als Rückgabewert (return) liefert sie das fertige HTML-Element mit allen übergebenen Informationen.
*/
function createNewProductCard(productName, productVolume, dateOfExpiry, isExpired, deleteCallback) {
    // Erstelle äußeres Card-div
    let card = document.createElement('div');
    // Hänge Bootstrap card-Klasse an
    card.classList.add('card');

    // Erstelle inneres Card-Body-div
    let cardBody = document.createElement('div');
    // Hänge Bootstrap card-body-Klasse an
    cardBody.classList.add('card-body');

    // Erstelle Card Titel
    let cardTitle = document.createElement('h5');
    // Hänge Bootstrap card-title Klasse an
    cardTitle.classList.add('card-title');
    // Fülle Card Titel mit übergebenem Produktnamen
    cardTitle.innerText = productName + ' ';

    // Erstelle Knopf zum Löschen des Produktes
    let deleteCardBtn = document.createElement('button');
    // Setze button-type
    deleteCardBtn.type = 'button';
    // Hänge Bootrap Button Klassen an abhängig davon, ob Produkt bereits abgelaufen oder nicht
    deleteCardBtn.classList.add('btn', 'btn-sm', (isExpired ? 'btn-outline-danger' : 'btn-outline-primary'));

    // Prüfe, ob übergebenes Callback für den Löschknopf gültig ist
    if (typeof deleteCallback === 'function') {
        // Hänge übergebenes Callback auf das onClick-Event des Löschknopfs an
        deleteCardBtn.addEventListener('click', evt => {
            deleteCallback();
        });

    } else {
        // Gebe aus, dass übergebenes Callback ungültig ist
        console.log('%cDas mitgelieferte Callback zum Löschen des Produkts ist keine Funktion oder nicht vorhanden.', 'color: red;');
    }

    // Erstelle icon-Element für Löschknopf
    let deleteCardBtnIcon = document.createElement('i');
    // Hänge dem icon-Element abhängig von Ablaufszustand die entsprechende Bootstrap Klasse an
    deleteCardBtnIcon.classList.add('fa-solid', (isExpired ? 'fa-trash' : 'fa-utensils'));

    // Erstelle Untertitel Element
    let cardSubTitle = document.createElement('h6');
    // Hänge Bootstrap card-subtitle Klasse an Untertitel Element an
    cardSubTitle.classList.add('card-subtitle', 'mb-2', 'text-muted');

    // Wenn abgelaufen, ersetze Bootstrap Klasse für Textfarbe
    if (isExpired) cardSubTitle.classList.replace('text-muted', 'text-danger');
    // Wenn kurz vor Ablauf, ersetze Bootstrap Klasse für Textfarbe
    else if (new Date(dateOfExpiry) - new Date() < ONE_DAY) cardSubTitle.classList.replace('text-muted', 'text-warning');
    // Befülle Untertitel Element mit übergebenem Ablaufsdatum
    /*   cardSubTitle.innerText = dateOfExpiry; */
    cardSubTitle.innerText = dateOfExpiry.toLocaleDateString('de-DE');
    // Erstelle Text-Element für Produkt-Volumen
    let cardText = document.createElement('p');
    // Hänge Bootstrap card-text Klasse an Text-Element an
    cardText.classList.add('card-text');

    // Befülle Text-Element mit übergebenem Produktvolumen
    cardText.innerText = productVolume + " VU";

    // Hänge Lösch-Icon an Löschknopf an
    deleteCardBtn.appendChild(deleteCardBtnIcon);
    // Hänge Löschknopf an Card Titel an
    cardTitle.appendChild(deleteCardBtn);

    // Hänge Card Titel an Card-Body an
    cardBody.appendChild(cardTitle);
    // Hänge Card Untertiel an Card-Body an
    cardBody.appendChild(cardSubTitle);
    // Hänge Card Text an Card-Body an
    cardBody.appendChild(cardText);

    // Hänge Card-Body an Card-div an
    card.appendChild(cardBody);

    // Gebe fertige Klasse zurück
    return card;
}

 /*---Render-Funktion für die Produkt-Kacheln im Produkte-Container------------*/
 
function renderProducts(fridge) {
    // Entferne alle bereits vorhandenen Product-Kacheln
    fridgeProductsContainer.replaceChildren();

    // Durchlaufe das Array aller eingelagerter Produkte in der übergebenen Fridge-Instanz
    fridge.products.forEach((product, index) => {
        // Erstelle neue Date Instanz für jetzigen Zeitpunkt
        let today = new Date();
        // Setze Date Instanz auf 00:00:00 Uhr
        today.setHours(0, 0, 0, 0);
        // Bestimme Ablaufszustand durch Datumsvergleich des Ablaufdatums des Produkts und dem heutigen Datum
        let isExpired = product.dateOfExpiry < today;

        // Definiere Funktion für das Lösch-Callback des Löschknopfs
        let deleteCallback = (fridge, index) => {
            // Entferne das Produkt anhand des Index aus dem Array in der Fridge-Instanz
            fridge.removeExistingProducts(index);

            // Rufe die allgemeine Render-Funktion auf, um neuen Zustand in der GUI darzustellen
            renderGUI(fridge);
        };

        // Erzeuge mit der Card-Erstell-Funktion neue Produkt-Kachel und übergebe dieser die  entsprechenden Daten, und das Callback zum Löschen des Produkts
        let productCard = createNewProductCard(product.productName, product.productVolume, product.dateOfExpiry, isExpired, () => deleteCallback(fridge, index));

        // Hänge neu-erzeugte Produkt-Kachel an den Card-Container (Kühlschrank) an
        fridgeProductsContainer.appendChild(productCard);
    });
}
// Render-Funktion für den Kühlschrank-Status-Bereich
function renderStatusNumbers(fridge) {
    // GUI-Referenzen auf die Spans
    //! Könnte man auch global auslagern
    let fridgeCapacitySpan = document.querySelector('#fridge-capacity-span');
    let productsAmountSpan = document.querySelector('#products-amount-span');
    let fridgeFreeCapacitySpan = document.querySelector('#fridge-free-capacity-span');
    let productsUntilTomorrowSpan = document.querySelector('#products-until-tomorrow-span');
    let productsExpiredSpan = document.querySelector('#products-expired-span');
    let smallestProductSpan = document.querySelector('#smallest-product-span');
    let biggestProductSpan = document.querySelector('#biggest-product-span');

    // Befülle die Span mit den entsprechenden Informationen aus der Fridge-Instanz
    fridgeCapacitySpan.innerText = fridge.capacity;
    productsAmountSpan.innerText = fridge.numberOfStoredProducts();
    fridgeFreeCapacitySpan.innerText = fridge.freeCapacity();
    productsUntilTomorrowSpan.innerText = fridge.untilTomorrow();
    productsExpiredSpan.innerText = fridge.expiredProducts();
    smallestProductSpan.innerText = fridge.smallestProducts();
    biggestProductSpan.innerText = fridge.biggestProducts();
}
// Allgemeine Render-Funktion für alle Daten-abhängigen Bereiche der GUI
function renderGUI(fridge) {
    // Rufe Render-Funktion für Produkt-Kacheln im Kühlschrank auf
    renderProducts(fridge);

    // Rufe Render-Funktion für Kühlschrank-Status Bereich auf
    renderStatusNumbers(fridge);
}

renderGUI(kuelschrank);
  
  /*-----------------------Rechte Spalte der GUI-----------------*/

// Referenzen auf dem Button(Clean), der die abgelaufenen Produkte im Kühlschrank entfernt.
const sortProductsBtn = document.querySelector("#sort-products-by-exp-date-btn");
// Referenzen auf dem Button(Sort), der nach  das ältere ablaufdatum der Produkte im Kühlschrank sortiert.
const removeAllProductsBtn = document.querySelector("#remove-all-products-btn");
// Referenzen auf dem Button(Defrost), der alle Produkte im Kühlschrank entfernt.
const removeExpProductsBtn = document.querySelector("#clean-fridge-btn");
//Referenzen auf dem Button(Func-1), der die abgelaufene Produkte absteigend im Kühlschrank 
//darstellt
const descendingSortProductsBtn = document.querySelector("#optional-fridge-func1-btn");
//Referenzen auf dem Button(Func-2), der das Volume der Produkte aufsteigend im Kühlschrank 
//darstellt
const ascendingSortProductVolumeBtn = document.querySelector("#optional-fridge-func2-btn");

/* -------------------------------------- */
sortProductsBtn.addEventListener('click', evt => {
    kuelschrank.sortProductDateOfExpiry();
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(kuelschrank);
    renderStatusNumbers(kuelschrank);
});
removeAllProductsBtn.addEventListener('click', evt => {
    kuelschrank.removeAllExistingProducts();
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(kuelschrank);
    renderStatusNumbers(kuelschrank);
});
removeExpProductsBtn.addEventListener('click', evt => {
    kuelschrank.removeAllExpiredProducts();
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(kuelschrank);
    renderStatusNumbers(kuelschrank);
});
descendingSortProductsBtn.addEventListener('click', evt => {
    kuelschrank.descendingSortOfProductDateExpiry();
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(kuelschrank);
    renderStatusNumbers(kuelschrank);
});
ascendingSortProductVolumeBtn.addEventListener('click', evt => {
    kuelschrank.ascendingSortOfProductVolume();
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(kuelschrank);
    renderStatusNumbers(kuelschrank);
})


   /*-----------------------Untere Spalte der GUI-----------------*/

// Referenz auf Input für Name des neuen Produkts
const addProductNameInput = document.querySelector('#form-add-product-name');
// Referenz auf Input für Volumen des neuen Produkts
const addProductVolInput = document.querySelector('#form-add-product-volume');
// Referenz auf Input für Ablaufdatum des neuen Produkts
const addProductExpDateInput = document.querySelector('#form-add-product-exp-date');
// Referenz auf Button für Bestätigung des neuen Produkts
const addProductSubmitBtn = document.querySelector('#btn-add-product');


addProductSubmitBtn.addEventListener('click', function (evt) {
    // Bedingung um sicher zu stellen, dass das Produkt Formular kein leeren Angaben hat.
    if ((addProductNameInput.value.trim().length > 0) && (addProductVolInput.value.trim().length > 0) && (addProductExpDateInput.value.trim().length > 0)) {
        //  wird neue erstellt
        let newProduct = new Product(addProductNameInput.value,
            new Date(addProductExpDateInput.value), parseInt(addProductVolInput.value));

        kuelschrank.addNewProducts(newProduct);
        // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
        renderProducts(kuelschrank);
        renderStatusNumbers(kuelschrank);
    }
});


/* Voreinstellungen zum Hinzufügen von Produkten haben, die per Knopfdruck vorgefertigte Werte für Name und Volume in die Maske eintragen, so dass nurnoch ein Ablaufdatum händisch hinzugefügt werden soll. */

const addPresetProductInputBtn1 = document.querySelector("#add-product-preset1-btn");

addPresetProductInputBtn1.addEventListener('click', function (evt) {
    //Datum von heute (mit getTime() Methode) in einer Variable zwischen speichern -> speichert datum in ms als Zahl
    let today = new Date().getTime();
    //Auf diese Zahl nun die Tage in ms addieren, wie lange das Produkt haltbar ist und zwischenspeichern 
    let eggExpireDate = today + (5 * ONE_DAY);
    //diese Zahl nun als Parameter in ein neues Date geben: let mhd = new Date(HaltbarkeitInMillisekunden)
    let mhd = new Date(eggExpireDate);

    let newProduct = new Product('Eggs', mhd, 12);
    kuelschrank.addNewProducts(newProduct);
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(kuelschrank);
    renderStatusNumbers(kuelschrank);
});


const addPresetProductInputBtn2 = document.querySelector("#add-product-preset2-btn");

addPresetProductInputBtn2.addEventListener('click', function (evt) {
    //Datum von heute (mit getTime() Methode) in einer Variable zwischen speichern -> speichert datum in ms als Zahl
    let today = new Date().getTime()
    //Auf diese Zahl nun die Tage in ms addieren, wie lange das Produkt haltbar ist und zwischenspeichern 
    let avocadoExpireDate = today + (7 * ONE_DAY)
    //diese Zahl nun als Parameter in ein neues Date geben: let mhd = new Date(HaltbarkeitInMillisekunden)
    let mhd = new Date(avocadoExpireDate)

    let avocado = {
        name: 'avocado',
        exDate: mhd,
        vu: 5
    }

    let newProduct = new Product(avocado.name, avocado.exDate, avocado.vu)
    kuelschrank.addNewProducts(newProduct);
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(kuelschrank);
    renderStatusNumbers(kuelschrank);
});


const addPresetProductInputBtn3 = document.querySelector("#add-product-preset3-btn");

addPresetProductInputBtn3.addEventListener('click', function (evt) {
    //Datum von heute (mit getTime() Methode) in einer Variable zwischen speichern -> speichert datum in ms als Zahl
    let today = new Date().getTime();
    //Auf diese Zahl nun die Tage in ms addieren, wie lange das Produkt haltbar ist und zwischenspeichern 
    let chickenExpireDate = today + (14 * ONE_DAY);
    //diese Zahl nun als Parameter in ein neues Date geben: let mhd = new Date(HaltbarkeitInMillisekunden)
    let mhd = new Date(chickenExpireDate);



    let newProduct = new Product('Chicken', mhd, 12)
    kuelschrank.addNewProducts(newProduct);
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(kuelschrank);
    renderStatusNumbers(kuelschrank);
});


let presetContainer = document.querySelector('.meine-presets')
// neue Funktion um Presets zu erstellen
 function createNewPresets(id,name) {
 let newPreset = document.createElement('button');
 newPreset.classList.add('btn','btn-info','.mx-auto');
 newPreset.setAttribute('type','button');
 newPreset.setAttribute('id',id);
 newPreset.innerText = name;
 presetContainer.appendChild(newPreset);
 }
 createNewPresets('add-product-preset4-btn','Fish');

 const addPresetProductInputBtn4 = document.querySelector("#add-product-preset4-btn");

addPresetProductInputBtn4.addEventListener('click', function (evt) {
    //Datum von heute (mit getTime() Methode) in einer Variable zwischen speichern -> speichert datum in ms als Zahl
    let today = new Date().getTime()
    //Auf diese Zahl nun die Tage in ms addieren, wie lange das Produkt haltbar ist und zwischenspeichern 
    let fishExpireDate = today + (7 * ONE_DAY)
    //diese Zahl nun als Parameter in ein neues Date geben: let mhd = new Date(HaltbarkeitInMillisekunden)
    let mhd = new Date(fishExpireDate)



    let newProduct = new Product('Fish', mhd, 15)
    kuelschrank.addNewProducts(newProduct);
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(kuelschrank);
    renderStatusNumbers(kuelschrank);
});