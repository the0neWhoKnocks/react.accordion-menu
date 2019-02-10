# React Accordion Menu

[![Build Status](https://travis-ci.org/the0neWhoKnocks/react.accordion-menu.svg?branch=master)](https://travis-ci.org/the0neWhoKnocks/react.accordion-menu)
[![codecov](https://codecov.io/gh/the0neWhoKnocks/react.accordion-menu/branch/master/graph/badge.svg)](https://codecov.io/gh/the0neWhoKnocks/react.accordion-menu)
[![npm version](https://badge.fury.io/js/%40noxx%2Freact-accordion-menu.svg?cb=1)](https://badge.fury.io/js/%40noxx%2Freact-accordion-menu)

A React component for accordion style menus.

You can view the [demo in action here](https://the0newhoknocks.github.io/react.accordion-menu/).

---

## Install

```sh
yarn add @noxx/react-accordion-menu
# or
npm i @noxx/react-accordion-menu
```

---

## Usage

Refer to the [example file](example/src/index.js) for up-to-date usage examples.

| Prop             | Required | Description |
| ---------------- | -------- | ----------- |
| `asyncContent`   | No       | A function that returns a `Promise`, whose result returns JSX. |
| `className`      | No       | A custom class that'll be applied to the root node. |
| `icon`           | No       | Choice of toggle indicator icons. |
| `label`          | Yes      | Either a `Component` or a `String` used to label the item. |
| `lazyDOM`        | No       | Whether or not to add the content to the DOM on mount, or wait until the user chooses to open the item. |
| `opened`         | No       | Whether or not the item is open on mount. |
| `tabIndex`       | No       | Index for keyboard navigation. |
| `transitionTime` | No       | How long (in milliseconds) it takes for an item to open or close. |
| `uid`            | No       | A unique ID used to link up the markup and functionality. It defaults to `performance.now()` but I wouldn't recommend that for a production setting. |

---

## Development

```sh
# Install all deps
yarn
# or
npm i

# Start dev server
yarn start
# or
npm start
```
