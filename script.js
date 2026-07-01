// ==========================================
// RESUME BUILDER - PART 1
// ==========================================

// ---------- Basic Fields ----------
const fields = ["name", "title", "email", "phone", "address", "about"];

fields.forEach(field => {

    const input = document.getElementById(field);

    input.addEventListener("input", () => {

        document.getElementById("r-" + field).textContent =
            input.value || "";

        saveData();

    });

});

// ---------- Profile Photo ----------
const photoInput = document.getElementById("photo");

if (photoInput) {

    photoInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            document.getElementById("profileImage").src = e.target.result;

            saveData();

        };

        reader.readAsDataURL(file);

    });

}

// ==========================================
// EDUCATION
// ==========================================

const eduContainer = document.getElementById("education-container");
const resumeEducation = document.getElementById("resumeEducation");

function createEducationItem() {

    const div = document.createElement("div");

    div.className = "education-item";

    div.innerHTML = `
        <input type="text" class="college" placeholder="College">

        <input type="text" class="degree" placeholder="Degree">

        <input type="text" class="year" placeholder="Year">

        <button type="button" class="removeEducation">
            Remove
        </button>
    `;

    div.querySelectorAll("input").forEach(input => {

        input.addEventListener("input", () => {

            updateEducation();

            saveData();

        });

    });

    div.querySelector(".removeEducation").addEventListener("click", () => {

        div.remove();

        updateEducation();

        saveData();

    });

    return div;

}

document.getElementById("addEducation").addEventListener("click", () => {

    eduContainer.appendChild(createEducationItem());

});

function updateEducation() {

    resumeEducation.innerHTML = "";

    document.querySelectorAll(".education-item").forEach(item => {

        const college = item.querySelector(".college").value;

        const degree = item.querySelector(".degree").value;

        const year = item.querySelector(".year").value;

        if (college || degree || year) {

            resumeEducation.innerHTML += `
                <div style="margin-bottom:15px;">
                    <strong>${degree}</strong><br>
                    ${college}<br>
                    ${year}
                </div>
            `;

        }

    });

}

document.querySelectorAll(".education-item input").forEach(input => {

    input.addEventListener("input", updateEducation);

});

// ==========================================
// EXPERIENCE
// ==========================================

const expContainer = document.getElementById("experience-container");
const resumeExperience = document.getElementById("resumeExperience");

function createExperienceItem() {

    const div = document.createElement("div");

    div.className = "experience-item";

    div.innerHTML = `
        <input type="text" class="company" placeholder="Company">

        <input type="text" class="position" placeholder="Position">

        <input type="text" class="expyear" placeholder="Years">

        <button type="button" class="removeExperience">
            Remove
        </button>
    `;

    div.querySelectorAll("input").forEach(input => {

        input.addEventListener("input", () => {

            updateExperience();

            saveData();

        });

    });

    div.querySelector(".removeExperience").addEventListener("click", () => {

        div.remove();

        updateExperience();

        saveData();

    });

    return div;

}

document.getElementById("addExperience").addEventListener("click", () => {

    expContainer.appendChild(createExperienceItem());

});

function updateExperience() {

    resumeExperience.innerHTML = "";

    document.querySelectorAll(".experience-item").forEach(item => {

        const company = item.querySelector(".company").value;

        const position = item.querySelector(".position").value;

        const year = item.querySelector(".expyear").value;

        if (company || position || year) {

            resumeExperience.innerHTML += `
                <div style="margin-bottom:15px;">
                    <strong>${position}</strong><br>
                    ${company}<br>
                    ${year}
                </div>
            `;

        }

    });

}

document.querySelectorAll(".experience-item input").forEach(input => {

    input.addEventListener("input", updateExperience);

});
// ==========================================
// SKILLS
// ==========================================

const skillInput = document.getElementById("skillInput");
const addSkillBtn = document.getElementById("addSkill");
const resumeSkills = document.getElementById("resumeSkills");

addSkillBtn.addEventListener("click", () => {

    const skill = skillInput.value.trim();

    if (skill === "") return;

    addSkill(skill);

    skillInput.value = "";

    saveData();

});

