/* ============================================
   THE HYMNS BOOK - JAVASCRIPT
   All functionality: search, transpose, favorites, PWA
   ============================================ */

// ===== DATA: SAMPLE SONGS =====
const defaultSongs = [
    {
        id: 1,
        title: "Amazing Grace",
        category: "Worship",
        key: "G",
        lyrics: `[G]Amazing grace, how [C]sweet the [G]sound
That [D7]saved a wretch like [G]me
I [G]once was lost, but [C]now am [G]found
Was [D7]blind, but now I [G]see

[G]Twas grace that taught my [C]heart to [G]fear
And [D7]grace my fears re[G]lieved
How [G]precious did that [C]grace ap[G]pear
The [D7]hour I first be[G]lieved

[G]Through many dangers, [C]toils and [G]snares
I [D7]have already [G]come
Tis [G]grace hath brought me [C]safe thus [G]far
And [D7]grace will lead me [G]home`,
        notes: "Standard strumming pattern: D DU UDU. Capo optional."
    },
    {
        id: 2,
        title: "How Great Is Our God",
        category: "Praise",
        key: "C",
        lyrics: `[C]The splendor of the [Am]King, clothed in [F]majesty
Let all the [G]earth rejoice, all the [C]earth rejoice
[C]He wraps Himself in [Am]light, and darkness [F]tries to hide
And trembles [G]at His voice, trembles at His [C]voice

[C]How great is our [Am]God, sing with [F]me
How great is our [G]God, and all will [C]see
How great, how [Am]great is our [F]God [G]

[C]Age to age He [Am]stands, and time is [F]in His hands
Beginning [G]and the end, beginning and the [C]end
[C]The Godhead Three in [Am]One, Father, [F]Spirit, Son
The Lion [G]and the Lamb, the Lion and the [C]Lamb

[C]Name above all [Am]names, worthy [F]of all praise
My heart will [G]sing how great is our [C]God`,
        notes: "Medium tempo. Great for group worship. Capo 3 for original recording key."
    },
    {
        id: 3,
        title: "Silent Night",
        category: "Christmas",
        key: "G",
        lyrics: `[G]Silent night, [D7]holy night
[G]All is calm, [C]all is [G]bright
[C]Round yon virgin [G]mother and [Em]child
[G]Holy infant so [D7]tender and [G]mild
[C]Sleep in heavenly [G]peace
[D7]Sleep in heavenly [G]peace

[G]Silent night, [D7]holy night
[G]Shepherds quake [C]at the [G]sight
[C]Glories stream from [G]heaven a[Em]far
[G]Heavenly hosts sing [D7]Alle[G]luia
[C]Christ the Savior is [G]born
[D7]Christ the Savior is [G]born

[G]Silent night, [D7]holy night
[G]Son of God, [C]love's pure [G]light
[C]Radiant beams from [G]Thy holy [Em]face
[G]With the dawn of re[D7]deeming [G]grace
[C]Jesus Lord, at Thy [G]birth
[D7]Jesus Lord, at Thy [G]birth`,
        notes: "Slow and reverent. Use fingerpicking for a gentle feel."
    },
    {
        id: 4,
        title: "Divine Love Song",
        category: "Sinhala Hymns",
        key: "D",
        lyrics: `[D]Divine love's [Bm]song we [G]sing to[A]day
[D]With heavenly [Bm]love our [G]hearts we [A]fill

[G]Halle[A]lujah [D]love's sweet song
[G]With joy[A]ful hearts [D]we all sing

[D]Jesus the [Bm]King His [G]love shows [A]all
[D]His mercy [Bm]and grace [G]forever [A]stay

[G]Halle[A]lujah [D]love's sweet song
[G]With joy[A]ful hearts [D]we all sing`,
        notes: "Sinhala worship style. Strumming: D D UDU. Capo on 2nd fret optional."
    },
    {
        id: 5,
        title: "10,000 Reasons (Bless the Lord)",
        category: "Worship",
        key: "G",
        lyrics: `[G]Bless the [D/F#]Lord, O my [Em]soul, O my [C]soul
[G]Worship His [D]holy [C]name
[G]Sing like [C]never be[Em]fore, O my [C]soul
I'll [D]worship Your holy [G]name

[G]The sun comes [D/F#]up, it's a [Em]new day daw[C]ning
[G]It's time to [D]sing Your song a[C]gain
[G]Whatever may [D/F#]pass and what[Em]ever lies be[C]fore me
[G]Let me be [D]singing when the [C]evening comes

[G]Bless the [D/F#]Lord, O my [Em]soul, O my [C]soul
[G]Worship His [D]holy [C]name
[G]Sing like [C]never be[Em]fore, O my [C]soul
I'll [D]worship Your holy [G]name`,
        notes: "Medium tempo. Great for group worship. Capo 3 for original recording key."
    },
    {
        id: 6,
        title: "Old Rugged Cross",
        category: "Gospel",
        key: "G",
        lyrics: `[G]On a hill far a[C]way stood an [G]old rugged [D7]cross
The [G]emblem of [C]suffering and [D7]shame
And I [G]love that old [C]cross where the [G]dearest and [Em]best
For a [G]world of lost [D7]sinners was [G]slain

So I'll [D7]cherish the old rugged [G]cross
Till my [C]trophies at [G]last I lay [D7]down
I will [G]cling to the old rugged [C]cross
And ex[G]change it some [D7]day for a [G]crown

[G]To that old rugged [C]cross I will [G]ever be [D7]true
Its [G]shame and re[C]proach gladly [D7]bear
Then He'll [G]call me some [C]day to my [G]home far a[Em]way
Where His [G]glory for[D7]ever I'll [G]share`,
        notes: "Classic gospel hymn. Slow, heartfelt tempo. Great for reflection."
    }
];

