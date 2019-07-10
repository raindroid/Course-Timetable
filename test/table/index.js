colTag = document.getElementById('col-mon')
console.log(colTag);


var addNewTag = (w, h, bg, c, text, parent) => {
    var testTag = document.createElement('div')
    testTag.style.width = `${w}px`
    testTag.style.height = `${h}px`
    testTag.style.background = bg
    testTag.style.color = c
    testTag.innerHTML = text
    parent.appendChild(testTag)
    return testTag
}

