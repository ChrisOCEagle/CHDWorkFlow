var schools =
    [{
        name: "",
        phone: [""],
        answer: [""],
        jump: "",
        chd: "",
        verificationSoftware: "",
        resetSoftware: " ",
    }];


/* This code handles filling the schools array based on input data from the html form */
// grab the form
var form = document.querySelector('form');
// add an event listener for when the form is submitted
form.addEventListener('submit', (event) => {
    // prevent the default form submission
    event.preventDefault();
    // grab the form elements
    var formElements = form.elements;
    // create an empty object to store the data for the new school
    var school = {};
    // loop through the form elements to find each individual element
    for (let i = 0; i < formElements.length; i++) {
        // check if the form element type is a submit
        if (formElements[i].type !== "submit") {
            // check if the form element value is not empty
            if (formElements[i].value !== "") {
                // check if the form element name is either answer or phone
                if (formElements[i].name === "answer" || formElements[i].name === "phone") {
                    // check the form element value string for the pipe symbol, '|'
                    if (formElements[i].value.includes("|")) {
                        // use regex to select all occurrances of the following string " | "
                        var re = new RegExp("\\s+\\|+\\s", "g");
                        // find every occurrance of the regex in the string
                        var str = formElements[i].value;
                        // store it in an array
                        var arr = str.match(re);
                        // split the string a number of times equal to the length of the array according to the regex
                        var strings = str.split(re, arr.length + 1);
                        // add the data into the new object
                        school[formElements[i].name] = strings;
                    } else {
                        // add the data into the new object
                        school[formElements[i].name] = [formElements[i].value];
                    };
                } else {
                    // add the data into the new object
                    school[formElements[i].name] = formElements[i].value;
                };
            };
        };
    };
    if (school.isEmpty()) {
        alert("Please fill out one or more of the fields.");
    } else {
        schools.push(school);
        schools.sort((a, b) => (a.name > b.name) ? 1 : -1);
        console.log(schools)
    };
});

// This code handles creating the cards from the array data
var container = document.getElementsByClassName("card-container");

for (let i = 0; i < schools.length; i++) {
    var card = document.createElement("div");
    setAttributes(card, { "class": "card", "id": "card-" + i });

    // need the school name, h1 tag
    var schoolName = document.createElement("h1");
    setAttributes(schoolName, { "class": "school", "id": "school-name" });
    schoolName.innerHTML = schools[i].name;

    // the phone display for the school, h3 tag
    var phone = document.createElement("h3");
    setAttributes(phone, { "class": "phone", "id": "phone-display" });
    phone.innerHTML = "Phone Display: ";
    for (let j = 0; j < schools[i].phone.length; j++) {
        if (j === schools[i].phone.length - 1) {
            phone.innerHTML += schools[i].phone[j];
        } else {
            phone.innerHTML += schools[i].phone[j] + " | ";
        };
    };

    // the answer phrase(s), h5 tag
    var answerScript = document.createElement("h5");
    setAttributes(answerScript, { "class": "answer", "id": "answer-script" });
    for (let j = 0; j < schools[i].answer.length; j++) {
        if (schools[i].answer.length > 1) {
            var scripts = document.createElement("h5");
            setAttributes(scripts, { "class": "answer", "id": "answer-script" });
            if (schools[i].answer[j].includes("priority")) {
                scripts.innerHTML = "Priority: " + schools[i].answer[j];
            } else {
                scripts.innerHTML = "Standard: " + schools[i].answer[j];
            };
            appendChildren(answerScript, { scripts });
        } else {
            answerScript.innerHTML = schools[i].answer[j];
        };
    };

    // the link to the Jump, a tag
    var jumpLink = document.createElement("a");
    setAttributes(jumpLink, { "class": "link", "id": "jump-link", "href": schools[i].jump, "target": "_blank" });
    jumpLink.innerHTML = "Jump";

    // the link to the CHD, a tag
    var chdLink = document.createElement("a");
    setAttributes(chdLink, { "class": "link", "id": "chd-link", "href": schools[i].chd, "target": "_blank" });
    chdLink.innerHTML = "CHD Section";

    // the name of the software to verify the caller, p tag
    var verificationSoftware = document.createElement("p");
    setAttributes(verificationSoftware, { "class": "software", "id": "verification-software-name" });
    verificationSoftware.innerHTML = "Verification Software Name: " + schools[i].verificationSoftware;

    // the name of the software to look up the caller, p tag
    var resetSoftware = document.createElement("p");
    setAttributes(resetSoftware, { "class": "software", "id": "reset-software-name" });
    resetSoftware.innerHTML = "Reset Software Name: " + schools[i].resetSoftware;

    var schoolData = { schoolName, phone, answerScript, jumpLink, chdLink, verificationSoftware, resetSoftware };
    appendChildren(card, schoolData);
    container[0].appendChild(card);
};

/* This code block is what controls the modal */
var modalBtn = document.getElementById("modal-btn");
var modal = document.getElementById("modal");
var closeBtn = document.getElementsByClassName("close")[0];

modalBtn.onclick = function () {
    modal.style.display = "block";
};

closeBtn.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    };
};

/* This function is for checking if an object is empty */
Object.prototype.isEmpty = function () {
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            return false;
        };
        return true;
    };
};

/* This function is for appending multiple children to an element */
function appendChildren(element, children) {
    for (var key in children) {
        element.appendChild(children[key])
    };
};

/* This function is for setting multiple attributes for an element */
function setAttributes(element, attributes) {
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    };
};
