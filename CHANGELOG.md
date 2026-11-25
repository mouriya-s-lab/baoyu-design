# Changelog

English | [中文](./CHANGELOG.zh.md)

All notable changes to `baoyu-design` are tracked in this file.

## 2.15.2 - 2026-11-12

### Features
- **`claude-design`: see a page at another screen width, and save the whole page at that width as a PNG.** Open an artboard full window (the toolbar's **Play**, then the artboard) and pick **Fill**: next to Fill/Fit is a width control. It follows the window, or lays the page out at Phone 390, Tablet 768, 1024, 1280, 1440 or 1920 px (and the artboard's own width when it is none of these), centred, and scaled down to fit when wider than the window, with the scale shown beside the width. Whenever that width is not the artboard's own, the artboard's **Export** offers **PNG 1×, this width** and **PNG 2×, this width**: the whole page laid out at that width, as tall as its content, saved as `<name>-<width>w@<scale>x.png`. `SKILL.md` tells the agent to point users there when they ask for a page at a screen width or a full-page screenshot (requested by @hh0592821, [#42](https://github.com/JimLiu/baoyu-design/issues/42)).

## 2.15.1 - 2026-11-12

### Fixes
- DeepSeek Harness: the **Artifacts** page showed one artifact to a row, each card as wide as the page. Since 2.14.1 a style meant for one card's drawing also applied to the whole list. The list is a grid of cards again.
- DeepSeek Harness: a plugin that was added from a folder and later uninstalled got no tile under **Make something new**, and the page could not install it. Its files stay in the profile after the uninstall, and the page took them for a plugin that is installed and switched off. The page now goes by what the app's plugin manager counts as installed, so the plugin gets its **Not installed** tile and installs from there.

## 2.15.0 - 2026-11-11

### Features
- **`claude-motion` follows claude.ai's 2026-11-10 update.** A film that has a `narration.js` but no voice track of its own gets a **Voiceover** section under Tweaks in the side panel and a voiceover lane under the timeline. Change a line and click **Record changes**: the edit reaches the agent as a request (`comments --wait` prints it under `requests`; with no agent listening, the text is there to copy). A film with a voice track of its own (`modules/voice.json`) keeps its **Script** tab and lanes. `write-db` now refuses to write the records the page keeps of what you set by hand (`modules/retyped.json`, `recolored.json`, `recut.json`, `refaced.json`, `retouched.json`, `fetched-fonts.json`) and says `PAGE_ONLY`.
- **`claude-design-system` follows claude.ai's 2026-11-10 update.** Edits are saved as soon as the page is hidden (you switch tabs, say) instead of waiting for the autosave. A toast you close hands the focus back to where it was, and F6 reaches it.
- **`claude-slides` follows claude.ai's 2026-11-10 update.** A slide that can't be read, or whose markup may be partly hidden, says so on the slide and in the inspector, with **Ask the agent to fix** (with no conversation listening it copies a prompt to paste). A selected SVG image can't be set to Cover or Hug, and the inspector says why: it would change when the presentation reopens. While presenting, a swipe that starts on the page-number strip no longer turns the slide. A `deck.json` with a `format` this version doesn't know opens read-only, with a banner that it was saved by a newer version of Slides, and is not rewritten. Tables are saved with a wrapper for each row and with table, row and cell roles, so columns line up and screen readers read them as tables.
- **Every editor draws Markdown in comments.** Markdown in a comment or an agent's reply (bold, code, lists, quotes and so on) is drawn, not shown as characters; the **All comments** list keeps each row to flat text. The new-comment card shows a focus ring while you type in it.
- **DeepSeek Harness: the Artifacts page's type tiles follow claude.ai's "Make something new" row.** Each type is a tile with a pastel wash and a chalk doodle (dark mode swaps wash and ink), with redrawn type icons and a Beta badge on Data, Whiteboard and Motion. Rest the pointer on a tile, or Tab to it, and a card shows the type's name, what it makes and whether it is installed, with a button to start one, install it, or see the install. Escape closes the card; touch skips it.

### Fixes
- `claude-slides`: its third-party licenses notice now carries the OfficeGen attribution that pptxgenjs's source header names.

### Documentation
- `claude-motion`'s `SKILL.md` and reference follow the same update. The agent ends with the film's url. A film for a loop, a GIF or a lobby screen has no score unless one is asked for. A request that says both what the film is for and how it should look skips the questions form. Plain films start from Inter and Space Grotesk. `by-hand.md` covers the page's records of lines retyped and colors set by hand.

## 2.14.1 - 2026-11-11

### Features
- **DeepSeek Harness: open your work from another device.** When Harness runs on one computer and you use it from another (`dsh web` on a server, opened in a browser on your laptop or phone over the same network or a tailnet), opening an item from **Artifacts**, or **View thread** on a comment card, gave a `http://127.0.0.1:…` link that only that computer can open. The plugin now gives the device you are on a link of its own, at the address your browser reaches Harness by, and opens it in a new tab. Through it you are the editor's owner, as on that computer: you edit, and **Send to Agent** is there. Behind a proxy or a domain of your own, set `BAOYU_DESIGN_REMOTE_HOST` to the address other devices reach that computer at; `off` turns this off. Every editor's `open` takes `--remote[=<host>]` to print that owner's link (`--remote=off` closes it), and `share <folder> --reset owner` replaces its key. See [Use it from another device](https://github.com/JimLiu/baoyu-design/blob/main/dsh-plugins/README.md#use-it-from-another-device) (requested by @akaDeyve, [#40](https://github.com/JimLiu/baoyu-design/issues/40)).
- **DeepSeek Harness: `dsh-claude-dashboard` updates to `dsh-claude-data`.** The Artifacts page names the type **Data**, and offers an installed `dsh-claude-dashboard` as an update, `claude-dashboard → claude-data`: **Update** installs `dsh-claude-data`, switched on or off as the old one was, then uninstalls `dsh-claude-dashboard`. A preset that names `dsh-claude-dashboard` keeps it, and the page says what to change. 2.14.0 said `dsh-claude-dashboard` would get no more updates; instead it keeps getting releases with no skill in them. An Artifacts page from 2.13.0 or earlier offers that release as an update, and it brings the page that offers the move, so click **Update** once more when the move shows.

### Fixes
- `claude-design-system`: a guest on a **Share** link could not add an asset or a font. The page stayed at **Adding …**, because a page served over plain http on the network lacks the browser's hashing that the upload used. It now hashes the file itself.
- DeepSeek Harness: uninstalling the plugin that was running the Artifacts page left the page at a 404 until the app restarted. Another installed plugin now takes it over at once.

## 2.14.0 - 2026-11-11

### Features
- **`claude-dashboard` is now `claude-data`.** claude.ai renamed the type to Data, and the skill, its DeepSeek Harness plugin (`dsh-claude-data`) and its ChatGPT and Codex plugin (**Baoyu Data**) follow. Call it as `/claude-data` (`$claude-data` in Codex). A dashboard made with `claude-dashboard` opens in `claude-data` as it is, with the same folder; its address is now `/data/<id>/` instead of `/dashboard/<id>/`. `dsh-claude-dashboard` and **Baoyu Dashboard** get no more updates: install `dsh-claude-data` (the **Artifacts** page offers it as a **Not installed** tile) or **Baoyu Data**, then remove the old one. On the Artifacts page, dashboards opened before the rename are listed with the new kind and still open, and comments sent from a dashboard reach the agent through `dsh-claude-data` (the copy of `dsh-claude-data` put on npm on its own before this release lacked both, because the Host plugin it came with did not know the new name).
- **`claude-data` follows claude.ai's 2026-11-10 update.** A dashboard's toolbar now has a **Design** button. It shows the look in use and a new **Style** section: chart colors, page color, font, corners and text size. A change shows on the page at once and is kept with **Save**; **Reset all** goes back to the defaults. A dataset can be a text file (`format: "text"`), which the page turns into rows with a loader. `dash/meta` takes the page's language (`lang`). `check` also reports what the open page found when it checked itself (`pageCheck`: passed, failed with what went wrong, or still loading) beside the page's `runs`.
- **`claude-design` follows claude.ai's 2026-11-10 update.** Pen, Line and Arrow have a **Drawing options** bar: four stroke weights, and solid, dashed or dotted lines. An artboard's export menu has **All artboards (.png)**, a zip with one PNG per artboard on the page. When the canvas's saved layout is damaged, the canvas turns read-only with a banner and an **Ask the agent to fix** button, and comes back on its own once the file is fixed. A new reference, `shaders.md`, is how the agent makes a shader artboard (WebGL, or anything that moves like light, water, smoke or liquid).

### Fixes
- `claude-design`: artboards ran React's development build (1.1 MB), which printed warnings such as `Invalid DOM property vector-effect` for drawn lines. They now run the production build (354 KB).
- `claude-design`: when two tabs changed the same artboard and you chose **Keep both**, the copy was put 80 px right of the original, where it could cover another artboard. It now goes in the first free spot right of that row.
- In every editor, Escape pressed while the keyboard is in the comments layer (on the comments button, say) now ends comment mode, as it does on the page.

### Documentation
- `claude-data`'s `SKILL.md` and reference follow the same update: what runs where (each reader's browser loads the datasets, and Sources shows where every number came from), what a page's code may write and when, and how `check` and `runs` report a page that went wrong.

## 2.13.0 - 2026-11-10

### Features
- **Whiteboard is released.** `claude-whiteboard` lays out thinking on a board: a diagram, a flow, a map of ideas, a plan, a comparison or a drawn explanation. The agent writes it as elements (sections, blocks joined by arrows, text, tables, sticky notes, drawings and small working embeds) into the board's own store, and you watch them land in the local board editor. There you move and resize things, type, draw with the pen, and add sections, sticky notes, shapes and stickers from the toolbar, and the agent sees what you changed. Comment on an item, a spot or an area and send it to the agent, which changes the board and replies. **Share** opens the board to your local network with a link per role, everyone on a link sees the others' cursors and changes live, and its Export tab downloads the whole folder as a zip. **History** lists the versions. One server serves every board on the computer. Needs Node 22+. The board's own assistant on claude.ai (the Ask box, cursor chat, read-aloud and dictation) is not available locally; ask the agent in your conversation instead.
- DeepSeek Harness: the new `dsh-claude-whiteboard` plugin. Comments sent from a board reach the agent, and boards are listed on the **Artifacts** page with a picture of the board, where they can be renamed like the other kinds.
- ChatGPT and Codex: the new **Baoyu Whiteboard** plugin in the baoyu-design marketplace.

## 2.12.3 - 2026-11-10

### Fixes
- **`claude-design`: `check` now catches a canvas title placed too close above its row.** An artboard's name strip keeps its size on screen while a title (`title1`) scales with the canvas, so a title 140 px above its row looked fine at 100% but covered the artboards' names once zoomed out below about 50%. `SKILL.md` already asked for at least 223 px. `check` now reports a title of 72 px or more that is closer than that to the artboards under it, or that sits over one: one issue per title, with the `y` to move it to. Text the user adds with the editor's text tool is left alone, wherever it is (contributed by @congee949, [#38](https://github.com/JimLiu/baoyu-design/pull/38)).

## 2.12.2 - 2026-11-09

### Features
- **`claude-design`: Export → HTML for Figma.** Capturing the canvas, or the Standalone web page, with Figma's Chrome extension brought the artboards in as empty boxes, because each artboard is drawn inside a frame the extension does not look into. **HTML for Figma** (in the toolbar's Export, an artboard's Export and the Share panel's Export tab) saves `<title>.figma.html`: every artboard's rendered layers, placed where they are on the canvas, with their styles, fonts and images inside the file, and no frames and no scripts. Open it in Chrome and capture it with Figma's extension (**Capture page**, or **Select element** for one artboard). In an artboard's own Export it is that artboard alone. `SKILL.md` tells the agent how to answer when asked to bring a design into Figma (reported by @mufanmu, [#36](https://github.com/JimLiu/baoyu-design/issues/36)).

