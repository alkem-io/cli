# Extract information for all profile avatars of Alkemio Users/Orgs/VCs


### By default extracst the Users' avatars

in `users-avatar-excel.ts`
```
// Change the type below if you want to run the scirpt for Orgs or VCs
const SELECTED_CONTRIBUTOR_TYPE = ContributorType.User;
```

### Export an Excel with groups of avatars:
- Inaccessible Avatars: x
- Non Alkemio Avatars: x
- Default Avatars: x
- Alkemio Avatars: x

`npm run users-avatar-excel`

(see the exported excel - avatars-metadata-\[date\].xlsx)


### Generate default avatar (eu.ui.avatars.com) and replace the visual uri for inaccessible ones

`npm run users-avatar-excel -- --generate-default`
You need to manually upload the generated ones.


### Ensure all Avatars used by Alkemio users are stored as Documents, retrieving the image from the remote URL

`npm run users-avatar-excel -- --store-as-documents`



######
In `users-avatar/utils` there is also a method that can download an SVG/PNG from provided URL and make it available for manual upload.
(not used ATM)