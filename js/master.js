let FontColor = window.localStorage.getItem("FontColor")
const ColorLis = document.querySelectorAll(".ColorList li");
if(FontColor !== null){
    document.documentElement.style.setProperty("--main-color" , window.localStorage.getItem("FontColor"))
    ColorLis.forEach((li) => {
        li.classList.remove("activColor")
        if(li.dataset.color === window.localStorage.getItem("FontColor")){
            li.classList.add("activColor")
        }
    })
}
// start landing page change image
//yes or no ?
let spans = document.querySelectorAll(".option-box span")
spans.forEach((span) => {
    span.addEventListener("click" , (e) => {
        spans.forEach((span) => {
            span.classList.remove("activ");
        })
        e.target.classList.add("activ")
        if(e.target.dataset.background === "yes"){
            backgroundOption = true;
            window.localStorage.setItem("backgroundOption" , true)
            randomBackground()
        }else{
            backgroundOption = false;
            window.localStorage.setItem("backgroundOption" , false)
            clearInterval(backgroundIntirval)
        }
    })
})

//************************************************************************************************************************* */
let landingPage = document.querySelector(".landing-page");
let landImage = ["imgs/team-02.jpg","imgs/team-03.png","imgs/team-04.png","imgs/team-05.jpg","imgs/team-06.jpg"]
let i = 0;
//background option
let backgroundOption = true;
//control interval background change
let backgroundIntirval ;
let backgroundLocalChange = window.localStorage.getItem("backgroundOption")
//check if local storage containe a backgroundOption
if(backgroundLocalChange !== null){
    spans.forEach((span) => {
        span.classList.remove("activ");
    })
    if(backgroundLocalChange === "true"){
        document.querySelector("[data-background = yes]").classList.add("activ")
        backgroundOption = true
    }else{
        backgroundOption = false
        document.querySelector("[data-background = no]").classList.add("activ")
    }
}
function randomBackground(){
    if(backgroundOption === true){
        backgroundIntirval = setInterval(function(){
            if(i===5){
                i=0;
            }
            landingPage.style.backgroundImage = `url(${landImage[i]})`
            i++;
        },10000)
    }
}
randomBackground()
// end landing page change image
// start show settings box

let iconSettings = document.querySelector(".toggel").onclick = function(){
    document.querySelector(".toggel .icon-setting").classList.toggle("fa-spin")
    document.querySelector(".setting-box").classList.toggle("open");
}
// end show settings box
// strat settings changed

ColorLis.forEach((li) =>{
    li.addEventListener("click" , (e) =>{
        ColorLis.forEach((li) => {
            li.classList.remove("activColor")
        })
        e.target.classList.add("activColor")
        window.localStorage.setItem("FontColor",e.target.dataset.color)
        document.documentElement.style.setProperty("--main-color" , window.localStorage.getItem("FontColor"))
    })
})
// end settings changed

// skills progres
let skillsSpan = document.querySelectorAll(".skills .container .skill span")
let SkillsSection = document.querySelector(".skills")

