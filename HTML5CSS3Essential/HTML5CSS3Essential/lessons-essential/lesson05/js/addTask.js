//LESSON 5
let elements = new Set(['p', 'span', 'a']);
// green border
for (let item of elements) {
    let tags = document.querySelectorAll(`#tag-name ${item}`);
    for (let tag of tags) {
        tag.style.border = '1px solid green';
    }
}
//red border
let tags = document.querySelectorAll(`#class-name .select-class`);
for (let tag of tags) {
    tag.style.border = '1px solid red';
}
//blue border
let blueBorder = '1px solid blue';
document.querySelector(`#unique-id #span1`).style.border = blueBorder;
document.querySelector(`#unique-id #p1`).style.border = blueBorder;
document.querySelector(`#unique-id #p2`).style.border = blueBorder;
document.querySelector(`#unique-id #a1`).style.border = blueBorder;
document.querySelector(`#unique-id #a2`).style.border = blueBorder;
