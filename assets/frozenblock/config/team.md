# Team

frozenblock.net registers all members through the [team.json](team.json) file.
This means everything you need to do to add a member is:

Add the entry into [team.json](team.json):
```json5
//JSON5 is not supported at the moment.
{
  //The portfolio name. 
  // https://frozenblock.net/portfolio/?id=name
  "name": {
    // The user title (Usually it's name)
    // Default: 'Untitled'
    "title": "LiukRast",
    // The user minecraft UUID. Used to provide skin.
    // Default: Steve skin
    "id": "mc-uuid",
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
- Add a `name.md` in portfolio folder

Thanks MCHeads for the temp icon & body renderer

TODO: Implement our own render system because MCHeads does not support slim skins (bruh)