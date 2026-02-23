// ---------------------Delete Button---------------------
// Get all elements with the class "delete-btn"
const deleteButtons = document.querySelectorAll('.btn-delete'); //

// Loop through each button and add a click event listener
deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // event.target is the button that was clicked
        // event.target.parentNode is the parent element (the .card div)
        const cardToRemove = event.target.parentNode.parentNode;
        cardToRemove.remove(); // The remove() method directly removes the element
    });
});

// ---------------------------------------------
let interviewList = [];
let rejectList = []
let currentStatus = 'all'

let tabCount = document.getElementById('tabCount');
let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount')
let rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectFilterBtn = document.getElementById('rejected-filter-btn')

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filtered-section')


function calculateCount() {
    tabCount.innerText = allCardSection.children.length
    total.innerText = allCardSection.children.length //3
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectList.length
}

calculateCount()

// step 1;
function toggleStyle(id) {
    // adding gray bg for all
    allFilterBtn.classList.add('bg-[#FFFFFF]', 'text-black')
    interviewFilterBtn.classList.add('bg-[#FFFFFF]', 'text-black')
    rejectFilterBtn.classList.add('bg-[#FFFFFF]', 'text-black')

    // if any button has black then remove
    allFilterBtn.classList.remove('bg-blue-800', 'text-white')
    interviewFilterBtn.classList.remove('bg-blue-800', 'text-white')
    rejectFilterBtn.classList.remove('bg-blue-800', 'text-white')

    // console.log(id);
    const selected = document.getElementById(id)//this is the button that clicked for filter

    currentStatus = id
    // console.log(currentStatus);
    // console.log(selected);

    // adding black bg for current button
    selected.classList.remove('bg-[#FFFFFF]', 'text-black')
    selected.classList.add('bg-blue-800', 'text-white')
    // step 1 finish

    // show and hidden particular section
    // step 4 start
    // filtering while clicking the filter button (All, Interview, Reject)
    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderInterview()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderReject()
    }
}


// step 2 delegation
mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const companyName = parenNode.querySelector('.companyName').innerText
        
        const postName = parenNode.querySelector('.postName').innerText
        const jobType = parenNode.querySelector('.jobType').innerText
        const water = parenNode.querySelector('.water').innerText
        const status = parenNode.querySelector('.status').innerText
        const notes = parenNode.querySelector('.notes').innerText
        
        // parenNode.querySelector('.status').innerText = 'INTERVIEW'
        parenNode.querySelector('.status').innerHTML = `<button class="interview-btn border border-green-700 text-green-700 rounded-[8px] px-4 py-2">INTERVIEW</button>`


        const cardInfo = {
            companyName,
            postName,
            jobType,
            water,
            status: 'INTERVIEW',
            notes
        }

        const companyExist = interviewList.find(item => item.companyName == cardInfo.companyName)

        if (!companyExist) {
            interviewList.push(cardInfo)
        }

        // step 2 finish
        // removing the company from reject list
        rejectList = rejectList.filter(item => item.companyName != cardInfo.companyName)

        // after remove rerender the html
        if (currentStatus == 'rejected-filter-btn') {
            renderReject()
        }

         calculateCount()


    } else if (event.target.classList.contains('rejected-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const companyName = parenNode.querySelector('.companyName').innerText
        const postName = parenNode.querySelector('.postName').innerText
        const jobType = parenNode.querySelector('.jobType').innerText
        const water = parenNode.querySelector('.water').innerText
        const status = parenNode.querySelector('.status').innerText
        const notes = parenNode.querySelector('.notes').innerText

        // parenNode.querySelector('.status').innerText = 'REJECTED'
        parenNode.querySelector('.status').innerHTML = `<button class="rejected-btn border border-red-600 text-red-600 rounded-[8px] px-4 py-2">REJECTED</button>`
        

        const cardInfo = {
            companyName,
            postName,
            jobType,
            water,
            status: 'REJECTED',
            notes
        }

        const companyExist = rejectList.find(item => item.companyName == cardInfo.companyName)

        if (!companyExist) {
            rejectList.push(cardInfo)
        }

        // removing the company from interview list
        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName)

        // console.log(interviewList);

        // after remove rerender the html
        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }
        calculateCount()

    }

})

