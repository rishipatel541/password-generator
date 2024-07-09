let slider = document.querySelector("[data-lengthInlider]");
let length = document.querySelector("[data-length]");
let copy = document.querySelector("[data-copy]");
let coping = document.querySelector(".cop");
let uppercase = document.querySelector("[data-uppercase]");
let lowercase = document.querySelector("[data-lowercase]");
let number = document.querySelector("[data-number]");
let symbol = document.querySelector("[data-symbol]");
let generate = document.querySelector("[data-generate]");
let signal = document.querySelector("[data-signal]");
let password_entry = document.querySelector("[data-password]"); 
let allcheckbox = document.querySelector("input[type=checkbox]");
let symbols = "!@#$%^&*()_{}[]?><:;'/.,\|'`~";
let password = "";
let password_length = 10;
let check_count = 0;
handleslider();
signal_generator("#ccc");
function handleslider(){
    slider.value = password_length;
    length.innerText = password_length;
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = ((password_length - min) * 100 / (max - min)) + "% 100%";
    
}
function signal_generator(color){
    
    signal.style.backgroundColor = color;
    signal.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRandInteger(min,max){
    return Math.floor(Math.random() * (max-min) ) + min ;
}

function getRndInteger(){
    return getRandInteger(0,9);
}
// function getRandLowercase(){
//     let a = String.fromCharCode(getRndInteger(97,123))
//     return a;    
// } 
function shuffle(array)
{
    for(let i = array.length - 1 ; i > 0 ; i--){
        const  j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp; 
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
function getRandLowercase() {  
    return String.fromCharCode(getRandInteger(97,123))
}

function getRandUppercase(){
    return String.fromCharCode(getRandInteger(65,91));
}
function getsymbol(){
    const getrand = getRndInteger(0,symbols.length)
    return symbols.charAt(getrand);
}

function type_of_password(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;
    if(uppercase.checked) hasUpper = true;
    if(lowercase.checked) hasLower = true;
    if(number.checked) hasNumber = true;
    if(symbol.checked) hasSymbol = true;
    

    if(hasUpper && hasLower  && (hasNumber || hasSymbol) && password_length >= 8){
        signal_generator("#0f0");
    }
    else if((hasUpper || hasLower ) 
    && (hasNumber || hasSymbol) && password_length >= 6){
        signal_generator("#ff0");
    }
    else{
        signal_generator("#f00");
    }

}
async function copy_function(){
    try{
        //how to copy th text to clipbord
        await navigator.clipboard.writeText(password_entry.value);
        coping.innerHTML = "copied";
    }
    catch(e){
        coping.innerHTML= "failed";
    }
    coping.classList.add("active");
    setTimeout(() => {
        coping.classList.remove("active");
    },2000);
}
function changeincheckbox(){
    check_count = 0;
    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked)
        {
            check_count++;
        }
    });
    if(check_count > password_length)
    {
        password_length = check_count;
        handleslider();
    }
}

slider.addEventListener('input',(e) => {
    password_length = e.target.value;
    handleslider();
})

coping.addEventListener('click',() => {
    if(password_entry.value)
    {
        copy_function(); 
    }
})




check_count++;


generate.addEventListener('click',() => {
    if(check_count == 0){
        return 0;
    }
    if(check_count > password_length){
        password_length = check_count;
        handleslider();
    }
    password = "";
    // if(uppercase.checked){
    //     password += getRandUppercase();
    // }
    // if(lowercase.checked){
    //     password += getRandLowercase();
    // }
    // if(number.checked){
    //     password += getRndInteger(0,9)
    // }
    // if(symbol.checked){
    //     password += getsymbol();
    // }


    let arr = [];
    if(uppercase.checked){
        arr.push(getRandUppercase);
    }
    if(lowercase.checked){
         arr.push(getRandLowercase);
    }
    if(number.checked){
        arr.push(getRndInteger);
    }
    if(symbol.checked){
        arr.push(getsymbol);
    }
    for(let i=0; i<arr.length; i++) {
        password += arr[i]();
    }
    for(i = 0 ; i < password_length - arr.length ; i++){
        let randindex = getRandInteger(0,arr.length);
        console.log("randindex" + randindex);
        password += arr[randindex]();

    }
    
    password = shuffle(Array.from(password));

    //compalsory addision done
    password_entry.value = password;
    type_of_password();
})