function addSkill(skill) {

    const li = document.createElement("li");

    li.innerHTML = `
        ${skill}
        <button type="button" class="deleteSkill">×</button>
    `;

    li.querySelector(".deleteSkill").addEventListener("click", () => {

        li.remove();

        saveData();

    });

    resumeSkills.appendChild(li);

}

// ==========================================
// LOCAL STORAGE
// ==========================================

function saveData() {

    const education = [];

    document.querySelectorAll(".education-item").forEach(item => {

        education.push({

            college: item.querySelector(".college").value,

            degree: item.querySelector(".degree").value,

            year: item.querySelector(".year").value

        });

    });

    const experience = [];

    document.querySelectorAll(".experience-item").forEach(item => {

        experience.push({

            company: item.querySelector(".company").value,

            position: item.querySelector(".position").value,

            year: item.querySelector(".expyear").value

        });

    });

    const skills = [];

    document.querySelectorAll("#resumeSkills li").forEach(li => {

        skills.push(li.childNodes[0].textContent.trim());

    });

    const data = {

        name: document.getElementById("name").value,

        title: document.getElementById("title").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        about: document.getElementById("about").value,

        education,

        experience,

        skills,

        photo: document.getElementById("profileImage").src

    };

    localStorage.setItem("resumeData", JSON.stringify(data));

}

// ==========================================
// LOAD DATA
// ==========================================

function loadData() {

    const data = JSON.parse(localStorage.getItem("resumeData"));

    if (!data) return;

    // Basic fields

    document.getElementById("name").value = data.name || "";
    document.getElementById("title").value = data.title || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("phone").value = data.phone || "";
    document.getElementById("address").value = data.address || "";
    document.getElementById("about").value = data.about || "";

    document.getElementById("r-name").textContent = data.name || "Your Name";
    document.getElementById("r-title").textContent = data.title || "";
    document.getElementById("r-email").textContent = data.email || "";
    document.getElementById("r-phone").textContent = data.phone || "";
    document.getElementById("r-address").textContent = data.address || "";
    document.getElementById("r-about").textContent = data.about || "";

    // Profile Photo

    if (data.photo) {

        document.getElementById("profileImage").src = data.photo;

    }

    // Education

    if (data.education) {

        eduContainer.innerHTML = "";

        data.education.forEach(edu => {

            const item = createEducationItem();

            item.querySelector(".college").value = edu.college;
            item.querySelector(".degree").value = edu.degree;
            item.querySelector(".year").value = edu.year;

            eduContainer.appendChild(item);

        });

        updateEducation();

    }

    // Experience

    if (data.experience) {

        expContainer.innerHTML = "";

        data.experience.forEach(exp => {

            const item = createExperienceItem();

            item.querySelector(".company").value = exp.company;
            item.querySelector(".position").value = exp.position;
            item.querySelector(".expyear").value = exp.year;

            expContainer.appendChild(item);

        });

        updateExperience();

    }

    // Skills

    if (data.skills) {

        resumeSkills.innerHTML = "";

        data.skills.forEach(skill => {

            addSkill(skill);

        });

    }

}
// ==========================================
// DARK MODE
// ==========================================

const darkBtn = document.getElementById("darkMode");

if (darkBtn) {

    // Restore saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

    });

}

// ==========================================
// DOWNLOAD PDF
// ==========================================

document.getElementById("downloadPDF").addEventListener("click", async () => {

    const resume = document.querySelector(".resume");

    const canvas = await html2canvas(resume, {
        scale: 2,
        useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;

    while (heightLeft > 0) {

        position = heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

        heightLeft -= pageHeight;
    }

    pdf.save("Resume.pdf");

});

// ==========================================
// INITIALIZE
// ==========================================

// Load saved data
loadData();

// Update preview after loading
updateEducation();
updateExperience();

// ==========================================
// OPTIONAL:
// Press Enter in Skills box to add skill
// ==========================================

if (skillInput) {

    skillInput.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            e.preventDefault();

            addSkillBtn.click();

        }

    });

}

