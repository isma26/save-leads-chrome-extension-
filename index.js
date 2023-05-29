let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEL = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("save-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )



if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads){
    let listItems = ""
    for(let i=0; i < leads.length; i++){
        //listItems += "<li><a target='_blank' href='"+ myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItems += `
                    <li>
                        <a target='_blank' href='${leads[i]}'>
                            ${leads[i]}
                        </a>
                    </li>
                `
    }
    ulEL.innerHTML = listItems
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

})
saveBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow: true},function(tabs){
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
    
    
})
deleteBtn.addEventListener("click",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

