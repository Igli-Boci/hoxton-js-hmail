import './style.css'

type Email = {
  from: string
  header: string
  content: string
  emailAddress: string
  img: string
  read: boolean
}

type State = {
  emails: Email[]
  selectedEmail: Email | null
  filter: string
}

const state: State = {
  emails: [
    {
      from: 'Nico',
      header: "Link to today's video and slides is up!",
      content:
        'Link is up and you know where to find it! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'nico@email.com',
      img: 'assets/nico.JPG',
      read: true
    },
    {
      from: 'Ed',
      header:
        "Congratulations! You have received a free beaver! Your name will now be displayed in the classroom's beaver list!",
      content:
        'Beaver beaver beaver beaver beaver beaver beaver beaver ! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'ed@email.com',
      img: 'assets/ed.JPG',
      read: false
    },
    {
      from: 'Government',
      header: 'Time to pay your tax!',
      content:
        'Pay us now! Pay us now! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'government@email.com',
      img: 'assets/gov.jpg',
      read: false
    }
  ],
  selectedEmail: null,
  filter: ''
}

function selectEmail(email: Email) {
  email.read = true
  state.selectedEmail = email
}

function deselectEmail() {
  state.selectedEmail = null
}

function renderEmail(email: Email, listEl: HTMLUListElement) {
  let liEl = document.createElement('li')
  liEl.className = email.read ? 'emails-list__item read' : 'emails-list__item'
  liEl.addEventListener('click', function () {
    selectEmail(email)
    render()
  })


  let elReadIcon = document.createElement('span')
  elReadIcon.className =
    'emails-list__item__read-icon material-symbols-outlined'
  elReadIcon.textContent = email.read ? 'mark_email_read' : 'mark_email_unread'

  let elImg = document.createElement('img')
  elImg.className = 'emails-list__item__image'
  elImg.src = email.img

  let elFrom = document.createElement('p')
  elFrom.classList.add('emails-list__item__from')
  elFrom.textContent = email.from

  let elContent = document.createElement('p')
  elContent.className = 'emails-list__item__content'
  elContent.textContent = email.header
  liEl.append(elReadIcon, elImg, elFrom, elContent)

  listEl.appendChild(liEl)
}

function renderEmailList() {
  let mainEl = document.querySelector('main')
  if (mainEl === null) return
  mainEl.textContent = ''

  let titleEl = document.createElement('h1')
  titleEl.textContent = 'Inbox'

  let listEl = document.createElement('ul')
  listEl.className = 'emails-list'

  for (let email of state.emails) {
    renderEmail(email, listEl)
  }
  mainEl.append(titleEl, listEl)
}

function renderEmailDetails() {
  let mainEl = document.querySelector('main')
  if (mainEl === null) return
  if (state.selectedEmail === null) return

  mainEl.textContent = ''

  let backBtn = document.createElement('button')
  backBtn.textContent = 'BACK'
  backBtn.addEventListener('click', function () {
    deselectEmail()
    render()
  })

  let elTitle = document.createElement('h1')
  elTitle.textContent = state.selectedEmail.from

  let elImg = document.createElement('img')
  elImg.className = 'email-details__image'
  elImg.src = state.selectedEmail.img

  let elHeader = document.createElement('h2')
  elHeader.className = 'email-details__header'
  elHeader.textContent = state.selectedEmail.header

  let elContent = document.createElement('p')
  elContent.className = 'email-details__content'
  elContent.textContent = state.selectedEmail.content

  mainEl.append(backBtn, elTitle, elImg, elHeader, elContent)
}

function render() {
  if (state.selectedEmail) renderEmailDetails()
  else renderEmailList()
}

function runAtStart() {
  let elLogo = document.querySelector('.logo')
  if (elLogo) {
    elLogo.addEventListener('click', function () {
      deselectEmail()
      render()
    })
  }
}

runAtStart()
render()