window.onscroll = function(){
    //fill skils in progres
    if(window.scrollY >= SkillsSection.offsetTop - 350){
        skillsSpan.forEach((span) => {
            span.style.width = span.dataset.progres
        })
    }
    //show gallry section
    if(window.scrollY > gallry.offsetTop - 300){
        gallry.style.left = 0
    }
    //show featuers section
    if(window.scrollY > featuersSection.offsetTop - 300){
        featuersSection.style.left = 0
        
    }

    //show testmonials section
    if(window.scrollY > testmonialsSection.offsetTop -200){
            let h3Num = document.querySelectorAll(".testmonials .box h3")
                h3Num.forEach((h3) => {
                    let count = setInterval(function(){
                        
                        if(+h3.innerHTML >= +h3.dataset.testmon){
                            clearInterval(count)
                        }else{
                            h3.innerHTML++
                        }
                    })
                })
            
        }
}
// start gallry section action
//get gallry section
let gallry = document.querySelector(".gallry")
//get imag in gallry section
let imagGallry = document.querySelectorAll(".box-images img")
//loop on imgae gallry
imagGallry.forEach((img) => {
    img.addEventListener("click" , (e) => {
        //create window to open imag
        let popup = document.createElement("div");
        //add class popup to popub div
        popup.className = "popub";
        //create overlay on body 
        let popubOverlay = document.createElement("div")
        //add class to popub over lay
        popubOverlay.className = "popub-overlay"
        //create imag that will open on popub
        let imgClick = document.createElement("img")
        //change src attrbute to src img clcik
        imgClick.src = e.target.src
        //add over lay to window when click on imag
        document.body.appendChild(popubOverlay)
        //popub add imag iside it
        popup.appendChild(imgClick)
        //create title t img
        let titleImag = document.createElement("h1")
        //add title to titleimag varible
        if(e.target.alt == null || e.target.alt == ""){
            titleImag.append("No Altrnet Text")
        }else{
            titleImag.append(e.target.alt)
        }
        //append title image to popub
        popup.prepend(titleImag)
        //create close button
        let closeButton = document.createElement("button")
        //add class close-button to button
        closeButton.className = "close-button"
        //create text to close button
        let closeButtonText = document.createTextNode("X")
        //add text close button to button
        closeButton.appendChild(closeButtonText)
        //append close button to popub
        popup.appendChild(closeButton)
        //add popub to window when click on imag
        document.body.appendChild(popup)
    })
})
document.addEventListener("click" , (e) => {
    //close popub window 
    if(e.target.className == "close-button"){
        document.querySelector(".popub-overlay").remove()
        document.querySelector(".popub").remove()
    }
})
//start featuers 
let featuersSection = document.querySelector(".featuers")
//start testmonials
let testmonialsSection = document.querySelector(".testmonials")
//start bullets
let tooltip = document.querySelectorAll(".bullet .tooltip")
let bullet = document.querySelectorAll(".bullet")
bullet.forEach((bull) => {
    bull.addEventListener("click" , (ev) => {
        // console.log(ev.target.firstElementChild.innerHTML)
        let sectionToScrollTo = document.querySelector(`.${ev.target.firstElementChild.innerHTML}`)
        window.scrollTo({
            top : sectionToScrollTo.offsetTop,
            left :0,
            behavior : "smooth"
        })
        
    })
})

// start option bullets
let YesOrNo = true;
let bulletsNav = document.querySelector(".bullets-nav")
let optionBullets = document.querySelectorAll(".option-bullets span")
let bulletsOptions = window.localStorage.getItem("bulletsOptions")
if(bulletsOptions !== null){
    optionBullets.forEach((span) => {
        span.classList.remove("activ")
    })
    if(bulletsOptions == "true"){
        YesOrNo = true
        bulletsNav.style.display = "flex"
        document.querySelector("[data-bullets = yes]").classList.add("activ")
    }
    else{
        YesOrNo = false
        bulletsNav.style.display = "none"
        document.querySelector("[data-bullets = no]").classList.add("activ")
    }

}
optionBullets.forEach((span) =>{
    span.addEventListener("click" , (e) => {
        // console.log(e.target)
        //remove class activ from all span
        optionBullets.forEach((span) => {
            span.classList.remove("activ")
        })
        //add class activ on span clicked
        e.target.classList.add("activ")
        let ans = e.target.dataset.bullets
        if(ans === "yes"){
            window.localStorage.setItem("bulletsOptions" , true)
            YesOrNo = true
        }else{
            window.localStorage.setItem("bulletsOptions" , false)
            YesOrNo = false
        }
        if(YesOrNo === true){
            bulletsNav.style.display = "flex"
        }else{
            bulletsNav.style.display = "none"
        }
    })
})
// start open menue link
let iconOpen = document.querySelector(".link i")
let myUL = document.querySelector(".link .myul")
iconOpen.onclick = function(){
    iconOpen.classList.toggle("open")
    if(iconOpen.classList.contains("open")){
        myUL.style.opacity = "0"
    }else{
        myUL.style.opacity = "1"
    }
}
window.onresize = function(){
    if(window.innerWidth > 990){
        myUL.style.opacity = "1"
    }else{
        myUL.style.opacity = "0"
    }
}
// start pattern to contact