# Claude Whiteboard

Adds the **claude-whiteboard** skill to DeepSeek Harness. Ask for a board ("map out how our release works", "lay out
the options for the offsite side by side") and the agent lays it out on a whiteboard in a folder in your workspace
(`designs/<name>/` unless you name another): titles, sections, blocks joined by arrows, tables, sticky notes, drawings
and small working embeds. It starts a local board editor and gives you its link; the board fills in there as the agent
writes it.

## Using it

- Ask in plain words, or type `/claude-whiteboard` to call the skill by name.
- Open the link the agent gives you. In the desktop app it opens in the right sidebar's Browser, beside the
  conversation (Settings → General → Open chat links in: **In-App Sidebar**, the default).
- On the board you move and resize things, type, draw with the pen, and add sections, sticky notes, shapes and stickers
  from the toolbar at the bottom. What you change is saved into the same folder the agent writes, so you can take turns.
- Comment on the board: the comments button at the top right turns comment mode on. Click an item or a spot to comment
  on it, or drag for an area. Tick **Send to Agent** and the agent picks it up at once, even when the conversation is
  idle: it changes the board and replies in the comment. The comment also shows in the chat as a card; **View thread**
  on the card opens it on the board. The box is there while comments can reach the agent, which starts each time it
  gives you the link. After restarting the app, ask the agent to open the board again to bring it back.
- **Share** opens the board to your local network with a link per role (edit, comment, view): everyone on a link sees
  the others' cursors and changes live; its Export tab downloads the whole folder as a zip. **History** (the clock
  beside Share) lists the versions.
- To change a board later, ask the agent to revise its folder.
- A workspace that has its own `claude-whiteboard` skill (in `.agents/skills/` or `.dsh/skills/`) uses that copy
  instead of this plugin's.

## What runs where

The board editor is a small server on 127.0.0.1 that the skill's script starts in the background, one for all the
boards on this computer. It reads and writes only the folders of the boards it serves. The desktop app's own Node
runtime runs it; nothing else is installed.
