const word = document.querySelector('.word')
let cursor = document.querySelector('.cursor')
setInterval(() => {
    cursor.classList.toggle('active')
}, 400);

let wordsArray = ['Student.', 'Delivery boy.', 'Plumber.', 'Boss.', 'Doctor.']

let wordIndex = 0
let characterIndex = 0

let reverseType = false
let waitTyping = 0
function autoType(forwardTimingSpeed, stopTiming, delay) {

    setInterval(() => {
        
        if (waitTyping) {
            waitTyping--
            return
        }
    
        if (!reverseType) {
            word.innerText += wordsArray[wordIndex][characterIndex]
            characterIndex++
            waitTyping = forwardTimingSpeed
        } else {
            word.innerText = word.innerText.slice(0, word.innerText.length - 1)
            characterIndex--
        }
    
        if (characterIndex === wordsArray[wordIndex].length) {
            reverseType = true
            waitTyping = stopTiming
        }
    
        if (word.innerText.length === 0 && reverseType) {
            reverseType = false
            wordIndex++
            characterIndex = 0
        }
    
        if (wordIndex === wordsArray.length) {
            wordIndex = 0
        }
    
    }, delay);
}
autoType(2, 7, 100)


//let's understand how this (waitTyping)/(skipUpdate) is working==>

//1. we initize it with 0

//2. we using (waitTyping) with an if condition, that checks if (waitTyping) is true means (not 0)=> then first decrease (waitTyping) value by 1 and the return from the setTimeout function. so what will happen from this ==> see the 2nd if condtion of the setTimeout function in that (waitTyping) value is 2, this means ki jo (waitTyping) waali condition true hojayegi aur (waitTyping) value 2-1 yaani 1 hojaygi aur fir iss poore function ko skip krti hui return jojayegi, aur fir 2nd itiation mei bhi same yehi hoga 1-1 yani 0 . toh hum ye keise skte hai ki ye indirectly setTimeout function ka time 200ms krdeta hai.

//3. that's how it looks ==> in 1st itiration (waitTyping) waali conditon false hojayegi aur poora setTimeout function as it is execute hoga. In 2nd itiration (waitTyping) waali conditon true hogi jo bhi (waitTyping) ki value hai vo -1 hogi aur poore function ko execute nhi kregi aur wahi se return hojjayegi. aur fir tab tkk execute nhi kregi jb tkk ki (waitTyping) waali conditon false nhi hojati. aur fir doobara ye cycle run hoti rehegi.

//4. jo characterIndex-- hai vo as it is 100 ms se hi run hoga kyuki waha (waitTyping) waali conditon false hai aur (waitTyping) ye change bhi nhi ho rhi   

// 5. (waitTyping = 5) waese hi execute hoga jessa 2&3 point mei likha hai. bss ye 5 itiration tkk setTimeout function ko execute nhi krega ya kahe ki 500ms tk stop ho jayega


// another way for waiting the typing ===>
// in this we are directly changing the time dynamically.
// but working same as the other approach.


// let waitTyping = 1

// setInterval(() => {

//     if (waitTyping !==1) {
//         console.log(waitTyping);
//         waitTyping--
//         return
//     }

//     if (!reverseType) {
//         word.innerText += wordsArray[wordIndex][characterIndex]
//         characterIndex++
//         waitTyping = 2
//     } else {
//         word.innerText = word.innerText.slice(0, word.innerText.length - 1)
//         characterIndex--
//     }

//     if (characterIndex === wordsArray[wordIndex].length) {
//         reverseType = true
//         waitTyping = 6
//     }

//     if (word.innerText.length === 0 && reverseType) {
//         reverseType = false
//         wordIndex++
//         characterIndex = 0
//     }

//     if (wordIndex === wordsArray.length) {
//         wordIndex = 0
//     }

// }, 100*(waitTyping));