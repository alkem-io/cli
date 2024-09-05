# Extract information for all profile avatars of Alkemio Users++

### Export an Excel with groups of avatars:
- Inaccessible Avatars: x
- Non Alkemio Avatars: x
- Default Avatars: x
- Alkemio Avatars: x

`npm run users-avatar-excel`


### Upload default avatars hosted in eu.ui-avatars.com to Alkemio Storage

`npm run users-avatar-excel -- --upload-default`

### Generate and download (locally in avatars folder) default avatars (for inaccessible ones)

`npm run users-avatar-excel -- --generate-default`
You need to manually upload the generated ones.