// ===== CHORD DATA =====
const chords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const chordRegex = /\[([A-G][#b]?(?:m(?:aj)?7?|sus[24]?|add[249]|dim|aug|m?\d+)?)\]/g;

// ===== STATE =====
let songs = [];
let favorites = [];
let currentSong = null;
let currentTranspose = 0;
let currentFilter = 'all';
let currentSearch = '';

// ===== CATEGORY ICONS =====
const categoryIcons = {
    'Worship': '🙏',
    'Praise': '🎉',
    'Christmas': '🎄',
    'Sinhala Hymns': '🇱🇰',
    'Gospel': '✝️',
    'Other': '🎵'
};

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    // Load data from localStorage or use defaults
    loadSongs();
    loadFavorites();
    loadTheme();

    // Setup event listeners
    setupEventListeners();

    // Render initial views
    renderSongs();
    renderCategories();
    renderFeaturedSongs();
    updateStats();

    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);

    // Register service worker for PWA
    registerServiceWorker();
}

// ===== DATA MANAGEMENT =====
function loadSongs() {
    const stored = localStorage.getItem('hymns_songs');
    if (stored) {
        songs = JSON.parse(stored);
    } else {
        songs = [...defaultSongs];
        saveSongs();
    }
}

function saveSongs() {
    localStorage.setItem('hymns_songs', JSON.stringify(songs));
}

function loadFavorites() {
    const stored = localStorage.getItem('hymns_favorites');
    if (stored) {
        favorites = JSON.parse(stored);
    }
}

function saveFavorites() {
    localStorage.setItem('hymns_favorites', JSON.stringify(favorites));
}

function loadTheme() {
    const theme = localStorage.getItem('hymns_theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-icon').textContent = '☀️';
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Search
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        searchClear.classList.toggle('visible', currentSearch.length > 0);
        renderSongs();
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        searchClear.classList.remove('visible');
        renderSongs();
        searchInput.focus();
    });

    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            renderSongs();
        });
    });

    // Add song form
    document.getElementById('addSongForm').addEventListener('submit', handleAddSong);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(pageId)) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Special handling for specific pages
    if (pageId === 'favorites') {
        renderFavorites();
    } else if (pageId === 'categories') {
        renderCategories();
    } else if (pageId === 'home') {
        renderFeaturedSongs();
        updateStats();
    }
}