### Fixes
- **`claude-design`: PNG export no longer draws some icons as black or solid blocks.** An SVG icon drawn with `<use>` lost the `fill: none` and `stroke: currentColor` its class gave it, and came out filled in black; it now takes the colour of the `<use>`. An icon cut out with a CSS `mask-image` (on an element or on `::before` and `::after`) was drawn as a solid block because the mask's file was not in the exported image; masks are now embedded like background images (reported by @hh0592821, [#35](https://github.com/JimLiu/baoyu-design/issues/35)).
- **`share` gives out the Wi-Fi's address first on a computer with a VPN, a proxy or a hotspot.** On Windows the links could start with the address of a proxy's virtual adapter (a sing-box TUN named `falemon-tun`, `172.19.0.1`), which nobody else on the network can reach. Addresses of adapters named like a tunnel (`falemon-tun`, OpenVPN's TAP, Wintun, anything with `vpn` in its name), of point-to-point links, and of networks this computer makes itself (the Mobile Hotspot's `192.168.137.1`, a virtual machine's or container's network) now come after the local network's. When a computer is on more than one network, `share` says that a link that does not open can be tried with another of the listed addresses (reported by @Bistard, [#37](https://github.com/JimLiu/baoyu-design/issues/37)).
- **`open` no longer says the port is in use when a firewall or proxy filters `::1`.** A probe refused with `EACCES` or `EPERM` counted as an answer from something on the port, so `open` gave up on all 100 ports it tries.
- A page whose skill folder was moved, renamed or removed while its server ran now says so, and names the folder to the owner, instead of telling them to reinstall the skill. A guest is told to ask whoever shared it.

## 2.12.1 - 2026-11-07

