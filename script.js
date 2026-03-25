// গল্পের ডাটাবেস (সহজেই নতুন গল্প যুক্ত করার ব্যবস্থা)
const stories = [
    {
        id: 1,
        title: "মহানবী (সা:) ও বুড়ির গল্প",
        icon: "🕋",
        content: "মক্কায় একজন বৃদ্ধা ছিলেন যিনি প্রতিদিন মহানবী (সা:)-এর চলার পথে কাঁটা ও ময়লা ফেলে রাখতেন। তিনি কখনো এর প্রতিবাদ করতেন না। একদিন পথে কোনো ময়লা না দেখে নবীজি (সা:) চিন্তিত হলেন এবং সেই বুড়ির খোঁজে তার বাড়িতে গেলেন। গিয়ে দেখলেন বুড়ি অসুস্থ। নবীজি (সা:) তার সেবা-যত্ন করলেন। এই মহানুভবতা দেখে বুড়ি ইসলাম গ্রহণ করলেন।",
        moral: "শত্রুর প্রতিও ক্ষমা ও দয়া প্রদর্শন করা উচিত।"
    },
    {
        id: 2,
        title: "হযরত সুলাইমান (আ:) ও ছোট্ট পিঁপড়া",
        icon: "🐜",
        content: "হযরত সুলাইমান (আ:) পশু-পাখি ও পতঙ্গের ভাষা বুঝতেন। একদিন তিনি তার বিশাল বাহিনী নিয়ে যাচ্ছিলেন। পথে একটি ছোট্ট পিঁপড়া তার সঙ্গীদের বলল, 'তাড়াতাড়ি গর্তে ঢুকে পড়ো, নাহলে সুলাইমানের বাহিনী তোমাদের পিষে ফেলবে!' সুলাইমান (আ:) এই কথা শুনে মুচকি হাসলেন এবং তার বাহিনীর গতিপথ পরিবর্তন করলেন যেন পিঁপড়াদের কোনো ক্ষতি না হয়।",
        moral: "ক্ষমতা থাকলেও দুর্বল প্রাণীর প্রতি সদয় ও যত্নশীল হতে হয়।"
    },
    {
        id: 3,
        title: "হযরত নূহ (আ:) ও বিশাল নৌকা",
        icon: "🚢",
        content: "আল্লাহর আদেশে হযরত নূহ (আ:) যখন একটি বিশাল নৌকা বানাচ্ছিলেন, তখন এলাকার মানুষ তাকে নিয়ে খুব হাসাহাসি করত। তারা বলত, 'এখানে তো নদী বা সমুদ্র নেই, নৌকা চলবে কোথায়?' কিন্তু তিনি কারো কথায় কান না দিয়ে ধৈর্য ধরে কাজ করে গেলেন। এরপর যখন মহাপ্লাবন এলো, তখন কেবল নৌকায় থাকা মানুষ ও প্রাণীরাই রক্ষা পেল।",
        moral: "মানুষ যাই বলুক, আল্লাহর ওপর বিশ্বাস রেখে ধৈর্য ধরে ভালো কাজ চালিয়ে যেতে হয়।"
    },
    // নতুন গল্প যুক্ত করতে এখানে কমা (,) দিয়ে উপরের মতো অবজেক্ট কপি করে বসান
];

// গল্পগুলো স্ক্রিনে দেখানোর ফাংশন
const storyContainer = document.getElementById('storyContainer');

stories.forEach(story => {
    const card = document.createElement('div');
    card.className = 'story-card';
    card.innerHTML = `
        <div class="story-icon">${story.icon}</div>
        <div class="story-title">${story.title}</div>
    `;
    card.onclick = () => openModal(story);
    storyContainer.appendChild(card);
});

// Modal Control Functions
function openModal(story) {
    document.getElementById('modalTitle').innerText = story.title;
    document.getElementById('modalBody').innerText = story.content;
    document.getElementById('modalMoral').innerText = story.moral;
    document.getElementById('storyModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('storyModal').style.display = 'none';
}

// PWA Install Button Logic
let deferredPrompt;
const installAppBtn = document.getElementById('installAppBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installAppBtn.style.display = 'block'; // বাটনটি দেখান
});

installAppBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installAppBtn.style.display = 'none';
        }
        deferredPrompt = null;
    }
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker Registered Successfully'));
}