// ===== RENDER SONGS =====
function renderSongs() {
    const grid = document.getElementById('songsGrid');
    const noResults = document.getElementById('noResults');

    // Filter songs
    let filtered = songs.filter(song => {
        const matchesSearch = song.title.toLowerCase().includes(currentSearch);
        const matchesCategory = currentFilter === 'all' || song.category === currentFilter;
        return matchesSearch && matchesCategory;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    grid.innerHTML = filtered.map(song => createSongCard(song)).join('');
}

function createSongCard(song) {
    const isFav = favorites.includes(song.id);
    const preview = getLyricsPreview(song.lyrics);
    const icon = categoryIcons[song.category] || '🎵';

    return `
        <div class="song-card" onclick="viewSong(${song.id})">
            <div class="song-card-header">
                <h3 class="song-card-title">${escapeHtml(song.title)}</h3>
                <button class="song-card-favorite ${isFav ? 'active' : ''}" 
                        onclick="event.stopPropagation(); toggleFavorite(${song.id})"
                        aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                    ${isFav ? '❤️' : '🤍'}
                </button>
            </div>
            <span class="song-card-category">${icon} ${escapeHtml(song.category)}</span>
            <div class="song-card-key">Key: ${song.key}</div>
            <p class="song-card-preview">${escapeHtml(preview)}</p>
        </div>
    `;
}

function getLyricsPreview(lyrics) {
    // Remove chord brackets for preview
    const text = lyrics.replace(/\[[^\]]+\]/g, '').trim();
    return text.split('\n')[0].substring(0, 80) + (text.length > 80 ? '...' : '');
}

// ===== RENDER FEATURED SONGS (Homepage) =====
function renderFeaturedSongs() {
    const container = document.getElementById('featuredSongs');
    const featured = songs.slice(0, 3);
    container.innerHTML = featured.map(song => createSongCard(song)).join('');
}

// ===== RENDER CATEGORIES =====
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');

    // Get unique categories and count songs
    const categoryCounts = {};
    songs.forEach(song => {
        categoryCounts[song.category] = (categoryCounts[song.category] || 0) + 1;
    });

    const categories = Object.keys(categoryCounts).sort();

    grid.innerHTML = categories.map(cat => {
        const icon = categoryIcons[cat] || '🎵';
        return `
            <div class="category-card" onclick="filterByCategory('${escapeHtml(cat)}')">
                <div class="category-icon">${icon}</div>
                <h3 class="category-name">${escapeHtml(cat)}</h3>
                <p class="category-count">${categoryCounts[cat]} song${categoryCounts[cat] !== 1 ? 's' : ''}</p>
            </div>
        `;
    }).join('');
}

function filterByCategory(category) {
    currentFilter = category;

    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });

    showPage('songs');
    renderSongs();
}

// ===== RENDER FAVORITES =====
function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    const noFavorites = document.getElementById('noFavorites');

    const favSongs = songs.filter(song => favorites.includes(song.id));

    if (favSongs.length === 0) {
        grid.innerHTML = '';
        noFavorites.style.display = 'block';
        return;
    }

    noFavorites.style.display = 'none';
    grid.innerHTML = favSongs.map(song => createSongCard(song)).join('');
}

// ===== VIEW SONG =====
function viewSong(songId) {
    const song = songs.find(s => s.id === songId);
    if (!song) return;

    currentSong = song;
    currentTranspose = 0;

    const container = document.getElementById('songViewContainer');
    const isFav = favorites.includes(song.id);
    const icon = categoryIcons[song.category] || '🎵';

    container.innerHTML = `
        <a href="#songs" class="back-btn" onclick="showPage('songs')">
            ← Back to Songs
        </a>

        <div class="song-view-header">
            <h1 class="song-view-title">${escapeHtml(song.title)}</h1>
            <div class="song-view-meta">
                <span class="song-view-category">${icon} ${escapeHtml(song.category)}</span>
                <span class="song-view-key">Original Key: ${song.key}</span>
            </div>
            <div class="song-view-actions">
                <div class="transpose-controls">
                    <button class="transpose-btn" onclick="transpose(-1)" aria-label="Transpose down">−</button>
                    <span class="transpose-label" id="transposeLabel">Key: ${song.key}</span>
                    <button class="transpose-btn" onclick="transpose(1)" aria-label="Transpose up">+</button>
                </div>
                <button class="btn btn-small ${isFav ? 'btn-primary' : 'btn-secondary'}" 
                        onclick="toggleFavorite(${song.id}); updateSongViewFavorite(${song.id})">
                    ${isFav ? '❤️ Favorited' : '🤍 Favorite'}
                </button>
            </div>
        </div>

        <div class="song-view-lyrics">
            <div class="lyrics-content" id="lyricsContent">
                ${renderLyrics(song.lyrics, 0)}
            </div>

            ${song.notes ? `
                <div class="song-view-notes">
                    <h4>📝 Notes</h4>
                    <p>${escapeHtml(song.notes)}</p>
                </div>
            ` : ''}

            ${song.fileUrl ? `
                <div class="song-view-file">
                    <p>📎 <a href="${song.fileUrl}" target="_blank">View Attached Hymn Sheet</a></p>
                </div>
            ` : ''}
        </div>
    `;

    showPage('songView');
}

function updateSongViewFavorite(songId) {
    const isFav = favorites.includes(songId);
    const btn = document.querySelector('.song-view-actions .btn-small');
    if (btn) {
        btn.className = `btn btn-small ${isFav ? 'btn-primary' : 'btn-secondary'}`;
        btn.innerHTML = isFav ? '❤️ Favorited' : '🤍 Favorite';
    }
}

