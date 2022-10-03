# Changelog

---

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html):

- Given a version number MAJOR.MINOR.PATCH, increment the:
  1. MAJOR version when you make incompatible API changes
  2. MINOR version when you add functionality in a backwards compatible manner
  3. PATCH version when you make backwards compatible bug fixes
  4. Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

---

## Versions

### [1.5.0] - 2022-10-03

- Feature: New homepage with new banners and layout
- Feature: Profile page

### [1.4.0] - 2022-10-02

- Feature: Implemented ExternalLink and InternalLink components
- Feature: Implemented Footer

### [1.3.1] - 2022-10-02

- Fix: ReCAPTCHA feature
- Support feedback after sending message

### [1.3.0] - 2022-10-02

- Feature: Implemented ReCAPTCHA
- Send support message/email

### [1.2.0] - 2022-09-30

- Feature: Added page preview into the page editor, for the case of the page not being public. When the page is public, a new tab opens the final user page view, otherwise a dialog is open showing the page preview.

### [1.1.3] - 2022-09-29

- Fix: Draggable card (component into an user page) showing the wrong value for the clicks analytics tooltip
- Fix: When user added a new component the wrong object was being saved into the page's local state (without the component ID)
- Fix: Issue to remove or toggle visibility of a component
- Refactoring: All uploaded images are set to be saved into a unique folder called "uploaded-images" into the user's storage bucket
- Fix: Wrong translation of the component types
- Fix: Error dealing with the return of the updatePage endpoint

### [1.1.2] - 2022-09-28

- Fix: when rendered page/bio was loading, the website showed that the page wasn't public
- Fix: links not working in the rendered page
- Feature: Socialbio logo in the footer of the rendered page
- Fix: Create page dialog doesn't allow url with white spaces anymore

### [1.1.1] - 2022-09-28

- Fix: infinite loading
- Fix: new logic in the component of auth checker
- Feature: new styling in the user-page bottom toolbar icons
- Feature: New component for full width contents
- Refactoring: Homepage full width.

### [1.1.0] - 2022-09-28

- Implemented FAQ page with accordion skeleton
- Improvement in UI feedback for firebase errors
- Added email and password validation regex in the forms
- Updated LOGO
- When user clicks on header menu SUPPORT, he navigates 1st to FAQ, then support

### [1.0.2] - 2022-09-25

- user-pages reducer setting loading = false in for all error types

### [1.0.1] - 2022-09-25

- Home page clearing "loading" from global state

### [1.0.0] - 2022-09-18

- First release of the frontend on [RENDER](https://www.render.com)
