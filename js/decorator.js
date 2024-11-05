let head = document.head

let link = document.createElement('link')
link.rel="stylesheet"
link.href="/css/base.css"

let icon = document.createElement('link')
icon.rel="icon"
icon.type="image/x-icon"
icon.href="/assets/frozenblock/textures/favicon.ico"

head.appendChild(link)
head.appendChild(icon)
let header = document.getElementsByTagName('header')[0]

let preHeader = header.innerHTML === undefined ? '' : header.innerHTML

header.innerHTML = preHeader + `
    <nav><ul>
        <li><a class="button" href="/index.html"><strong>HOME</strong></a></li>
        <li><a class="button" href="/mods"><strong>MODS</strong></a></li>
        <li><a class="button" href="/about"><strong>ABOUT</strong></a></li>
        <li><a class="button" href="/wiki"><strong>WIKI</strong></a></li>
    </ul></nav>`

let footer = document.getElementsByTagName('footer')[0]
let preFooter = footer.innerHTML === undefined ? '' : footer.innerHTML

footer.innerHTML = preFooter + `
    <nav>
        <ul>
            <li><a class="button" href="https://discord.com/invite/frozenblock-modding-oasis-780746010614956112">
                <img src="/assets/frozenblock/textures/icons/discord.svg" alt="Discord">
            </a></li>
            <li><a class="button" href="https://github.com/FrozenBlock">
                <img src="/assets/frozenblock/textures/icons/github.svg" alt="GitHub">
            </a></li>
            <li><a class="button" href="https://x.com/FB_Oasis">
                <img src="/assets/frozenblock/textures/icons/x.svg" alt="X">
            </a></li>
            <li><a class="button" href="https://bsky.app/profile/frozenblock.bsky.social">
                <img src="/assets/frozenblock/textures/icons/bluesky.svg" alt="Bluesky">
            </a></li>
            <li><a class="button" href="https://www.youtube.com/@frozenblockmoddingoasis">
                <img src="/assets/frozenblock/textures/icons/youtube.svg" alt="Youtube">
            </a></li>
                <li><a class="button" href="https://modrinth.com/organization/frozenblocks">
            <img src="/assets/frozenblock/textures/icons/modrinth.svg" alt="Modrinth">
            </a></li>
        </ul>
    <p class="centered"><strong>FrozenBlock is not approved by nor affiliated with <a href="https://www.minecraft.net/en-us" style="text-decoration: none; color: orangered">Mojang Studios</a>.</strong></p>
</nav>`