### Fixes
- **A long comment thread no longer runs off the bottom of the window.** The open card used to have no height limit, so the last replies and the reply box could be out of reach. In every editor it now stops at 60% of the window (never under 320px, and never taller than the room on the side it opens toward). The comments scroll inside it and the reply box stays below. After you reply, the thread follows to your reply; a long reply from the agent lines up at its top, and scrolling up stops the following (reported by @congee949, [#34](https://github.com/JimLiu/baoyu-design/issues/34)).
- **`claude-design` and `claude-slides` opened on their own now keep the address bar on where you are.** Under `open` or DeepSeek Harness's browser there is no claude.ai frame to do it, so switching pages or slides left the address as it was, a pasted `#page-…` or `#slide-…` link did nothing once the page had loaded, and **Copy link to page** and **Copy link to slide** could not copy. In `claude-design` the address now names the page, switching to another page adds a history entry (up to 20), and Back and Forward move between them. In `claude-slides` the address follows the current slide without filling the history. Both follow a changed address to its place, and the copy shortcuts copy the page's address with the place in it and say **Link copied.** On claude.ai nothing changes. This is the address part of [#33](https://github.com/JimLiu/baoyu-design/issues/33), reported by @congee949; the previous/next page buttons and page keys it asks for are not in this release.

## 2.12.0 - 2026-11-06

### Features
- **Comments, in every editor, follow claude.ai's comment layer more closely.** A thread whose pin is out of the window gets a **More comments** tab with its count at that edge instead of a pin, and a click opens the nearest one. Pins on the same spot sit side by side. The **All comments** panel has **Send all to Agent**, which gives the agent every thread at once (`comments --wait` returns them together). An edited message says **edited**, a resolved thread says **Reply to reopen…**, and the panel has an empty state and, when the filter hides everything, **Show N resolved**.
- **`claude-slides`, `claude-design`, `claude-design-system`, `claude-dashboard` and `claude-motion` follow claude.ai's 2026-11-05 update.** In all five: a button shows that it is working while its action runs, a dialog gives focus back to where it was, toasts can be reached from the keyboard, tabs have an underline style, and the icon set has 34 more icons. Properties can be copied and pasted in slides, design and the dashboard's edit mode.
- `claude-slides`: speaker notes can be edited in the Canvas view, and the presentation has jump keys (Home, End).
- `claude-design`: grid cells can be dragged and moved with the keyboard, and a tall artboard's PDF export is split across pages.
- `claude-design-system`: a system holds up to 4,096 files a version, 4,080 of them its own (1,024 before), and `agent.md` and `gemini.md` are refused as file names, like `claude.md` and `agents.md`.
- `claude-dashboard`: an attached file can be up to 15 MiB, a document written by the agent carries an `edit` stamp the page reads, and `check` knows the new rules for `dash/look`.
- `claude-motion`: `check` warns about a module named `scene-…` or `layer-…`, which are the player's own names.

### Documentation
- Every editor's `SKILL.md` and reference follow the same update. `claude-slides` and `claude-design` choose typefaces from the brief and the subject, Inter with Space Grotesk when it is neutral. `claude-dashboard` has new looks and questions pages and reworked pages on data sources, features, design systems and reading aloud.
- `claude-motion` is reworked: a new film is asked about before anything is made, a film left half-way is taken up again on a later turn instead of started over, a named design system is read before the first scene, and a few kinds of film are refused (for or against a political party, candidate or ballot measure; a promo for gambling or a crypto coin, token or exchange; a fight or combat scene). New reference pages cover each.

## 2.11.1 - 2026-11-05

### Features
- **DeepSeek Harness: the Artifacts page offers the plugins you haven't installed.** Beside the tiles for the skills you have, each other baoyu-design plugin gets a dimmed tile marked **Not installed**. Click it to see what the plugin makes and install it from there, at the same version as the ones you have, usually without a restart. Once it's in, **Start** opens a session with the skill. In an app that can't install from the page, the tile points you to the Plugins page. A plugin you installed and switched off still gets no tile.

### Fixes
- With `--agent-hook`, a comment could reach the agent twice: a second send could start the hook again after the first run had finished but before the comment was marked sent.

## 2.11.0 - 2026-11-05

### Features
- **DeepSeek Harness: a new version no longer pops up over the app.** The **Artifacts** row in the left sidebar gets an **Update** label instead (a dot on the icon, where a collapsed sidebar keeps its icons), and a panel at the top of the Artifacts page shows the versions, each plugin and what the release changes. **Update all** updates them together; **Update** on a plugin's line takes just that one. **Later** folds the panel to one line and removes the label until the next version.
- While an update runs you can leave the Artifacts page: the label says **Updating**, **Failed** or **Restart**. **Try again** picks up where it stopped: the rest after **Update all**, that plugin after its own **Update**.
- The **Update** button on a plugin's page now updates only that plugin, and a page that was open when its plugin was replaced comes back by itself.

## 2.10.1 - 2026-11-05

### Fixes
- DeepSeek Harness 0.2.2 has its own plugin updates, so a plugin's page showed two update buttons and two tags, the app's and the plugin's. It now shows one: the app's for a plugin the card hasn't updated, the plugin's own for one it has.
- The one-click update looks again at what there is to update before it starts, so a plugin the app's button just updated isn't tried again. When the reply to an update is lost, the card no longer says the plugin stayed on its version: it asks you to check on the Plugins page.
- The [how-to](dsh-plugins/README.md#if-something-doesnt-work) says what to do when the app's own **Update to x** fails on the second of two plugins and switches it off, and that 2.9.2 and earlier can use that button on DeepSeek Harness 0.2.2 instead of updating by hand.

## 2.10.0 - 2026-11-05

### Features
- **The DeepSeek Harness plugins update in one click.** When a new version is out, the app offers it: a card at the bottom right, a line at the top of the **Artifacts** page, and an **Update** button on each plugin's page. One click updates the plugins together, with nothing to uninstall, and most updates need no restart. If an update fails, the plugin stays on the version it was. A plugin added from a folder isn't offered one. This starts with 2.10.0, so 2.9.2 and earlier need [one last update by hand](dsh-plugins/README.md#update).
- **DeepSeek Harness: a skill can be kept to one agent preset.** Turn off the plugin's own row and declare the plugin in the preset, and `/` lists the skill only in that preset's sessions. The **Artifacts** page and comments keep working, through a new package, `dsh-claude-artifacts`, that each plugin installs with it. See [how to set it up](dsh-plugins/README.md#keep-a-skill-to-one-preset).

### Fixes
- `archive` and the **Whole folder** export zipped `.git`, including the remote's address and any token in it, and that zip is what gets sent to other people. `.git` now stays out, at any depth.
- An artifact folder's default `.gitignore` took `exports/` (a film's MP4 too) and two of the three temp file shapes into git, and its `history/` rule also matched a project's own folder of that name, which git then dropped. `history/` and `exports/` now match only at the top of the folder.
- `share` could give out a TUN proxy's address, such as sing-box's `172.19.0.1`, first when the system lists it first. It now skips an address that answers at every port, and lists tunnels after the local network.
- Design's Standalone export: a `#id` link did nothing when the file was opened directly, and over `http://` it also scrolled the page around the frame. A click now scrolls inside the frame only, as Play does.

## 2.9.2 - 2026-11-04

### Fixes
- DeepSeek Harness on Windows: the command the skills told the agent to run was written for a POSIX shell, and PowerShell reads a quoted path at the start of a line as a string, not a command. On Windows they now give `& '<node>' '<script>' <command>`, and say that PowerShell has no heredoc.

## 2.9.1 - 2026-11-04

### Fixes
- DeepSeek Harness on Windows: the plugins only recognized a shell tool named `bash`, and on Windows it is named `pwsh`, so they never noticed an `open`. The folder stayed off the **Artifacts** page, **Send to Agent** never appeared, and comments did not reach the agent. They now recognize both names (by @leil894-collab, [#31](https://github.com/JimLiu/baoyu-design/pull/31); reported by @EmotionTowel, [#30](https://github.com/JimLiu/baoyu-design/issues/30)).

## 2.9.0 - 2026-11-03

### Features
- **ChatGPT plugins.** The skills now also come as plugins for the ChatGPT desktop app and Codex: Baoyu Slides, Baoyu Canvas, Baoyu Design System, Baoyu Dashboard, Baoyu Motion (with `motion-director` and `dataviz`) and Baoyu Dataviz. This repository is their marketplace: run `codex plugin marketplace add JimLiu/baoyu-design --sparse .agents/plugins --sparse chatgpt-plugins`, then install the ones you want. [chatgpt-plugins/README.md](chatgpt-plugins/README.md) has the steps.
- DeepSeek Harness: each deck, canvas, design system, dashboard and film on the **Artifacts** page now has a real thumbnail, taken from its own editor and retaken when its files change. This needs the desktop app; in `dsh web` a card keeps a drawn picture of its type.
- The **Artifacts** page's tiles and **+** menu start a new session with the input filled in, such as `/claude-slides Make me a slide deck about: `, and sending it loads that skill. Only plugins that are on get a tile.
- The **Artifacts** page has grid and list views, search, sorting (last opened, last edited, date created, name) and filters (type, date opened, sharing, pinned).
- Each card on the **Artifacts** page has a menu to pin, rename, copy the link or delete. Rename changes the title in the artifact itself, so its editor shows the new name. Delete moves the folder to `baoyu-design/trash/` in the app's data folder, with an Undo; a folder that also holds other files stays where it is and only leaves the list.

### Fixes
- In a sandbox that blocks local network, such as Codex's default one, `open` said `PORT_IN_USE`, as if every port were taken. It now says `NETWORK_BLOCKED` and how to run the command, and the skills say which commands need local network.

## 2.8.2 - 2026-11-02

### Fixes
- `claude-slides`: in a PowerPoint export, Chinese, Japanese or Korean text could show as boxes when its East Asian font was missing on the reader's computer or held none of those characters: Arial in the basic-fonts export, a Latin family, or an embedded subset that left characters out of a long deck. That text now names a font Windows and Office have instead (Microsoft YaHei, Microsoft JhengHei, Yu Gothic or Malgun Gothic). Text the embedded font holds, text without these characters and the Google Slides export are unchanged ([#29](https://github.com/JimLiu/baoyu-design/issues/29)).

## 2.8.1 - 2026-11-02

### Fixes
- `claude-slides`, `claude-design`, `claude-design-system`, `claude-dashboard`: their descriptions no longer send one-off HTML work to the `baoyu-design` skill, which is archived and no longer installed. They now only say what each skill is not for. The DeepSeek Harness plugins carry the same descriptions.

## 2.8.0 - 2026-11-02

### Features
- **Motion is released.** `claude-motion` makes animated films: the agent writes each scene as code into the film's folder while you watch it fill in the local player, then you retype lines, drag scene lengths, change the style in **Tweaks**, comment on a moment and send it to the agent, share it on the network and go back through its History. Export MP4 or GIF from the player, or `export` from the command line with Chrome, no page open.
- Long narrated films: up to 900 s and 40 scenes, with a voice track of one take a scene. `voice` makes the takes with a speech provider of yours (`voice --providers` says which are ready), `--take` / `--takes` adopts ones made elsewhere, and `align`, `sync` and `beats` time scenes and motion to the words. Captions follow the voice, with CJK-aware line breaks, and `captions` or `export --captions` writes them as a subtitle file. A **Script** tab in the Tweaks panel edits the lines, and the voice lane draws each take's wave.
- Sound and footage: `score` reports what the film plays and how loud it is, `S.bed` plays a recorded music bed under the film, `music` measures a track and `arrange` cuts one to the film, and `export --audio-only` renders the mix in seconds. `record` films a page of your own product as a clip (needs ffmpeg), `stills` gives the frames at chosen moments, and `import-explainer` brings an explainer project in as a film.
- **`motion-director`** is a new skill that directs a film with something to say: it finds the point and the picture that carries it, writes the narration for the ear, has it voiced, times every scene to the words, reviews the frames as a viewer would, and hands the film over in its player. It needs `claude-motion` beside it.
- DeepSeek Harness: the new `dsh-claude-motion` plugin. Comments and the player's **Continue**, **Finalize**, **Make the animation** and **Ask Agent** buttons reach the agent, and films are listed on the **Artifacts** page.
- All the open artifacts of a kind now share one server and one port, instead of a port each: every page has its own address, such as `http://127.0.0.1:4710/slides/<id>/`, which stays the same from one start to the next. The server's root lists what is open, and the server ends with the last one. Sharing stays per artifact, and share links gain the same path, so links from an earlier version stop working.

### Fixes
- `share <root> --disable`, `--enable`, `--reset` and `--role` no longer open the page to the network. They used to turn sharing on whenever it was off, so disabling a link right after `--off` put the page back on the network. Only `share <root>` with no options opens it now; with no server running, the link options change the links without starting one.

## 2.7.2 - 2026-11-02

### Features
- Slides and design: an installed design system now says when it has fallen behind the system it was copied from, and can be copied again. The **Theme** tab shows `Behind its source: N files changed` with a **Sync** button (the owner's), which updates the open page at once. `artifact.mjs ds-sync <root> [<folder>] [--check]` does the same from the command line, and `check` notes a copy that is behind. A system's new files are not copied, and a file it dropped stays in the copy ([#26](https://github.com/JimLiu/baoyu-design/issues/26)).
- A source given as a relative path is found from the working directory, the artifact's folder and the folders above it, so the comparison also works in an editor reopened from another folder, such as the DeepSeek Harness **Artifacts** page. When the source cannot be found, the Theme tab says so.

## 2.7.1 - 2026-11-02

### Fixes
- DeepSeek Harness: the **Artifacts** page and the comments wait no longer depend on how the agent spells the command. An `open` run through a shell variable (`"$SKILL/scripts/artifact.mjs" open …`), after a `cd`, or from the copy of the skill the workspace carries in `.agents/skills/` or `.dsh/skills/`, is now recorded and starts the comments wait. Before, none of these were, so the card never showed and **Send to Agent** comments went nowhere without a word ([#27](https://github.com/JimLiu/baoyu-design/issues/27)).
- Running `open` again on an editor that is already running prints its `log` and `stop` lines, as the first `open` does.

## 2.7.0 - 2026-11-02

### Features
- Share has an **Export** tab. It lists everything the page can be downloaded as, in rows with an icon and a description (slides: PDF, HTML, PNG, PPTX; design: Standalone page and the rest), with the owner's **Whole folder (.zip)** at the end. The design system and the dashboard, which had no local download button, get theirs here.
- Download the whole artifact folder as a zip from every editor, or with `archive <root> [--out file.zip|dir]` from the command line. The zip leaves out the editor's own state, log, sharing file, `exports/`, temporary files and symlinks.
- Slides and design: the **Theme** tab links to a read-only page for the design system in use, with its colours by theme, text styles, other tokens, components and guide. The page runs no script and reads nothing through a symlink.
- The exported standalone HTML of a canvas follows links between artboards: a relative `<a href="B.dc.html">` opens the linked page in the same frame, and Back works ([#25](https://github.com/JimLiu/baoyu-design/issues/25)).
- Slides HTML and PPTX exports and the design Standalone page carry the fonts in use. A family whose licence the lists cannot vouch for goes in with a note asking you to check it, and the file points at its licence page when one is known. PPTX embeds one subset file for a font cut into unicode-range blocks, and the font budget goes from 4 MiB to 16 MiB.
- **Copy link** gives the address other people on the network can open, and shares the page on the network as it copies. A guest can pass the page on but not export it: no Export tab, no folder zip, no downloads.
- A new project gets a default `.gitignore` the first time an editor opens it (state, log, sharing, `history/`, temporary files). An existing one is left alone. Each `SKILL.md` has a "Keeping it in git" section ([#24](https://github.com/JimLiu/baoyu-design/issues/24)).
- Share: a Tailscale address is offered as a separate link, not as the main one, and the panel and `share` explain it is plain http and that a link is the permission.
- DeepSeek Harness: an **Artifacts** page in the left sidebar lists every folder the agent opened an editor on, in cards tinted by type with a tab per type and search. A card opens its conversation and the editor in that conversation's Browser. All the plugins share the one entry.
- DeepSeek Harness: downloads are saved. Its browser drops every download, so exports, and the folder zip now land in `exports/` in the project (never over an existing file), and a toast names the path.
- The Artifacts sidebar icon is two overlapping cards, after claude.ai's.

### Fixes
- `claude-slides`: choosing **PDF** in the Download dialog crashed the page, and then its Download button did nothing. Both work.
- A save that omits the version it started from is refused with a conflict when someone else has saved that path since, instead of silently overwriting.
- `claude-dashboard`: when two pages create the same document, the second no longer replaces the first. Their fields are merged, and a value both set is recorded in History.
- DeepSeek Harness: the comments wait starts, and the artifact is recorded, when the agent runs `open` after other script commands in the same shell call.

### Documentation
- The READMEs and each `SKILL.md` describe the Export tab, the folder zip, the Theme tab's design system page and Keeping it in git.

## 2.6.1 - 2026-11-01

### Fixes
- `claude-dashboard`: when someone else saved the page while you were editing it, and you click **Save** after "This dashboard changed. Save to overwrite that change", it now counts as your choice, as **Keep mine** does in slides. History marks the version "Saved over <name>'s change", the other person's notice says you saved over their change (not that you changed it right after them), and you get no notice yourself. Edits to different lines are still merged and both kept, and **Bring back** still restores only the lines that were replaced.

## 2.6.0 - 2026-11-01

### Features
- Version history in `claude-slides`, `claude-design`, `claude-design-system` and `claude-dashboard`: every change is kept as a version in the project's `history/` folder, with who made it (a guest by the name they typed, the owner, or **Agent** for a change made to the files on this computer). The **History** button, beside Share, lists the versions by day; open one to see what it changed line by line, preview the whole thing as it was, or restore all of it or one part as a new version.
- When one person's save replaces another's change, the version records whose change it replaced and that person gets a notice with **Compare** and **Bring back**. Bring back puts back only what was replaced and leaves the other person's other changes.
- Who is here: while others have the page open, their avatars sit beside History. In the slides and canvas editors each card says which slide or artboard the person is on and whether they are editing, and their cursors and selections show; when someone starts editing what you are looking at, you get a short note. Nothing is locked. The agent shows up there too for a short while after it changes the files.
- Someone else's save updates your page in place in the slides, design and design-system editors, instead of reloading it.
- Two people on the same slide, artboard or file: the two are merged first, element by element on a canvas and line by line in slides and design-system files (a token file token by token), so changes to different elements or lines both stay. Only when the merge cannot sort it out, such as both changing the same line, a bar asks whether to use theirs, keep yours, or keep both.
- `claude-dashboard`: a write from the page merges with what others saved since, field by field and, for a page file, line by line; only a change to the same value gets a notice. Editing a page saves against the version the draft started from.
- The agent is called **Agent**, with a robot avatar, in History, in the avatars and on the comment buttons (**Send to Agent**).

### Fixes
- `open` works beside a TUN-mode proxy, whose interface answered on every port and made `open` fail with `PORT_IN_USE`; share links leave out that interface's address ([#23](https://github.com/JimLiu/baoyu-design/issues/23)).
- `comments --wait --timeout` no longer exits at random with `SERVER_GONE` ("The value of \"delay\" is out of range").
- DeepSeek Harness plugins: the comments wait starts even when the agent runs `open` through shell variables, and a comment sent while the agent is still working waits until its turn is over instead of arriving mid-turn.

### Documentation
- Each editor's `SKILL.md` has a History section: where the versions are, what the notices mean, and how to read `history/index.json` when asked who changed something. The READMEs describe the history, the notices, who is here and the merging.

## 2.5.0 - 2026-10-31

### Features
- Share on your local network: `claude-slides`, `claude-design`, `claude-design-system` and `claude-dashboard` open a project to the same Wi‑Fi or LAN. `share <root>` (or `open <root> --lan`) prints a link per role: `editor` edits and comments, `commenter` comments without editing, `viewer` only looks. Whoever opens a link types a name and is in; a save shows on every other open page, and each comment is its writer's own. The DeepSeek Harness plugins carry it too.
- The owner, at this computer, gets a **Share** button after claude.ai's share dialog: who joined and who is online, a role menu and remove for each person, general access (only this computer, or anyone on the network with a link), and Copy, turn off and reset for each link. From the command line: `share <root> --disable <role>`, `--enable <role>`, `--reset <role>`, `--role <guest>=<role>` and `--off`.
- Guests get a Share button too: the links they may pass on (their own role's and the ones below it) and Copy link for the page's address, which only people with access can open; anyone else gets a "No access" page.
- Roles hold everywhere: commenters and viewers get the editor's read-only mode, viewers only read comments, only a message's author edits it, and only the owner sends comments to the agent. On a dashboard, the owner and editors write; commenters and viewers write nothing, their own `data/users` included.
- Each skill's server has its own port: slides 4710, design 4720, design system 4730, dashboard 4740, or the next free one when that is taken. `--port n` starts from n, `--port 0` takes any free port.
- `claude-design-system`: comments and Share sit in a bar across the top of the page, like claude.ai's artifact header.
- `claude-dashboard`: the page is served at `/dashboard/<id>/`, an address that stays the same across restarts, so a tab left open never shows another folder that took the port.
- The Share button takes the look of the bar it sits in, in light and dark.

### Documentation
- Each editor's `SKILL.md` has a Sharing section. The READMEs describe sharing on the local network and name the dashboard page among those with comments.

## 2.4.1 - 2026-10-31

### Features
- `claude-dashboard`: comment on a chart, a number, a table or any part of the page, and tick **Send to agent**. New `comments`, `comment-reply` and `comment-resolve` commands; `comments --wait` prints the page's address and title. The `dsh-claude-dashboard` plugin waits for comments and shows a sent comment as a card in the chat.
- `claude-slides`, `claude-design` and `claude-design-system`: on a page opened on its own, the comments button sits in the top-right toolbar.
- The editors use claude.ai's current icon set.
- DeepSeek Harness: a plugin market index for the **Discover** tab, at `https://jimliu.github.io/baoyu-design/dsh-plugins/index.json`, rebuilt after each release.

### Fixes
- `claude-dashboard`: the editor ships the licenses of its open-source packages in `scripts/editor/third-party-licenses.txt`, like the other editors.

### Documentation
- New `NOTICE.md` sets out the license of each part. The MIT License covers only the maintainer's own work. The material from Anthropic (skill text and references adapted from the Artifact types, `dataviz`, the editors reconstructed from claude.ai, the Anthropicons icon fonts, and the Claude Design prompt, built-in skills and starter components in `archive/`) stays Anthropic's and is not under MIT; the archived `frontend-design` skill is Apache 2.0, with its license beside it. Open-source code keeps its own licenses. `LICENSE`, the READMEs and every `SKILL.md` point to it, and the DeepSeek Harness plugins now ship it (`"license": "SEE LICENSE IN LICENSE"`).
- The READMEs cover installing the DeepSeek Harness plugins from npm and from **Discover**.

## 2.4.0 - 2026-10-30

### Features
- DeepSeek Harness plugins for the four editors, published to npm: `dsh-claude-slides`, `dsh-claude-design`, `dsh-claude-design-system` and `dsh-claude-dashboard`. In the app, open **Plugins** → **Add plugin** and enter a plugin's name. Each plugin carries its skill as this repo publishes it, prebuilt editor included; the folders are also in `dsh-plugins/`.
- In the DeepSeek Harness plugins, the plugin waits for comments whenever the agent opens an editor, so **Send to agent** wakes the agent even when the chat is idle. A comment sent to the agent shows in the chat as a card, and **View thread** on the card opens the editor at that thread.
- Comments: after a comment is sent to the agent, its thread opens and shows "Working…" until the agent replies. `?comment=<id>` in an editor's address opens that thread, and `comments --wait` also prints the editor's address and the artifact's title.
- Comments: in the All comments panel, resolve and a more menu (Edit, Reopen, Delete thread) show when you hover a row and stay on the selected one; editing and the delete confirmation open in the row. Escape in a panel menu closes only the menu.

### Documentation
- `dsh-plugins/README.md`: installing by name, using, updating, uninstalling, and what to do when something doesn't work.

### Maintenance
- A version tag publishes the DeepSeek Harness plugins to npm from GitHub Actions.

## 2.3.0 - 2026-10-30

### Changed
- Archive the `baoyu-design` skill: it moves from `skills/` to `archive/baoyu-design/`, so the `skills` CLI no longer installs it. The READMEs now cover the four artifact skills and `dataviz`.

### Fixes
- `claude-slides`: port the rest of the 2026-10-29 editor, including video embeds beyond YouTube, the Present menu, the phone landscape hint and the bottom toolbar; buttons and menus keep their spacing.
- `claude-design-system`: add the new controls (2D color picker, segmented control, property rows, number input); the delete confirmation opens again.
- `claude-dashboard`: port the 2026-10-29 page UI and messages, and editing the page by hand (Edit the page, Beta) on one-writer pages.
- Comments: fix toast placement on right-to-left pages and the danger menu item highlight.

### Documentation
- Refresh the editor screenshots in the READMEs.

## 2.1.0 - 2026-10-30

### Features
- `claude-slides`, `claude-design` and `claude-design-system`: leave comments on elements or areas in the editor. Comments are saved locally with their file and location; the agent can read, reply to, resolve and reopen threads. While an agent listens, a **Send to agent** checkbox lets you send a comment for it to act on.
- Add `dataviz`, a chart-design skill for any output medium, with guidance on chart forms, color, marks, legends, accessibility and interaction, plus JavaScript and Python palette validators.
- Refresh all four artifact editors to the 2026-10-29 upstream release, including the design canvas's Theme tab, read-only code-synced design systems, and updated font and icon assets.
- `claude-slides`: decks opened on their own page gain additional export formats; PowerPoint export embeds linked Google Fonts, with WOFF2 decoding in the page.

### Fixes
- Editor servers exit with an error when their port is already in use instead of hanging.

### Changed
- Ship the artifact tools and editors prebuilt and remove the separate `tools/artifact-skills/` build tooling.
- `claude-dashboard`: share server state and HTTP helpers with the other artifact servers.

### Documentation
- Sync the four artifact skills and their reference pages with the 2026-10-29 upstream instructions, covering design-system setup, slide links, canvas notes and dashboard data workflows.
- Reorganize the English and Chinese READMEs around the skills, with editor screenshots, updated examples, dataviz and comments guidance, and a demo video in the Chinese README.

## 2.0.3 - 2026-10-29

### Fixes
- `claude-design`: a page's phone version, the artboard beside the page at phone width, is now a 390×844 phone screen whose content scrolls inside the frame, so full-screen Fit shows it at its own size like a phone. Before, it took the page's full height, and Fit shrank it to a sliver.

## 2.0.2 - 2026-10-28

### Fixes
- `claude-dashboard`: a dashboard's numbers, dates and state lines follow the person's language (in Chinese: 万/亿, `10月1日`, `加载失败`), and a title not in Latin letters gets a short English folder name.
- `claude-dashboard`: dates not in ISO form, such as `Thu, Oct 29, 2026` in an X analytics export, are parsed as UTC with `d3.utcParse`, not `new Date()`, which shows them as the day before east of UTC.
- `claude-dashboard`: a batch sent through a shell heredoc quotes its end marker (`<<'EOF'`); unquoted, the shell expands the `$file` in `{"$file": …}`.

## 2.0.1 - 2026-10-28

### Fixes
- `claude-design-system`: a design system imported from a component library now gets live, interactive component previews instead of README-only or hand-drawn static cards. The agent takes every exported component, installs the package published on npm (`--ignore-scripts`, so none of the repository's code runs) and bundles it; the repository's own build is only for unpublished packages, and static previews are a labelled fallback.
- `claude-design-system`: document libraries that need React 19 (ship `components/lib/react.js` and `react-dom.js`, listed in `libraries`), and that fonts from hosts other than Google Fonts, such as Typekit, fall back in previews.
- `baoyu-design`: importing a design system keeps every path it reads or copies inside the design-system folder and the project; an `@import` or manifest entry that points outside, or a symlink leading out, is skipped and reported (#16).

## 2.0.0 - 2026-10-28

### Features
- Add four skills that bring claude.ai's Artifact types to local agents: `claude-slides` (slide decks), `claude-design` (a canvas of artboards), `claude-design-system` (design systems) and `claude-dashboard` (data-backed dashboards). Each `SKILL.md` keeps the type's original instructions, with the Artifact tool calls swapped for a local `scripts/artifact.mjs` (Node 20+, the dashboard Node 22+; nothing to install).
- Each skill ships its editor prebuilt in `scripts/editor/` and runs its own local server, so you and the agent can take turns: the agent's file writes show up in the editor at once, and edits made in the editor are saved back into the same files.
- Decks and canvases can install a design system made with `claude-design-system`; the editor's Theme and color menus then offer its colors and text styles.
- `claude-design` gets an Export button in the editor toolbar: export the whole design as a standalone HTML page, a PDF or PNG images. PDF and PNG first ask which artboards to include; PNG exports at 1× or 2×, and several artboards download as a .zip.
- Add `tools/artifact-skills/` to rebuild the prebuilt editors.

### Changed
- `baoyu-design` now triggers only when a task creates or edits a visual deliverable. Architecture or protocol analysis, rendering-engine or backend work and technical Markdown no longer trigger it on their own.

### Documentation
- Document the four artifact skills, their `artifact.mjs` commands and the `claude-design` export in the English and Chinese READMEs.

## 1.3.0 - 2026-09-23

### Features
- Synchronize the September 14 Claude Design snapshot: a new `watercolor-kit` starter paints deterministic, code-driven watercolors and replays them stroke by stroke, with matching watercolor components in `animations-v3` for painterly animation beats (plus a portable fallback when hosted painting tools are unavailable).
- Absorb upstream guidance on GitHub sync receipts, minimum text contrast, and fluid layouts; PDF exports now rebuild the print copy from a fresh read of the design with optional source-version provenance.

### Fixes
- Soften mouse-wheel zoom on the design canvas: each wheel click now zooms 10% instead of ~20%, and zoom-vs-pan is decided once per scroll, so trackpad or Magic Mouse momentum can no longer blow the canvas up mid-pan.
- Keep fit-mode `doc-page` content on a single printed sheet instead of spilling onto a second page.
- Reject absolute asset paths when importing a design system, closing a path-traversal gap (by @anupamme)

### Changed
- Tweak-panel chat submissions are tagged as suggestion, free text, or ideas requests, and the suggestion bar reports a single impression per session.
- Record the local design-canvas patch alongside the existing deck-stage patches so upstream syncs reapply it, with a test guarding it.

### Documentation
- Mention the watercolor painting runtime in the English and Chinese starter-component overviews.

## 1.2.0 - 2026-07-25

### Features
- Synchronize 13 project-type routes and the July 25 Claude Design system-prompt snapshot, covering slides, mobile apps, wireframes, documents, animation, UI mockups, résumés, 3D objects, research, HTML email, color/type systems, diagrams, and fliers.
- Add specialized workflows for 3D objects, data science and visualization, design feedback, experiments, HTML email, maps, social media campaigns, trifold brochures, watercolor illustration, web research, landing pages, and additional export formats.
- Add starter components for timeline animation, charts and data overlays, document and file views, 3D scenes, browser/device shells, and major social platforms.

### Changed
- Merge upstream improvements into `deck-stage`, `image-slot`, design guidance, and project routing while preserving local native PowerPoint animations, tweak suggestions, design-system tooling, import flows, and video export.
- Record reproducible upstream-sync provenance and manifests, with tests that verify every project type and protect local feature overlays.

### Documentation
- Expand the English and Chinese capability overview for the new workflows and starter components.

## 1.1.1 - 2026-06-22

### Changed
- `make-a-deck`: clarify that text-capable image generation is not a reason to prefer it — HTML/CSS stays the default for structured and precise slide content, and generated imagery remains a supplement reserved for conceptual scenes, mascots, hero/section art, and genuine infographics (Chinese labels are welcome when an infographic is genuinely the right call).

## 1.1.0 - 2026-06-22

### Changed
- `generate-images`: update raster image guidance for modern image backends that can render text reliably, including Chinese / CJK, and route text-heavy infographics to HTML/CSS only when editability, exactness, or data binding matters.
- `make-a-deck`: align deck imagery guidance with text-capable image generation so generated slide infographics can include headings, labels, callouts, and Chinese copy when they do not need live editability or exact numeric binding.

## 1.0.0 - 2026-06-22

### Features
- Ship the portable `baoyu-design` Agent Skill with the core design methodology, harness references for Claude Code, Cursor, and Codex, built-in design workflows, starter components, design-system tooling, and local import/export agents.
- Add `release-skills`, a reusable release workflow for version selection, multi-language changelogs, annotated tags, and GitHub Releases.
- Add local deck, document, PPTX, video, image-generation, Figma `.fig`, GitHub repo, HTML/CSS import, and design-system preview flows.

### Fixes
- `gen-pptx`: improve editable PowerPoint fidelity by rendering children in z-index order, propagating ancestor opacity through exported subtrees, rasterizing gradient overlays, preserving Unicode filenames, preserving line breaks, and guarding stuck captures with per-call timeouts.
- `make-a-deck`: document full-height slide wrappers so full-bleed slide content exports reliably.

### Documentation
- Document installation, local usage, design systems, import sources, deck/PPTX export, and the supported agent harnesses in the English and Chinese READMEs.

## 2026-06-19

### Features
- `generate-images`: add a harness-agnostic image-generation dispatcher and wire it into the design flows that need raster output. The dispatcher records prompt files before generation, chooses runtime-native providers before the installed `baoyu-image-gen` CLI, standardizes `imgs/` + `prompts/` outputs, and removes the obsolete `gemini-image` built-in skill.

### Changed
- PPTX export now defaults to editable mode; screenshot export remains available when explicitly requested.

### Fixes
- `make-a-deck`: document that each slide's content wrapper must fill its `<section>`. deck-stage sizes only the section (via `::slotted`), not the wrapper inside it, so a wrapper whose children are all absolutely positioned collapses to zero height — dropping full-bleed images entirely on export, or rendering hero backgrounds at half height. Adds a base CSS rule (`section[data-label] > *`), the mechanism behind it, and a verification check.
- `gen-pptx` / `gen-video`: preserve Unicode characters (CJK, Cyrillic, accented Latin) in export filenames via a shared `safeBasename` sanitizer, instead of replacing every non-ASCII word character with `_` (which turned names like `小米SU7-外观与价格` into all underscores).
- `gen-pptx`: rasterize CSS gradient backgrounds (cover/hero scrims, fade overlays) to transparent PNGs in editable PPTX export. PowerPoint has no gradient fill, so the converter previously flattened a gradient to its first color stop — turning an alpha-fading scrim like `linear-gradient(105deg, rgba(8,10,13,.92) → .05)` into a near-opaque dark rectangle that uniformly dimmed the whole image and hid the bright subject under the fade. The exporter now paints the gradient onto a canvas honoring each stop's alpha (linear + radial, angle / `to`-direction / corner, %/px stops, border-radius clipping), so overlays fade exactly as in the browser; unsupported forms (conic / repeating) fall back to the prior flat fill.

## 2026-06-16

### Features
- `animated-video`: add a local `gen-video` CLI for MP4/WebM/GIF export. It drives Chromium with Playwright, seeks timeline animations frame by frame through `window.__animStage`, supersamples captures, and streams frames to ffmpeg.
- `starter-components/animations.jsx`: add the `window.__animStage` timeline bridge and `?capture` behavior so exported animations start paused, render full-bleed, and omit editing chrome.

### Fixes
- `gen-pptx`: guard setup and capture calls with per-call timeouts so a stuck slide cannot hang export forever.
- `gen-pptx`: preserve code-block line breaks and `<br>` elements in editable PPTX text export.

### Documentation
- README: document the deck/PPTX export workflow and add English/Chinese pipeline diagrams.

## 2026-06-15

### Features
- `gen-pptx`: add a local PPTX exporter for Claude Code. The TypeScript CLI uses Playwright and PptxGenJS to export baoyu-design decks in editable or screenshot mode and prints structured validation output.
- `deck-stage`: add native fullscreen support, auto-hide the thumbnail rail in Fullscreen API mode, add a fullscreen toolbar button plus `F` shortcut, and add a Duplicate slide action.
- `deck-stage`: move rail mutations to a host-driven `dc-op` model while preserving standalone HTML fallback behavior.
- `make-a-doc`: add a built-in skill for page-style, print-first documents.
- `something-cool`: add the opt-in "show me something cool" flow with an upfront direction picker.
- `tweaks-panel`: add `TweakSuggestionBar` so edit-mode tweak ideas can be dropped into the host chat composer.

### Changed
- Built-in skill prompts were refreshed across deck authoring, speaker notes, mobile prototypes, print/PDF export, handoff, PDF reading, visual design, animation, sound, Canva, and PPTX export flows.
- `design-canvas`: persist and restore viewport pan/zoom, with a visibility backstop and wheel passthrough for nested deck rails.
- `SKILL.md`: add PPT/PPTX/PowerPoint routing terms, scope PPTX export to baoyu-design decks only, and trim the skill description under the runtime description limit.

### Fixes
- `deck-stage`: force slide animations and transitions to their end state during print/PDF export so entrance states are not captured mid-animation.

## 2026-06-11

### Features
- Add `import-from-github` and `import-from-html` built-in skills for treating repositories and existing HTML/CSS pages as design sources with provenance and content-is-data guardrails.
- Design-system tooling now parses component prop contracts from `.d.ts` files, emits complete enum/default prop guidance into `_ds_prompt.md`, and detects risky top-level Babel globals such as `status`, `open`, and `location`.
- Add a GitHub Actions test workflow and Node test coverage for the design-system, Figma import, preview, asset, and prompt tooling.

### Fixes
- `build-preview.mjs`: inline assets referenced from card scripts and JSX string literals so generated `preview.html` files no longer show broken images for script-side asset refs.
- `fig-materialize.mjs`: map font weights with the ordered decoder table so Semi Bold, Extra Bold, Thin, and related weights materialize correctly.
- `ds-prompt.mjs`: keep fenced JSX examples complete when extracting component prompt excerpts.

### Documentation
- README: add an "Import design sources" section covering offline Figma `.fig` files, GitHub repositories, and existing HTML/CSS references.

## 2026-06-10

### Features
- Add a local offline Figma `.fig` importer with `outline`, `mount`, `materialize`, `render`, and `design-system` subcommands.
- Add the `design-system-preview` built-in skill and `agents/build-preview.mjs`, generating a self-contained interactive `preview.html` for compiled design systems.

### Changed
- `.fig` importer output now prints copy-pasteable next-step commands, warns about case-insensitive filename collisions, and records mount/render guidance in generated README files.
- Design-system preview summaries are capped for very large systems so validation output stays readable.

### Fixes
- Design-system bundles now emit sources in dependency-safe order so local component dependencies are defined before consumers load.
- Token extraction no longer misreads BEM pseudo-class selectors as custom-property declarations.
- Preview fallback messages now distinguish a missing manifest from a manifest with no usable preview entries.

## 2026-06-09

### Features
- Add end-to-end design-system support: discovery, project binding, `_ds/<slug>/` sync, generated per-load `_ds_prompt.md`, and project metadata recorded in `_d_meta.json`.
- Add the read-only fork-verifier subagent for post-build checks across Claude Code, Codex, and Cursor harnesses.
- Design-system prompts now use bundle-first wiring, include component prompt excerpts, and expose PascalCase `.jsx`/`.tsx` exports without `.d.ts` contracts when safe.

### Changed
- Expand design-system authoring guidance for GitHub source import, component imports, accepted global CSS entry names, and runtime wiring.
- Shorten the `baoyu-design` skill description while preserving trigger terms (by @easonshen90, [#8](https://github.com/JimLiu/baoyu-design/pull/8)).

### Credits
- `baoyu-design` skill description shortening contributed by @easonshen90 ([#8](https://github.com/JimLiu/baoyu-design/pull/8)).

## 2026-06-08

### Features
- Add the portable design-system authoring toolchain: compiler, checker, core parser, vendored Babel runtime, and a read-only checker subagent.
- Add design-system consumer import/sync tooling, including `_ds/<slug>/` bindings, generated per-load prompts, and `_d_meta.json` project metadata.
- Add asset recording tooling for tracking generated deliverables, versions, status, viewport, subtitles, and sections.

### Changed
- Harness references now point to the shared design-system authoring guide and clarify when to run checks inline versus through an isolated read-only subagent.

### Fixes
- Remove the tracked `skills/baoyu-design/.DS_Store` file (by @HCS9527, [#2](https://github.com/JimLiu/baoyu-design/pull/2)).

### Credits
- Tracked `.DS_Store` removal contributed by @HCS9527 ([#2](https://github.com/JimLiu/baoyu-design/pull/2)).

## 2026-06-07

### Fixes
- `SKILL.md`: fix frontmatter metadata so the skill loads correctly (by @y122972, [#1](https://github.com/JimLiu/baoyu-design/pull/1)).
- Remove the root `.DS_Store` file and add `.DS_Store` to `.gitignore`.
- Correct README screenshot file mappings.

### Documentation
- Add screenshots to the English and Chinese READMEs, document Reader Mac App prompts and Claude Design comparison examples, and optimize screenshot assets to WebP.

### Credits
- `SKILL.md` frontmatter fix contributed by @y122972 ([#1](https://github.com/JimLiu/baoyu-design/pull/1)).

## 2026-06-06

### Features
- Add the portable `baoyu-design` Agent Skill with core design methodology, built-in skill prompts, starter components, export/handoff flows, and Claude Code/Cursor harness references.
- Add Codex Agent support with `skills/baoyu-design/references/codex.md`, covering question asking, browser preview, screenshots, debugging, deliverable surfacing, and subagent verification defaults.

### Documentation
- Add English and Simplified Chinese README files.
- Add this changelog and clarify that final design/prototype delivery should surface the running preview, not only generated files.

### Chore
- Add initial repository files and MIT license.
