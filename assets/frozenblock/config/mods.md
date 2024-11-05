# Mods

frozenblock.net registers all mods through the [mods.json](mods.json) file.
This means everything you need to do to add a mod is:

Add the entry into [mods.json](mods.json):
```json5
//JSON5 not supported at the moment.
{
  "mod-id": { //The mod ID
    // The mod title
    // Default: 'Untitled'
    "title": "My Mod",
    // The mod description
    // Default: 'No description provided'
    "description": "A cool mod desc",
    // Mod main color, used for style
    // Default: '#718ffa'
    "color": "#718ffa", //Gradient color
    //Means there are 6 sliding images (0.png, 1.png ... 5.png)
    //Default: 1
    "slides": 6 //Default: 1
  }
}
```

Then
- Add a `mod-id.png` in [[...]/mods/](../../../assets/frozenblock/textures/mods)
- Add a `mod-id_background.png` in [[...]/mods/](../../../assets/frozenblock/textures/mods)
- Add a `mod-id_wide.png` in [[...]/mods/](../../../assets/frozenblock/textures/mods)
- [Optional] Add a `mod-id/` folder in [[...]/mods/](../../../assets/frozenblock/textures/mods) containing all images that will slide.
- Add a `mod-id.md` in [frozenblock:config/mods/](mods) containing the full mod description