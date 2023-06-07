/* 
    Diese Klasse repräsentiert die Datenstruktur des Kühlschranks.
    Sie sollte per Konstruktor eine Kapazität als Ganzzahl übergeben bekommen. 
    Sollte beim Versuch ein neues Produkt hinzuzufügen das maximal zugelassene Volumen überschritten werden,
    sollte das neue Produkt nicht hinzugefügt werden.
    Zur Vereinfachung ist das Volumen in der imaginären Einheit VU (Volume-Unit) zu behandeln.

    Desweiteren sollte die Klasse über einen Speicher für im Kühlschrank eingelagerte Produkte verfügen.

    Der Kühlschrank-Klasse müssen noch Instanz-Methoden beigefügt werden.
    Folgende Methoden sollten auf jeden Fall enthalten sein:
    - Eine Methode zur Ermittlung der freien Kapazität
    - Eine Methode zur Ermittlung der bereits verbrauchten Kapazität
    - Eine Methode zur Ermittlung der Anzahl eingelagerter Produkte
    - Eine Methode zur Ermittlung des Produktes mit dem kleinsten Volumen
    - Eine Methode zur Ermittlung des Produktes mit dem größten Volumen
    - Eine Methode zum Hinzufügen neuer Produkte
    - Eine Methode zum Entfernen vorhandener Produkte
    - Eine Methode zum Entfernen aller vorhandenen Produkte
    - Eine Methode zum Entfernen aller abgelaufenen Produkte
    - Eine Methode zum Sortieren der Produkte nach Ablaufdatum
*/
class Fridge {
    // Eigenschaft/Datenfeld zur Speicherung der im Kühlschrank enthaltenen Produkte als Array
    products = [];
    constructor(capacity) {
        // Eigenschaft capacity als Ganzzahl entgegen nehmen und diese der Instanz zuordenen.
        this.capacity = capacity;

    }
    //Eine Methode zur Ermittlung der freien Kapazität
    freeCapacity() {
        // Die Methode reduce ruft die angegebene Rückruffunktion (Callback) für alle Elemente in einem Array auf, mit dem Ziel, den Array-Inhalt auf einen einzigen Wert zu reduzieren
        let totalFreeCapacity = this.capacity - this.products.reduce((productVolume, curr) => {
            return productVolume + curr.productVolume;
        }, 0);
        return totalFreeCapacity;

    }
    // Eine Methode zur Ermittlung der bereits verbrauchten Kapazität
    usedUpCapacity() {
        //   Die Methode reduce ruft die angegebene Rückruffunktion (Callback) für alle Elemente in einem Array auf, mit dem Ziel, den Array-Inhalt auf einen einzigen Wert zu reduzieren
        let usedCapacity = this.products.reduce((productVolume, curr) => {
            return productVolume + curr.productVolume;
        }, 0);
        return usedCapacity;

    }
    // Eine Methode zur Ermittlung der Anzahl eingelagerter Produkte
    numberOfStoredProducts() {
        return this.products.length;
        /*   let sumStoredProducts = this.products.reduce((previousValue, currentValue => previousValue + 0));
          console.log(`Anzahl eingelagerter Produkte: ${sumStoredProducts}`) */
    }
    // Eine Methode zur Ermittlung des Produktes mit dem kleinsten Volumen
    smallestProducts() {
        return this.products.sort((a, b) => a.productVolume - b.productVolume)[0].productName;
        /* 
                    let smallProduct = this.products.map(product => product.productVolume)
                    let smallestProduct = Math.min(...smallProduct) 
                    return smallestProduct */
    }
    //Eine Methode zur Ermittlung des Produktes mit dem größten Volumen
    biggestProducts() {
        return this.products.sort((a, b) => b.productVolume - a.productVolume)[0].productName
        /* let biggestProduct = Math.max(this.products)
        return console.log(`Das Product mit dem groeßten Volumen ist ${smallestProduct}`) */
    }
    //Eine Methode zum Hinzufügen neuer Produkte
    addNewProducts(newProduct) {
        // Mit Methode push(),fuegt ein neues Product am Ende des Arrays hinzu.
        this.products.push(newProduct)

    }
    //Eine Methode zum Entfernen vorhandener Produkte
    removeExistingProducts(index) {
        /*     return this.products.filter((product, index) => {
                return productToremove.toLowerCase() !== product.productName.toLowerCase();
            }); */
        /*   return this.products.filter((product, index) => {
              return productToremove.toLowerCase() != product.productName.toLowerCase();
          }); */
        //Aufruf der Methode splice(), um eine vorhandene Produkte zu entfernen
        return this.products.splice(index, 1);
    }

    //Eine Methode zum Entfernen aller vorhandenen Produkte
    removeAllExistingProducts() {
        //Aufruf der Methode splice(), um alle vorhandene Produkte zu entfernen
        let remove = this.products.splice(0);
        return `Alle vorhandene Produkte sind entfernt`
    }
    //Eine Methode zum Entfernen aller abgelaufenen Produkte
    removeAllExpiredProducts() {
        // erstellen der Variable, um neu Date object zu speichern.
        let today = new Date();
        // Aufruf der Filter(), die Methode duchläuft alle Elemente des Product-Arrays und gibt true nach der eingegebene Pruefung
        return this.products = this.products.filter((item) => item.dateOfExpiry < today);

    }
    //Eine Methode zum Sortieren der Produkte nach Ablaufdatum / ascending(aufsteigend)
    sortProductDateOfExpiry() {

        return this.products.sort(function (a, b) {
            return a.dateOfExpiry - b.dateOfExpiry
        });
    }
    //Eine Methode zum Sortieren der Produkte nach Ablaufdatum / descending(absteigend)
    descendingSortOfProductDateExpiry() {
        return this.products.sort(function (a, b) {
            return b.dateOfExpiry - a.dateOfExpiry;
        });
    }
    //Eine Methode zum Sortieren der Produkte nach ProductVolume /aufsteigend
    ascendingSortOfProductVolume() {
        return this.products.sort(function (a, b) {
          /*   console.log(a.productName); */
            return a.productVolume - b.productVolume;
        });
    }


    // products until tomorrow
    untilTomorrow() {
        //Konstante für einen Tag in Millisekunden
        const ONE_DAY = 1000 * 60 * 60 * 24;
        let today = new Date().getTime()
        let tomorrow = today + ONE_DAY;
        return this.products.filter(item => {
            if (item.dateOfExpiry < tomorrow && item.dateOfExpiry > today) {
                return item;
            }
        }).length
    }
    // expired products
    expiredProducts() {
        let today = new Date().getTime()
        return this.products.filter(item => {
            if (item.dateOfExpiry < today) {
                return item;
            }
        }).length
    }

}

export default Fridge;