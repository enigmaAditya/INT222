// console.log("Hello JavaScript")
// console.dir(document.body.childNodes);

let element = document.querySelector("body");
element.addEventListener("submit",(e)=>{
    e.preventDefault();

    alert("Welcome "+ document.getElementById("name").value + " !")
    element.style.backgroundColor = document.getElementById("options").value
})

let element1 = document.querySelector("textarea");
// use focus and blur on it 
element1.addEventListener("focus",(e)=>{
    document.getElementById("textarea").style.borderColor = "yellow";
});
element1.addEventListener("blur",(e)=>{
    document.getElementById("textarea").style.borderColor = "black";
})
//  list of all events in js 
// 1. Mouse events
// 2. Keyboard events
// 3. Form events
// 4. Focus events
// 5. UI events
// 6. Load events
// 7. Drag and drop events
// 8. Pointer events
// 9. Touch events
// 10. Wheel events
// 11. Media events
// 12. Animation events
// 13. Transition events
// 14. Clipboard events
// 15. Print events
// 16. Online/Offline events

// mouse events:
// click
// dblclick
// mousedown
// mouseup
// mousemove
// mouseover
// mouseout
// contextmenu

// keyboard events:
// keydown
// keyup
// keypress

// form events:
// submit
// reset
// change
// input

// focus events:
// focus
// blur
// focusin
// focusout

// UI events:
// load
// unload
// error
// resize
// scroll

// drag and drop events:
// dragstart
// drag
// dragend
// dragover
// dragenter
// dragleave
// drop

// pointer events:
// pointerdown
// pointerup
// pointermove
// pointerover
// pointerout
// pointerenter
// pointerleave

// touch events:
// touchstart
// touchend
// touchmove
// touchcancel

// wheel events:
// wheel

// media events:
// play
// pause
// ended
// volumechange
// timeupdate

// animation events:
// animationstart
// animationend
// animationiteration

// transition events:
// transitionstart
// transitionend

// clipboard events:
// copy
// cut
// paste

// print events:
// beforeprint
// afterprint

// online/offline events:
// online
// offline  