// ===== RENDER LYRICS WITH CHORDS =====
function renderLyrics(lyrics, transposeSteps) {
    const lines = lyrics.split('\n');

    return lines.map(line => {
        if (line.trim() === '') {
            return '<br>';
        }

        // Replace chord brackets with styled spans
        const processedLine = line.replace(chordRegex, (match, chord) => {
            const transposed = transposeChord(chord, transposeSteps);
            return `<span class="chord">[${transposed}]</span>`;
        });

        return `<div class="lyrics-line">${processedLine}</div>`;
    }).join('');
}

// ===== CHORD TRANSPOSITION =====
function transpose(direction) {
    if (!currentSong) return;

    currentTranspose += direction;

    // Clamp between -6 and +6
    if (currentTranspose > 6) currentTranspose = 6;
    if (currentTranspose < -6) currentTranspose = -6;

    // Update lyrics
    const lyricsContent = document.getElementById('lyricsContent');
    if (lyricsContent) {
        lyricsContent.innerHTML = renderLyrics(currentSong.lyrics, currentTranspose);
    }

    // Update key label
    const originalIndex = chords.indexOf(currentSong.key);
    let newIndex = originalIndex + currentTranspose;

    // Wrap around
    while (newIndex < 0) newIndex += 12;
    while (newIndex >= 12) newIndex -= 12;

    const newKey = chords[newIndex];
    const label = document.getElementById('transposeLabel');
    if (label) {
        label.textContent = `Key: ${newKey}`;
    }
}

function transposeChord(chord, steps) {
    // Extract root note and suffix (e.g., "Am7" -> "A" + "m7")
    const match = chord.match(/^([A-G][#b]?)(.*)$/);
    if (!match) return chord;

    const root = match[1];
    const suffix = match[2];
    const rootIndex = chords.indexOf(root);

    if (rootIndex === -1) return chord;

    let newIndex = rootIndex + steps;
    while (newIndex < 0) newIndex += 12;
    while (newIndex >= 12) newIndex -= 12;

    return chords[newIndex] + suffix;
}

// ===== FAVORITES =====
function toggleFavorite(songId) {
    const index = favorites.indexOf(songId);

    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Removed from favorites');
    } else {
        favorites.push(songId);
        showToast('Added to favorites');
    }

    saveFavorites();
    updateStats();

    // Re-render current view
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        if (activePage.id === 'songs') renderSongs();
        if (activePage.id === 'favorites') renderFavorites();
        if (activePage.id === 'home') renderFeaturedSongs();
    }
}

// ===== ADD NEW SONG =====
function handleAddSong(e) {
    e.preventDefault();

    const title = document.getElementById('songTitle').value.trim();
    const category = document.getElementById('songCategory').value;
    const key = document.getElementById('songKey').value;
    const lyrics = document.getElementById('songLyrics').value.trim();
    const notes = document.getElementById('songNotes').value.trim();
    const fileInput = document.getElementById('songFile');

    if (!title || !category || !lyrics) {
        showToast('Please fill in all required fields');
        return;
    }

    const newSong = {
        id: Date.now(),
        title,
        category,
        key,
        lyrics,
        notes: notes || undefined
    };

    // Handle file upload (store as data URL)
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        if (file.size > 5 * 1024 * 1024) {
            showToast('File too large. Max 5MB allowed.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            newSong.fileUrl = e.target.result;
            newSong.fileName = file.name;
            finalizeAddSong(newSong);
        };
        reader.readAsDataURL(file);
    } else {
        finalizeAddSong(newSong);
    }
}

function finalizeAddSong(newSong) {
    songs.push(newSong);
    saveSongs();

    // Reset form
    document.getElementById('addSongForm').reset();

    showToast('Song added successfully!');

    // Update views
    renderSongs();
    renderCategories();
    renderFeaturedSongs();
    updateStats();

    // Go to songs page
    showPage('songs');
}

// ===== THEME TOGGLE =====
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.querySelector('.theme-icon');

    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        icon.textContent = '🌙';
        localStorage.setItem('hymns_theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        icon.textContent = '☀️';
        localStorage.setItem('hymns_theme', 'dark');
    }
}

// ===== STATS =====
function updateStats() {
    document.getElementById('totalSongs').textContent = songs.length;

    const uniqueCategories = new Set(songs.map(s => s.category));
    document.getElementById('totalCategories').textContent = uniqueCategories.size;

    document.getElementById('totalFavorites').textContent = favorites.length;
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ===== ESCAPE HTML =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== PWA SERVICE WORKER =====
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW registered:', reg.scope))
            .catch(err => console.log('SW registration failed:', err));
    }
}
