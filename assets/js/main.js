// Mobile menu toggle
const toggle = document.getElementById('nav-toggle')
const menu = document.getElementById('nav-menu')

if (toggle && menu) {
    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('show')
        toggle.setAttribute('aria-expanded', open)
    })
}

// Close menu when clicking a link
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        if (menu) menu.classList.remove('show')
        if (toggle) toggle.setAttribute('aria-expanded', 'false')
    })
})

// Close menu when clicking outside
document.addEventListener('click', e => {
    if (!menu || !toggle) return
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('show')
        toggle.setAttribute('aria-expanded', 'false')
    }
})

// Footer year
const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = new Date().getFullYear()

// Reveal on scroll (IntersectionObserver - no library needed)
const reveals = document.querySelectorAll('.reveal')

if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                io.unobserve(entry.target)
            }
        })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

    reveals.forEach(el => io.observe(el))
} else {
    reveals.forEach(el => el.classList.add('visible'))
}