// step 3  html file create
function renderInterview() {
    // make the filterSection empty every time
    filterSection.innerHTML = ''

    // crating innerHtml
    for (let interview of interviewList) {
        // console.log(interview);

        let div = document.createElement('div');
        div.className = 'card flex justify-between p-8 bg-[#FFFFFF] border border-[#F1F2F4] rounded-[8px]'
        div.innerHTML = `
        <div>
        <button class="btn-delete bg-[#FFFFFF] border border-[#F1F2F4] rounded-full px-3 py-2 ml-[350px] absolute ml-[900px]" ><i
                            class="fa-solid fa-trash-can"></i></button> 
        <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                          <!-- 'companyName companyName' -->
                        <p class="companyName text-[20px] font-semibold">${interview.companyName}</p>
                          <!-- 'latinName postName' -->
                        <p class="postName text-[#64748B]">${interview.postName}</p>
                    </div>

                    <!-- part 2 -->
                    <div>
                        <!-- light/jobType -->
                        <p class="jobType text-[14px] text-[#64748B]">${interview.jobType}</p>
                        <p class="water text-[14px] text-[#64748B]"></p>
                        
                    </div>
                    <!-- part 3 -->
                     <!-- bg-gray-300 w-[113px] px-3 py-1 -->
                    <p class="status text-[14px]"><span class ="border border-green-700 text-green-700 rounded-[8px] px-4 py-2">${interview.status}</span></p>
                    <p class="notes text-[#323B49]">${interview.notes}</p>

                    <div class="flex gap-5">
                               <!-- 'interview-btn/thriving-btn' -->
                        <button class="interview-btn bg-white border border-green-700 text-green-700 rounded-[8px] px-4 py-2">INTERVIEW</button>
                                <!-- 'rejected-btn'/struggling-btn -->
                        <button class="rejected-btn bg-white border border-red-600 text-red-600 rounded-[8px] px-4 py-2">REJECTED</button>
                    </div>
                </div>

                <!-- main part 2 -->
                
                </div>

        `
        filterSection.appendChild(div)
    }
}

function renderReject() {
    // make the filterSection empty every time
    filterSection.innerHTML = ''
    // crating innerHtml
    for (let reject of rejectList) {

        let div = document.createElement('div');
        div.className = 'card flex justify-between p-8 bg-[#FFFFFF] border border-[#F1F2F4] rounded-[8px]'
        div.innerHTML = `
        <div>
        <button class="btn-delete bg-[#FFFFFF] border border-[#F1F2F4] rounded-full px-3 py-2 ml-[350px] absolute ml-[900px]" ><i
                            class="fa-solid fa-trash-can"></i></button> 
        <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                          <!-- 'companyName companyName' -->
                        <p class="companyName text-[20px] font-semibold">${reject.companyName}</p>
                          <!-- 'latinName postName' -->
                        <p class="postName text-[#64748B]">${reject.postName}</p>
                    </div>

                    <!-- part 2 -->
                    <div>
                        <!-- light/jobType -->
                        <p class="jobType text-[14px] text-[#64748B]">${reject.jobType}</p>
                        <p class="water text-[14px] text-[#64748B]"></p>
                        
                    </div>
                    <!-- part 3 -->
                     <!-- bg-gray-300 w-[113px] px-3 py-1 -->
                    <p class="status text-[14px]"><span class="border border-red-600 text-red-600 rounded-[8px] px-4 py-2">${reject.status}</span></p>
                    <p class="notes text-[#323B49]">${reject.notes}</p>

                    <div class="flex gap-5">
                               <!-- 'interview-btn/thriving-btn' -->
                        <button class="interview-btn bg-white border border-green-700 text-green-700 rounded-[8px] px-4 py-2">INTERVIEW</button>
                                <!-- 'rejected-btn'/struggling-btn -->
                        <button class="rejected-btn bg-white border border-red-600 text-red-600 rounded-[8px] px-4 py-2">REJECTED</button>
                    </div>
                </div>

                <!-- main part 2 -->
                
                </div>
        `
        filterSection.appendChild(div)
    }
}

