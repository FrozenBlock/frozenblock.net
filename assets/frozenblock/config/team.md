# Team

frozenblock.net registers all members through the [team.json](team.json) file.
This means everything you need to do to add a member is:

Add the entry into [mods.json](mods.json):
```json5
//JSON5 not supported at the moment.
{
  "user-uuid": { //The Minecraft user UUID
    // The user title (Usually it's name)
    // Default: 'Untitled'
    "title": "LiukRast",
    // The user description
    // Default: 'No description provided'
    "description": "A cool mod desc",
    // User's favourite color (Not implemented yet)
    // Default: '#718ffa'
    "color": "#718ffa",
  }
}
```

Then
- Add a `mod-id.md` in [frozenblock:config/mods/](mods) containing the full mod description

Thanks MCHeads for the temp icon & body renderer

TODO: Implement our own render system because MCHeads does not support slim skins (bruh)