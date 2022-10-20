<p align="center"><img width="24%" src="./docs/images/logo-fire.svg"></p>
<p align="center"><img width="60%" src="./docs/images/logo-inline.svg" alt="Boilerplate"></p>

<p align="center">Grant writing made easy.</p>

Boilerplate is an online tool for managing grant writing within an organization.
With Boilerplate, you can build custom, searchable libraries of content that can
be imported into grant templates where they can be revised into draft
applications.

## Contributing

For instructions on contributing, check out
[CONTRIBUTING.md](./docs/CONTRIBUTING.md).

~~0. delete these two actions: organization_users#create and organization_users#show~~
~~1. add a new tab for the user page that shows invitations~~
~~  * fetch invitations from api through a new invitations service~~
2. create a popover reuseable component
  * used for when you hover over the buttons and icons
3. implement revinvite icon-button in invitations table
4. implement unvinvite icon-button in invitations table
5. implement remove user icon-button in user table
6. implement invite user button 
  * only available to admins
  * create some modal with the form fields
7. implement icons in invitations table
  * expired
  * pending
8. follow up on giving frontend ability to know if current user is an admin and
   hiding users link from sidebar if not an admin
8. follow up on restricting organization user methods on backend (index)