// ==========================================
// DEFAULT PREVIEW VALUES
// ==========================================

document.getElementById("r-name").textContent =
    document.getElementById("name").value || "Your Name";

document.getElementById("r-title").textContent =
    document.getElementById("title").value || "Job Title";

document.getElementById("r-email").textContent =
    document.getElementById("email").value || "Email";

document.getElementById("r-phone").textContent =
    document.getElementById("phone").value || "Phone";

document.getElementById("r-address").textContent =
    document.getElementById("address").value || "Address";

document.getElementById("r-about").textContent =
    document.getElementById("about").value || "Tell recruiters about yourself...";
// ===================================
// PROJECTS
// ===================================

const projectContainer = document.getElementById("project-container");
const resumeProjects = document.getElementById("resumeProjects");

function createProject(){

    const div=document.createElement("div");

    div.className="project-item";

    div.innerHTML=`

        <input
        type="text"
        class="projectTitle"
        placeholder="Project Title">

        <textarea
        class="projectDesc"
        placeholder="Project Description"></textarea>

        <button class="removeProject">
        Remove
        </button>

    `;

    div.querySelectorAll("input,textarea").forEach(input=>{

        input.addEventListener("input",()=>{

            updateProjects();

            saveData();

        });

    });

    div.querySelector(".removeProject").onclick=()=>{

        div.remove();

        updateProjects();

        saveData();

    };

    return div;

}

document.getElementById("addProject").onclick=()=>{

    projectContainer.appendChild(createProject());

};

function updateProjects(){

    resumeProjects.innerHTML="";

    document.querySelectorAll(".project-item").forEach(item=>{

        const title=item.querySelector(".projectTitle").value;

        const desc=item.querySelector(".projectDesc").value;

        if(title||desc){

            resumeProjects.innerHTML+=`

                <div>

                    <strong>${title}</strong>

                    <p>${desc}</p>

                </div>

            `;

        }

    });

}

document.querySelectorAll(".project-item input,.project-item textarea").forEach(input=>{

    input.addEventListener("input",updateProjects);

});
// ====================================
// CERTIFICATES
// ====================================

const certificateContainer =
document.getElementById("certificate-container");

const resumeCertificates =
document.getElementById("resumeCertificates");

function createCertificate(){

const div=document.createElement("div");

div.className="certificate-item";

div.innerHTML=`

<input
class="certificateTitle"
placeholder="Certificate Name">

<input
class="certificateOrg"
placeholder="Organization">

<button class="removeCertificate">
Remove
</button>

`;

div.querySelectorAll("input").forEach(input=>{

input.addEventListener("input",()=>{

updateCertificates();

saveData();

});

});

div.querySelector(".removeCertificate").onclick=()=>{

div.remove();

updateCertificates();

saveData();

};

return div;

}

document.getElementById("addCertificate").onclick=()=>{

certificateContainer.appendChild(createCertificate());

};

function updateCertificates(){

resumeCertificates.innerHTML="";

document.querySelectorAll(".certificate-item").forEach(item=>{

const title=item.querySelector(".certificateTitle").value;

const org=item.querySelector(".certificateOrg").value;

if(title||org){

resumeCertificates.innerHTML+=`

<div>

<strong>${title}</strong>

<br>

${org}

</div>

`;

}

});

}

document.querySelectorAll(".certificate-item input").forEach(input=>{

input.addEventListener("input",updateCertificates);

});

// ====================================
// SOCIAL LINKS
// ====================================

document.getElementById("github").addEventListener("input",function(){

document.getElementById("r-github").textContent=this.value;

saveData();

});

document.getElementById("linkedin").addEventListener("input",function(){

document.getElementById("r-linkedin").textContent=this.value;

saveData();

});    
document.getElementById("removePhoto").addEventListener("click", () => {

    document.getElementById("profileImage").src = "";

    document.getElementById("photo").value = "";

    const data = JSON.parse(localStorage.getItem("resumeData")) || {};

    data.photo = "";

    localStorage.setItem("resumeData", JSON.stringify(data));

});
