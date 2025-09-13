const umurInput = document.getElementById("umur");
const umurValue = document.getElementById("umurValue");

umurInput.addEventListener("input", function() {
    umurValue.textContent = umurInput.value;
});

document.getElementById("bmiForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let berat = parseFloat(document.getElementById("berat").value);
    let tinggi = parseFloat(document.getElementById("tinggi").value) / 100;
    let umur = parseInt(umurInput.value);
    let gender = document.querySelector('input[name="gender"]:checked');
    const hasilDiv = document.getElementById("hasil");

    if (berat > 0 && tinggi > 0 && umur >= 0 && gender) {
        let bmi = berat / (tinggi * tinggi);
        let kategori = "";
        let cssClass = "";

        function getBMICategoryForAge(bmi, umur, gender) {
            if (bmi < 14) return { kategori: "Underweight", css: "underweight" };
            else if (bmi < 20) return { kategori: "Normal", css: "normal" };
            else if (bmi < 23) return { kategori: "Overweight", css: "overweight" };
            else return { kategori: "Obese", css: "obese" };
        }

       
        if (umur < 20) {
            let result = getBMICategoryForAge(bmi, umur, gender);
            kategori = result.kategori;
            cssClass = result.css;
        } else if (umur >= 65) {
            if (bmi < 23) { kategori = "Underweight"; cssClass = "underweight"; }
            else if (bmi <= 27) { kategori = "Normal"; cssClass = "normal"; }
            else { kategori = "Overweight/Obesitas"; cssClass = "overweight"; }
        } else {
            if (bmi < 18.5) { kategori = "Underweight"; cssClass = "underweight"; }
            else if (bmi < 25) { kategori = "Normal"; cssClass = "normal"; }
            else if (bmi < 30) { kategori = "Overweight"; cssClass = "overweight"; }
            else { kategori = "Obesitas"; cssClass = "obese"; }
        }

        hasilDiv.innerHTML = `<strong>BMI Anda: ${bmi.toFixed(1)}</strong> (${kategori})`;
        hasilDiv.className = `bmi-result ${cssClass}`;
        hasilDiv.style.display = "block";
    } else {
        hasilDiv.innerHTML = "Masukkan data dengan benar!";
        hasilDiv.className = "bmi-result warning";
        hasilDiv.style.display = "block";
    }
});