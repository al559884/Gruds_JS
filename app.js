
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let discount = document.getElementById("discount");
    let taxes = document.getElementById("taxes");
    let ads = document.getElementById("ads");
    let total = document.getElementById("total");
    let count = document.getElementById("count");
    let category = document.getElementById("category");
    let create = document.getElementById("create");
    let mood = "ADD";
    let md;
    // Get total 
    function getTotal() {
        if (price.value != "") {
            let result = (+price.value + +taxes.value + +ads.value) - +discount.value + " LE";
            total.innerHTML = result;
            total.style.backgroundColor = "#72BF78";
        } else {
            total.innerHTML = "";
            total.style.backgroundColor = "#232D3F";
        }
    }

    // CREATE Button 
    let dataPro;
    if (localStorage.getItem("Product") != null) {
        dataPro = JSON.parse(localStorage.getItem("Product"));
    } else {
        dataPro = [];
    }

    create.onclick = function () {
        let newPro = {
            title: title.value,
            price: price.value,
            ads: ads.value,
            taxes: taxes.value,
            count: count.value,
            discount: discount.value,
            total: total.innerHTML,
            category: category.value,
        };

        // Check if count is greater than 1 and create multiple items accordingly
        if (mood == "ADD") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[md] = newPro;
            mood = "ADD";
            create.innerHTML = "create";
            count.style.display = "block";
        }

        // Save to localStorage
        localStorage.setItem("Product", JSON.stringify(dataPro));
        console.log(dataPro);

        clearData();
        showData();
    };

    // Clear inputs
    function clearData() {
        title.value = "";
        price.value = "";
        ads.value = "";
        taxes.value = "";
        count.value = "";
        discount.value = "";
        total.innerHTML = "";
        category.value = '';
    }

    // Read and display data
    function showData() {
        getTotal();
        let table = "";
        for (let i = 0; i < dataPro.length; i++) {
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteData(${i})">delete</button></td>
            </tr>
            `;
        }
        document.getElementById("tbody").innerHTML = table;

        // Show delete all button if data exists
        let deleteBtn = document.getElementById("deleteAll");
        if (dataPro.length > 0) {
            deleteBtn.innerHTML = `<button id="dell" onclick="deleteAll()">Delete All</button>`;
        } else {
            deleteBtn.innerHTML = "";
        }
    }

    // Delete a single entry
    function deleteData(i) {
        dataPro.splice(i, 1);  // Remove the item at the given index
        localStorage.setItem("Product", JSON.stringify(dataPro));  // Update localStorage
        showData();  // Refresh the displayed table
    }

    // Delete all entries
    function deleteAll() {
        dataPro.splice(0);  // Clear the array
        localStorage.clear();  // Clear localStorage
        showData();  // Refresh the displayed table
    }

    // Update
    function updateData(i) {
        title.value = dataPro[i].title;
        price.value = dataPro[i].price;
        taxes.value = dataPro[i].taxes;
        ads.value = dataPro[i].ads;
        discount.value = dataPro[i].discount;
        create.innerHTML = "update";
        count.style.display = "none";
        getTotal();
        md = i;
        scroll({
            top: 0,
            behavior: "smooth",
        });

        mood = "update";
    }

    // Search mode
    let modeSearch = "title";

    function getMode(id) {
        let search = document.getElementById("search");
        if (id == "searchTitle") {
            modeSearch = "title";
            search.placeholder = "search by title";
        } else {
            modeSearch = "category";
            search.placeholder = "search by category";
        }
        search.focus();
    }

    // Search data 
    function searchAll(value) {
        let table = "";
        if (modeSearch == "title") {
            for (let i = 0; i < dataPro.length; i++) {
                if (dataPro[i].title.includes(value)) {
                    table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})">update</button></td>
                        <td><button onclick="deleteData(${i})">delete</button></td>
                    </tr>
                    `;
                }
            }
        } else {
            for (let i = 0; i < dataPro.length; i++) {
                if (dataPro[i].category.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})">update</button></td>
                        <td><button onclick="deleteData(${i})">delete</button></td>
                    </tr>
                    `;
                }
            }
        }
        document.getElementById("tbody").innerHTML = table;
    }

    showData()  // Display the data when the page loads
;
